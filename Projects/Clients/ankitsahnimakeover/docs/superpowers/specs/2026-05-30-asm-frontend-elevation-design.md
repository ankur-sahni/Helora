# ASM Front-End Elevation — Design Spec

**Date:** 2026-05-30
**Owner:** Ankur (client/decision-maker) · **Technical lead:** Claude (CTO)
**Project:** Ankit Sahni Makeover (ASM) — dark-luxury bridal salon site, Lahar MP
**Repo:** `Projects/Clients/ankitsahnimakeover/ankitsahnimakeover-nextjs`

---

## 1. Why we're doing this

The live site *looks* broken to a human even though every HTTP request returns 200: blank
image placeholders, large black voids, sections too tall to read at a glance, and a contact
form that silently fails. Bounce rate is reported >71%. The goal is to turn this into a
**world-class portfolio-grade site** that ranks highest in local + AI search, without ever
dropping below the known-good baseline commit `2ef08df` and without breaking the established
dark-luxury design system or SEO signals.

## 2. Root causes (confirmed via live DOM + git diff)

| # | Symptom | Confirmed cause | Class |
|---|---------|-----------------|-------|
| A | 17 of 33 images blank (`src=""`) | Sanity migration `dbeba68` rewired tiles to `urlFor()`, but no photos uploaded → empty src. Baseline used working local images. | Content gap |
| B | 31 elements stuck `opacity:0` (black voids) | Scroll-reveal `IntersectionObserver` scan window closes before async Sanity content paints → `.in` class never added. Latent, exposed by migration. | Animation timing bug |
| C | Shapes too big, can't fit viewport | Type clamp ceilings (H1 168px, H2 104px) + section padding max 140px. Not required by design system. | Proportion |
| D | Contact form fakes success | No `<form>`, zero network requests (QA report critical). | Revenue-critical |
| E | Incomplete SEO head | OG/Twitter/canonical/JSON-LD reportedly absent | SEO/AEO/GEO |

The "page renders twice" appearance was a full-page screenshot artifact, **not** a real bug.

## 3. Goals & non-goals

**Goals**
- Look wonderful (faithful to the dark-luxury system, polished proportions).
- Rank highest: complete SEO + AEO + GEO weight, validated.
- Great UX on a mid-range Android over 4G; WCAG AA.
- Perfect Sanity integration: real content flows, graceful fallback when assets missing.
- Clean engineering rituals: branch → test → review → merge, per change.
- Truth maintained across sessions (state + handover + memory).

**Non-goals**
- No aggressive redesign / new section concepts that risk SEO equity or the design system.
- No fake/placeholder data. No fluff features that don't serve ranking, UX, or portfolio.
- No backend/DB/payments — WhatsApp remains the entire funnel.

## 4. Guardrails (every phase, non-negotiable)

- Never below baseline `2ef08df`.
- Never break: per-page metadata, canonical, JSON-LD (LocalBusiness/FAQPage/Service/…),
  FAQ + Fast-Facts DOM, `llms.txt`, bot allowlist, sitemap.
- Stay inside the design system: gold/near-black tokens, 4-font scale, only oval/arch/rect
  shapes, `refine.css` authority, ≤4 inline styles, 16px form inputs.
- WhatsApp CTA (`wa.me/919098888134`) always works.
- No fake data — missing assets ship hidden with a Sanity TODO, never lorem/stock.

## 5. Phases

### Phase 1 — Stabilize (floor + revenue + SEO)

| Task | What | Acceptance criteria |
|------|------|--------------------|
| 1.1 | Per-item local image fallback | When a Sanity tile has no asset, render the local `/images/*.webp` baseline image (not empty src). 0 blank images on live. Sanity photos override when uploaded. |
| 1.2 | Reveal-animation resilience | CSS defaults `.reveal*` to visible (opacity:1) as fallback; re-scan after Sanity hydration. 0 elements stuck at opacity:0. `prefers-reduced-motion` → static. |
| 1.3 | Real WhatsApp contact form | Submit builds `wa.me/919098888134?text=…` with name/service/date prefilled, opens WhatsApp. Real `<form>`, keyboard-submittable. |
| 1.4 | Complete SEO + AEO head | `generateMetadata` per page, canonical, OG image route, Twitter card, JSON-LD (LocalBusiness, FAQPage, Service, BreadcrumbList, Organization), robots bot allowlist. Passes Rich Results Test. **AEO content structure** (see §11): standalone answers near top, entity intro, FAQ direct-answers 40–80 words. `llms.txt` kept but treated as optional infra, NOT a ranking lever (§11). |
| 1.5 | Footer links + data truth | No `href="#"`; phone + review-count single source of truth (see Open Decisions). |

