/**
 * AGENCY OS — Google Sheets Auto-Setup Script
 * ============================================
 * Run this in Google Apps Script to auto-create the full Agency OS.
 *
 * HOW TO USE:
 * 1. Open Google Sheets (new blank sheet)
 * 2. Click Extensions → Apps Script
 * 3. Delete existing code, paste this entire file
 * 4. Click Run → setupAgencyOS
 * 5. Approve permissions when prompted
 * 6. All sheets will be created automatically
 */

function setupAgencyOS() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setName("Agency OS — Ankur Sahni");

  setupLeadCRM(ss);
  setupTaskQueue(ss);
  setupContentCalendar(ss);
  setupApprovalQueue(ss);
  setupErrorLog(ss);
  setupKPIDashboard(ss);
  setupClientRegistry(ss);

  // Delete default Sheet1 if it exists
  const defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet) ss.deleteSheet(defaultSheet);

  SpreadsheetApp.getUi().alert("✅ Agency OS setup complete! All sheets created.");
}

// ─────────────────────────────────────────────
// SHEET 1: LEAD CRM
// ─────────────────────────────────────────────
function setupLeadCRM(ss) {
  let sheet = ss.getSheetByName("Lead CRM");
  if (!sheet) sheet = ss.insertSheet("Lead CRM");
  sheet.clear();

  const headers = [
    "Lead ID", "Date Added", "Name", "Business", "City", "Phone",
    "Source", "Service Interest", "Status", "Priority",
    "Last Contact", "Next Follow-up", "Notes", "Assigned To", "MRR Potential (₹)"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#1a1a2e").setFontColor("#ffffff").setFontWeight("bold");

  // Status dropdown
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["New", "Contacted", "Interested", "Proposal Sent", "Negotiating", "Won", "Lost", "Nurturing"])
    .build();
  sheet.getRange("I2:I1000").setDataValidation(statusRule);

  // Priority dropdown
  const priorityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["High", "Medium", "Low"])
    .build();
  sheet.getRange("J2:J1000").setDataValidation(priorityRule);

  // Source dropdown
  const sourceRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["WhatsApp", "Referral", "Instagram", "LinkedIn", "Cold Email", "Cold Call", "Walk-in", "Website"])
    .build();
  sheet.getRange("G2:G1000").setDataValidation(sourceRule);

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 80);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 180);
  sheet.setColumnWidth(13, 250);

  // Conditional color by status
  const wonRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Won").setBackground("#d4edda").build();
  const lostRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Lost").setBackground("#f8d7da").build();
  const hotRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("High").setBackground("#fff3cd").build();

  sheet.setConditionalFormatRules([wonRule, lostRule, hotRule]);
}

