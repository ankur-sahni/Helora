# Sahni Bridal Studio — Master Build Pipeline

> **Owner:** Helora Agency (Ankur Sahni, CTO) · **Client:** Sahni Bridal Studio, Lahar MP
> **Status doc:** `progress.md` · **Context:** `CLAUDE.md` · **Strategy:** `research/website-strategy.md`
> **This is the single source of truth for how the website gets built. Every agent reads this before acting.**

---

## 1. Project Overview

Sahni Bridal Studio is a 30-year-old salon in Lahar (MP) with zero digital presence, strong offline trust (4.6 stars, 116 reviews, 25K Instagram), and one unique competitive moat: on-site lehenga + jewelry rental. The website is Helora's first flagship case study. Primary job: convert bridal search intent into WhatsApp conversations and booked consultations. Primary competitor: Praval Makeover (pravalmakeover.in). Primary discovery surfaces: Google local search, Google Maps, and AI search (Perplexity, ChatGPT, Gemini). Stack is frozen — Next.js + Tailwind + Sanity CMS + Vercel, with Supabase added only in Phase 3 for bookings. Ankur manages content; the owners never touch code. The site must feel premium-Indian-bridal (warm luxury, gold/rose/cream, Sabyasachi-meets-local-warmth) while running on free tier infra until the first invoice.

---

## 2. Phase Breakdown

### Phase 1 — Launch (Weeks 1-7)

**Goal:** Publish a 7-page production site on `sahnibridal.in` that ranks for local bridal intent and drives WhatsApp leads. This is the case study deliverable.

**Agents assigned:**
| Task | Lead agent | Supporting |
|------|-----------|-----------|
| Brand identity | `designer` | `content` (tagline), Ankur (approval) |
| SEO keyword + IA research | `researcher` | — |
| Project scaffold plan | `planner` | `dependency-analyst` |
| Scaffold build (Next.js + Sanity) | `implementer` | `reviewer`, `security` |
| Page content (7 pages) | `content` | Ankur (approval per page) |
| SEO implementation | `implementer` (uses `seo-page` skill) | `researcher` for keyword validation |
| Gallery + image pipeline | `implementer` | `designer` (curation) |
| Performance + mobile audit | `tester` | `implementer` (fixes) |
| Vercel + domain + analytics | `devops` | `security` |
| Launch checklist + case study prep | `docs-writer` | `coo` (sign-off) |

**User input gates (Ankur must deliver before phase can proceed):**
| Gate | Required before | Who provides |
|------|-----------------|--------------|
| G1 — Design references (3-5 sites) | Brand identity starts | Ankur |
| G2 — Domain confirmed: `ankitsahnimakeover.com` (already registered) | DNS work begins (Week 6) | Ankit |
| G3 — Real photos: bridal portfolio, salon interior, team, awards (min 40 usable) | Gallery page build (Week 4) | Ankit via Ankur |
| G4 — Final pricing for all services + packages | Services + Pricing page build (Week 3) | Ankit via Ankur |
| G5 — Copy approval per page (7 sign-offs) | Page ships to staging | Ankur |
| G6 — Google Business Profile claimed | Launch week (Week 7) | Ankit (postcard) |
| G7 — WhatsApp Business number active | Launch week (Week 7) | Ankit |

**Deliverables:**
- Brand identity kit (logo wordmark, color tokens, type scale, spacing, iconography) in `brand/`
- Next.js 14+ app with Tailwind + Sanity Studio embedded at `/studio`
- 7 pages live: Home, Bridal, Services + Pricing, Gallery, Reviews, Contact, About
- Full structured data (LocalBusiness, Service, BreadcrumbList, FAQPage, ImageObject)
- `sitemap.xml`, `robots.txt`, OpenGraph + Twitter card assets
- GA4 + Search Console + Bing Webmaster verified
- Lighthouse mobile scores: Performance ≥ 90, Accessibility ≥ 95, SEO = 100
- Sticky WhatsApp + call buttons, bridal inquiry form (email + WhatsApp delivery)
- Deployed on Vercel at `https://sahnibridal.in` with SSL
- Case study blurb + 6 screenshots in `case-study/`

**Done criteria:**
- [ ] All 7 pages publish from Sanity with zero hardcoded content
- [ ] Lighthouse mobile scores hit targets on 3 real devices
- [ ] `site:sahnibridal.in` indexed in Google within 72h of launch
- [ ] LocalBusiness schema validates in Google Rich Results Test
- [ ] Ankit can complete one WhatsApp inquiry from the live site on his own phone
- [ ] Ankur can edit a gallery item in Sanity and see it live within 60s
- [ ] `reviewer` signs off on code, `security` signs off on form handling, `devops` signs off on deploy

---

### Phase 2 — Authority + Local Reach (Weeks 8-13, Month 2)

**Goal:** Turn the site into a local SEO engine by adding depth — blog, FAQ, team, and 5 town landing pages.