**Phase 1 done = the site matches or beats `2ef08df` quality, with the fake form and SEO gaps fixed.**

### Phase 2 — Elevate to world-class

| Task | What | Acceptance criteria |
|------|------|--------------------|
| 2.1 | Competitive benchmark | Quick scan of `pravalmakeover.in` + 2–3 best-in-class salon sites → shortlist of patterns worth adopting. Informs 2.x and Phase 3. |
| 2.2 | Proportion / scale fix | Lower H1/H2 clamp ceilings + section padding; snap spacing to 4px tokens. Key sections legible within one viewport on desktop + mobile. Page height materially reduced. |
| 2.3 | Responsive perfection | Audited + fixed at 360 / 390 / 768 / 1024 / 1440. No overflow, no broken grids, 44px touch targets ≤768. |
| 2.4 | Motion polish | Tasteful reveals/micro-interactions; `prefers-reduced-motion` fully honored. |
| 2.5 | Accessibility (WCAG AA) | axe-core 0 criticals, keyboard nav complete, gold-on-black contrast verified, aria on FAQ/SVGs. |
| 2.6 | Performance on 4G | Sanity-CDN images correctly sized, LCP < 2.5s / CLS < 0.1 on throttled mobile; Lighthouse ≥ 90 perf/SEO/best-practices. |
| 2.7 | AEO/GEO depth | FAQ 7→15+ (each answer 40–80 words, directly quotable), Fast-Facts block, named-entity intro (owners, Lahar MP, 1994, signature service in first 120 words). Bullet/Q&A formatting that AI engines lift verbatim. |
| 2.8 | Conversion / trust signals | Star rating + real testimonials + client photos (with permission) surfaced near CTAs; WhatsApp CTA prominent and never hidden (weak/hidden CTA = #1 lost-conversion cause). |
| 2.9 | INP / responsiveness | Minimize main-thread JS (reveal observer, hydration); INP < 200ms — the most-failed CWV in 2026 (43% of sites fail). |

### Phase 3 — Selective new features (portfolio glam, SEO-safe)

Each candidate is gated on: *serves ranking/UX/portfolio AND breaks nothing.* Owner approves
each before build. Initial candidates (to be confirmed against benchmark + reference design):

- Interactive Before/After slider refinement (already in design system).
- Gallery filtering polish (already specced).
- "Signature Looks" featured-transformations showcase (portfolio centerpiece).
- Sticky WhatsApp FAB with subtle entrance.
- Richer testimonial cards (real quotes only).

## 6. Engineering rituals (per task)

`feature/<slug>` branch → implement (subagents) → `npm run preflight` (env+tsc+build) →
`npm run smoke` → **third-party code review** (reviewer plugin) → PR → merge. Never to `main`
directly. Never `--no-verify`.

## 7. Session-truth continuity

Every session ends with: overwrite `ankit_sahni_state.md`, append `handover.md`, flag durable
learnings to canonical memory. claude-mem auto-captures decisions. Next session resumes with
zero drift.

## 8. Success metrics

- 0 blank images, 0 stuck-invisible sections on live.
- Lighthouse ≥ 90 (Perf / SEO / Best Practices / A11y) on mobile.
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms (throttled 4G).
- Rich Results Test: all structured-data types valid.
- axe-core: 0 critical violations.
- Page height materially reduced; key sections legible within one viewport.
- WhatsApp funnel works end-to-end from every CTA + the contact form.
- AI-citation baseline established + tracked monthly across 10–20 target queries (ChatGPT / Perplexity / Google AI Mode).

## 9. Open decisions (need Ankur)

- **Phone number:** docs say `919098888134`; one stale file says `9098909088`. Confirm canonical.
- **Review figure:** `4.8/163` vs `4.6/116`. Confirm the true number (no-fake-data rule).
- Phase 3 feature selection (after benchmark).

## 10. Risks & mitigations

- *Sanity CDN unreachable in Claude sandbox* → builds run on Ankur's machine (pre-push hook).
- *Breaking SEO during polish* → SEO-sensitive files flagged; validate JSON-LD after each change.
- *Scope creep* → Phase 3 features gated individually; no build without owner approval.

---

## 11. 2026 Research Addendum (live web intelligence)

Researched 2026-05-30 to ensure the plan reflects current best practice, not stale assumptions.

### 11.1 AI search is now the primary "rank highest" lever
AI Overviews appear in ~68% of local-business queries (Whitespark). Being **citeable by AI
answer engines** (ChatGPT, Perplexity, Google AI Overviews, Claude) is the new front line.
What actually earns citations:
- **Standalone answers near the top** — if the answer only makes sense after 3 paragraphs of
  build-up, the page can't be quoted. Answer plainly first, deepen below.
- **Bullet/FAQ formatting** — ChatGPT often lifts these verbatim; Google AI Overviews favor
  FAQ/HowTo schema + short definitions.
- **Entity optimization** — make the brand machine-readable: who (Ankit + Kusum Sahni), what
  (bridal makeover studio), where (Lahar, Bhind dist., MP), since (1994), signature service.
- **E-E-A-T + real reviews** — authority and genuine social proof.
- **Measurement:** track citation frequency monthly across 10–20 target queries on ChatGPT /
  Perplexity / Google AI Mode (new success metric).

### 11.2 Honest truth: the site is necessary but not sufficient for local rank
2026 local-pack weighting (Whitespark): **Proximity ~55%** of decisions (uncontrollable),
**GBP signals 32%** (largest controllable — primary category is #1 individual factor),
**Reviews 16–20% and rising** (velocity + 80%+ response rate = measurable boost), **On-page
~15%**, behavioral 9%, links 8%. **GBP + review velocity are off-site, owner-driven, and
out-weigh the website.** "Dynamic" GBPs sending fresh signals now beat static ones. → Parallel
track for Ankur: claim/optimize GBP, drive consistent reviews, respond to 80%+. The site owns
the ~15% on-page + AI-citability.

### 11.3 `llms.txt` — keep, but don't oversell
SE Ranking: ~10% adoption after 18 months. Of 500M+ AI-bot visits over 90 days, only **408**
fetched `llms.txt`; Google (Illyes) confirmed it won't support it, likening it to the dead
keywords meta tag. **It does not measurably lift ChatGPT/Perplexity citations.** Value is for
coding agents / the agentic web. Ship it (cheap), don't count it as SEO.

### 11.4 Core Web Vitals 2026 (confirmed thresholds, 75th percentile of real users)
LCP **< 2.5s**, INP **< 200ms**, CLS **< 0.1**. **INP is the most-failed (43% of sites)** —
responsiveness is the priority; minimize main-thread JS (the reveal observer + hydration are
prime suspects). Next.js 16 specifics: `priority` is now `preload`; always set `sizes` (single
highest-impact image optimization); explicit width/height (or `fill`) to kill CLS; Sharp →
WebP/AVIF cuts payload 60–80%.

### 11.5 Conversion (to beat the 71% bounce)
Beauty/personal-care has among the highest conversion rates, but mobile converts lower than
desktop and most brides land on a phone — so **mobile-first, load < 3s**. The biggest 2026 CRO
trend is **trust signals on the page** (testimonials, client photos with permission, star
ratings). The **CTA is the most important element** — a weak/hidden CTA is the #1 cause of lost
conversions, so the WhatsApp CTA must be prominent, repeated, and always working.

### 11.6 Sources
- AEO/GEO 2026: [ALM Corp](https://almcorp.com/blog/answer-engine-optimization-2026/) · [Frase](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai)
- Local pack 2026: [Whitespark via Emulent](https://emulent.com/resources/google-updates/local-seo-ranking-factors/) · [Search Engine Journal — dynamic GBP](https://www.searchenginejournal.com/why-dynamic-profiles-are-the-new-local-ranking-factor/568200/)
- Core Web Vitals 2026: [DigitalApplied](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide) · [web.dev thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds) · [Next.js Image docs](https://nextjs.org/docs/app/api-reference/components/image)
- llms.txt reality: [aeoengine — zero usage](https://aeoengine.ai/blog/llms-txt-zero-usage-ai-bots-ignore) · [Presenc — state of llms.txt 2026](https://presenc.ai/research/state-of-llms-txt-2026)
- Conversion/CRO 2026: [WebFX CRO trends](https://www.webfx.com/blog/conversion-rate-optimization/cro-trends/) · [OptiMonk benchmarks](https://www.optimonk.com/industry-conversion-rate-benchmarks/)
