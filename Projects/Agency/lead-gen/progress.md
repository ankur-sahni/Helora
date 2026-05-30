# Lead Gen — Progress Log

**Purpose:** Fill the Helora pipeline with qualified prospects. Currently pre-revenue — every week without pipeline activity pushes first-invoice date further right.
**Start date:** 2026-04-14
**Current phase:** ICP reset + first real outbound week.

---

## Current Status — 2026-04-18

Outbound has been misfiring. Outreach agent originally written for global B2B SaaS — wrong audience, wrong channel, zero traction. ICP is now being reset to Indian SMBs in Tier 2/3 MP–UP cities. No real leads sent yet under new ICP. WhatsApp Business number for outbound is not yet warmed.

---

## Done

- Original outreach agent (global B2B SaaS focus) documented and scheduled for rewrite.
- Proof-of-concept Google Maps scraper via n8n (pulled 200 Bhopal salons as test).
- Apollo.io free-tier account created (will not be primary — wrong fit for Indian SMB).
- LinkedIn account cleaned up, headline updated to "AI Automation for Indian SMBs".
- 30-day LinkedIn build-in-public calendar drafted (`Projects/Agency/linkedin/30-day-calendar.md`).
- Hunter.io free tier account created (will use sparingly — mostly irrelevant for WhatsApp-first outreach).
- Lead-outreach workflow drafted (`.claude/workflows/lead-outreach.md`).

---

## In Progress

- Rewriting `.claude/agents/outreach.md` for Indian SMB / WhatsApp-first ICP.
- Building ICP scoring spreadsheet (features: follower count, post freshness, review count, visual polish).
- Warming the Helora WhatsApp Business number (sending 5–10 low-risk messages/day to friendly contacts for 7 days before cold outreach begins).
- Drafting 3 Hinglish cold-open script variants: salon / clinic / coaching.

---

## Next

**This week (2026-04-19 to 2026-04-25):**
- Finish outreach agent rewrite.
- Generate first leads batch: 50 salons across Bhopal + Indore.
- Run ICP scoring, pick top 20.
- Send 20 WhatsApp cold DMs (manual, one by one, Mon–Fri 4 × 5/day).
- Post LinkedIn Day 1 "Starting from zero" post.

**Week 2 (2026-04-26 to 2026-05-02):**
- Target: 4% response rate → 1 qualified conversation minimum.
- Expand lead pool to Gwalior, Jabalpur.
- LinkedIn posts Day 5, 8, 11.
- First discovery call goal.

**Weeks 3–4 (2026-05-03 to 2026-05-17):**
- First paid client signed (assumed: referral from Sahni + 1 cold WhatsApp conversion).
- Scale cold WhatsApp to 20/day sustained.
- LinkedIn inbound first message expected around Day 20.

---

## Blockers

1. **WhatsApp cold outreach risk.** If the Helora business number gets reported as spam in the first 2 weeks, we lose it and have to warm a new one (another 7 days delay). Mitigation: manual send only, 30–90s spacing, personalised first line, no link in message #1.
2. **No case study yet.** Sahni case study isn't ready until end of M2. Until then, we're selling on "we built this for a 30-year-old salon in Lahar" with no hard numbers. Reality-check response rate should be lower until M3.
3. **LinkedIn cold start.** Zero followers, zero authority. Build-in-public is a 90-day game. Zero inbound expected until Day 30.
4. **No budget for Apollo paid / LinkedIn Sales Nav.** Free tier research only until first paying client.

---

## ICP (As of 2026-04-18)

**Tier 1 — highest fit:**
- Salons, spas, makeup studios in Bhopal, Indore, Gwalior, Jabalpur, Lahar, Bhind.
- 1,000–5,000 followers on Instagram, 5–20 reviews on Google.
- Owner answers WhatsApp personally (verify via Instagram bio).
- Posts last 14 days but clearly amateur-looking.

**Tier 2 — secondary:**
- Dental / dermatology / physiotherapy clinics in same cities.
- Coaching centers (academic, UPSC, SSC prep) in Bhopal + Indore.

**Tier 3 — opportunistic (LinkedIn only, not WhatsApp):**
- English-speaking salon chains in Delhi / Bangalore / Mumbai (global-feel clients willing to pay $350+/month).

---

## Metrics to Watch

- WhatsApp sends/week (target: 100+).
- Response rate (target: 4% M1, 6% M3, 8% M6).
- Qualified conversations/week (target: 2+).
- Booked discovery calls/week (target: 1+ by end of M2).
- Closed deals (target: 2 by end of M3).
- LinkedIn follower growth (target: 50/week by M2, 100/week by M4).

---

## Known Issues

- No CRM. Currently tracking in Supabase + a Google Sheet. Will stay this way until M6 — building a CRM pre-revenue is premature.
- No follow-up automation. Follow-ups are manually queued. Will stay manual until Helora number has 200+ sent with clean reputation.
- No A/B testing yet on script variants. Need 100+ sends per variant before stats mean anything.

## Related

- [[30-day-calendar.md]] — LinkedIn 30-Day Build-in-Public Calendar
