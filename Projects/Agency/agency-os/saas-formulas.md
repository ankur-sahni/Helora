# SaaS Subscription Formulas — Extracted from Successful Businesses
*Research by COO Agent | No copyright infringement — patterns only, not copied content*

---

## Pricing Formula (Best for Indian SMBs)

```
HYBRID: Flat base fee + usage-based overage

Free:     ₹0      → 1 automation, 100 messages/month, branded
Pro:      ₹1,999  → 10 automations, 2,000 messages, unbranded
Business: ₹4,999  → Unlimited automations, multi-location, priority support

Overage: ₹X per additional message/booking beyond plan limit
```

**Why this works:** Indian SMBs want predictable monthly bills. Overage captures value from growing businesses without scaring off new signups.

**AiSensy proven range:** ₹999-5,000/month for Indian SMBs — stay inside this.

---

## The 3-Tier Formula

| Tier | Name | What's Inside | Conversion Role |
|------|------|---------------|-----------------|
| Free | Starter | 1 automation, 100 messages, branded, community support | Hook — let them feel the magic |
| ₹1,999/mo | Professional | 10 automations, 2K messages, unbranded, analytics, email support | Main revenue — 60-70% of paying customers land here |
| ₹4,999/mo | Business | Unlimited, multi-location, API, WhatsApp support group | High-value — multi-branch salons, clinic chains |

**Annual discount:** 10 months price for 12 months paid = 17% off. Reduces churn dramatically.

---

## Onboarding Formula (Days 1-7)

```
Day 0: Signup → 2-3 questions (business type, pain point, volume) → auto-select template
Day 1: Connect WhatsApp → Test message on their own phone → AHA MOMENT
Day 2: WhatsApp message: "Your bot handled 12 messages yesterday. Here's what people asked."
Day 3: Suggest one more automation: "Want booking confirmations too? 2 minutes."
Day 5: Mini case study: "Salon in Indore got 23 bookings through their bot this week"
Day 6: 80% limit hit (engineer this) → upgrade prompt via WhatsApp
Day 7: Loss-framed CTA: "Don't lose customers who are already talking to you."
```

**Time to First Value (TTFV) target:** Under 10 minutes to first automated response.

**Critical:** The owner must see it work on their OWN phone. That is the belief moment.

---

## Retention Formula

```
Retention = (Switching Cost + Perceived Value) / Price

Build switching cost:
- Customer contact list lives in your system
- Conversation history in your system
- Each added automation makes the whole system more valuable

Build perceived value:
- Weekly WhatsApp: "34 conversations handled, 8 bookings, ~4.5 hours saved"
- Monthly: "You saved approximately ₹12,000 in staff time this month"
- Translate everything to TIME SAVED or MONEY SAVED — Indian SMBs think in these

Build operational dependency:
- Month 1: Auto-replies
- Month 2: Booking management
- Month 3: Follow-up sequences
- Month 4: Review collection
- Month 5: They can't run without it
```

**Community play:** WhatsApp group of users in same industry (salon owners, clinic owners). They share results. Social proof reinforces value. Cost: zero.

---

## Upsell Trigger Formula

```
Upsell = Right Trigger + Loss-Framed Message + One-Click Action

NEVER: "Buy our premium plan!"
ALWAYS: "You're about to lose [specific thing]. Fix it in one tap."
```

| Trigger | When | Message |
|---------|------|---------|
| 80% usage limit | Auto-detected | "50 messages left this month. Your customers are talking — don't go silent." |
| Feature gate | User clicks locked feature | Show blurred preview → "Unlock with Pro" |
| Business growth | Contact list grows 40% | "You're outgrowing your plan. Here's what Pro gives you." |
| Day 30/60/90 | Lifecycle milestone | Value recap + next-level pitch |
| Seasonal | Oct (wedding season), Diwali, Navratri | "Wedding season in 3 weeks. Pro plan salons handled 3x more bookings last year." |

---

## Documentation Formula

```
Every doc page:
1. What this does (1 sentence)
2. Who needs this (business type + situation)
3. Prerequisites
4. Steps (numbered + screenshots)
5. Expected outcome
6. Common issues (FAQ)
7. "Still stuck? Message us on WhatsApp" ← always end with human fallback
```

**Structure:**
```
/docs/getting-started/     → Day 1 (quickstart by industry)
/docs/use-cases/salon/     → Week 1-4 (specific automations)
/docs/use-cases/clinic/    → Week 1-4
/docs/reference/           → Power users only
```

**Key insight:** Templates ARE documentation. Users learn by cloning + modifying. Build 10 great templates per industry — that's your docs.

**India-specific:** Videos in Hinglish (Hindi-English mix). Non-negotiable for Tier 2/3 cities. WhatsApp-shareable links, not YouTube embeds.

---

## Unit Economics Target

| Metric | Target |
|--------|--------|
| CAC | < ₹2,000 (organic WhatsApp outreach) |
| ARPU | ₹1,999/month |
| Gross Margin | > 90% (self-hosted infra, free AI APIs) |
| Monthly Churn | < 5% |
| LTV (20 months) | ₹39,980 |
| LTV:CAC Ratio | ~20:1 |

---

## Month-by-Month Revenue Path

| Period | Action | Revenue |
|--------|--------|---------|
| Month 1-2 | Build + 3 free beta users (Bhopal salons) | ₹0 |
| Month 3 | Convert to paid @ ₹999 intro + 2 more | ₹5,000 |
| Month 4-6 | 10-15 paying customers | ₹15K-30K/mo |
| Month 7-12 | 30-50 customers | ₹60K-100K/mo |
| Month 12+ | Expand cities, raise prices for new signups | ₹1L+/mo |

---

## Risks to Watch

- **WhatsApp API cost:** Meta charges ~₹0.50-1.00 per business-initiated conversation — factor into pricing
- **Supabase free tier:** 500MB, 50K rows — fine for first 50 customers, plan migration
- **Gemini free tier:** 15 RPM, 1M tokens/day — use Ollama as fallback for scale
- **UPI autopay friction:** Offer quarterly payment with discount to reduce collection overhead
- **Single-person dependency:** Every automation must require near-zero manual intervention from you
