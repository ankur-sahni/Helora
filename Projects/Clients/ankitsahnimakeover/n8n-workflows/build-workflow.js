// ============================================================
// BUILD SCRIPT — Ankit Sahni Makeover Instagram Chatbot v2
// Run: node build-workflow.js
// ============================================================
const fs = require('fs');

// ── SHARED CREDENTIALS ───────────────────────────────────────
const SHEETS_CRED = { id: "google-sheets-cred", name: "Google Sheets account" };
const sheetsNode = (id, name, sheetEnvVar, sheetTab, position) => ({
  id, name, type: "n8n-nodes-base.googleSheets", typeVersion: 4.4, position,
  parameters: {
    operation: "getAll",
    documentId: { __rl: true, value: `={{ $env.${sheetEnvVar} }}`, mode: "id" },
    sheetName: { __rl: true, value: sheetTab, mode: "name" },
    returnAll: true, options: {}
  },
  credentials: { googleSheetsOAuth2Api: SHEETS_CRED }
});

const httpNode = (id, name, position, body) => ({
  id, name, type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position,
  parameters: {
    method: "POST",
    url: "https://graph.facebook.com/v21.0/me/messages",
    sendHeaders: true,
    headerParameters: { parameters: [
      { name: "Authorization", value: "=Bearer {{ $env.INSTAGRAM_ACCESS_TOKEN }}" },
      { name: "Content-Type", value: "application/json" }
    ]},
    sendBody: true, contentType: "raw", rawContentType: "application/json",
    body, options: {}
  }
});

// ── EXTRACT MESSAGE (echo guard + text guard) ────────────────
const extractCode = `
const entry = $input.item.json?.entry?.[0]?.messaging?.[0] || {};
const msg = entry.message || {};
// Skip echo (bot's own outgoing messages)
if (msg.is_echo === true) return [];
// Skip non-text (stickers, voice, images, reactions)
const text = msg.text;
if (!text || typeof text !== 'string' || text.trim() === '') return [];
return { json: {
  sender_id: entry.sender?.id || '',
  message_text: text.trim(),
  message_id: msg.mid || ''
}};`.trim();

