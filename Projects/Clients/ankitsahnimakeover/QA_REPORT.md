# Ankit Sahni Makeover — Full QA Report

**Date:** 2026-04-26
**Tested by:** QA agent (Playwright + Chrome DevTools MCP)
**Target:** http://localhost:8090/Ankit%20Sahni%20Makeover.html
**Method:** Live browser testing + visual inspection + Lighthouse + network/console audit
**Overall Score:** 5.5 / 10 — beautiful brand, broken engineering

---

## Executive Summary

The site has exceptional dark-luxury visual design (9/10 brand polish) but is **not shippable as a revenue tool**. Three structural failures: (1) contact form submits nowhere — every lead is silently lost, (2) sticky nav broken on all viewports, (3) no mobile menu exists. On top of that, three of four award cards show literal placeholder text, the Featured Lehenga images are wrong content, before/after sliders are empty, and the page weighs 47 MB in images alone.

Engineering + content QA score: 3/10. Brand: 9/10.

---

## Issue Index

| # | Severity | Issue |
|---|----------|-------|
| 1 | Critical | Contact form submits to nowhere |
| 2 | Critical | Sticky navigation broken on all viewports |
| 3 | Critical | No mobile navigation menu |
| 4 | Critical | Awards section: 3 of 4 cards show placeholder text |
| 5 | Critical | Featured Lehenga: wrong images (bouquet, not lehenga) |
| 6 | Critical | Before/After sliders empty |
| 7 | Critical | Instagram link 404s — URL typo |
| 8 | Major | 47.69 MB total image weight |
| 9 | Major | React + Babel loading dev builds + in-browser transpile |
| 10 | Major | Zero SEO meta — no description, OG, canonical, JSON-LD |
| 11 | Major | Gold package shows "Most Sought After" label twice |
| 12 | Major | MakeupTypes: placeholder inclusions on all 3 cards |
| 13 | Major | Form inputs: no `<form>`, no labels, no name attrs |
| 14 | Major | Phone/date fields lack proper input types |
| 15 | Minor | Gallery filters Hair/Skin return 1 item each |
| 16 | Minor | Testimonial stars are tiny sparkles, not 5-pointed stars |
| 17 | Minor | Designer name spelling: "Bhumika Bahl" vs "Bhumika Behal.jpg" |
| 18 | Minor | Footer Google reviews link is `href="#"` |
| 19 | Minor | favicon.ico 404 |
| 20 | Minor | Stats counters render as 0 until scrolled into view |
| 21 | Minor | Before/After drag handle is 2px, invisible |
| 22 | Minor | Heading hierarchy skips H3 in Awards |
| 23 | Minor | No `<main>` landmark element |
| 24 | UX | Tap targets below 44px on mobile |
| 25 | UX | No focus-visible outline on any interactive element |
| 26 | UX | Cursor follower dot reads as dev artifact |
| 27 | UX | Scroll progress bar over-engineered for brochure site |
| 28 | UX | All 3 makeup-type cards visually indistinguishable |
| 29 | UX | WhatsApp links may double-open on Android |

---

## Critical Issues (High Priority)

### 1. Contact form submits to nowhere — no data persistence

**Location:** `sec-contact.jsx`, contact section `#contact`

**Steps to reproduce:**
1. Scroll to "Send us the details" form
2. Fill name, phone, wedding date, service, brief
3. Click "Send my bridal brief →"

**Expected:** Form data POSTed to a backend / webhook / email / WhatsApp notification.

**Actual:** Zero network requests fire on submit (verified via network panel). UI fakes a "Brief received. Ankit will WhatsApp you within the hour" success message. No `<form>` element wraps the inputs at all (`document.querySelector('#contact form')` returns null).

**Impact:** Every bride who fills the form believes Ankit will contact her. He never will. Silent conversion loss + brand-trust bomb. The "no spam · WhatsApp reply · under 1 hr" caption makes it worse.

**Suggested fix:**
- Quick: Wire submit handler to open `wa.me/919098888134?text=<built-from-fields>` so user lands in WhatsApp with their brief pre-filled.
- Better: POST to n8n webhook → Ankit's WhatsApp via WABA when ready.
- Add real `<form onSubmit>` wrapper with `name=` attributes for any future backend.

---

