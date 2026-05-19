# Ankit Sahni Makeover — Master "Done" Checklist

> **Single source of truth** for finishing ASM as a world-class portfolio piece.
> Survives all future sessions. Every item below must close before handover.
>
> **Last updated:** 2026-05-19 · **Owner:** Ankur (CEO) + Claude (CTO)
> **Goal:** A salon owner in Bhopal opens ankitsahnimakeover.com on their phone, scrolls once, and DMs Ankur asking "kitna lagega meri salon ke liye?"

---

## Status Legend

- `[x]` — Done & verified
- `[ ]` — Open
- `[A]` — Audit-only first (find true state before estimating fix)
- `[B]` — Blocked on someone (Ankit / Ankur / external)
- `(Xh)` — Effort estimate in working hours
- `*us*` — we own · `*ankit*` — Ankit owns · `*ankur*` — Ankur owns

---

## Verification Criteria — "Done" in One Line

A prospect salon owner on a mid-range Android phone:
1. Lands on ankitsahnimakeover.com under 2.5 seconds on 4G
2. Sees premium aesthetic with real photos and clear pricing in the first scroll
3. Can tap WhatsApp / Call / Get Directions from any section
4. No console errors, no broken images, no Lighthouse red flags
5. Site appears in Google for "bridal makeup Lahar" within 30 days of GBP claim
6. ChatGPT/Perplexity cite ankitsahnimakeover.com when asked "best bridal salon in Lahar"

---

## A. Architecture & Code Quality