**Agents assigned:**
| Task | Lead agent | Supporting |
|------|-----------|-----------|
| Blog architecture + 4 launch posts | `content` (uses `salon-content` skill) | `researcher` (keyword map) |
| Blog tech (Sanity schema, RSS, category pages) | `implementer` | — |
| FAQ page (20+ bridal + general Qs) | `content` | `researcher` (People Also Ask mining) |
| Team bios page | `content` | Ankit (photos + credentials) |
| Town landing pages: Bhind, Mihona, Daboh, Gormi, Datia | `content` (uses `town-landing-page` skill) | `implementer` (dynamic route) |
| Internal linking audit | `researcher` | `implementer` |
| Schema upgrade: Article, Person, FAQPage per page | `implementer` (uses `seo-page` skill) | — |
| Offers / seasonal campaign page | `content` + `implementer` | — |
| Monthly KPI report template | `docs-writer` | `observability` |

**User input gates:**
| Gate | Required before | Who provides |
|------|-----------------|--------------|
| G8 — Team photos + names + specialties | Team page | Ankit |
| G9 — 3 town visits for real local signals | Town pages ship | Ankur |
| G10 — Blog topic approval | Each blog post starts | Ankur |

**Done criteria:**
- [ ] Site ranks in top 10 for at least 3 primary keywords
- [ ] Perplexity/ChatGPT returns Sahni as a named result for "best bridal salon in Lahar"
- [ ] Zero duplicate content flags in Search Console
- [ ] At least 50 indexed pages
- [ ] Ankur can publish a new blog post from Sanity without developer help

---

### Phase 3 — Booking + Automation (Month 4+)

**Goal:** Convert traffic into tracked, managed bookings. Connect to n8n automation backbone.

**Agents assigned:**
| Task | Lead agent | Supporting |
|------|-----------|-----------|
| Supabase schema (bookings, customers, services) | `planner` + `implementer` | `security`, `dependency-analyst` |
| Booking UI | `implementer` | `designer` (flow), `tester` |
| Admin dashboard | `implementer` | `reviewer` |
| WhatsApp confirmation + reminder flows | n8n — `dispatcher` | `implementer` |
| Review collection flow | n8n | — |
| Google Calendar sync | `implementer` | — |
| Security review | `security` | — |

**User input gates:**
| Gate | Required before | Who provides |
|------|-----------------|--------------|
| G11 — Service-to-duration mapping | Slot logic | Ankit |
| G12 — Deposit policy decision | Payment integration | Ankur (escalate) |
| G13 — Meta/WABA approval | WhatsApp automation live | Ankit |

---

## 3. Dependency Map

```
G1 Design refs ─────► designer ──► brand identity ──► implementer (scaffold)
                                          │
                                          └► content (tone matches brand)

researcher (SEO + IA) ──► planner (scaffold plan) ──► implementer (scaffold)
                                    │
                                    └► implementer (SEO impl uses IA)

G4 Pricing ──► content (Services+Pricing page) ──► Ankur approval (G5) ──► implementer (publish)
G3 Photos ──► designer (curation) ──► implementer (Gallery page) ──► tester (image perf)

implementer (all pages done) ──► tester (audit) ──► devops (deploy)
                                                       │
                                                       └─ G2 Domain ┘
devops (deploy) ──► G6 GBP + G7 WhatsApp ──► LAUNCH

Phase 2 blocks on Phase 1 launch. Phase 3 blocks on Phase 2 authority + G13 WABA.
```

**Critical path:** Design refs → brand → scaffold → content → SEO → audit → deploy.

---

## 4. Risk Flags

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R1 | Photos from Ankit delayed | High | Blocks Gallery + Home hero | Pre-book shoot Week 3; use @ankur_sahni archive as bridge; stock NOT allowed |
| R2 | Pricing never finalized | High | Blocks Services page | Escalate weekly; fallback: publish "from ₹X" ranges with owner sign-off |
| R3 | Domain not purchased | Medium | Blocks DNS + launch | Order `sahnibridal.in` in Week 1, not Week 6 |
| R4 | GBP verification postcard delayed | Medium | Weakens local ranking | Start claim in Week 1 (10-14 day lead time) |
| R5 | Sanity free tier limits | Low | Blocks team access | Acceptable Phase 1-2; reassess Month 4 |
| R6 | Vercel free tier bandwidth | Low | Outage if viral | Monitor via `observability`; aggressive image caching |
| R7 | Praval launches better content | Low | Competitive pressure | Monthly competitor scan by `researcher` |
| R8 | Core Web Vitals regression | Medium | SEO penalty | `tester` runs Lighthouse in CI on every PR |
| R9 | Ankur approval bottleneck | High | Content sign-off delay | Batch approvals — 3 pages at a time, not one-by-one |
| R10 | Hardcoded copy in page files | Medium | Non-technical owners can't edit | `reviewer` blocks any PR with non-CMS text in page files |

---

## 5. Working Agreements

- **No fake data.** Placeholders, lorem ipsum, stock photos, and fake reviews are rejected in review. Missing assets ship hidden with a TODO in Sanity.
- **CMS-first.** If a non-technical owner would ever want to change it, it lives in Sanity. No exceptions.
- **Mobile-first everything.** Build on 375px, expand up. Every PR screenshot must be mobile.
- **Free tier only.** Sanity free, Vercel free, no paid plugins. If a feature requires paid, escalate to Ankur.
- **English default, Hindi phrases allowed.** Use `salon-content` skill rules for when Hindi is appropriate.
- **One source of truth for status.** `progress.md` is updated weekly by whoever completes a milestone.
