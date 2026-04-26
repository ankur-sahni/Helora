# Sahni Bridal Studio — Phase 1 Timeline (7 Weeks)

> Working days: Mon-Sat. Sunday is buffer. All dates relative to Week 1 Monday kickoff.

---

## Week 1 — Foundations + Inputs

**Goal:** Unblock every downstream decision. Secure domain. Kick off brand + SEO research in parallel.

| Day | Owner | Task |
|-----|-------|------|
| Mon | Ankur | Purchase `sahnibridal.in` (G2) — do NOT wait until Week 6 |
| Mon | Ankur | Provide 3-5 design references (G1) |
| Mon | Ankit | Start Google Business Profile postcard verification (G6) — 10-14 day lead time |
| Mon | `coo` | Kick off pipeline, route briefs to agents |
| Mon-Wed | `designer` | Brand identity kit draft (unblocked by G1) |
| Mon-Wed | `researcher` | SEO keyword map + IA + Praval teardown + AI discoverability plan |
| Thu | Ankur | Brand review (color + typography sign-off) |
| Thu-Fri | `planner` | Scaffold implementation plan |
| Fri | `dependency-analyst` | Package audit on plan |
| Fri | Ankur | Scaffold plan sign-off |

**Blocks on user:** G1 (Mon), G2 (Mon), brand review (Thu), plan sign-off (Fri)

---

## Week 2 — Scaffold

**Goal:** Running Next.js + Sanity skeleton with dummy content, deployable to Vercel preview.

| Day | Owner | Task |
|-----|-------|------|
| Mon | `implementer` | Steps 1-4: Next app, Tailwind brand tokens, Sanity init |
| Tue | `implementer` | Steps 5-6: Sanity schemas, client, queries |
| Wed | `implementer` | Steps 7-8: Layout + page stubs (all 7 routes) |
| Thu | `implementer` | Steps 9-11: Metadata, sitemap, robots, GA4 scaffold |
| Thu | `implementer` | Step 12: CI (lint, typecheck, Lighthouse) |
| Fri | `reviewer` | Code review on scaffold |
| Fri | `security` | Form handling + env review |
| Fri | `devops` | First Vercel preview deploy |
| Sat | Ankur | Log into Sanity Studio, confirm access |

**Blocks on user:** Sanity Studio access confirmation (Sat)

---

## Week 3 — Content Wave 1 (Home, Services, Contact)

**Goal:** First 3 pages content-complete in Sanity. Pricing locked.

| Day | Owner | Task |
|-----|-------|------|
| Mon | Ankur | Final pricing delivered (G4) |
| Mon | `content` | Home draft |
| Tue | Ankur | Home approval → Sanity |
| Tue | `content` | Services + Pricing draft (needs G4) |
| Wed | Ankur | Services approval → Sanity |
| Wed | `content` | Contact draft |
| Thu | Ankur | Contact approval → Sanity |
| Thu-Fri | `implementer` | Component polish on published pages |
| Fri | `tester` | Interim mobile check on 3 published pages |
| Sat | Ankur | Review live preview, raise concerns |

**Blocks on user:** G4 (Mon), 3x content approvals (Tue/Wed/Thu)

**Risk:** If G4 slips, Services page slips. Home and Contact still ship.

---

## Week 4 — Content Wave 2 (Bridal, About, Reviews) + Photo Delivery

**Goal:** Highest-value page (Bridal) live. Photos integrated.

| Day | Owner | Task |
|-----|-------|------|
| Mon | Ankit/Ankur | 40+ real photos delivered (G3) |
| Mon | `designer` | Curate + caption-ready photo set |
| Mon-Tue | `content` | Bridal draft (most important page) |
| Wed | Ankur | Bridal approval → Sanity |
| Wed | `content` | About draft (legacy story) |
| Thu | Ankur | About approval → Sanity |
| Thu | `content` | Reviews page intro + framework |
| Fri | Ankur | Reviews approval → Sanity |
| Fri | `implementer` | Wire gallery pipeline, Sanity image URLs |
| Sat | `tester` | Mobile gallery check |

**Blocks on user:** G3 (Mon), 3x approvals

**Risk:** If G3 incomplete, Bridal + Gallery ship with hidden sections and TODO in Sanity.

---

## Week 5 — Content Wave 3 (Gallery) + SEO Implementation

**Goal:** Gallery complete. Full site SEO-implemented.

| Day | Owner | Task |
|-----|-------|------|
| Mon | `content` | Gallery categories + captions |
| Mon | Ankur | Gallery approval |
| Tue-Wed | `implementer` | SEO pass 1: metadata fns, structured data, canonicals |
| Wed | `implementer` | SEO pass 2: sitemap, robots.txt, OG images, llms.txt |
| Thu | `implementer` | SEO pass 3: image opt, internal linking, analytics wiring |
| Fri | `researcher` | Validate schema + keyword placement on every page |
| Sat | `reviewer` | SEO code review |

**Blocks on user:** Gallery approval (Mon)

---

## Week 6 — Audit + Fix Loop + DNS Prep

**Goal:** All P0 defects clear. Domain ready.

| Day | Owner | Task |
|-----|-------|------|
| Mon | `tester` | Full audit: Lighthouse, a11y, Rich Results, mobile viewports, forms |
| Tue | `tester` | Defect list published |
| Tue-Thu | `implementer` | P0 fix loop |
| Thu | `tester` | Re-audit |
| Fri | `security` | Final security pass (form, env, headers) |
| Fri | `devops` | DNS prep (confirm domain records, plan cutover) |
| Sat | `reviewer` | Final code review |

---

## Week 7 — Launch

**Goal:** Live on `https://sahnibridal.in`.

| Day | Owner | Task |
|-----|-------|------|
| Mon | Ankit | WhatsApp Business number confirmed live (G7) |
| Mon | Ankit | GBP claim complete (G6) |
| Mon | `devops` | Production deploy + domain cutover + SSL verify |
| Tue | `devops` | GSC + Bing submission, GA4 live event check, runbook committed |
| Tue | `tester` | Post-launch smoke test on 3 networks + 3 devices |
| Wed | `content` | Launch Instagram story + WhatsApp broadcast to existing customers |
| Wed | Ankur | Link GBP to site, update all directory listings |
| Thu | `docs-writer` | Case study v1 draft (screenshots, metrics baseline) |
| Fri | `coo` | Phase 1 retrospective, Phase 2 kickoff brief |

**Blocks on user:** G6 + G7 (Monday last-chance check)

---

## Critical path + blocked weeks

**Critical path:** Week 1 G1 → Brand → Week 2 scaffold → Week 3 G4 + content → Week 4 G3 + Bridal → Week 5 SEO → Week 6 audit → Week 7 deploy

**User-blocked weeks:** Week 1 (G1, G2) · Week 3 (G4) · Week 4 (G3) · Week 7 (G6, G7)

**Approval SLA:** Same-day on drafts < 500 words. Next-day on longer. If Ankur misses SLA, the corresponding week slips 1:1.

---

## Phase 1 launch definition
- [ ] `https://sahnibridal.in` live, SSL A+
- [ ] All 7 pages publish from Sanity
- [ ] Lighthouse mobile: Perf ≥ 90, A11y ≥ 95, SEO = 100
- [ ] Schema validates on all pages
- [ ] GA4 + GSC + Bing live
- [ ] GBP linked to site
- [ ] Ankit completes one WhatsApp inquiry from the live site
- [ ] Case study v1 drafted