// ── BUILD GEMINI PROMPT (the brain) ─────────────────────────
const buildPromptCode = `
// ── Gather data ──────────────────────────────────────────────
const msg       = $('Extract Message').first().json;
const convRows  = $('Load Conv State').all().map(r => r.json);
const packages  = $('Read Packages').all().map(r => r.json);
const priceRows = $('Read Price List').all().map(r => r.json);
const faqs      = $('Read FAQs').all().map(r => r.json);
const aboutRows = $('Read About').all().map(r => r.json);

// ── About map ────────────────────────────────────────────────
const about = {};
aboutRows.forEach(r => { if (r.Key) about[r.Key] = r.Value; });
const WA      = about['WhatsApp']       || '+91 90988 88134';
const HOURS   = about['Hours']          || '9 AM – 9 PM, Mon–Sun';
const LOC     = about['Location']       || 'Main Bazaar Road, Lahar';
const STUDIO  = about['Business Name']  || 'Ankit Sahni Makeover';

// ── Business hours check (IST = UTC+5:30) ───────────────────
const istHour = new Date(Date.now() + 19800000).getUTCHours();
const isOpen  = istHour >= 9 && istHour < 21;
const hoursNote = isOpen ? '' :
  'IMPORTANT: Studio is currently CLOSED. Warmly tell customer our hours are ' + HOURS +
  ' and the team will reply first thing when we open. Still help with their query.';

// ── Conversation state ───────────────────────────────────────
const existing = convRows.find(r => {
  if (r.sender_id !== msg.sender_id) return false;
  const hoursOld = (Date.now() - new Date(r.last_updated||0)) / 3600000;
  return hoursOld < 24;
});
const stage       = existing?.stage        || 'greeting';
const occasion    = existing?.occasion     || '';
const svcType     = existing?.service_type || '';
const gender      = existing?.gender       || 'unknown';
const language    = existing?.language     || 'auto';
const chatHistory = (() => { try { return JSON.parse(existing?.chat_history || '[]'); } catch(e) { return []; } })();

// ── Build price list lookup helper ───────────────────────────
let currentCategory = '';
const priceMap = {}; // { "Bridal Makeup": [{service,price},...] }
priceRows.forEach(row => {
  const cat = (row['Other Services'] || '').trim();
  const svc = (row['service '] || row['service'] || '').trim();
  const prc = (row['price'] || '').toString().trim();
  if (cat) currentCategory = cat;
  if (svc && prc && currentCategory) {
    if (!priceMap[currentCategory]) priceMap[currentCategory] = [];
    priceMap[currentCategory].push({ service: svc, price: prc });
  }
});
const fmtCategory = (cat) => (priceMap[cat]||[]).map(r => r.service+': ₹'+r.price).join(' | ');

// ── Stage-aware context injection ────────────────────────────
let contextData = '';
let quickReplies = [];

if (!stage || stage === 'greeting') {
  contextData = 'Studio: '+STUDIO+'. Location: '+LOC+'. WhatsApp: '+WA+'. Hours: '+HOURS+'.';
  quickReplies = ['💍 Bridal Makeup','🎉 Party / Event','📸 Pre-Wedding Shoot','💅 Other Service'];

} else if (stage === 'qualify_bridal') {
  const names = packages.map(p => p['Package Name']).filter(Boolean).join(' | ');
  contextData = 'Available bridal packages (prices revealed after confirming need): '+names;
  quickReplies = ['👰 Wedding Day','📸 Pre-Wedding Shoot','💍 Both Days'];

} else if (stage === 'qualify_engagement') {
  contextData = 'Engagement Makeup options: '+fmtCategory('Engagement Makeup');
  quickReplies = ['Natural Look','Full Glam','HD Makeup','Signature Look'];

} else if (stage === 'qualify_party') {
  contextData = 'Reception: '+fmtCategory('Reception Makeup')+'. Party: '+fmtCategory('Party Makeup');
  quickReplies = ['💒 Wedding Reception','🎂 Birthday','🏢 Corporate Event','💃 Sangeet'];

} else if (stage === 'qualify_other') {
  const cats = Object.keys(priceMap).filter(c => !['Bridal Makeup','Engagement Makeup','Reception Makeup','Party Makeup'].includes(c));
  contextData = cats.map(c => c+': '+fmtCategory(c)).join('\\n');

} else if (stage === 'present') {
  // Find matched package or service
  const matched = packages.find(p => (p['Package Name']||'').toLowerCase().includes((svcType||'').toLowerCase()));
  if (matched) {
    const incls = (matched['Inclusions (semicolon-separated)']||'').split(';').slice(0,3).map(s=>s.trim()).join(', ');
    contextData = 'MATCHED: '+matched['Package Name']+' — '+matched['Price']+' ('+matched['Badge']+').\\nKey inclusions: '+incls;
  } else {
    // Try price list
    const allSvcs = Object.values(priceMap).flat();
    const matchedSvc = allSvcs.find(s => s.service.toLowerCase().includes((svcType||'').toLowerCase()));
    if (matchedSvc) contextData = 'MATCHED SERVICE: '+matchedSvc.service+' — ₹'+matchedSvc.price;
    else contextData = 'Service: '+svcType+'. For exact pricing WhatsApp: '+WA;
  }

} else if (stage === 'faq') {
  const faqText = faqs.map(f => 'Q: '+f.Question+'\\nA: '+f.Answer).join('\\n\\n');
  contextData = 'Studio: '+STUDIO+'. Location: '+LOC+'. Hours: '+HOURS+'.\\n\\nFAQs:\\n'+faqText;

} else if (stage === 'cta' || stage === 'lead') {
  contextData = 'Studio: '+STUDIO+'. WhatsApp: '+WA+'. Location: '+LOC;
  quickReplies = ['✅ Yes, book me in!','📞 Call me back','❓ I have more questions'];
}

// ── Tone by gender ───────────────────────────────────────────
const tone = gender === 'female'
  ? 'Warm, friendly, sister-like tone. Use "aap" respectfully.'
  : gender === 'male'
  ? 'Respectful professional tone. If bridal/makeup, assume asking FOR the bride.'
  : 'Neutral professional tone.';

// ── Recent chat for context ───────────────────────────────────
const recentChat = chatHistory.slice(-4).map(m => m.role+': '+m.text).join('\\n');

// ── System prompt ────────────────────────────────────────────
const systemPrompt = [
  'You are a smart, warm assistant for '+STUDIO+' — Lahars premier bridal makeup studio.',
  hoursNote ? '\\n'+hoursNote : '',
  '\\nCURRENT STAGE: '+stage,
  'OCCASION KNOWN: '+(occasion||'none'),
  'SERVICE KNOWN: '+(svcType||'none'),
  'GENDER: '+gender+' | TONE: '+tone,
  '\\nCONTEXT:\\n'+contextData,
  recentChat ? '\\nRECENT CHAT:\\n'+recentChat : '',
  '\\nRULES:',
  '1. Reply in SAME language as customer — Hindi or English only. Never mix.',
  '2. Ask ONLY ONE question per reply.',
  '3. NEVER list all packages or all prices. Reveal price ONLY when exact need is confirmed.',
  '4. Keep reply to 2–3 sentences max.',
  '5. '+tone,
  '6. End with ONE soft CTA or question.',
  '7. For unlisted/unknown prices → say: "Please WhatsApp us at '+WA+' for pricing details."',
  '8. If customer says talk to human/manager/owner/aadmi/insaan → set intent to human_handoff.',
  '9. If customer seems frustrated (repeated questions, angry tone) → set sentiment to frustrated.',
  quickReplies.length ? '\\nSUGGESTED QUICK REPLIES FOR THIS STEP: '+JSON.stringify(quickReplies) : '',
  '\\nRespond ONLY with valid JSON, no markdown, no backticks:',
  '{"intent":"bridal|party|engagement|reception|hair|skin|nails|faq|appointment_booking|lead|human_handoff|general_chat",',
  '"next_stage":"greeting|qualify_bridal|qualify_engagement|qualify_party|qualify_other|present|faq|cta|lead",',
  '"occasion":"","service_type":"","gender":"female|male|unknown","language":"hindi|english",',
  '"lead_name":null,"lead_service":null,"lead_datetime":null,"lead_score":0,',
  '"reply":"","quick_replies":[],"sentiment":"positive|neutral|frustrated"}'
].join('\\n');

const geminiBody = JSON.stringify({
  system_instruction: { parts: [{ text: systemPrompt }] },
  contents: [{ role: 'user', parts: [{ text: msg.message_text }] }],
  generationConfig: { temperature: 0.4, maxOutputTokens: 250 }
});

return [{ json: {
  sender_id:          msg.sender_id,
  message_text:       msg.message_text,
  message_id:         msg.message_id,
  stage,
  conv_sender_exists: !!existing,
  gemini_request_body: geminiBody,
  quick_replies_hint:  quickReplies
}}];`.trim();

