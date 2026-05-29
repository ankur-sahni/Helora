# Google Sheet Setup — Ankit Sahni Makeover Chatbot

Create one Google Sheet with exactly these 4 tab names (spelling matters):

---

## Tab 1: Packages

| Package Name | Price | GST Note | Inclusions (semicolon-separated) | Badge |
|---|---|---|---|---|
| Silver - The Essentials | ₹15,000 | GST extra | HD bridal makeup — day of; Signature hair styling; Draping assistance; Pre-bridal consultation; Touch-up kit for 4 hours | Most Affordable |
| Gold - Most Sought After | ₹32,000 | GST extra | HDLV airbrush bridal look; Hair up-do + textured braid; Pre-bridal 15-day glow protocol; Bridal trial session; Full-day touch-ups on site; Drape + dupatta pinning; Sangeet look — add-on pricing | Most Popular |
| Deluxe - The Editorial | ₹58,000 | GST extra | Everything in Gold; 3-event styling (sangeet · haldi · reception); 30-day bridal skin ritual; Lehenga rental — 1 piece included; Dedicated on-site artist + assistant; Pre-shoot editorial session; Family makeup — 2 members | Couture |

**To add a new package:** add a row. To change price: edit the Price cell. The chatbot picks it up on the next message automatically.

---

## Tab 2: FAQs

| Question | Answer |
|---|---|
| What services do you offer? | Bridal Makeup, Hair Artistry, Skin & Glow, Nail Couture, Engagement & Party Makeup, Lehenga Rental, Pre-Bridal Skin Rituals. |
| What are your timings? | We are open Monday to Sunday, 9 AM to 9 PM IST. Walk-ins welcome. |
| Where are you located? | Main Bazaar Road, Lahar, Dist. Bhind, Madhya Pradesh 477445. |
| Do you offer home visits? | Please contact us on WhatsApp at +91 90988 88134 for home visit availability and pricing. |
| How do I book an appointment? | Send us a message with your name, service, and preferred date/time — we will confirm shortly. |
| What is included in the bridal packages? | We have three packages — Silver (₹15,000), Gold (₹32,000), and Deluxe (₹58,000). Ask us about any specific one for full details. |
| Do you offer lehenga rental? | Yes! We have 40+ designer pieces in sizes 6–18. Fittings, alterations, and steam-pressing are all included. |
| What is the price for engagement or party makeup? | Pricing is shared on consultation. Message us and we will send you details right away. |

**To add a FAQ:** add a row with Question and Answer. To remove one: delete the row.

---

## Tab 3: About

| Key | Value |
|---|---|
| Business Name | Ankit Sahni Makeover |
| Tagline | Lahar's premier bridal makeup and styling studio |
| Location | Main Bazaar Road, Lahar, Dist. Bhind, Madhya Pradesh 477445 |
| Hours | Monday–Sunday, 9 AM – 9 PM IST |
| WhatsApp | +91 90988 88134 |
| Instagram | @ankitsahnimakeover |
| Established | 1994 (30+ years of excellence) |
| Rating | 4.8/5 stars (169 Google reviews) |
| Specialty | Bridal makeup, lehenga rental, pre-bridal skin rituals |

**To update hours or contact:** edit the Value cell next to the relevant Key. Do not change the Key column.

---

## Tab 4: Leads & Bookings

Create this tab with these column headers in row 1 (the chatbot fills rows automatically):

| Timestamp | Platform | Sender ID | Intent | Name | Service | Preferred Date-Time | Customer Message |
|---|---|---|---|---|---|---|---|

Do not delete or rename columns. You can add filter/sort as needed — the chatbot always appends to the next empty row.

---

## After creating the sheet

1. Copy the Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SHEET_ID/edit`
2. In n8n → Settings → Environment Variables, set:
   `GOOGLE_SHEET_ID = paste your Sheet ID here`
3. In n8n, update the Google Sheets credential (any Sheets node → Credentials → connect your Google account)
