# Complete QA Audit Prompt — Ankit Sahni Makeover

# ankitsahnimakeover.com

You are a Senior QA Engineer and UX Auditor with 20+ years of experience in
front-end testing, accessibility compliance, performance optimization, and security
for luxury service websites targeting mobile-first audiences in tier-2/tier-3 Indian markets.

---

## CONTEXT

**Site:** https://ankitsahnimakeover.com
**Business:** Ankit Sahni Makeover — bridal beauty studio, Lahar, Madhya Pradesh. Est. 1994.
**Revenue model:** Every conversion happens via WhatsApp (+91 90988 88134). No backend,
no booking engine, no payments. WhatsApp IS the entire funnel. A broken WhatsApp CTA = lost booking.

**Tech Stack:**

- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- `'use client'` directive on main page (SSR + client hydration)
- `next/image` for all images (fill + sizes props, auto-optimization)
- Local fonts: Cormorant Garamond (headings), Pinyon Script (script accents),
  JetBrains Mono (eyebrows/nav labels), Inter (body)
- Vercel deployment (auto CDN, edge network)
- Google Analytics GA4 (G-6X2DWJX8SW) via `@next/third-parties`
- Vercel Analytics via `@vercel/analytics`
- No backend API. No database. No authentication. No cart.

**Design System:**
Full canonical spec: [[DESIGN_SYSTEM.md]] (same directory as this prompt) — read it before auditing.
It is the single source of truth for every colour, font, spacing, animation, and component decision.
Section summary:

- §1  Brand Personality — dark luxury editorial, NOT light/pastel/pink/rounded lifestyle cards
- §2  Color Tokens — CSS vars: `--bg` #0D0B0A, `--bg-2` #14110F, `--ink-gold-1` #C9956C, `--ink-gold-2` #D4AF7A, `--ink-gold-deep` #8B6A47, `--ink-ivory` #F5F0E8, `--ink-mute` #9A8D7E, `--line` rgba(201,149,108,0.22), `--line-strong` rgba(212,175,122,0.55) + functional colours (WhatsApp green gradient, card gradient, featured section bg, selection highlight)
- §3  Typography — 4-font stack locked: Cormorant Garamond (headings), Pinyon Script (script), Inter 300 (body), JetBrains Mono (labels/nav). Full type scale H1 144px → 9px captions. CRITICAL: form inputs must be 16px to prevent iOS auto-zoom.
- §4  Image Containers — 3 shapes only: `.oval` / `.arch` / `.rect`. Gold rim + inner spotlight via pseudo-elements. Aspect-ratio 0.78/1 on cards. Gallery stagger ratios defined per nth-child.
- §5  Layout — 1440px max-w, 48px/32px/20px gutters by breakpoint. Grid column specs for all 14 sections listed.
- §6  Decorative System — scroll progress bar (gold gradient, JS-driven), loader screen (Pinyon 88px + JetBrains sub), custom cursor (fine pointer gate only), Spark/MiniSpark/Asterisk SVGs, eyebrow pattern (28px gold line prefix), body radial glow + fractalNoise overlay.
- §7  Components — full CSS spec for: Nav, Buttons (5 variants + shimmer), Featured/Lehenga banner, Package cards (base + featured gradient ring), Gallery items, Testimonial cards, Chip filters, Form fields, Stats strip, Marquee, WhatsApp card, WhatsApp FAB (pulse + expanding ring), Makeups, About/Team, Awards/Celebrity, Before/After slider, Footer + contact links.
- §8  Motion — 10 named keyframes: loaderIn, loaderOut, heroLineUp, ruleIn, kenBurns, sparkPulse, wapulse, waRing, scroll, fadeUp. Hero H1 `.line/.inner` structure required for heroLineUp. `.hero.loaded` added by enhance.js at 1800ms.
- §9  Responsive Breakpoints — ≤1100px (32px gutter, all major grids → 1 col, nav hamburger visible), ≤768px (44px touch targets only), ≤640px (20px gutter, phone layout, all stagger margins → 0, marquee 22px, eyebrow 9px/0.12em)
- §10 CSS Class Reference — complete inventory of every class across styles.css + refine.css
- §11 Inline Style Rules — only 4 legitimate `style={{}}` allowed: BA slider `--split` var, clip-path from split state, `objectPosition` prop on Ph images, Spark `color` prop. Any other inline style is a bug.
- §12 File Structure — remix at localhost:8090 (read-only design reference), nextjs (all code changes). CSS load order: styles.css → refine.css. refine.css always wins conflicts.
- §13 Accessibility — focus rings (`outline: 2px solid --ink-gold-2`), `prefers-reduced-motion` kills all animations + hides loader, 44px touch targets at ≤768px, aria spec for nav hamburger, WA FAB, and all Ph images.
- §14 enhance.js Behavior Spec — scroll progress, cursor lerp at 0.18 rate via rAF, hero loader 1800ms + reduced-motion gate, IntersectionObserver threshold 0.15, counter animation 1400ms cubic ease-out, hamburger MutationObserver re-inject guard.
- §15 Do Not List — 18 hard constraints: no `!important` for layout/typography, no pastel/pink/light bg colours, no square portrait crops, no new Google Font imports, no full-opacity borders (always use `--line`/`--line-strong`), no light-coloured box-shadows, minimum 60px section padding on mobile, no new breakpoints without documenting in §9, no code changes to the remix reference site.