// ── PARSE GEMINI RESPONSE ────────────────────────────────────
const parseCode = `
const raw = $input.item.json.candidates?.[0]?.content?.parts?.[0]?.text || '';
const cleaned = raw.replace(/\`\`\`json/g,'').replace(/\`\`\`/g,'').trim();
let parsed;
try { parsed = JSON.parse(cleaned); }
catch(e) {
  parsed = {
    intent:'general_chat', next_stage:'greeting',
    reply:'Thank you for messaging Ankit Sahni Makeover! For quick help, WhatsApp us at +91 90988 88134. 😊',
    quick_replies:[], lead_name:null, lead_service:null, lead_datetime:null,
    lead_score:0, gender:'unknown', language:'english', sentiment:'neutral',
    occasion:'', service_type:''
  };
}
const bd = $('Build Prompt').first().json;
// Append current exchange to chat history
let history = [];
try { history = JSON.parse($('Load Conv State').all().find(r=>r.json.sender_id===bd.sender_id)?.json?.chat_history || '[]'); } catch(e){}
history.push({ role:'user', text: bd.message_text });
history.push({ role:'bot',  text: parsed.reply });
if (history.length > 8) history = history.slice(-8);
return { json: {
  ...parsed,
  sender_id:    bd.sender_id,
  message_text: bd.message_text,
  message_id:   bd.message_id,
  chat_history: JSON.stringify(history)
}};`.trim();

