# Ankit Sahni Makeover — Chatbot v2 Documentation

This document provides a comprehensive overview of the requirements, technical design, and setup instructions for the upgraded Instagram/WhatsApp chatbot.

---

## 🎯 Project Goals
The v2 chatbot is designed to move away from being a "static brochure" and toward being a **Personal Styling Consultant**. It prioritizes high-quality customer experience, lead conversion, and cost efficiency.

### 1. Human-Like Messaging (Instagram Only)
To make the bot feel real, we implemented **Sender Actions**:
- **Mark Seen:** Instantly shows the user their message was read.
- **Heart Reaction:** Automatically ❤️ reacts to the message within 1 second.
- **Typing Indicator:** Shows the "three dots" for 3-5 seconds while the AI "thinks," making the reply feel typed, not generated.

### 2. Conversational Funnel (Needs Discovery)
The bot follows a 3-step qualifying process:
1.  **Stage 1: Greeting & Occasion** - Identifies if the user wants Bridal, Party, Engagement, etc.
2.  **Stage 2: Qualification** - Asks clarifying questions (e.g., "Wedding day or pre-wedding shoot?").
3.  **Stage 3: Present Match** - Reveals **only** the specific package/service and price that matches their need. 
*Rule: Never dump all prices at once.*

### 3. Smart Persona & Tone
- **Gender Detection:** Detects if the user is male or female based on name and context.
- **Tone Adaptation:** Uses a warm, "sisterly" tone for brides/females and a respectful, professional tone for males (assuming they are inquiring for someone in the family).
- **Bilingual:** Detects Hindi/English and replies in the same language automatically.

---

## 🛠️ Technical Setup

### 1. The "Brain" (Gemini 2.0 Flash)
We upgraded to **Gemini 2.0 Flash** for faster response times and lower costs. 
- **Temperature (0.4):** Set low to ensure the AI follows JSON rules strictly and doesn't hallucinate.
- **Stage-Aware Injection:** We only send the relevant sheet data (e.g., only Bridal packages) to the AI based on the current stage, reducing token usage by ~70%.

### 2. Google Sheets Structure
The bot uses your existing sheets as a live database. **Client can edit these anytime.**

| Sheet / Tab | Purpose |
| :--- | :--- |
| **Packages** | Premium bridal packages (Silver, Gold, Deluxe). |
| **Price List** | Comprehensive list of all salon services (Hair, Nails, Wax, etc.). |
| **FAQs** | Studio policies, timings, and location. |
| **About Us** | General studio info and contact details. |
| **Leads & Bookings** | Bot appends new leads here with a "Lead Score" (1-5 stars). |
| **Conversations** | **(NEW)** Stores the current stage and history for every user. |

#### 🆕 New: Conversations Tab Requirement
Create a new tab named `Conversations` with these headers:
`sender_id | stage | occasion | service_type | gender | lead_name | lead_date | language | last_updated | chat_history`

---

## ⚙️ Environment Variables (n8n)
To make the workflow function, the following variables must be set in n8n Settings:

| Variable | Value |
| :--- | :--- |
| `GOOGLE_SHEET_CONVOS` | The Sheet ID for the new Conversations tab. |
| `GOOGLE_SHEET_LEADS` | The Sheet ID where leads are collected. |
| `GOOGLE_SHEET_PACKAGES` | ID of the Packages sheet. |
| `GOOGLE_SHEET_PRICELIST` | ID of the Price List sheet. |
| `GOOGLE_SHEET_FAQS` | ID of the FAQs sheet. |
| `GOOGLE_SHEET_ABOUT` | ID of the About Us sheet. |
| `GEMINI_API_KEY` | Your Google AI Studio API Key. |
| `INSTAGRAM_ACCESS_TOKEN` | Meta Developer Token for Instagram. |
| `OWNER_WHATSAPP_NUMBER` | WhatsApp number (with country code) for lead alerts. |

---

## 🛡️ Critical Logic & Safety
- **Echo Guard:** Prevents the bot from replying to its own messages (infinite loops).
- **Non-Text Guard:** Detects stickers, voice notes, and images. It sends a friendly redirect to WhatsApp instead of crashing.
- **Duplicate Lead Prevention:** Updates existing leads rather than creating new rows for the same user.
- **Owner Alerts:** Hot leads are sent directly to the owner's WhatsApp so they can close the deal manually.

---

## 🚀 Roadmap for Improvements
- **Quick Reply Buttons:** Add tappable buttons (Bridal, Party, etc.) to replace typing.
- **Human Handoff:** Alert the owner if a user asks to "speak to a real person."
- **Sentiment Analysis:** Detect if a customer is frustrated and prioritize their message.
- **Follow-ups:** Automatically follow up with users who saw a price but didn't book within 24 hours.

---
**Documentation Version:** 2.0
**Created For:** Ankit Sahni Makeover