// ─────────────────────────────────────────────
// SHEET 2: TASK QUEUE
// ─────────────────────────────────────────────
function setupTaskQueue(ss) {
  let sheet = ss.getSheetByName("Task Queue");
  if (!sheet) sheet = ss.insertSheet("Task Queue");
  sheet.clear();

  const headers = [
    "Task ID", "Created At", "Task Type", "Project", "Description",
    "Status", "Priority", "Assigned Agent", "Due By", "Completed At", "Output"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#0f3460").setFontColor("#ffffff").setFontWeight("bold");

  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Pending", "In Progress", "Completed", "Failed", "Skipped"])
    .build();
  sheet.getRange("F2:F1000").setDataValidation(statusRule);

  const typeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Research", "Content", "Outreach", "Report", "Design", "Automation", "Client", "Admin"])
    .build();
  sheet.getRange("C2:C1000").setDataValidation(typeRule);

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(5, 300);
  sheet.setColumnWidth(11, 300);
}

// ─────────────────────────────────────────────
// SHEET 3: CONTENT CALENDAR
// ─────────────────────────────────────────────
function setupContentCalendar(ss) {
  let sheet = ss.getSheetByName("Content Calendar");
  if (!sheet) sheet = ss.insertSheet("Content Calendar");
  sheet.clear();

  const headers = [
    "Content ID", "Date", "Client", "Platform", "Content Type",
    "Hook", "Caption Preview", "Hashtags", "Status",
    "Approved By", "Published At", "Engagement Notes"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#16213e").setFontColor("#ffffff").setFontWeight("bold");

  const platformRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Instagram Reel", "Instagram Post", "Instagram Story", "WhatsApp Broadcast", "Google Business", "Facebook"])
    .build();
  sheet.getRange("D2:D1000").setDataValidation(platformRule);

  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Draft", "Pending Approval", "Approved", "Scheduled", "Published", "Rejected"])
    .build();
  sheet.getRange("I2:I1000").setDataValidation(statusRule);

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(6, 250);
  sheet.setColumnWidth(7, 300);
}

// ─────────────────────────────────────────────
// SHEET 4: APPROVAL QUEUE
// ─────────────────────────────────────────────
function setupApprovalQueue(ss) {
  let sheet = ss.getSheetByName("Approval Queue");
  if (!sheet) sheet = ss.insertSheet("Approval Queue");
  sheet.clear();

  const headers = [
    "Queue ID", "Created At", "Type", "Project", "Item",
    "Preview / Summary", "Decision", "Decided At", "Notes"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#533483").setFontColor("#ffffff").setFontWeight("bold");

  const typeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Content", "Outreach Email", "Proposal", "Workflow Change", "Client Response", "Budget"])
    .build();
  sheet.getRange("C2:C1000").setDataValidation(typeRule);

  const decisionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Pending", "YES — Approved", "NO — Rejected", "Edit & Resubmit"])
    .build();
  sheet.getRange("G2:G1000").setDataValidation(decisionRule);

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(6, 350);
}

// ─────────────────────────────────────────────
// SHEET 5: ERROR LOG
// ─────────────────────────────────────────────
function setupErrorLog(ss) {
  let sheet = ss.getSheetByName("Error Log");
  if (!sheet) sheet = ss.insertSheet("Error Log");
  sheet.clear();

  const headers = [
    "Error ID", "Timestamp", "Workflow", "Node", "Error Message",
    "Severity", "Status", "Resolved At", "Fix Applied"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#c0392b").setFontColor("#ffffff").setFontWeight("bold");

  const severityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Critical", "High", "Medium", "Low"])
    .build();
  sheet.getRange("F2:F1000").setDataValidation(severityRule);

  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Open", "Investigating", "Fixed", "Ignored"])
    .build();
  sheet.getRange("G2:G1000").setDataValidation(statusRule);

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(5, 350);
  sheet.setColumnWidth(9, 300);
}

// ─────────────────────────────────────────────
// SHEET 6: KPI DASHBOARD
// ─────────────────────────────────────────────
function setupKPIDashboard(ss) {
  let sheet = ss.getSheetByName("KPI Dashboard");
  if (!sheet) sheet = ss.insertSheet("KPI Dashboard");
  sheet.clear();

  // Title
  sheet.getRange("A1").setValue("AGENCY OS — KPI DASHBOARD");
  sheet.getRange("A1").setFontSize(18).setFontWeight("bold").setFontColor("#1a1a2e");
  sheet.getRange("B1").setValue(new Date()).setNumberFormat("dd MMM yyyy");

  // MRR Block
  sheet.getRange("A3").setValue("REVENUE").setFontWeight("bold").setBackground("#1a1a2e").setFontColor("#fff");
  sheet.getRange("A4").setValue("Total MRR (₹)");
  sheet.getRange("A5").setValue("Total MRR (USD)");
  sheet.getRange("A6").setValue("Active Clients");
  sheet.getRange("A7").setValue("Avg Client Value (₹)");
  sheet.getRange("A8").setValue("MRR Target (₹)");
  sheet.getRange("B8").setValue(2500000); // ₹25L = ~$30K

  // Pipeline Block
  sheet.getRange("A10").setValue("PIPELINE").setFontWeight("bold").setBackground("#0f3460").setFontColor("#fff");
  sheet.getRange("A11").setValue("Total Leads");
  sheet.getRange("A12").setValue("Hot Leads (High Priority)");
  sheet.getRange("A13").setValue("Proposals Sent");
  sheet.getRange("A14").setValue("Conversion Rate");

  // Formulas pulling from Lead CRM
  sheet.getRange("B11").setFormula("=COUNTA('Lead CRM'!A2:A1000)");
  sheet.getRange("B12").setFormula("=COUNTIF('Lead CRM'!J2:J1000,\"High\")");
  sheet.getRange("B13").setFormula("=COUNTIF('Lead CRM'!I2:I1000,\"Proposal Sent\")");
  sheet.getRange("B14").setFormula("=IFERROR(COUNTIF('Lead CRM'!I2:I1000,\"Won\")/COUNTA('Lead CRM'!A2:A1000),0)");
  sheet.getRange("B14").setNumberFormat("0.0%");

  // Content Block
  sheet.getRange("A16").setValue("CONTENT").setFontWeight("bold").setBackground("#16213e").setFontColor("#fff");
  sheet.getRange("A17").setValue("Scheduled This Month");
  sheet.getRange("A18").setValue("Published This Month");
  sheet.getRange("A19").setValue("Pending Approval");
  sheet.getRange("B17").setFormula("=COUNTIF('Content Calendar'!I2:I1000,\"Scheduled\")");
  sheet.getRange("B18").setFormula("=COUNTIF('Content Calendar'!I2:I1000,\"Published\")");
  sheet.getRange("B19").setFormula("=COUNTIF('Content Calendar'!I2:I1000,\"Pending Approval\")");

  // System Health
  sheet.getRange("A21").setValue("SYSTEM HEALTH").setFontWeight("bold").setBackground("#c0392b").setFontColor("#fff");
  sheet.getRange("A22").setValue("Open Errors");
  sheet.getRange("A23").setValue("Pending Approvals");
  sheet.getRange("A24").setValue("Tasks In Progress");
  sheet.getRange("B22").setFormula("=COUNTIF('Error Log'!G2:G1000,\"Open\")");
  sheet.getRange("B23").setFormula("=COUNTIF('Approval Queue'!G2:G1000,\"Pending\")");
  sheet.getRange("B24").setFormula("=COUNTIF('Task Queue'!F2:F1000,\"In Progress\")");

  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 150);
}

// ─────────────────────────────────────────────
// SHEET 7: CLIENT REGISTRY
// ─────────────────────────────────────────────
function setupClientRegistry(ss) {
  let sheet = ss.getSheetByName("Client Registry");
  if (!sheet) sheet = ss.insertSheet("Client Registry");
  sheet.clear();

  const headers = [
    "Client ID", "Name", "Business", "City", "Phone", "Email",
    "Service Package", "MRR (₹)", "Start Date", "Next Invoice",
    "Status", "WhatsApp Group", "Drive Folder", "Notes"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#2d6a4f").setFontColor("#ffffff").setFontWeight("bold");

  const packageRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "Starter — ₹15K/mo",
      "Growth — ₹25K/mo",
      "Pro — ₹40K/mo",
      "Ollama Privacy — ₹60K/mo",
      "Custom"
    ])
    .build();
  sheet.getRange("G2:G1000").setDataValidation(packageRule);

  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Active", "Paused", "Churned", "Trial"])
    .build();
  sheet.getRange("K2:K1000").setDataValidation(statusRule);

  // Add Sahni Bridal Studio as first entry
  sheet.getRange("A2:N2").setValues([[
    "C001", new Date(), "Sahni Beauty Salon", "Lahar, MP",
    "", "", "Growth — ₹25K/mo", 25000,
    new Date(), "", "Active", "", "", "First client — case study in progress"
  ]]);

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(3, 180);
  sheet.setColumnWidth(14, 300);
}