// ── NOTIFY OWNER (WhatsApp) ──────────────────────────────────
const ownerNotifyBody = `={{ JSON.stringify({
  messaging_product: 'whatsapp',
  to: $env.OWNER_WHATSAPP_NUMBER,
  type: 'text',
  text: { body:
    '🔥 New Instagram Lead!\\n' +
    'Name: ' + ($json.lead_name || 'Not given') + '\\n' +
    'Service: ' + ($json.lead_service || $json.service_type || 'Not given') + '\\n' +
    'Date: ' + ($json.lead_datetime || 'Not given') + '\\n' +
    'Score: ' + ($json.lead_score || 0) + '/5 ⭐\\n' +
    'Message: ' + $json.message_text + '\\n' +
    'Intent: ' + $json.intent
  }
}) }}`;

// ── SEND REPLY (with optional quick replies) ─────────────────
const sendReplyBody = `={{ (() => {
  const qr = $json.quick_replies || [];
  if (qr.length > 0) {
    return JSON.stringify({
      recipient: { id: $json.sender_id },
      message: {
        text: $json.reply,
        quick_replies: qr.slice(0,13).map(t => ({
          content_type: 'text',
          title: t.slice(0,20),
          payload: t.toUpperCase().replace(/[^A-Z0-9]/g,'_')
        }))
      }
    });
  }
  return JSON.stringify({
    recipient: { id: $json.sender_id },
    message: { text: $json.reply }
  });
})() }}`;