### 2. Sticky navigation is broken on all viewports

**Location:** Top `<nav>` element

**Steps to reproduce:** Scroll down past 100px on desktop or mobile.

**Expected:** Nav stays pinned to top with section anchors and Book Now CTA always reachable.

**Actual:** `<nav>` is `position: sticky; top: 0` but ancestor `html`/`body` have `overflow: hidden auto`, which detaches the sticky containing block. After scrolling 900px the nav's `getBoundingClientRect().top` is `-900` — it scrolls away with the page.

**Impact:** Users lose access to Book Now CTA, Packages, and section navigation through 16,000px of page. Major drop-off.

**Suggested fix:** Remove `overflow: hidden auto` from `html`/`body` (use `overflow-x: hidden` only on body), OR convert nav to `position: fixed` with proper z-index.

---

### 3. No mobile navigation menu

**Location:** Nav at viewports below 768px

**Steps to reproduce:** View at 375px width.

**Expected:** Hamburger menu icon revealing the 8 nav links.

**Actual:** All 8 nav links are `display: none` on mobile. Only "Book Now" pill is visible. No hamburger anywhere.

**Impact:** Mobile is the primary device for the Indian bridal market. Users cannot jump to Packages, Lehenga, or any section from the top.

**Suggested fix:** Add hamburger trigger that opens a full-screen drawer with all 8 sections + Book Now CTA.

---

### 4. Awards section contains literal placeholder text on 3 of 4 cards

**Location:** `sec-awards.jsx`, `#awards` section, cards 2/3/4

**Actual:** Cards 2-4 display `[ Year ]`, `[ Award Name ]`, `[ Awarding Body ]` as visible text and as H4 headings. Screen readers will read "left bracket Award Name right bracket". Image content uses stock Unsplash photos of WHITE/EUROPEAN models — files served from `images.unsplash.com/photo-1534528741775-...`, `1438761681033-...`, `1524504388940-...`.

**Impact:** Per the Sahni positioning ("recognised nationally"), shipping with placeholder text undermines the entire claim.

**Suggested fix:**
- Quick: Remove the 3 placeholder cards. Ship Awards section with just the real Bhumika Bahl entry.
- Better: Get real award details from Ankit + real photos before launch.

---

### 5. Featured Lehenga images are wrong content

**Location:** `sec-craft.jsx`, `#featured` section

**Actual:** Two visible images carry alt text "Lehenga · Maroon Couture" and "Lehenga · Ivory" but both `<img>` elements load the IDENTICAL Unsplash URL `photo-1519741497674-611481863552` — a wedding flower bouquet, not a lehenga. This is the centerpiece of the "only rental atelier between Gwalior and Bhind" differentiation pitch.

**Suggested fix:** Replace with 2-3 real lehenga photos from Ankit's actual rack. Until photos are ready, hide the visuals and keep the typography-led card alone.

---

### 6. Before/After sliders are visually empty

**Location:** `sec-gallery.jsx`, `.ba-section`

**Actual:** Three slider widgets each show only a striped diagonal placeholder pattern with `<span>Before</span>` / `<span>After</span>` labels. Drag handle is functional (split moves from 50% → 24% on drag, verified) but there is nothing to compare.

**Promise broken:** "Drag the handle. No filters, no retouching — just the real chair, real light, real glow." → user drags, sees nothing.

**Suggested fix:** Either ship with 1-3 real bride before/after pairs from Ankit's archive, or remove the entire `.ba-section` until photos are produced.

---

### 7. Instagram handle 404s — typo in URL

**Location:** Footer, `sec-contact.jsx` line ~141

**Actual:** Footer link `<a href="https://www.instagram.com/ankitsahnimakover">@ankitsahnimakover</a>` — "makover" without the "e". Domain in copyright is `ankitsahnimakeover.com` (correct spelling). The URL likely 404s.

**Suggested fix:** Verify the real Instagram handle with Ankit. Most likely fix is changing all references to `ankitsahnimakeover` (with the e).

---

## Major Issues

### 8. Image weight = 47.69 MB unrendered

**Verified via Performance API:** total `encodedBodySize` of all images on first load = 47.69 MB.