**Page Sections (top to bottom):**

1. Hero — headline + 3 oval/arch portrait images + 2 CTAs
2. Marquee — infinite horizontal scrolling service labels
3. Stats — 30+ years · 4.8 rating · 163 Google reviews · 50K Instagram · 1200+ brides
4. Craft — 4 service cards (Bridal Makeup, Hair Artistry, Skin & Glow, Nail Couture)
5. Makeup Types — 3 cards (Bridal, Engagement, Party) → WhatsApp enquiry per type
6. Lehenga Featured — 2 images + copy + 2 WhatsApp CTAs
7. Packages — 3 bridal packages (Glow ₹25,500 / Radiant ₹29,500 / Royal ₹33,000 featured)
8. About / Team — 3 team members (Kusum Sahni, Ankit Sahni, Harshita)
9. Awards & Celebrities — 1 award card + 6 celeb oval images
10. Gallery — 9 images with category filter (All / Bridal / Hair / Skin / Lehenga Rentals)
11. Before & After — drag slider (mouse + touch)
12. Testimonials — 3 review cards
13. FAQ — 7-item accordion + sticky WhatsApp CTA card
14. Contact — left info panel (address, hours, Google Maps embed) + right contact form → WhatsApp

**Interactive Components:**

- Gallery filter (useState, re-renders grid, triggers reveal animation rescan)
- FAQ accordion (open/close per item, aria-expanded)
- Before/After drag slider (mousedown/touchstart, mousemove/touchmove, mouseup/touchend)
- Contact form → on submit opens WhatsApp with pre-filled message, shows success state
- Mobile hamburger nav (scroll lock on body, ESC close, resize handler at 1100px)
- WaFab — floating WhatsApp action button (fixed position, all pages)

**Target Users:**

- Primary: Brides aged 18–35 from Lahar, Bhind, Gwalior, Morena (Madhya Pradesh)
- Secondary: Mothers of brides, families booking on behalf
- Device reality: Mid-range Android phones (Redmi, Realme), Chrome browser, 4G/weak WiFi
- Behavior: WhatsApp-native, not form-comfortable, price-sensitive, local language comfort

**Device Targets:** 320px · 375px · 390px · 768px · 1024px · 1440px
**Browser Targets:** Chrome Android (primary) · Safari iOS · Chrome Desktop · Firefox · Edge · Samsung Internet
**Language:** English (primary), Hindi text in some image assets

