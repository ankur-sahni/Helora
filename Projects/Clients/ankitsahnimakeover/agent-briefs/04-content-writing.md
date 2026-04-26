# Agent Brief — Page Content Writing (7 pages)

**Target agent:** `content` (uses `salon-content` skill)
**Inputs required:** Brand identity approved, pricing from G4, SEO keyword map from brief 02
**Expected duration:** 1 page per day → 7 working days
**Deliverable location:** Drafts in `Projects/Clients/sahni-bridal-studio/content-drafts/`; final in Sanity

---

## Prompt (copy into content agent run)

You are the `content` agent. Write publish-ready copy for all 7 Phase 1 pages of sahnibridal.in. Use the `salon-content` skill — read it before starting.

**Inputs you must read first:**
- `brand/identity-brief.md` — voice adjectives
- `seo/keyword-map.md` — target keywords per page
- `seo/site-architecture.md` — H1, secondary keywords
- `research/website-strategy.md` — positioning

**Pages (in order of priority):**
1. Home → `content-drafts/01-home.md`
2. Bridal (most important commercial page) → `content-drafts/02-bridal.md`
3. Services + Pricing (needs G4 final pricing) → `content-drafts/03-services.md`
4. Gallery (captions + category intros) → `content-drafts/04-gallery.md`
5. Reviews (intro + review presentation framework) → `content-drafts/05-reviews.md`
6. Contact / WhatsApp (short, action-focused) → `content-drafts/06-contact.md`
7. About (legacy story — 1994 → today) → `content-drafts/07-about.md`

**For each page file, include:**
- Page title tag (50-60 chars) — follow `seo-page` skill formula
- Meta description (140-155 chars)
- H1
- All H2/H3 with section copy
- CTA microcopy
- Form field labels (where applicable)
- Image alt text for every planned image slot
- FAQ block (3-5 Qs per page where relevant)
- Bilingual phrases flagged — use `salon-content` skill rules
- Internal linking suggestions (which phrases link to which page)

**Voice rules (from `salon-content` skill):**
- Warm, premium, trustworthy. Never salesy.
- Address the bride, not "clients"
- "We" not "Sahni Bridal Studio" after first mention
- Prices always in ₹ with no USD conversion
- "Since 1994" used deliberately, not on every page

**Done when:**
- All 7 drafts exist
- Ankur approves each before it ships to Sanity
- Every draft has keyword density verified (target keyword in title, H1, first 100 words, at least one H2, meta description)
- No placeholders, no "[insert X]" left in final draft

**Escalate to Ankur if:**
- Pricing is still missing for a service at time of writing
- The bridal package naming feels off (he owns brand voice)
- You need to make a claim that cannot be verified (e.g. "award-winning" — only if documented)
