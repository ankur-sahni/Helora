# Agency OS

The autonomous operating system for Ankur's AI Automation Agency.
Runs 24/7. Reports to Ankur's phone. Requires minimal manual intervention.

---

## What's In Here

| File | What It Does |
|------|-------------|
| `google-sheets-setup.js` | Google Apps Script — run once to create all 7 sheets |
| `n8n-master-scheduler.json` | Core heartbeat — runs every 15 min, dispatches all jobs |
| `n8n-error-catcher.json` | Catches all workflow failures, logs + alerts via WhatsApp |
| `n8n-approval-queue.json` | Reminds Ankur of pending approvals every 2 hours |
| `saas-formulas.md` | Pricing, retention, onboarding formulas from successful SaaS businesses |

---

## Setup Order

### Step 1 — Google Sheets (10 min)
1. Open [sheets.new](https://sheets.new)
2. Extensions → Apps Script → paste `google-sheets-setup.js`
3. Run → `setupAgencyOS`
4. Copy the Sheet ID from the URL
5. Replace `YOUR_GOOGLE_SHEET_ID` in all 3 n8n JSON files

### Step 2 — Import n8n Workflows (15 min)
1. Open n8n at `http://localhost:5678`
2. New Workflow → Import from JSON
3. Import in this order:
   - `n8n-error-catcher.json` ← import FIRST
   - `n8n-master-scheduler.json`
   - `n8n-approval-queue.json`
4. In each workflow, replace:
   - `YOUR_GOOGLE_SHEET_ID` → your actual Sheet ID
   - `YOUR_PHONE_NUMBER_WITH_COUNTRY_CODE` → `+91XXXXXXXXXX`
5. Connect Google Sheets credentials (service account)
6. Set `n8n-error-catcher` as the error workflow in all other workflows

### Step 3 — Activate (2 min)
1. Activate Error Catcher first
2. Activate Master Scheduler
3. Activate Approval Queue Processor
4. Test by clicking "Execute" manually on Master Scheduler
5. Check that the Google Sheet gets data

### Step 4 — Wire WhatsApp (when API approved)
1. Add WhatsApp credentials in n8n
2. Update `WHATSAPP_PHONE_NUMBER_ID` in `.env`
3. All WhatsApp nodes will activate automatically

---

## How It Works (Daily)

```
9:00 AM IST  → You get WhatsApp morning brief
               (pending tasks, errors, approvals needed)

Every 2 hrs  → Approval reminder if items are waiting

6:00 PM IST  → Evening summary

Sunday 8 AM  → Weekly performance report

15 min loop  → Health check + queue processing (silent)

Instantly    → Error alert if any workflow fails
```

---

## The 7 Sheets

| Sheet | Purpose |
|-------|---------|
| Lead CRM | Every prospect — source, status, follow-up |
| Task Queue | Jobs dispatched to agents |
| Content Calendar | 30 days of content per client, approval status |
| Approval Queue | Items waiting for YES/NO decision |
| Error Log | All workflow failures + resolution status |
| KPI Dashboard | MRR, pipeline, content, system health (live formulas) |
| Client Registry | All active clients, packages, billing |

---

## When WhatsApp Is Not Yet Active

Use email as fallback:
- Replace WhatsApp nodes with Gmail nodes
- Send to `ankur.sahni.tech@gmail.com`
- Same message format, same triggers

---

## Replacing YOUR_GOOGLE_SHEET_ID

Find your Sheet ID in the URL:
```
https://docs.google.com/spreadsheets/d/COPY_THIS_PART/edit
```

Replace in all 3 workflow JSON files before importing.

---

## Cost

| Component | Cost |
|-----------|------|
| Google Sheets | Free |
| n8n (self-hosted) | Free |
| Gemini API (AI nodes) | Near-free |
| Ollama (local AI) | Free |
| WhatsApp API | ₹0.50-1.00 per business-initiated conversation |
| **Total** | **~₹0 until WhatsApp volume grows** |
