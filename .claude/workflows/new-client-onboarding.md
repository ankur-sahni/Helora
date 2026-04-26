# Workflow: New Client Onboarding

**Purpose:** Take a signed client from "yes" to "system live and delivering" in 7 days, with no step skipped and nothing bespoke.

**Trigger:** Client has paid the ₹10,000 setup fee via UPI/Razorpay AND signed the 1-page agreement.

**Owner:** Ankur (founder). Will delegate to VA from Month 7.

---

## Steps

1. **Kick-off call (45 min, Day 1)** — Zoom or WhatsApp video.
   - Tool: Cal.com booking link.
   - Collect: service list, current prices, Instagram login, WhatsApp number, Google Business profile, UPI ID, 5 existing customer testimonials, 20 raw salon photos.
   - Output: `Projects/Clients/[client-slug]/intake.md` filled.
   - Verify: intake.md has zero `[MISSING]` placeholders.

2. **Set up client folder (Day 1, 30 min)**
   - Copy template from `Projects/Clients/_template/` → `Projects/Clients/[client-slug]/`.
   - Create Supabase entries: `clients`, `services`, `whatsapp_templates`, `content_calendar`.
   - Verify: client appears in `Projects/Clients/index.md`.

3. **WhatsApp Business API connection (Day 2, 2 hours)**
   - Tool: Meta WhatsApp Business Platform.
   - Register client number, verify business.
   - Submit 6 proactive templates for approval (reminder 24h, reminder 2h, review ask, season broadcast, referral, re-engagement).
   - Verify: receptionist n8n workflow receives test inbound message and responds correctly.

4. **Load templates (Day 2–3, 3 hours)**
   - Take templates from `Projects/Clients/ankitsahnimakeover/whatsapp-templates.md` as base.
   - Swap `[PRICE]`, business name, salon-specific services.
   - Verify: 10 templates render correctly with 3 test customers.

5. **Instagram content calendar — Month 1 (Day 3–4, 4 hours)**
   - Use `content-production.md` workflow.
   - 16 posts, scheduled across 4 weeks.
   - Mix: 4 service showcase, 4 before/after, 4 reels, 2 owner story, 2 testimonial.
   - Verify: calendar approved by client on WhatsApp with thumbs-up on all 16.

6. **Google Review flow test (Day 5, 1 hour)**
   - Get short Google review link from client's Google Business profile.
   - Run end-to-end test with 3 friendly customers (family or staff).
   - Verify: 3 reviews land on the Google profile.

7. **Soft launch (Day 6–7)**
   - Turn on WhatsApp receptionist (receives live customer messages).
   - Publish first Instagram post.
   - Send first batch of review requests to last week's customers.
   - Verify: at least 5 real customer conversations handled by AI, 0 escalations to owner beyond normal.

8. **Week-1 report + Week-2 plan (Day 7, 1 hour)**
   - Generate weekly report (see `weekly-client-report.md`).
   - Send on WhatsApp to owner.
   - Schedule Day 14 check-in call.

---

## Output Artifacts

- `Projects/Clients/[client-slug]/intake.md`
- `Projects/Clients/[client-slug]/whatsapp-templates.md`
- `Projects/Clients/[client-slug]/content-calendar-m1.md`
- `Projects/Clients/[client-slug]/progress.md`
- First weekly report (WhatsApp message + PDF copy)
- Live n8n receptionist workflow with client-specific config

---

## Done Criteria

- [ ] WhatsApp receptionist handled 20+ real customer messages with <1 escalation.
- [ ] 4 Instagram posts published on schedule.
- [ ] 5+ Google reviews added.
- [ ] Client confirmed on WhatsApp: "Sab theek chal raha hai."
- [ ] `progress.md` updated with Week 1 actuals.
- [ ] Month 1 retainer invoice sent (due Day 30).

---

## Escalation

- If Day 2 WhatsApp API approval fails: trigger researcher agent, do NOT promise a new timeline until root cause is known.
- If client misses the Day 1 intake call: one reschedule allowed. Second no-show = refund setup fee, walk away.
- If Day 5 Google review test fails: pause launch, fix before live.