**Worst offenders:**
- `5178A46F-...jpeg` — 5.6 MB
- `5A4DE80C-...jpeg` — 5.1 MB
- `A4B5BD18-...jpeg` — 4.9 MB
- `626BE2E0-...jpeg` — 4.8 MB
- `8C40A53F-...jpeg` — 4.7 MB
- `2D8739FF-...jpeg` — 4.3 MB

All natural dimensions are 3024×4032 or 3464×3464 px — phone camera originals shipped untouched.

**Impact:** On 4G mobile (~12 Mbps real-world), 47.7 MB = ~32 sec to fully load. Most brides will bounce.

**Suggested fix:**
1. Run all `images/*.jpeg` through `sharp` / `squoosh` / `imagemagick`
2. Resize to max 1600px on long edge
3. Convert to WebP/AVIF
4. Target ≤300 KB each
5. Add `loading="lazy"` (currently missing) on all below-fold imgs
6. Add `srcset` for responsive delivery
7. Realistic budget: ≤4 MB total page weight

---

### 9. React + Babel are loading dev/in-browser builds from CDN

**Actual:**
- `react.development.js` — 266 KB
- `react-dom.development.js` — 1.1 MB
- `@babel/standalone` — ~2 MB

Babel transpiles JSX in the browser on every visit. Console warning confirms: "You are using the in-browser Babel transformer."

**Suggested fix:**
- Best: Precompile JSX with esbuild/vite in a one-line build step. Ship a single bundled `app.js`.
- Minimum: Swap to production React UMDs (`react.production.min.js`).
- Even without bundling, dropping Babel saves ~2 MB and cuts main-thread work dramatically.

---

### 10. SEO — no description, no OG, no canonical, no JSON-LD, no favicon

**Actual:** `<head>` only contains: title, viewport, charset. Confirmed via DOM query — every Open Graph, Twitter Card, canonical, structured-data, and link-icon tag is missing.

**Impact:** When site is shared on WhatsApp/IG/FB, no preview card. Google can index but with no rich result, no LocalBusiness schema, no review snippet. For a local-search-driven business this halves discoverability.

**Suggested fix:** Add to `<head>`:
- `<meta name="description" content="...">`
- OG tags: title, description, image, url, type=website
- Twitter card tags
- `<link rel="canonical" href="https://ankitsahnimakeover.com/">`
- `<link rel="icon" href="/favicon.ico">`
- `LocalBusiness` JSON-LD with `aggregateRating: 4.8 (163)`, address, hours, phone

---

### 11. Gold package shows TWO "Most Sought After" labels stacked

**Location:** `#packages` Gold card

**Actual:** Both a pill badge ("★ MOST SOUGHT AFTER" at top) and an inline small-caps label ("MOST SOUGHT AFTER") appear inside the same card. Visual redundancy that reads as a bug.

**Suggested fix:** Pick one. Recommend keeping the badge, removing the inline duplicate.

---

### 12. Package cards show "— Inclusions to be confirmed by Ankit —" placeholder

**Location:** `#makeups` section, all 3 cards (Bridal Makeup, Engagement Makeup, Party Makeup) in `sec-makeups.jsx`

**Actual:** Single-item bullet lists with the literal phrase. Pricing reads "On Request — Pricing shared on consultation".

**Impact:** These are public, visible to every bride. Communicates that the studio doesn't have its own offer documented.

**Suggested fix:** Get Ankit to provide 4-5 inclusions per category and a starting-from price. Populate before launch.

---

### 13. Form inputs have no real `<label for>` association — and no `<form>` wrapper

**Actual:** All 5 inputs (name, phone, wedding date, service select, brief) lack `id` and have no `<label>` element. Lighthouse `select-name` audit fails. Screen readers will announce inputs by placeholder only.

**Suggested fix:**
- Wrap inputs in `<form onSubmit={...}>`
- Add `id` and matching `<label htmlFor>` on each input
- Add `name=` attributes
- Add `required` where appropriate
- Add HTML5 `type="tel"` and `type="date"` for proper mobile keyboards

---

### 14. Phone field accepts any text; no `tel`/`pattern` validation

**Actual:** Field accepts non-digits. Wedding date field is plain text — opens regular keyboard on mobile rather than date picker.

**Suggested fix:**
- Phone: `type="tel"`, `inputmode="numeric"`, `pattern="[0-9]{10}"`, `maxlength="10"`
- Wedding date: `type="date"` with `min={today}`