// ── ASSEMBLE WORKFLOW ────────────────────────────────────────
const workflow = {
  name: "Ankit Sahni Makeover — Instagram Chatbot v2",
  nodes: [
    // ── GET verification ─────────────────────────────────────
    {
      id: "wh-get-ig", name: "Instagram Verification (GET)",
      type: "n8n-nodes-base.webhook", typeVersion: 1, position: [240, 80],
      parameters: { httpMethod: "GET", path: "instagram-chatbot", responseMode: "responseNode", options: {} }
    },
    {
      id: "respond-verify-ig", name: "Return Challenge",
      type: "n8n-nodes-base.respondToWebhook", typeVersion: 1, position: [480, 80],
      parameters: {
        respondWith: "text",
        responseBody: "={{ $json.query ? $json.query['hub.challenge'] : $json['hub.challenge'] }}",
        options: { responseCode: 200 }
      }
    },

    // ── POST main flow ───────────────────────────────────────
    {
      id: "wh-post-ig", name: "Instagram Webhook (POST)",
      type: "n8n-nodes-base.webhook", typeVersion: 1, position: [240, 340],
      parameters: { httpMethod: "POST", path: "instagram-chatbot", responseMode: "onReceived", options: { responseCode: 200 } }
    },
    {
      id: "extract-msg-ig", name: "Extract Message",
      type: "n8n-nodes-base.code", typeVersion: 2, position: [480, 340],
      parameters: { mode: "runOnceForEachItem", jsCode: extractCode }
    },
    // Mark Seen immediately
    httpNode("mark-seen-ig", "Mark Seen", [720, 340],
      `={{ JSON.stringify({ recipient: { id: $json.sender_id }, sender_action: 'mark_seen' }) }}`),
    // React with heart
    httpNode("react-heart-ig", "React Heart", [960, 340],
      `={{ JSON.stringify({ recipient: { id: $json.sender_id }, sender_action: 'react', payload: { emoji: '❤️', message_id: $json.message_id } }) }}`),

    // Load conversation state
    sheetsNode("load-conv-ig", "Load Conv State", "GOOGLE_SHEET_CONVOS", "Conversations", [1200, 340]),

    // Read all data sheets
    sheetsNode("read-packages-ig", "Read Packages",  "GOOGLE_SHEET_PACKAGES",  "Sheet1", [1440, 340]),
    sheetsNode("read-price-ig",    "Read Price List", "GOOGLE_SHEET_PRICELIST", "Sheet1", [1680, 340]),
    sheetsNode("read-faqs-ig",     "Read FAQs",       "GOOGLE_SHEET_FAQS",      "Sheet1", [1920, 340]),
    sheetsNode("read-about-ig",    "Read About",      "GOOGLE_SHEET_ABOUT",     "Sheet1", [2160, 340]),

    // Build prompt
    {
      id: "build-prompt-ig", name: "Build Prompt",
      type: "n8n-nodes-base.code", typeVersion: 2, position: [2400, 340],
      parameters: { mode: "runOnceForAllItems", jsCode: buildPromptCode }
    },

    // Typing indicator ON (before Gemini call)
    httpNode("typing-on-ig", "Typing On", [2640, 340],
      `={{ JSON.stringify({ recipient: { id: $json.sender_id }, sender_action: 'typing_on' }) }}`),

    // Call Gemini 2.0 Flash
    {
      id: "call-gemini-ig", name: "Call Gemini",
      type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [2880, 340],
      parameters: {
        method: "POST",
        url: "=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={{ $env.GEMINI_API_KEY }}",
        sendBody: true, contentType: "raw", rawContentType: "application/json",
        body: "={{ $json.gemini_request_body }}", options: {}
      }
    },

    // Parse response
    {
      id: "parse-gemini-ig", name: "Parse Gemini Response",
      type: "n8n-nodes-base.code", typeVersion: 2, position: [3120, 340],
      parameters: { mode: "runOnceForEachItem", jsCode: parseCode }
    },

    // Typing indicator OFF
    httpNode("typing-off-ig", "Typing Off", [3360, 340],
      `={{ JSON.stringify({ recipient: { id: $json.sender_id }, sender_action: 'typing_off' }) }}`),

    // Update conversation state (upsert by sender_id)
    {
      id: "update-conv-ig", name: "Update Conv State",
      type: "n8n-nodes-base.googleSheets", typeVersion: 4.4, position: [3600, 340],
      parameters: {
        operation: "appendOrUpdate",
        documentId: { __rl: true, value: "={{ $env.GOOGLE_SHEET_CONVOS }}", mode: "id" },
        sheetName: { __rl: true, value: "Conversations", mode: "name" },
        columns: {
          mappingMode: "defineBelow",
          value: {
            sender_id:    "={{ $json.sender_id }}",
            stage:        "={{ $json.next_stage || 'greeting' }}",
            occasion:     "={{ $json.occasion || '' }}",
            service_type: "={{ $json.service_type || '' }}",
            gender:       "={{ $json.gender || 'unknown' }}",
            language:     "={{ $json.language || 'auto' }}",
            lead_name:    "={{ $json.lead_name || '' }}",
            lead_date:    "={{ $json.lead_datetime || '' }}",
            last_updated: "={{ new Date().toISOString() }}",
            chat_history: "={{ $json.chat_history || '[]' }}"
          },
          matchingColumns: ["sender_id"]
        },
        options: {}
      },
      credentials: { googleSheetsOAuth2Api: SHEETS_CRED }
    },

    // Branch: is lead/booking/human_handoff?
    {
      id: "is-lead-ig", name: "Is Lead or Booking?",
      type: "n8n-nodes-base.if", typeVersion: 2.1, position: [3840, 340],
      parameters: {
        conditions: {
          options: { caseSensitive: false, leftValue: "", typeValidation: "loose" },
          conditions: [
            { id: "cond-booking", leftValue: "={{ $json.intent }}", rightValue: "appointment_booking",
              operator: { type: "string", operation: "equals" } },
            { id: "cond-lead", leftValue: "={{ $json.intent }}", rightValue: "lead",
              operator: { type: "string", operation: "equals" } },
            { id: "cond-handoff", leftValue: "={{ $json.intent }}", rightValue: "human_handoff",
              operator: { type: "string", operation: "equals" } }
          ],
          combinator: "or"
        }
      }
    },

    // Save lead to sheet
    {
      id: "save-lead-ig", name: "Save Lead",
      type: "n8n-nodes-base.googleSheets", typeVersion: 4.4, position: [4080, 200],
      parameters: {
        operation: "append",
        documentId: { __rl: true, value: "={{ $env.GOOGLE_SHEET_LEADS }}", mode: "id" },
        sheetName: { __rl: true, value: "Sheet1", mode: "name" },
        columns: {
          mappingMode: "defineBelow",
          value: {
            Timestamp:           "={{ new Date().toISOString() }}",
            Platform:            "Instagram",
            "Sender ID":         "={{ $json.sender_id }}",
            Intent:              "={{ $json.intent }}",
            Name:                "={{ $json.lead_name || '' }}",
            Service:             "={{ $json.lead_service || $json.service_type || '' }}",
            "Preferred Date":    "={{ $json.lead_datetime || '' }}",
            Gender:              "={{ $json.gender || '' }}",
            "Lead Score":        "={{ $json.lead_score || 0 }}",
            Sentiment:           "={{ $json.sentiment || '' }}",
            "Customer Message":  "={{ $json.message_text }}"
          }
        },
        options: {}
      },
      credentials: { googleSheetsOAuth2Api: SHEETS_CRED }
    },

    // Notify owner via WhatsApp
    {
      id: "notify-owner-ig", name: "Notify Owner",
      type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [4320, 200],
      parameters: {
        method: "POST",
        url: "=https://graph.facebook.com/v21.0/{{ $env.WHATSAPP_PHONE_NUMBER_ID }}/messages",
        sendHeaders: true,
        headerParameters: { parameters: [
          { name: "Authorization", value: "=Bearer {{ $env.WHATSAPP_ACCESS_TOKEN }}" },
          { name: "Content-Type", value: "application/json" }
        ]},
        sendBody: true, contentType: "raw", rawContentType: "application/json",
        body: ownerNotifyBody, options: {}
      }
    },

    // Merge both paths before sending reply
    {
      id: "merge-ig", name: "Merge Before Reply",
      type: "n8n-nodes-base.merge", typeVersion: 3, position: [4560, 340],
      parameters: { mode: "passThrough", output: "input1" }
    },

    // Send final reply (with optional quick replies)
    httpNode("send-reply-ig", "Send Instagram Reply", [4800, 340], sendReplyBody)
  ],

  connections: {
    "Instagram Verification (GET)": { main: [[{ node: "Return Challenge", type: "main", index: 0 }]] },
    "Instagram Webhook (POST)":     { main: [[{ node: "Extract Message",   type: "main", index: 0 }]] },
    "Extract Message":              { main: [[{ node: "Mark Seen",          type: "main", index: 0 }]] },
    "Mark Seen":                    { main: [[{ node: "React Heart",        type: "main", index: 0 }]] },
    "React Heart":                  { main: [[{ node: "Load Conv State",    type: "main", index: 0 }]] },
    "Load Conv State":              { main: [[{ node: "Read Packages",      type: "main", index: 0 }]] },
    "Read Packages":                { main: [[{ node: "Read Price List",    type: "main", index: 0 }]] },
    "Read Price List":              { main: [[{ node: "Read FAQs",          type: "main", index: 0 }]] },
    "Read FAQs":                    { main: [[{ node: "Read About",         type: "main", index: 0 }]] },
    "Read About":                   { main: [[{ node: "Build Prompt",       type: "main", index: 0 }]] },
    "Build Prompt":                 { main: [[{ node: "Typing On",          type: "main", index: 0 }]] },
    "Typing On":                    { main: [[{ node: "Call Gemini",        type: "main", index: 0 }]] },
    "Call Gemini":                  { main: [[{ node: "Parse Gemini Response", type: "main", index: 0 }]] },
    "Parse Gemini Response":        { main: [[{ node: "Typing Off",         type: "main", index: 0 }]] },
    "Typing Off":                   { main: [[{ node: "Update Conv State",  type: "main", index: 0 }]] },
    "Update Conv State":            { main: [[{ node: "Is Lead or Booking?", type: "main", index: 0 }]] },
    "Is Lead or Booking?": {
      main: [
        [{ node: "Save Lead",           type: "main", index: 0 }],
        [{ node: "Merge Before Reply",  type: "main", index: 1 }]
      ]
    },
    "Save Lead":        { main: [[{ node: "Notify Owner",       type: "main", index: 0 }]] },
    "Notify Owner":     { main: [[{ node: "Merge Before Reply", type: "main", index: 0 }]] },
    "Merge Before Reply": { main: [[{ node: "Send Instagram Reply", type: "main", index: 0 }]] }
  },

  settings: { executionOrder: "v1" },
  staticData: null,
  tags: ["chatbot", "instagram", "ankit-sahni-makeover", "v2"],
  triggerCount: 0,
  updatedAt: new Date().toISOString(),
  id: "ankit-sahni-instagram-chatbot-v2"
};

fs.writeFileSync('instagram-chatbot.json', JSON.stringify(workflow, null, 2), 'utf8');
console.log('✅ instagram-chatbot.json written successfully');
console.log('   Nodes:', workflow.nodes.length);
console.log('   Connections:', Object.keys(workflow.connections).length);
