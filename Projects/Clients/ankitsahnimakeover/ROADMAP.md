# ASM ROADMAP — working plan

> What we're building and in what order. Facts live in CLIENT_FACTS.md (read that first).
> Status: PLANNED, not started — awaiting Ankur's green light for Day 1. Updated 2026-05-30.

## Thesis (LOCKED)
Make Ankit Sahni Makeover (Ankur's brother's salon) **#1 in its region**. ASM is the PROOF / case study.
We do **NOT** take other salon clients (would arm the brother's competitors). Helora sells the **METHOD**
(premium web + local SEO/AEO/GEO + AI automation) to **NON-salon** businesses. ASM's Phase 3 modules
become the resold product — redeployed by config, not rebuilt.

## Phase 2 — 10-day web sprint (demo-ready + dominate local search)
One shippable deliverable per day: branch -> verify -> merge. Cleanup/handover/sync ride along (no extra days).

| Day | Deliverable | Ankur input |
|-----|-------------|-------------|
| 1 | Perf + tech-SEO quick wins: remove `images.unoptimized` (AVIF/WebP/srcset), compress OG, dynamic `sitemap.ts`, WhatsApp-click GA events | - |
| 2 | Elevation I: Playwright audit @360/768/1024/1440; fix homepage proportion/spacing/rhythm | approve look |
| 3 | Elevation II: responsive 360->1440 fluid fixes + WCAG AA (contrast/focus/labels), axe-clean | - |
| 4 | Multi-page foundation: pathname-aware Nav, `lib/seo.ts` (metadata+JSON-LD+breadcrumb), Org/Service/Breadcrumb schema | - |
| 5 | Lehenga-rental page `/lehenga-rental`: Sanity-backed, Product/Offer+FAQ schema (zero-comp keyword) | rental details/pricing |
| 6 | FAQ 7->20+ categorized + on-page Fast-Facts + FAQPage schema (AEO) | confirm real answers |
| 7 | Town pages I: `townPage` schema (uniqueness-enforced) + `/locations/[town]` + Bhind, Gwalior, Datia | bride-origin per town |
| 8 | Town pages II: remaining Tier-1 towns + global `areaServed` + internal links + "Areas We Serve" | - |
| 9 | Team bios `/team` (Person schema) + Trust signals (Review schema, real reviews) + NAP sweep | team bios, pick reviews |
| 10 | Blog (`blogPost`+portable-text) `/blog` + 1-2 posts + final QA (Lighthouse/Rich-Results/axe/smoke) + sign-off | - |

Notes: Days 5-10 depend on Day 4 first. Real photos = Ankur uploads to Sanity in parallel (site runs on fallbacks until then).
Every new page is Sanity-backed; every town page carries unique local content (no thin doorway pages).

## Phase 3 — automation modules (AFTER Phase 2; built on ASM, then resold modular)
Order = lowest-friction / highest-value first:
1. Google review auto-collector — free (n8n + post-visit WhatsApp review link)
2. Lead capture + follow-up bot — free (web/IG/WA -> Supabase -> sequence)
3. Appointment booking bot — free (form -> Supabase -> calendar + WA confirm)
4. WhatsApp auto-reply bot — WABA, needs Meta business verification (lead-time)
5. Instagram DM auto-responder — needs Meta app review
6. Social content auto-publishing — Meta API + content pipeline
7. Invoice + payment — Razorpay (KYC + fees); last, salon is cash-based
Build each MODULAR (parameterized n8n flow + per-client config) so resale = config, not rebuild.

## Stage 2 (parallel priority) — kill cross-session inconsistency
SessionStart hook that force-loads CLIENT_FACTS.md + a pre-push/deploy gate hook + hard rules as hooks. Non-negotiable.

## Ankur's parallel actions (co-founder asks)
- Push + merge the 2 cleanup branches (gh/network is yours): `chore/asm-cleanup` (parent), `chore/asm-hygiene` (subrepo)
- Set Sanity `statInstagram` = 52K in Studio
- Upload real photos to Sanity (gallery/beforeAfter/lehenga are empty)
- Start now (free, lead-time): Meta business verification + Razorpay KYC
- Content sign-offs: FAQ answers, team bios, which reviews to feature, bride-origin per town

## Related
- [[CLIENT_FACTS.md]] — canonical facts (read first)
- [[CLAUDE.md]] — ASM project context