---

## Minor Issues

### 15. Gallery filter "Hair" returns 1 item, "Skin" returns 1 item

Total gallery is 10 items; only 1 each tagged Hair and Skin. After tapping the filter, the section feels almost empty.

**Fix:** Either expand the gallery (add more Hair/Skin photos) or collapse those filter chips.

---

### 16. Testimonial "stars" are 4-pointed gold sparkles at 12×12px

**Actual:** Path `M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z` — sparkle/diamond shape. Too small to read. Visually look like "+ + + +" plus signs in screenshots.

**Fix:** Use conventional 5-pointed star path or unicode `★` at 16-18px.

---

### 17. Designer name spelling inconsistency

- Display text: "Bhumika Bahl" (Awards H4 + `sec-awards.jsx`)
- Image filename: `Bhumika Behal.jpg`

**Fix:** Pick one spelling. Verify with Ankit and rename image accordingly.

---

### 18. Footer "Google · 4.8 / 163 Reviews" is `href="#"`

**Fix:** Link to actual Google Business Profile review page. As-is, it confuses users who tap expecting reviews.

---

### 19. favicon 404

`GET http://localhost:8090/favicon.ico` returns 404. Browser tab shows generic icon. No `<link rel="icon">` in head.

**Fix:** Add favicon file + `<link rel="icon">` in head.

---

### 20. Stats counters at 0 until visible

The 30+ / 4.8 / 39K / 1.2K+ counters render as `0` until scrolled into viewport.

**Fix:** Initialize to final values, animate only on intersection.

---

### 21. Drag handle on Before/After is 2px wide and invisible

`.handle` element is `width: 2px`, no knob/grip indicator. Even when images are added, users will not know it is draggable.

**Fix:** Add visible circular grip with arrow icons (≥24px wide).

---

### 22. Heading hierarchy skips H3 in Awards

After H2 "Recognised nationally" the next heading is H4 "Masterclass with Bhumika Bahl". Lighthouse flags this.

**Fix:** Use H3 for award titles.

---

### 23. No `<main>` landmark

Page has `nav`, sections, `footer` but body content is not wrapped in `<main>`. Lighthouse flags `landmark-one-main`.

**Fix:** Wrap section content in `<main>`.

---

## UI/UX Improvements

### 24. Tap targets below 44px on mobile

- Book Now button: 91×29
- Filter chips (All Work / Bridal / Hair / Skin / Lehenga Rentals): 35px tall

All primary actions. **Fix:** Increase min-height to 44px on mobile.

---

### 25. No focus-visible outline on any interactive element

`outline-width: 0px` everywhere. Keyboard users cannot tell where they are. WCAG 2.4.7 violation.

**Fix:** Add `:focus-visible { outline: 2px solid var(--ink-gold-2); outline-offset: 2px; }`.

---

### 26. Cursor follower / glow circle on desktop

A small gold dot follows the mouse (`.cursor-dot` + `.cursor-ring` divs in `enhance.js`). Visible mid-page in screenshots near each section. On a bridal brand site this reads as a development artifact rather than premium polish.

**Fix:** Remove or make significantly more subtle.

---

### 27. Hero "scroll progress" thin gold bar across top

`.scroll-progress` element exists; visible faintly at top of every section. OK but slightly over-engineered for a single-page brochure site. Consider removing.

---

### 28. The 3 makeup-type cards are visually indistinguishable

Bridal/Engagement/Party all have identical "Inclusions to be confirmed" + "On Request" pricing. They feel like duplicated placeholder cards.

**Fix:** Differentiate with real, distinct inclusions and price ranges. Or reduce to 1-2 cards until content is ready.

---

### 29. WhatsApp links open in new tab (`target="_blank"`)

On Android, `target="_blank"` may cause an extra Chrome tab to open before WhatsApp launches. Native `wa.me/` deep-link handles this correctly without target.

**Fix:** Test on real Android device. Consider removing `target="_blank"` from `wa.me/` links.

---

## Performance Findings