---

## YOUR TASK

Perform a complete QA audit of ankitsahnimakeover.com covering all applicable testing
types listed below. For each finding report:

- ✅ PASS / ❌ FAIL / ⚠️ WARNING
- Severity: Critical / High / Medium / Low
- Section of the page affected
- Description of the issue
- Exact recommended fix

---

## TESTING SCOPE

---

### PART A — FUNCTIONAL TESTING

#### A1. Core Functionality (Black Box Testing)

Test all features purely from a user perspective — no code knowledge assumed.

- Hero CTA "Book Your Bridal Look →" scrolls to #packages section
- Hero CTA "View Portfolio" scrolls to #gallery section
- All 8 nav links scroll to correct sections smoothly
- Nav logo click scrolls to top (#home)
- "Book Now" button in nav scrolls to #contact
- All gallery filter chips (All / Bridal / Hair / Skin / Lehenga Rentals) show correct items
- FAQ items open and close on click
- Before/After slider moves on mouse drag (desktop) and touch drag (mobile)
- Contact form validates required fields (Name, Phone) before submit
- Contact form success state shows after submit
- "Send another" button resets form to empty state
- WaFab button is clickable and opens WhatsApp

#### A2. WhatsApp Integration Testing (Highest Priority — Integration Testing)

Every single WhatsApp CTA must be tested. This is the entire revenue funnel.

- Hero "Book Your Bridal Look →" → scrolls to #packages section (not a WhatsApp link)
- Makeup Type — Bridal "Enquire on WhatsApp" → message says "Bridal Makeup"
- Makeup Type — Engagement "Enquire on WhatsApp" → message says "Engagement Makeup"
- Makeup Type — Party "Enquire on WhatsApp" → message says "Party Makeup"
- Lehenga "Browse The Rack →" → message says "browse the lehenga rental collection"
- Lehenga "Book A Fitting" → message says "book a lehenga fitting"
- Package — Glow Bride enquiry → message includes "Glow Bride" + "₹25,500"
- Package — Royal Bride enquiry → message includes "Royal Bride" + "₹33,000"
- Package — Radiant Bride enquiry → message includes "Radiant Bride" + "₹29,500"
- FAQ sticky CTA "WhatsApp Ankit →" → generic enquiry message
- Contact panel WhatsApp button → "discuss a bridal booking" message
- Contact form submit → WhatsApp opens with assembled message (name + phone + service + brief)
- WaFab → opens WhatsApp with studio number
- All links: correct phone number (919098888134), no typos
- All links: special characters (₹, +, spaces) URL-encoded correctly
- All links: open in new tab without triggering browser popup blockers
- On mobile: links open WhatsApp app directly (not web.whatsapp.com)

#### A3. Google Maps Integration Testing

- Map iframe in contact section loads correctly
- Coordinates (26.1957212, 78.9417381) point to correct Lahar location
- Map is interactive (zoom, pan) within iframe
- Map loads on slow connections (has `loading="lazy"`)
- Map title attribute present for accessibility

#### A4. Analytics Integration Testing

- GA4 tag (G-6X2DWJX8SW) fires on page load — verify in GA4 Realtime or browser Network tab
- Vercel Analytics script loads without errors
- Neither analytics script blocks page render
- No console errors from analytics on load

#### A5. Smoke Testing (Run after every deployment)

Quick 5-minute check to confirm site is alive after any Vercel deploy:

- Site loads at ankitsahnimakeover.com (200 response)
- Site loads at www.ankitsahnimakeover.com (redirects correctly)
- Hero section visible
- Nav renders
- At least one WhatsApp CTA works
- No white screen / hydration error in console
- GA4 fires one pageview event

#### A6. Sanity Testing (Run after targeted bug fixes)

After fixing a specific component, test only that component and its neighbours:

- After form fix: test form submit, success state, reset
- After nav fix: test hamburger, all links, active state
- After gallery fix: test all 5 filters, image load, animation
- After slider fix: test drag at 0%, 50%, 100% on desktop and mobile

#### A7. Regression Testing (Run after any code change)

Confirm nothing broken by a new change:

- All 14 WhatsApp CTAs still work
- All 8 nav links still scroll correctly
- Gallery filter still works
- Contact form still submits to WhatsApp
- Mobile hamburger still opens/closes
- No new console errors introduced
- Page still loads under 3s on simulated 4G

#### A8. End-to-End (E2E) Testing

Test complete user journeys from arrival to conversion:

**Journey 1 — Bridal Package Enquiry:**
Land on homepage → read hero → scroll to packages → click "Book Royal Bride" →
WhatsApp opens with correct message → PASS if message is correct and WhatsApp opens

**Journey 2 — Lehenga Rental:**
Land → scroll to lehenga section → click "Browse The Rack" →
WhatsApp opens with lehenga enquiry message → PASS

**Journey 3 — Contact Form:**
Land → scroll to contact → fill name + phone + service → submit →
WhatsApp opens with full message → success state shows → PASS

**Journey 4 — Mobile Bride:**
Open on 375px Chrome Android → load hero → tap hamburger → navigate to Packages →
close menu → scroll to packages → tap "Enquire on WhatsApp" → WhatsApp app opens → PASS

**Journey 5 — Gallery Browse:**
Land → scroll to gallery → click "Bridal" filter → see only bridal images →
click "All" → see all 9 images → PASS

#### A9. Acceptance Testing / UAT Checklist

For Ankit (studio owner) to verify before sign-off:

- [ ] My phone number is correct everywhere (+91 90988 88134)
- [ ] Studio address is correct (Main Road, Ward No 12, Lahar, Dist. Bhind, MP 477445)
- [ ] Hours are correct (10:30 AM – 8:00 PM, every day)
- [ ] All 3 package prices are correct and match what I charge
- [ ] My team photos (Kusum, Ankit, Harshita) are correct
- [ ] The before/after photos are real work from the studio
- [ ] The testimonials (Riya, Priyanka, Ayesha) are real clients I recognise
- [ ] The celeb/award images are authentic and I approve their use
- [ ] WhatsApp messages sound professional when I receive them
- [ ] The Google Maps pin is pointing to the right location
- [ ] The Instagram follower count shown (50K) matches my actual count
- [ ] Google review count (163) and rating (4.8) are current

---

### PART B — UI & UX TESTING

#### B1. Visual Design & UI Testing

- Background (#0D0B0A) consistent — no white flash between sections
- Film-grain noise texture (body::before) renders at correct opacity (0.55)
- Gold color hierarchy correct: #D4AF7A primary, #C9956C accent
- Oval and arch image frames render without clipping or overflow
- Section spacing consistent (140px desktop, reduced on mobile)
- Package grid: Royal Bride featured card visually distinct (badge, border, different bg)
- Stats row: 4 stats evenly spaced, values prominent
- Team oval portraits: consistent size and crop
- Celeb grid: 6 small ovals aligned
- No overlapping elements at any viewport
- Loader screen ("Ankit Sahni / Bridal Beauty · Est. 1994") — animates out, not stuck

#### B2. Typography Testing

- Cormorant Garamond loads before first paint — no FOUT (flash of fallback serif)
- Pinyon Script renders correctly for script accents
- JetBrains Mono renders for nav and eyebrow labels at 11px — legible
- Font size scale: H1 (hero, large clamp) → H2 (section heads, clamp 64–104px) → H3 → 14px body → 11px caption
- Hero title `.it` (italic) and `.sc` (Pinyon script) variants display correctly
- No orphaned words at 320px on any heading
- Letter-spacing on mono text (0.32em) readable on all screens
- Line heights comfortable for mobile reading

#### B3. Color & Contrast (WCAG 2.1 AA)

- Ivory (#F5F0E8) on near-black (#0D0B0A): must meet 4.5:1 — measure and report ratio
- Muted (#9A8D7E) on near-black: measure exact ratio — likely borderline, report
- Gold (#D4AF7A) on near-black: large heading text needs 3:1 — measure and report
- Eyebrow text (gold, 11px): small text needs 4.5:1 — measure and report
- Form placeholder text: likely fails contrast — measure and flag
- Package price values on featured card background — check contrast on different bg
- Active nav link (gold on dark): measure contrast
- "GST extra" muted note — measure contrast
- Color must NOT be the only indicator: active gallery chip, open FAQ item, active nav link
  — each needs a non-color indicator (underline, border, size change)

#### B4. Responsive & Mobile Testing

Test every section at 320px / 375px / 390px / 768px / 1024px / 1440px:

- **320px:** Hero title no overflow, portrait layout collapses, both CTA buttons readable
- **375px:** Stats 2×2 or stacked — no truncation. Package prices visible. FAQ two-column → single.
- **768px:** Nav collapses to hamburger at ≤1100px. Craft 2×2 grid. Team grid wraps.
- **1024px:** Section layouts transition from mobile to desktop versions cleanly.
- **1440px:** Container max-width respected (1440px), gutter (48px) consistent.
- No horizontal scroll at any breakpoint
- Touch targets minimum 44×44px: all buttons, filter chips, WhatsApp CTAs, nav links
- Images scale correctly — no stretching, no overflow from oval/arch clips
- Map iframe stays within contact section bounds on 320px
- Packages: all 3 cards readable, prices visible, CTAs full-width on mobile
- Before/After slider: drag handle large enough for thumb tap on 320px

#### B5. Cross-Browser Testing

- **Chrome Android (primary market):** Full visual render, backdrop-filter blur on nav, WhatsApp links open app
- **Samsung Internet:** Layout holds, WhatsApp opens, no broken CSS
- **Safari iOS:** scroll-behavior:smooth may not work on older iOS — nav links still navigate
- **Chrome Desktop:** All hover states, slider drag, gallery filter
- **Firefox Desktop:** backdrop-filter fallback (no blur on nav) — verify fallback acceptable
- **Edge Desktop:** Full layout, no CSS regressions
- Report any rendering differences per browser

#### B6. UX & Usability Testing

Test as a first-time bride from Lahar visiting on her phone:

- Is the primary CTA ("Book Your Bridal Look") immediately visible above the fold?
- Can she find the package prices within 10 seconds without scrolling?
- Is the phone number findable without searching?
- Does the WhatsApp button (WaFab) stay visible while scrolling?
- Is the contact form simple enough — does she know what to fill?
- After submitting the form, does she know her message was sent?
- On mobile, is the hamburger menu icon obviously a menu?
- Can she find studio hours without going to the FAQ?
- Is the Gallery filter intuitive — does she understand the chips?
- Does the Before/After slider have a clear affordance to drag?
- Are the package names ("Glow Bride", "Royal Bride") meaningful to her?
- Is there a clear next action on every section (no dead ends)?

#### B7. Animation & Micro-Interaction Testing

- Loader animation: completes and dismisses — does not permanently block content
- Spark SVG animations (hero decorations): smooth, not jittery on Android
- Stats counter (data-count): triggers on scroll, counts up cleanly
- Marquee: continuous scroll, no stutter, no gap in loop
- Reveal stagger animations: trigger once per scroll-into-view, not on every scroll event
- Gallery filter transition: re-render feels instant (< 100ms perceived)
- FAQ open/close: answer appears without layout jump
- Before/After handle: smooth drag, no lag on mobile
- Package hover states (desktop): subtle lift or glow
- `prefers-reduced-motion` media query: all animations disabled for users who opt out
- No CLS (Cumulative Layout Shift) from any animation

---

### PART C — PERFORMANCE TESTING

#### C1. Core Web Vitals (Critical for MP Mobile Users)

This audience is on mid-range Android, 4G/weak WiFi. Performance = conversions.

- **LCP (Largest Contentful Paint):** Hero portrait image or H1. Target < 2.5s on 4G.
  Check: Is the LCP image preloaded? Does Next/Image add `priority` prop to hero images?
- **CLS (Cumulative Layout Shift):** Target < 0.1.
  Check: Font load shift, oval/arch frame shift before image load, loader animation shift.
- **INP (Interaction to Next Paint):** Gallery filter re-render. Target < 200ms.
- **FCP (First Contentful Paint):** Target < 1.8s. Check loader screen doesn't delay FCP.
- **TTFB (Time to First Byte):** Vercel Edge — should be < 200ms globally.

#### C2. Asset Performance

- Hero images (3 portraits): are they appropriately sized for display dimensions?
- All images served as .webp (already converted) — verify no .jpg/.png slipping through
- Fonts: 8 Cormorant variants + Pinyon + JetBrains + Inter loaded — are unused weights dropped?
- `next/image` lazy loading: below-fold images should not load on initial page load — verify
- `priority` prop on hero images: LCP images should have `priority={true}` — check if present
- Bundle size: `'use client'` on page.tsx sends full JS to client — check bundle size in Vercel build output
- Noise texture SVG data URI in CSS: does it add meaningful KB to stylesheet?
- Google Maps iframe: has `loading="lazy"` attribute — verify
- GA4 script: loads async, does not block render — verify

#### C3. Reliability & Stability Testing

- Deploy 3 consecutive times via git push — each deploy results in working site
- After Vercel deploy, run smoke test (A5) within 2 minutes
- Page loads consistently on 5 consecutive hard refreshes — no intermittent hydration errors
- Gallery filter works consistently across 20 rapid filter changes
- Mobile nav opens/closes correctly across 10 consecutive taps
- Before/After slider: 50 rapid drags — no memory leak, no freeze
- Form: submit → reset ("Send another") → submit again — works on second attempt

---

### PART D — SECURITY & PRIVACY TESTING

#### D1. Security Testing (Grey Box)

Given no backend, attack surface is minimal. Test what exists:

- Contact form: does submitting `<script>alert(1)</script>` as name cause any XSS?
  (WhatsApp encodes the URL — verify the encoding is correct, not executed)
- Open redirect: WhatsApp links only redirect to wa.me — no user-controlled redirect targets
- Clickjacking: is `X-Frame-Options` or `Content-Security-Policy` header set by Vercel?
- Mixed content: all resources (fonts, images, scripts) served over HTTPS — no HTTP assets
- Console: no API keys, tokens, or sensitive data logged to browser console
- `.env.local` file not accessible at ankitsahnimakeover.com/.env.local (should 404)
- Source maps: are source maps exposed in production? Check Network tab for .map files.

#### D2. Privacy & Compliance Testing

- GA4 is active — does the site have a Privacy Policy / Cookie Notice?
  (Indian IT Act 2000 + PDPB considerations — at minimum a basic privacy note is recommended)
- Google Analytics collects IP addresses by default — is IP anonymization enabled in GA4?
- Vercel Analytics: privacy-friendly by default — confirm no PII collected
- Contact form collects name + phone — where does this data go?
  (Currently: only to WhatsApp on the user's own device — no server storage. Document this.)
- No third-party tracking pixels beyond GA4 and Vercel Analytics — verify in Network tab
- WhatsApp links: pre-filled messages contain user-provided data only after they type it — no auto-collection

#### D3. Vulnerability Testing (Basic)

- No admin panel or CMS exposed at /admin, /studio (note: /studio is Sanity — verify it requires auth)
- Sanity Studio at /studio: confirm it requires Sanity login, is not publicly writable
- No sensitive files exposed: /package.json, /.env, /next.config.ts should not be publicly readable
- Dependency audit: `npm audit` — report any high/critical vulnerabilities in production dependencies

---

### PART E — ACCESSIBILITY TESTING (WCAG 2.1 AA)

#### E1. Semantic Structure

- `<html lang="en">` present
- Page has correct landmark regions: `<nav>`, `<main>`, `<footer>`
- Heading hierarchy: one H1 (hero) → H2 per section → H3 in cards — no skipped levels
- No duplicate H1s
- Sections use `<section>` with `id` attributes for anchor navigation
- Skip navigation link: is one present for keyboard users to skip nav?

#### E2. Screen Reader Compatibility

- Decorative SVGs (Spark, MiniSpark, MarqueeAst) have `aria-hidden="true"`
- FAQ accordion buttons have `aria-expanded` that updates on open/close
- Nav hamburger button has `aria-label="Toggle menu"` and `aria-expanded`
- Before/After slider handle: does it have an accessible label for screen readers?
- Gallery filter buttons: do they announce active state to screen readers?
- Form fields: all inputs have associated `<label>` elements (not just placeholder text)
- Form required fields: `required` attribute present, announced by screen reader
- Contact map iframe has `title` attribute
- WhatsApp CTAs: link text is descriptive (not just "Click here")
- Image alt text: all non-decorative images have descriptive, keyword-relevant alt text

#### E3. Keyboard Navigation

- Full page navigable by Tab key alone — no keyboard traps
- Mobile hamburger: keyboard accessible (Enter/Space opens, ESC closes)
- FAQ items: operable by keyboard
- Gallery filters: operable by keyboard
- Before/After slider: operable by keyboard (arrow keys to move handle?)
- Contact form: logical tab order (Name → Phone → Date → Service → Brief → Submit)
- Focus indicators: visible on all interactive elements — not hidden by CSS outline:none
- After mobile menu closes, focus returns to hamburger button

#### E4. Localization / Internationalization

- Primary language: English — all text in English, no mixed-language UI copy
- Hindi context: target audience speaks Hindi — are any critical instructions too formal/complex?
- Phone number format: +91 90988 88134 — international format, correct for Indian users
- Currency: ₹ symbol renders correctly on all browsers and OSes
- Dates in form: DD/MM/YY format appropriate for Indian users — placeholder matches expectation
- Address: Indian postal format (Street, City, Dist., State, PIN) — correct
- WhatsApp pre-fill messages: professional Hindi-compatible phrasing ("Hi Ankit" — appropriate register)
- Images with Hindi text or regional aesthetics render correctly on all platforms

---

### PART F — DEPLOYMENT & CONFIGURATION TESTING

#### F1. Deployment / Installation Testing

- Vercel deploy completes without build errors
- `npm run build` completes locally without TypeScript errors
- `next-sitemap` postbuild step generates sitemap.xml correctly
- Environment variables: no required env vars missing in Vercel project settings
- All image files (including filenames with spaces: `Red Lehnga.webp`, `lehnga 1.webp`,
  `Bhumika Behal.webp`) deploy and serve correctly via Next/Image
- Custom domain (ankitsahnimakeover.com) resolves correctly after deploy
- www. redirect to non-www (or vice versa) — consistent, no redirect loop
- HTTPS enforced — HTTP redirects to HTTPS

#### F2. Configuration Testing

- `next.config.ts` — no misconfigurations blocking image optimization or routes
- `next-sitemap.config.js` — generates correct URLs, no excluded paths that should be included
- `robots.txt` — Googlebot allowed, no critical paths blocked
- Sanity config (`sanity.config.ts`) — Studio accessible at /studio, correct project ID
- `tsconfig.json` — path alias `@/` resolves correctly to project root
- GA4 Measurement ID in code matches the property created in Google Analytics

#### F3. SEO Configuration

- `sitemap.xml` accessible at /sitemap.xml with correct URLs
- `robots.txt` accessible at /robots.txt
- Canonical URLs correct (https://ankitsahnimakeover.com, no trailing slash inconsistency)
- OG image (`/og-image.jpg`): 1200×630px, renders correctly when URL shared on WhatsApp
- LocalBusiness schema: name, URL, phone, address, geo, hours, rating — all accurate
- FAQPage schema: 7 questions match the actual on-page FAQ content exactly
- No `noindex` meta tag accidentally present in production
- Page title and meta description present and within character limits

---

### PART G — EXPLORATORY & EDGE CASE TESTING

#### G1. Exploratory Testing

Test freely — act as a curious user trying to break things:

- Rapidly open and close the mobile menu 10 times — does body scroll unlock correctly every time?
- Scroll to the bottom and then immediately click a nav link to the top — smooth?
- Fill the contact form, hit submit, then immediately hit back — what happens?
- Open 3 FAQ items rapidly — do they all stay open or does each close the previous?
- Drag the Before/After slider all the way left (0%) — what does the page look like?
- Drag all the way right (100%) — what does the page look like?
- Resize the browser from 1440px to 320px while the mobile menu is open — does it close?
- Tap a gallery filter chip that results in only 1 item — does the grid hold?
- Enter a very long name in the contact form (100+ characters) — does layout break?
- Enter a message with line breaks in the brief textarea — does WhatsApp receive them?
- Tap the WaFab button while the mobile menu is open — does menu close first?

#### G2. Edge Cases

- Contact form: submit with only required fields (Name, Phone), leave all optional fields empty —
  WhatsApp message assembles correctly without empty lines
- Package ₹ symbol in WhatsApp URL: verify `₹25,500` encodes and decodes correctly in WhatsApp
- Gallery "Skin" filter: only 1 item matches — grid renders as 1 item, not broken
- Testimonials section with 3 cards on 320px — last card not cut off
- Stats counter: page loaded with stats already in view (no scroll trigger) — counters still fire?
- Very slow connection (3G): do images show empty space before loading, or placeholder?
  Any layout shift when images load in?
- JavaScript disabled: page renders blank (expected for 'use client') — acceptable, document
- Cookie/localStorage blocked: GA4 may fail silently — site still functions

---

## OUTPUT FORMAT

Structure your complete audit response as:

### 1. Executive Summary

- Overall health score (0–100)
- Top 3 critical issues that could lose a booking today
- WhatsApp funnel status: ✅ FULLY WORKING / ❌ BROKEN / ⚠️ PARTIALLY BROKEN
- Accessibility score estimate (WCAG 2.1 AA compliance %)
- Performance grade (A/B/C/D/F based on Core Web Vitals)

### 2. Findings Table

| #   | Category | Section | Issue | Severity | Status | Fix |
| --- | -------- | ------- | ----- | -------- | ------ | --- |

### 3. Quick Wins (fixable in under 30 minutes each)

Format: **Issue** → **Exact fix** → **Time estimate**

### 4. High Priority Fixes

Issues affecting WhatsApp conversions, mobile usability, or accessibility.
Detail the user impact, not just the technical description.

### 5. Content Accuracy Report

Flag any factual claims that need verification by the studio owner.

### 6. Recommendations

Long-term UX, SEO, and performance improvements beyond immediate bug fixes.
Prioritise by impact on bookings.

---

## AUDIT PHILOSOPHY

This is not a generic website. It is the digital storefront for a 30-year-old bridal studio
in a tier-3 Indian town where every bride knows every other bride. One bride who has a bad
mobile experience and can't find the WhatsApp button tells ten others.

Test as that bride — on a Redmi Note, on 4G, deciding between studios.
If she can't tap the WhatsApp button easily, can't read the price, or gets confused by the form —
that is a Critical finding, not a Low.