- [x] (—) **TypeScript strict mode** — `tsconfig.json` has `strict: true`
- [x] (—) **`tsc --noEmit` clean** — last verified 2026-05-17
- [x] (—) **`next build` passes** — last verified 2026-05-17
- [ ] (3h) **Split `app/page.tsx` (687 lines) into `components/sections/*.tsx`** — one section per file: Hero, Stats, Marquee, Craft, MakeupTypes, LehengaFeatured, Packages, About, Awards, Testimonials. *us*
- [ ] (1h) **Add `app/loading.tsx`** — branded loader skeleton (reuse loader styles). *us*
- [ ] (1h) **Add `app/error.tsx`** — branded error page with WhatsApp CTA. *us*
- [ ] (30m) **Add `app/not-found.tsx`** — branded 404 with WhatsApp CTA + return-home link. *us*
- [ ] (15m) **Move `export const revalidate = 60` to top** of `app/page.tsx` — currently sits between imports. *us*
- [ ] (15m) **Remove regression in `components/FaqSection.tsx:6`** — replace hardcoded `WA_NUMBER` with `settings` prop. *us*
- [ ] (15m) **Remove regression in `components/GallerySection.tsx:8`** — replace hardcoded `WA_NUMBER` with `settings` prop. *us*
- [ ] (10m) **Move GA ID to env var** — `app/layout.tsx:207` hardcodes `G-6X2DWJX8SW`. Use `process.env.NEXT_PUBLIC_GA_ID`. *us*
- [ ] (10m) **Move `<Analytics />` and `<GoogleAnalytics>` inside `<SiteOnly>`** — currently fires on `/studio` polluting analytics. `app/layout.tsx:206-207`. *us*
- [ ] (45m) **Rewrite `app/privacy/page.tsx` without inline `style` objects** — violates DESIGN_SYSTEM "zero inline style" rule. Convert to CSS classes in `globals.css`. *us*
- [ ] (30m) **Move `compare.mjs` to `scripts/` or delete** — dev artifact in root references localhost:8090 remix site. *us*
- [ ] (20m) **Add ESLint stricter ruleset** — currently Next defaults only. Add `@typescript-eslint/no-unused-vars`, `@typescript-eslint/no-explicit-any`, `react/jsx-key`. *us*
- [ ] (20m) **Add `.prettierrc`** — single quotes, no semis, trailing commas, 2-space indent. *us*
- [ ] (30m) **Add `.editorconfig`** — UTF-8, LF, 2-space indent. *us*
- [ ] (15m) **Add `.gitattributes`** — `* text=auto eol=lf` + binary patterns. Stops the LF/CRLF warnings every commit. *us*
- [ ] (15m) **Add `.env.example`** — list all required env keys with placeholder values (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_TOKEN`, `NEXT_PUBLIC_GA_ID`, `SANITY_REVALIDATE_SECRET`). *us*
- [ ] (15m) **Update `README.md`** — currently default Next.js README. Replace with setup + run + deploy + Studio access instructions. *us*

---

## B. Sanity CMS

- [x] (—) **All visible content editable** — Phases 1+2+2.5 shipped (`dbeba68`)
- [x] (—) **ISR `revalidate = 60`** on layout, page, privacy
- [x] (—) **Studio at `/studio`** with chrome-strip via `SiteOnly`
- [x] (—) **34 docs seeded** via `scripts/seed-sanity.mjs`
- [x] (—) **Sanity Vision plugin** installed
- [ ] (30m) **Add FAQ group to `pageCopy` schema** — eyebrow, heading1, heading2, intro. Wire to `FaqSection.tsx` (remove hardcoded copy). *us*
- [ ] (20m) **Fix `gallery` query** — currently `*[_type == "gallery"] | order(order asc)` ignores `featured`. Either filter (`&& featured == true`) or remove `featured` from schema. *us*
- [ ] (1h) **Wire `lehenga` schema** to a new "All Lehengas" section or remove from schemas if not used. Currently orphaned (queryable but unrendered). *us*
- [ ] (1h) **Wire `beforeAfter` schema** to a slider section or remove. Currently orphaned. Use one real before/after pair when Ankit provides photos. *us / ankit*
- [ ] (1h) **Add `socialProfiles` array** to `siteSettings` — { platform, url } pairs for Instagram, Facebook, Google Business Profile, JustDial, YouTube. Wire into JSON-LD `sameAs`. *us*
- [ ] (30m) **Add `googleSiteVerification` field** to `siteSettings` — for Search Console meta tag. *us*
- [ ] (30m) **Add `priceRange` field** to `siteSettings` — currently hardcoded "₹₹" in JSON-LD. Make editable. *us*
- [ ] (30m) **Add `serviceArea` field** to `siteSettings` — array of strings (Lahar, Bhind, Mihona, Daboh, Gormi, Datia). Wire into LocalBusiness JSON-LD `areaServed`. *us*
- [ ] (1h) **Parse `hours` field into structured `OpeningHoursSpecification`** — currently hardcoded 10:30–20:00 Mon–Sun in JSON-LD. Add `weekdayHours` + `sundayHours` + `closedDays` fields. *us*
- [ ] (1h) **Webhook revalidation (Phase 4)** — `app/api/revalidate/route.ts` with `SANITY_REVALIDATE_SECRET`. Configure Sanity webhook → Vercel. Removes 60s wait. *us*
- [ ] (1h) **Custom Studio structure** — group docs in left rail: Settings · Pages · Content (services, packages, etc) · Reviews · Media. `sanity.config.ts` `structureTool({ structure })`. *us*
- [ ] (30m) **Sanity SEO previews** — install `@sanity/seo` or write custom preview showing meta title/desc + Google search card in Studio. *us*
- [ ] (45m) **Expanded validation** — slug fields, max-lengths on titles (60 chars), description max 160 chars, URL format on socials. *us*
- [ ] (30m) **Set `useCdn: false`** on the server-side client when webhook revalidation is wired — eliminates the extra CDN cache layer. *us*
- [ ] (30m) **Studio document previews** — every doc shows thumbnail + title in list view. Most schemas already have `preview`; audit and fix any without. *us*

---

## C. SEO — Google (Technical + On-Page)

- [x] (—) **Dynamic `generateMetadata`** in `app/layout.tsx` — Sanity-driven
- [x] (—) **LocalBusiness JSON-LD** — `app/layout.tsx:111-153` with geo + aggregateRating
- [x] (—) **FAQPage JSON-LD** — wired from Sanity FAQs
- [x] (—) **Open Graph + Twitter cards**
- [x] (—) **`robots.txt`** allows `*` + sitemap link
- [x] (—) **`sitemap.xml`** generated post-build via `next-sitemap`
- [ ] (1h) **Add canonical URL per page** — `metadata.alternates.canonical` in `generateMetadata`. *us*
- [ ] (45m) **Expand `next-sitemap.config.js`** — add transform function to set per-route priority + changefreq. Add Studio exclusion explicitly. *us*
- [ ] (15m) **Verify domain in Google Search Console** — add HTML file in `public/` or DNS TXT record. *ankur*
- [ ] (15m) **Submit sitemap to GSC** — `https://ankitsahnimakeover.com/sitemap.xml`. *ankur*
- [ ] (15m) **Verify in Bing Webmaster Tools** — same setup pattern. *ankur*
- [ ] (1h) **Add BreadcrumbList JSON-LD** — even on single-page, anchor-based breadcrumbs help. Build helper in `components/seo/StructuredData.tsx`. *us*
- [ ] (2h) **Add Service JSON-LD per offering** — one `Service` schema per Sanity `service` doc, with `provider`, `areaServed`, `offers.priceRange`. *us*
- [ ] (1h) **Add Organization JSON-LD** — explicit (LocalBusiness inherits, but a top-level Organization is cleaner for entity graph). Include `founder`, `foundingDate`, `logo`. *us*
- [ ] (1h) **Add Person JSON-LD** per team member — `Person` schema with `jobTitle`, `worksFor`, `image`. *us*
- [ ] (1h) **Add Review JSON-LD** per testimonial — `Review` schema linked to the LocalBusiness. *us*
- [ ] (30m) **Add ImageObject schema** to gallery items. *us*
- [ ] (45m) **Audit + verify alt text on every `<Image>`** — current fallbacks exist but Sanity `alt` field is optional. Make alt required in schemas for hero/team/awards/gallery images. *us*
- [ ] (30m) **Add `<link rel="alternate" hreflang="en-IN">`** — locale-specific signal. *us*
- [ ] (30m) **Set `metadata.alternates.languages`** in `generateMetadata`. *us*
- [ ] (30m) **Configure 301 redirect: `www → apex` and `http → https`** — in `vercel.json` `redirects`. *us*
- [ ] (45m) **Add JSON-LD validation step to build** — script that fetches built HTML and runs Google Rich Results validator. Fail build on invalid schema. *us*
- [ ] (1h) **Internal anchor-link map** — single-page site needs strong intra-page jumps. Audit every section has an `id` matching nav links. (Already mostly done — verify.) *us*
- [ ] (15m) **Add `<meta name="theme-color" content="#0D0B0A">`** — mobile address bar colour. *us*
- [ ] (15m) **Add `<meta name="format-detection" content="telephone=no">`** if needed — controls auto-link of phone numbers (we already link them explicitly). *us*

---

## D. AEO / GEO — LLM Discoverability

- [ ] (45m) **Create `public/llms.txt`** — plain-text site summary with named-entity intro paragraph + page-by-page summaries. Mandated by SEO_STRATEGY.md, never created. *us*
- [ ] (1h) **Named-entity intro paragraph in Sanity** — first 120 words of page must include: business name, owners (Ankit + Kusum), location (Lahar MP), year (1994), signature service. Add `entityIntro` field to `siteSettings` or `pageCopy`, render above-the-fold. *us*
- [ ] (2h) **Expand FAQ from 7 to 15+ questions** — covers buyer intent questions:
  - "Best bridal salon in Lahar?"
  - "Bridal makeup price in Lahar"
  - "Lehenga rental Lahar Bhind"
  - "Pre-bridal package timing"
  - "How far in advance to book"
  - "HD vs airbrush makeup"
  - "Do you do home visits?"
  - "Service areas covered"
  - "Trial makeup availability"
  - "Payment methods accepted"
  - "Wedding season slot availability"
  - "Hindi/English language support"
  - "Studio vs on-location pricing"
  - "Group bookings discount"
  - "Designer credentials" *us*
- [ ] (1h) **Q&A blocks visible above the fold** on each section — restructure so first scroll surfaces at least one Q&A answer. *us*
- [ ] (30m) **Citeable "Fast Facts" block** — block component listing Founded/Owners/Location/Services/Service Area/Reviews/Instagram as visible scannable structured text. AI scrapes this cleanly. *us*
- [ ] (45m) **Explicit AI bot allowlist in `public/robots.txt`** — add separate `User-agent:` blocks for GPTBot, PerplexityBot, ClaudeBot, Google-Extended, anthropic-ai, cohere-ai, CCBot, Bytespider. All `Allow: /`, `Disallow: /studio`. *us*
- [ ] (1h) **Differentiator paragraph** — "the only bridal lehenga + jewellery rental atelier between Gwalior and Bhind, alongside HD bridal makeup" — make it the entity tagline AI picks up. *us*
- [ ] (1h) **Geographic entity graph** — embed `Place` JSON-LD with nearby cities (Bhind, Mihona, Datia, Gwalior). Helps AI place the salon geographically. *us*
- [ ] (30m) **Verify Perplexity test** after launch — query "best bridal salon in Lahar" → should return ASM with citation. (Re-run weekly first month.) *ankur*
- [ ] (30m) **Verify ChatGPT-with-browsing test** — "bridal makeup in Lahar MP" → should mention Ankit Sahni Makeover. *ankur*

---

## E. Performance

- [ ] (1h) **CRITICAL: Remove `images: { unoptimized: true }`** from `next.config.ts:5`. This single line disables all Next.js image optimization site-wide. Fixing it cascades: smaller bundle, better LCP, AVIF/WebP per-device, responsive sizes. *us*
- [ ] (30m) **Add `remotePatterns`** to next.config images — allow `cdn.sanity.io` so Sanity images get optimized. *us*
- [ ] (1h) **Audit every `<Image>` `sizes` prop** — verify accurate breakpoint hints. Wrong `sizes` defeats responsive delivery. *us*
- [ ] (30m) **Add `priority` on hero only** — confirmed correct currently. Verify after refactor doesn't drift. *us*
- [A] (20m) **Lighthouse audit** — run on home + privacy + /studio. Target ≥90 all categories mobile. Captures real baseline. *us*
- [A] (15m) **PageSpeed Insights** — LCP <2.5s, INP <200ms, CLS <0.1 on 4G. Captures field data when ready. *us*
- [A] (30m) **Bundle size analysis** — `npm i -D @next/bundle-analyzer`, run, identify oversized deps. *us*
- [ ] (30m) **Font preload audit** — fonts.woff2 already use `display: swap`. Verify `<link rel="preload">` is added for the LCP font (Cormorant 400). *us*
- [ ] (30m) **Add `preconnect` to `cdn.sanity.io`** — `<link rel="preconnect" href="https://cdn.sanity.io">` in layout head. *us*
- [ ] (1h) **Lazy-load below-fold sections** — Awards, Gallery, Testimonials, FAQ, Contact — consider `dynamic()` with `ssr: false` for heavy clients. *us*
- [ ] (30m) **Add `<link rel="dns-prefetch">`** for analytics domains. *us*
- [ ] (30m) **Audit CSS** — `globals.css` is large. Remove unused selectors after section split. *us*
- [ ] (15m) **Move iframe `loading="lazy"` audit** — Contact map iframe already lazy. Verify post-changes. *us*

---

## F. Accessibility (WCAG AA)

- [x] (—) **`lang="en"`** on `<html>`
- [x] (—) **Skip-to-content link** in layout
- [x] (—) **Focus-visible outlines** per design system spec (verify rendered)
- [ ] (20m) **Run axe-core** — `npx @axe-core/cli http://localhost:3000`. *us*
- [ ] (30m) **Keyboard navigation test** — tab through entire site, every interactive reachable, no traps. *us*
- [ ] (30m) **Color contrast audit on dark theme** — gold-on-black is the risk area. Verify with Chrome DevTools contrast tool. *us*
- [ ] (15m) **Fix FAQ `hidden` attribute** — `display: none` blocks SR discovery. Use `aria-hidden` + CSS visibility, or just `[open]` pattern. *us*
- [ ] (20m) **Cursor follower respects `prefers-reduced-motion`** — `Enhance.tsx` gates on `(hover: hover)` but not on reduced-motion. Add gate. *us*
- [ ] (15m) **All decorative SVGs have `aria-hidden="true"`** — audit Sparks/MiniSparks. *us*
- [ ] (30m) **Verify all buttons have accessible name** — icon-only buttons get `aria-label`. Confirm WaFab, nav hamburger, FAQ toggles. *us*
- [ ] (15m) **`<main>` landmark** — already on `<main id="main-content">` in layout. Verify present after refactor. *us*
- [ ] (30m) **Form labels properly associated** — `htmlFor` + `id` already in place. Verify required-field announcements via `aria-required`. *us*
- [ ] (30m) **Loading states announce via `aria-live`** — form submit success uses live region for SR. *us*

---

## G. Security

- [ ] (1h) **CRITICAL: Security headers in `vercel.json`** — currently `headers: []`. Add CSP, Strict-Transport-Security (HSTS), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Cross-Origin-Opener-Policy. Configure CSP to allow `cdn.sanity.io`, Vercel Analytics, Google Analytics, `wa.me`, Google Maps embed. *us*
- [ ] (30m) **Verify SSL Labs grade ≥ A** — https://www.ssllabs.com/ssltest/. Defaults likely A from Vercel; bumping to A+ needs HSTS preload. *us*
- [ ] (15m) **HSTS preload enrollment** — submit to https://hstspreload.org/ after HSTS header is live. *us*
- [ ] (30m) **Audit Sanity API token scope** — verify `SANITY_API_TOKEN` is Editor (not Admin) and only used server-side. *us*
- [ ] (15m) **Verify no `NEXT_PUBLIC_*` exposes secrets** — only projectId/dataset/apiVersion should be public. Check `process.env` usage across codebase. *us*
- [ ] (1h) **Form spam protection: honeypot + rate limit** — hidden field that bots fill (we discard if filled). Upstash Redis free tier for IP rate limit (3 submissions per IP per hour). *us*
- [ ] (30m) **Form input sanitization** — currently text passes straight to WhatsApp URL. Length limit (max 500 chars), strip control chars, URL-encode properly (already done via `encodeURIComponent` — verify). *us*
- [ ] (30m) **Cloudflare Turnstile (optional)** — free CAPTCHA-alternative. Add to form if spam appears. *us — later*
- [ ] (15m) **Audit `dangerouslySetInnerHTML` usage** — JSON-LD scripts in `app/layout.tsx:184,188` use it. Confirm content is `JSON.stringify` of typed object (it is). No user input flows in. *us*
- [ ] (30m) **CSP report-only first** — ship CSP in `report-only` mode first to catch breakages, switch to `enforce` after 1 week of clean reports. *us*

---

## H. Analytics & Observability

- [x] (—) **Vercel Analytics** installed
- [x] (—) **Google Analytics 4** installed via `@next/third-parties`
- [ ] (30m) **Verify GA4 events fire** — open browser, check Network for `collect` requests. *us*
- [ ] (15m) **Enable Vercel Speed Insights** — `import { SpeedInsights } from '@vercel/speed-insights/next'`. *us*
- [ ] (1h) **Custom GA4 events** — WhatsApp click, phone click, form submit, scroll-depth 50%/90%, section view (per section). Use `@next/third-parties/google` `sendGAEvent`. *us*
- [ ] (30m) **Vercel Analytics custom events** — same set. `track('whatsapp_click')`. *us*
- [ ] (45m) **Conversion goals defined** — WhatsApp click = primary conversion. Phone click = secondary. Form submit = tertiary. Configure as conversions in GA4 UI. *ankur*
- [ ] (30m) **Sentry free tier** — capture client + server errors. `@sentry/nextjs`. *us*
- [ ] (15m) **UptimeRobot free** — 5-min check on `ankitsahnimakeover.com` + `/studio`. Email alerts. *ankur*
- [ ] (30m) **Logflare or Vercel Log Drain** — optional, defer to Tier 2. *us — later*

---

## I. Forms / Lead Capture

- [x] (—) **Form opens WhatsApp with prefilled message** — `components/ContactSection.tsx`
- [ ] (2h) **POST to Supabase `leads` table** (Phase 6) — capture in DB even if WhatsApp opens too. Schema: `id, name, phone, weddingDate, service, brief, source, createdAt`. *us*
- [ ] (30m) **Supabase RLS policy** — anon insert only, no read. *us*
- [ ] (15m) **Submit also email to Ankur** — Supabase function or n8n flow → resend.com free tier. *us*
- [ ] (30m) **"Thank you" page** — `app/thanks/page.tsx` linkable, branded. Currently form just shows inline success. *us*
- [ ] (15m) **`aria-live` on success state** — already React-rendered; add `role="status"` to announce. *us*
- [ ] (30m) **Phone validation** — `pattern="^[0-9+\s]{10,15}$"`, `inputMode="numeric"`. *us*
- [ ] (15m) **Wedding date `min={today}`** — already `type="date"`; add min. *us*

---

## J. WhatsApp Templates

- [ ] (2h) **Rewrite ~15 templates** in `whatsapp-templates.md` from Hinglish → simple Indian English (per locked tone rule). Remove all UPI/advance references (payment in-shop only). *us*
- [ ] (30m) **Template variables consistency** — `{NAME}`, `{DATE}`, `{TIME}`, `{SERVICE}`, `{PRICE}` standard set. Document interpolation rules. *us*
- [ ] (15m) **Character count cap** — keep each template under 1024 chars (WhatsApp limit). *us*
- [ ] (45m) **WhatsApp Business platform templates** — formatted for Meta template approval when WABA goes live. *us — Phase 6*

---

## K. Local SEO (Technical Only)

- [x] (—) **Geo coordinates** in LocalBusiness JSON-LD (`26.1957212, 78.9417381`)
- [x] (—) **Address structured** in JSON-LD (`PostalAddress`)
- [B] (15m) **Google Business Profile verified** — 10–14 day postcard. Has Ankit started? *ankit*
- [ ] (15m) **NAP consistency audit** — Name/Address/Phone match exactly across: website, GBP, JustDial, Instagram bio, Facebook (if exists). *us / ankur*
- [ ] (30m) **Build citations** — submit to: Sulekha, JustDial (claim existing), IndiaMART, Bing Places, ShaadiSaga (free), WedMeGood (free). *ankur*
- [ ] (15m) **Schema `sameAs` includes GBP** — once GBP URL known, add to `siteSettings.socialProfiles`. *us*
- [ ] (1h) **`gmb-optimization-packet.md` paste** — already drafted, paste once Ankit claims GBP. *ankur*
- [ ] (30m) **GBP services + prices** — all services from `gmb-optimization-packet.md` step 5. *ankur*
- [ ] (30m) **GBP Q&A seed** — 10 questions from `gmb-optimization-packet.md` step 6. *ankur*
- [ ] (30m) **GBP first 3 posts** — already drafted. *ankur*

---

## L. Content (Text Only — Photos = Ankit)

- [ ] (2h) **Refine all page copy** — Home, About, Services, FAQ, Contact, Privacy. Match design system tone + simple Indian English where applicable. *us*
- [ ] (1h) **Service descriptions schema-friendly** — every Sanity `service` doc has 60–120 char description optimized for AEO citation. *us*
- [ ] (1h) **Package inclusions clear** — every Sanity `package` doc has 5–8 inclusions in plain English. Convert any Hinglish placeholder. *us*
- [ ] (1h) **Meta title + description per page** — draft 60-char title + 155-char description for home + privacy. Store in Sanity. *us*
- [ ] (2h) **Alt text for every image position** — write descriptive alt text strings into Sanity (Ankit uploads photo, alt is pre-written). E.g. "Bridal makeup by Ankit Sahni at Lahar studio". *us*
- [ ] (3h) **Blog post #1: "Bridal makeup salon in Lahar — complete guide"** — 1500+ words, targets primary keyword, AEO-ready. Sanity blog schema if not exists, create. *us*
- [ ] (3h) **Blog post #2: "Bridal lehenga rental in Lahar Bhind — price guide"** — zero-competition keyword, our unique differentiator. *us*
- [ ] (30m) **OG image** — generated wordmark on dark bg (no real photo dependency). `app/opengraph-image.tsx` with `ImageResponse`. Or static 1200×630 in `public/`. *us*
- [ ] (30m) **Favicon set** — 16/32/180/192/512 PNGs + `favicon.ico` + `apple-touch-icon.png` + `manifest.json`. *us*
- [ ] (30m) **Site manifest** — `public/manifest.json` for PWA-lite (name, short_name, theme_color, icons). *us*
- [ ] (1h) **Privacy policy content** — already drafted in `privacyPage` schema fallbacks, verify it's complete: data collection, cookies, GA, contact for removal. *us*

---

## M. Git Hygiene & Supply Chain Security

- [ ] (45m) **Husky + lint-staged** — pre-commit: `tsc --noEmit`, `eslint --fix`, `prettier --write` on staged files. *us*
- [ ] (30m) **gitleaks pre-commit hook + GitHub Action** — block any commit with secret-shaped strings. *us*
- [ ] (20m) **Run `gitleaks detect --log-opts="--all"` on full history** — scan for any past committed secrets. If found: rotate keys + BFG history rewrite. *us*
- [ ] (15m) **`.gitignore` audit** — already covers `.env*`, `node_modules`, `.next`. Add `*.log`, `.DS_Store`, `.vscode/`, `.idea/`, `/screenshots`, `*.bak`, `*.NEF`, `*.HEIC`, `compare.mjs` if not moved. *us*
- [ ] (20m) **`git status --ignored` review** — every untracked file decided: commit / gitignore / delete. *us*
- [ ] (10m) **`npm audit`** — current state unknown. Fix budget conditional. *us*
- [ ] (15m) **Enable Dependabot** — `.github/dependabot.yml` weekly for npm. *us*
- [ ] (10m) **Lock file integrity** — `npm ci` succeeds clean. *us*
- [ ] (15m) **`license-checker`** — `npx license-checker --production --onlyAllow "MIT;ISC;BSD-2-Clause;BSD-3-Clause;Apache-2.0;CC-BY-4.0;Unlicense;CC0-1.0"`. Fail on GPL/AGPL. *us*
- [ ] (30m) **Commitlint + Husky commit-msg** — enforce `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:` prefixes. *us*
- [ ] (30m) **GPG-signed commits** — agency standard. Set up GPG key, configure `git config commit.gpgsign true`. *ankur*
- [ ] (10m) **Branch protection on `main`** — GitHub UI: require PR review, require status checks (build + lint + type-check), no force push. *ankur*
- [ ] (5m) **`git remote -v` audit** — confirm only legitimate origin. *us*
- [ ] (Decision) **Submodule decision** — `ankitsahnimakeover-nextjs/` has its own `.git` nested inside parent Helora repo. Three options:
  - (a) Make it a proper git submodule of Helora
  - (b) Detach as standalone repo, remove from Helora monorepo
  - (c) Accept current nested `.git` (works but unusual)
  Decision needed. Recommendation: (b) detach — ASM is portfolio, deserves own GitHub repo + cleaner deploy. *ankur*

---

## N. DevOps / Deploy

- [x] (—) **Domain live** — ankitsahnimakeover.com
- [x] (—) **Vercel deployed** — auto from main
- [x] (—) **HTTPS/SSL** — via Vercel
- [x] (—) **Vercel firewall** allows facebookexternalhit, WhatsApp, Twitterbot (`vercel.json:13-46`)
- [ ] (10m) **DNS audit** — confirm A/AAAA records correct, www subdomain redirects to apex. *us*
- [ ] (5m) **Verify SSL Labs A+ after HSTS** — see Security section. *us*
- [ ] (15m) **Vercel preview deploy comments enabled** — verify in project settings. *us*
- [ ] (1h) **GitHub Actions CI** — `.github/workflows/ci.yml`: on PR, run `npm ci`, `tsc --noEmit`, `eslint`, `next build`. Fail PR on any red. *us*
- [ ] (15m) **Production environment variables audit** — Vercel dashboard, confirm parity with local `.env.example`. *us*
- [ ] (15m) **Vercel project settings: production branch = main**, framework auto-detected = Next.js. *us*
- [ ] (15m) **Vercel cron job** — optional, for daily sitemap ping or stale-content audit. *us — later*

---

## O. Testing

- [ ] (3h) **Playwright e2e — golden path** — 8 tests:
  1. Home loads, JSON-LD valid
  2. Click WhatsApp opens wa.me
  3. Click phone opens tel:
  4. Form fills → opens WhatsApp with prefilled
  5. FAQ accordion expand/collapse
  6. Gallery filter changes set
  7. Mobile menu opens/closes
  8. Privacy page loads + canonical correct
  *us*
- [ ] (1h) **Playwright axe scan** — accessibility on home + privacy + /studio. Fail on violations. *us*
- [ ] (1h) **Playwright Lighthouse runner** — in CI, fail if scores drop below baseline. *us*
- [ ] (2h) **Visual regression** — Percy free tier OR Playwright screenshots committed + diff in CI. *us — optional, Tier 2*

---

## P. Documentation

- [ ] (1h) **Studio onboarding doc for Ankit** — `docs/STUDIO_GUIDE.md` with screenshots: login URL, how to edit content, how to publish, where photos go. *us*
- [ ] (45m) **Runbook for Ankur** — `docs/RUNBOOK.md`: dev server start, prod deploy, redeploy from Sanity webhook, check logs, common breakages. *us*
- [ ] (30m) **`README.md` proper** — already on list under Architecture. Cross-link here. *us*
- [ ] (30m) **`docs/SCHEMA.md`** — every Sanity schema field documented with purpose + example. *us*
- [ ] (30m) **`docs/SEO_PLAYBOOK.md`** — what we did, how to measure, how to extend. Crosslink SEO_STRATEGY.md. *us*

---

## Q. Misc / Cleanups (Memory Drift Found in Audit)

- [ ] (5m) **Update `.claude/memory/canonical/decisions.md`** — line referencing "Sahni Bridal Studio is a live case study" → "Ankit Sahni Makeover is a live case study". Brand reconciliation missed it. *us*
- [ ] (10m) **Update `ankit_sahni_makeover.md` brief** in user-memory — Instagram changed from `@sahnibeautysalon` to `@ankitsahnimakeovers`. Update follower count if confirmed. *us*
- [ ] (15m) **Update `progress.md`** — last touched 2026-04-18, month-stale. Refresh phase status to reflect Phases 1+2+2.5 done. *us*
- [ ] (Decision) **Decide on 6 agent-briefs** — `agent-briefs/01..04, 06, 07.md` reference an agency-agent flow that never ran. Options: archive / delete / keep historical. Recommendation: move to `archive/` subfolder, keep historical context but stop confusing future sessions. *ankur*

---

## Effort Totals

| Section | Items | Hours |
|---|---|---|
| A. Architecture & Code Quality | 17 | ~8h |
| B. Sanity CMS | 11 | ~9h |
| C. SEO — Google | 19 | ~12h |
| D. AEO / GEO | 9 | ~7h |
| E. Performance | 11 | ~5h |
| F. Accessibility | 9 | ~4h |
| G. Security | 9 | ~4h |
| H. Analytics & Observability | 7 | ~4h |
| I. Forms / Lead Capture | 7 | ~4h |
| J. WhatsApp Templates | 4 | ~3h |
| K. Local SEO | 8 | ~3h *us* + ~1.5h *ankur* |
| L. Content | 10 | ~14h |
| M. Git Hygiene & Supply Chain | 13 | ~4h |
| N. DevOps / Deploy | 7 | ~2h |
| O. Testing | 4 | ~7h |
| P. Documentation | 5 | ~3h |
| Q. Misc Cleanups | 4 | ~30m |
| **Total** | **~155 items** | **~95h** |

Realistic with parallel work + async approvals: **8–10 working days end-to-end**.

---

## Suggested Execution Sequence (8-Day Plan)

### Day 1 — Audit + Foundation (8h)
1. Run all `[A]` audits — Lighthouse, PageSpeed, axe-core, SSL Labs, bundle size, `npm audit`, `gitleaks --all`. Save reports.
2. Flip `images: { unoptimized: true }` → off. Add `remotePatterns` for Sanity CDN. Test build.
3. Security headers block in `vercel.json` (CSP report-only).
4. `.gitattributes`, `.prettierrc`, `.editorconfig`, `.env.example`.
5. Move GA ID to env var. Move Analytics inside SiteOnly.

### Day 2 — Architecture Refactor (8h)
1. Split `page.tsx` into `components/sections/*` (Phase 5).
2. Add `loading.tsx`, `error.tsx`, `not-found.tsx`.
3. Fix `FaqSection` + `GallerySection` WA_NUMBER regression.
4. Rewrite `privacy/page.tsx` without inline styles.
5. Delete/move `compare.mjs`.

### Day 3 — SEO + Schema Depth (10h)
1. Add Service / Organization / Person / Review / BreadcrumbList / ImageObject JSON-LD.
2. Add `googleSiteVerification`, `priceRange`, `serviceArea`, `socialProfiles` schema fields.
3. Parse `hours` into structured `OpeningHoursSpecification`.
4. Canonical URL per page.
5. Expand `next-sitemap.config.js`.
6. Verify in GSC + Bing Webmaster Tools.

### Day 4 — AEO + Content (10h)
1. Create `public/llms.txt`.
2. Expand FAQ from 7 → 15+ questions in Sanity.
3. AI bot allowlist in robots.txt.
4. Named-entity intro paragraph.
5. Refine all page copy.
6. Write all image alt text into Sanity.

### Day 5 — Performance + A11y (8h)
1. Re-run Lighthouse after Day 1 image flip. Tune until ≥90 all mobile.
2. Font preload + DNS prefetch + preconnect.
3. axe-core fixes.
4. Keyboard nav test.
5. Color contrast verification.
6. Cursor `prefers-reduced-motion` gate.

### Day 6 — Forms + Webhook + Sanity Polish (8h)
1. Webhook revalidation `/api/revalidate`.
2. Custom Studio structure.
3. Form → Supabase + Resend email + "Thank you" page.
4. Honeypot + rate limit.
5. Phone validation.
6. Sanity SEO previews.

### Day 7 — Analytics + Testing + Git (8h)
1. Custom GA4 + Vercel events.
2. Sentry install.
3. UptimeRobot setup.
4. Husky + gitleaks + lint-staged.
5. Playwright e2e — 8 golden-path tests.
6. GitHub Actions CI.

### Day 8 — Content (blogs) + Docs + Handover (8h)
1. Blog post #1 + #2.
2. WhatsApp templates rewrite.
3. Memory drift cleanups (decisions.md, brief, progress.md).
4. STUDIO_GUIDE.md + RUNBOOK.md + README.md.
5. Final Lighthouse + Rich Results + Perplexity verification.
6. Submit GBP + citations + Search Console (Ankur tasks in parallel).
7. Tag `v1.0.0` release.

---

## Final Verification Checklist (Day 8 Wrap)

Before declaring "Done", every one of these must pass:

- [ ] Lighthouse mobile ≥ 90 across all 4 categories on home + privacy
- [ ] PageSpeed Insights LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Google Rich Results Test green on home (LocalBusiness, FAQ, Service, Breadcrumb)
- [ ] Schema.org validator green on every JSON-LD type
- [ ] axe-core: zero critical violations
- [ ] SSL Labs: A or A+ grade
- [ ] `npm audit`: zero high/critical
- [ ] `gitleaks detect --log-opts="--all"`: zero findings
- [ ] CSP enforce mode active 7+ days with zero violations
- [ ] All 8 Playwright e2e tests green in CI
- [ ] Domain verified in Search Console, sitemap indexed
- [ ] llms.txt accessible at `/llms.txt`
- [ ] AI bot allowlist in robots.txt
- [ ] Sanity webhook revalidation confirmed working (publish → live in <5s)
- [ ] Form submit creates Supabase row + sends Ankur email
- [ ] WhatsApp templates 100% simple Indian English, zero UPI references
- [ ] All 15+ FAQ items live in Sanity
- [ ] Perplexity query "best bridal salon in Lahar" returns ASM with citation
- [ ] ChatGPT with browsing query "bridal makeup Lahar MP" mentions ASM
- [ ] Branch protection active on `main`
- [ ] STUDIO_GUIDE.md handed to Ankit, RUNBOOK.md handed to Ankur

When all 21 boxes check, ASM is shippable as a world-class portfolio piece.

---

## Tier 2 — Post-Handover Ongoing (Not Required for "Done")

- WhatsApp Business API (WABA) — Meta application, n8n receptionist
- Form → n8n full workflow → CRM
- Monthly blog post cadence (1/month)
- Migrate 116 JustDial reviews to Google → push toward 50+ on GBP
- Monthly KPI dashboard
- 1 outreach DM/day to other salons (the actual revenue lever)
- `/sync-sanity` drift-detection skill

---

## Related

- [[CLAUDE.md]] — Client context
- [[PIPELINE.md]] — Master build pipeline
- [[SEO_STRATEGY.md]] — SEO + AEO + GEO strategy
- [[DESIGN_SYSTEM.md]] — Visual identity rules
- [[TIMELINE.md]] — Original 7-week timeline (now superseded by 8-day plan above)
- [[progress.md]] — Live build status
- [[whatsapp-templates.md]] — WhatsApp templates (rewrite pending)
- [[gmb-optimization-packet.md]] — GBP setup once claimed
- [[ankit-content-checklist.md]] — Ankit's content/photo backlog

---

*Master checklist created 2026-05-19 by Claude (CTO) after full codebase + docs + memory audit. Maintained as items close. Survives all sessions.*