| Metric | Value | Note |
|---|---|---|
| Lighthouse Accessibility | 90 | Good. Form labels would push to 95+ |
| Lighthouse Best Practices | 100 | Good |
| Lighthouse SEO | 91 | Missing meta description costs 9 points |
| LCP (localhost, no throttle) | 1318 ms | Real 4G projection: 15-25 sec |
| CLS | 0.00 | Excellent |
| Total page weight | >50 MB | Catastrophic. ~47 MB images + 3 MB React/Babel dev |
| Image requests on first load | 30 | 9 of these are >2 MB each |
| Render-blocking resources | 3 | `styles.css?v=12`, `refine.css?v=12`, Babel script |

**Caching:** Local server returns no `Cache-Control` headers. Acceptable for dev — must be configured at hosting.

---

## SEO / Accessibility Findings

**Missing entirely:**
- `<meta name="description">`
- All Open Graph tags
- All Twitter Card tags
- `<link rel="canonical">`
- `<link rel="icon">` (and favicon.ico file 404s)
- JSON-LD structured data (LocalBusiness, AggregateRating, Service)
- `<main>` landmark
- Visible focus indicators

**Form issues:**
- No `<form>` wrapper
- No `<label for>` pairs
- No `name=` attributes
- No `type="tel"` or `type="date"`

**Heading order:** H2 → H4 jump in Awards section.

**Awards H4s read aloud as "left bracket Award Name right bracket"** for screen readers due to placeholder text.

**Positives:**
- All 35 images have non-empty alt attributes
- `lang="en"` is present on `<html>`
- CLS is 0.00

---

## Recommended Fix Order

### Today (highest impact / lowest effort)

1. **Form → WhatsApp deep link** (15 min) — Stop dropping leads silently. Repoint submit to `wa.me/919098888134?text=<filled-fields>`.
2. **Hide 3 placeholder award cards** (5 min) — Stop brand-trust leak. Ship Awards with just Bhumika Bahl.
3. **Fix Featured Lehenga images** (10 min) — Replace identical bouquet URL with real lehenga photos OR remove the visuals.
4. **Hide before/after sliders** (5 min) — If no real photos available, remove the entire `.ba-section`.
5. **Fix Instagram URL typo** (2 min) — Verify handle with Ankit, correct the link.

### This week

6. **Compress images to ≤300 KB WebP** (1-2 hr) — Drops page weight 47 MB → ~3 MB. Unblocks mobile.
7. **Fix sticky nav** (30 min) — Remove `overflow:hidden` on body, or switch to `position:fixed`.
8. **Add mobile hamburger menu** (2-3 hr) — Critical for Indian mobile-first users.
9. **Real form backend** (2-4 hr) — n8n webhook → store in sheet + WhatsApp Ankit.
10. **Add SEO meta block** (1 hr) — description, OG tags, canonical, JSON-LD LocalBusiness with rating.

### Before launch

11. Switch React to production builds + precompile JSX (1 hr saves ~3 MB).
12. Get real award entries + real makeup-type inclusions from Ankit.
13. Add proper form labels, name attrs, input types.
14. Fix tap target sizes on mobile.
15. Add focus-visible outlines.
16. Fix all the minor issues (favicon, designer name spelling, Google reviews link, etc.).

---

## Files Most Likely to Change

```
Projects/Clients/ankitsahnimakeover/ankitsahnimakeover (Remix)/
├── Ankit Sahni Makeover.html      # SEO meta, prod React, favicon
├── styles.css                      # focus-visible, sticky nav fix
├── refine.css                      # mobile nav, tap targets
├── enhance.js                      # cursor follower removal
├── parts.jsx                       # mobile menu, Nav fix
├── sec-hero.jsx                    # —
├── sec-craft.jsx                   # Featured Lehenga images
├── sec-packages.jsx                # Gold "Most Sought After" duplicate
├── sec-makeups.jsx                 # placeholder inclusions, pricing
├── sec-about.jsx                   # —
├── sec-awards.jsx                  # placeholder award cards
├── sec-gallery.jsx                 # before/after sliders, drag handle
├── sec-contact.jsx                 # form wiring, Instagram URL, Google link
└── images/                         # 47 MB → compress to WebP, rename UUIDs
```

---

## Screenshots

All test screenshots saved to:
```
D:\Learning\Ai Automation\Ankur Sahni Learning Project\.playwright-mcp\
qa-01-*.png .. qa-19-*.png
```

---

*End of report.*
