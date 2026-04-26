# Ankit Sahni Makeover — Design System
## Canonical Reference · Version 1.0 · Locked April 2026

> This document is the single source of truth for the visual identity of the Ankit Sahni Makeover website.
> Every future change must justify itself against this spec.
> Exceptions require explicit sign-off from Ankur Sahni.

---

## 1. Brand Personality

**Dark luxury editorial.** Think Vogue India meets a high-end Parisian atelier.

- Background: near-black (#0D0B0A) — not dark grey, not navy. Near-black.
- Accent: warm burnished gold — not yellow, not orange, not champagne.
- Texture: fine grain noise overlay + radial top glow. The background is never flat.
- Typography: the contrast between a Cormorant Garamond serif headline (romantic, large) and JetBrains Mono labels (clinical, uppercase) is the core visual tension. Do not dilute it.
- Photography frames: always oval or arch. Never square crop on hero portraits.

**What this is NOT:**
- Not light / pastel / bridal pink / Indian wedding template style
- Not decorative border elements or rangoli motifs
- Not bright white backgrounds
- Not rounded-corner lifestyle cards with colored backgrounds

---

## 2. Color Tokens

All values live in `:root` in `styles.css`. Never hardcode these hex values in components — always use the CSS variable.

```css
--bg:           #0D0B0A   /* primary page background — near-black */
--bg-2:         #14110F   /* footer, elevated surfaces */
--bg-3:         #1A1714   /* tertiary — rarely used directly */
--ink-gold-1:   #C9956C   /* warm burnt gold — CTAs solid, italic spans, script colour */
--ink-gold-2:   #D4AF7A   /* primary gold — headings, borders, active states, logo */
--ink-gold-deep:#8B6A47   /* deep muted gold — eyebrow labels, price labels */
--ink-ivory:    #F5F0E8   /* body copy, form values, readable text on dark */
--ink-mute:     #9A8D7E   /* secondary text, nav links, captions */
--line:         rgba(201,149,108,0.22)  /* subtle separator / card border */
--line-strong:  rgba(212,175,122,0.55) /* hover border, featured package ring */
```

### Semantic Usage Rules

| Colour | Use for | Never use for |
|--------|---------|---------------|
| `--ink-gold-2` | Primary headings, logo, active nav, `.chip.active`, default gold text | Body copy, labels |
| `--ink-gold-1` | Italic/script spans, solid button bg, tag-lines, warm accent | Primary headings |
| `--ink-gold-deep` | Eyebrow date/year labels, price-label, `.mono` utility class | Link colour |
| `--ink-ivory` | Body paragraphs, form inputs, nav phone, WA card title | Background |
| `--ink-mute` | Nav links (inactive), captions, placeholder, stat labels | Anything requiring contrast |
| `--line` | Card borders, dividers, section separators | Solid filled backgrounds |
| `--line-strong` | Hover card borders, button ring, featured package outline | Regular borders |

### Functional Colours (non-token)

```
WhatsApp green gradient:  linear-gradient(145deg, #25D366, #128C7E)
WA icon shadow:           rgba(37,211,102,0.4)
WA border:                rgba(37,211,102,0.4)
Card base:                linear-gradient(160deg, rgba(40,30,22,0.5), rgba(20,15,12,0.7))
Dark text on gold btn:    #14110F
```

---

## 3. Typography

### Font Stack

```html
<!-- In <head> — order matters -->
<link href="https://fonts.googleapis.com/css2?
  family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500
  &family=Pinyon+Script
  &family=Inter:wght@200;300;400;500;600
  &family=JetBrains+Mono:wght@300;400;500
  &display=swap" rel="stylesheet">
```

### Font Roles

| Font | CSS Class | Role |
|------|-----------|------|
| Cormorant Garamond | `.serif` | All section headings (h2), stat values, card h3, testimonial quotes, contact h2 |
| Pinyon Script | `.script` | Logo, script emphasis inside headings (italic tail words) |
| Inter 300 | (default body) | Body copy, form text, paragraphs |
| JetBrains Mono | `.mono` | Eyebrows, tags, chip filters, nav links, labels, footers, price notes |

### Type Scale

```
H1 hero:           clamp(96px, 11vw, 168px)  — Cormorant Garamond 400, line-height 0.86
H2 sec-head:       104px                     — Cormorant Garamond 400, line-height 0.9
H2 featured:        96px                     — Cormorant Garamond 400, line-height 0.9
H2 contact:         88px                     — Cormorant Garamond 400, line-height 0.92
H2 before/after:    80px                     — fs-80 modifier class
H2 testimonials:    88px                     — fs-88 modifier class
H3 packages:        56px                     — Cormorant Garamond 400
H3 craft cards:     32px                     — Cormorant Garamond 400, line-height 1.05
H3 makeup cards:    44px                     — Cormorant Garamond 400, line-height 1.0
H3 team card:       34px                     — Cormorant Garamond 400
H4 award:           22px                     — Cormorant Garamond 400, line-height 1.2
Price/stat value:   64px                     — Cormorant Garamond 400
Marquee:            32px italic              — Cormorant Garamond italic
Eyebrow:            11px, 0.32em tracking    — JetBrains Mono, uppercase
Nav links:          11px, 0.22em tracking    — JetBrains Mono, uppercase
Button:             11px sm / 12px lg        — JetBrains Mono, 0.26em tracking
Tag/chip:           10px, 0.20–0.22em        — JetBrains Mono, uppercase
Body copy:          16–17px, weight 300      — Inter
Form body:          15px, weight 300         — Inter
Small labels:       9–10px                   — JetBrains Mono, uppercase
```

### Typography Classes (from styles.css)

```css
.serif   /* Cormorant Garamond 400 */
.script  /* Pinyon Script — font-family only; colour set by context */
.display /* Cormorant Garamond italic */
.mono    /* JetBrains Mono, 11px, 0.22em tracking, uppercase */
.gold    /* color: var(--ink-gold-2) */
.gold-deep /* color: var(--ink-gold-1) */
.ivory   /* color: var(--ink-ivory) */
.mute    /* color: var(--ink-mute) */
.it      /* font-style: italic */
.sc      /* Pinyon Script inline, 0.85em, translateY(-0.08em) — used in hero h1 */
```

### Section Heading Pattern

Every section (except hero) uses this structure:

```jsx
<div className="sec-head">        {/* grid: 1fr auto, gap 40px, mb 64px */}
  <div>
    <div className="eyebrow">Chapter N · Label</div>
    <h2 className="serif">        {/* CSS .sec-head h2.serif = 104px */}
      Main line,<br/>
      <span className="script">italic tail.</span>   {/* or <span className="it"> */}
    </h2>
  </div>
  <p className="mute">            {/* CSS .sec-head .mute = 14px, max-width 360px */}
    Section description — 1–2 sentences.
  </p>
</div>
```

**Eyebrow pattern:** `"Chapter N · Section Name"` with a 28px gold line prefix (via `::before`).

---

## 4. Image Containers (Shapes)

Three canonical shapes. Never use `<img>` directly without one of these wrappers.

```css
.oval   /* border-radius: 50% / 44% — primary portrait shape */
.arch   /* arched top, mild bottom curve — secondary portrait shape */
.rect   /* clean rectangle with overflow:hidden */
```

All three share: `background: linear-gradient(140deg, #2a2018, #120e0a)`, `border: 1px solid var(--line)`, `box-shadow: 0 30px 80px rgba(0,0,0,0.5)`.

### Ph Component (JSX)

```jsx
<Ph label="Alt text" shape="oval|arch|rect" category="bride|makeup|woman|man" src="optional-url" objectPosition="top|center"/>
```

- `shape` controls which CSS class is applied
- `objectPosition` is the only legitimate inline style remaining (it's a dynamic prop)
- All images: `object-fit: cover`, `width/height: 100%` via `.ph-img` class

### Craft Card images: `aspect-ratio: 0.78/1`
### Gallery stagger:

```
4n+1: aspect-ratio 4/5,  margin-top: 0
4n+2: aspect-ratio 3/4,  margin-top: 32px
4n+3: aspect-ratio 4/5,  margin-top: 64px  (0 at ≤1100px)
4n+4: aspect-ratio 3/4,  margin-top: 0     (32px at ≤1100px 2-col)
```

---

## 5. Layout

```
Max width:   1440px (--max-w)
Gutter:       48px (--gutter)
Container:   .container { max-width: var(--max-w); margin: 0 auto; padding: 0 var(--gutter); }
```

### Grid Patterns

| Section | Grid | Gap |
|---------|------|-----|
| Hero | `1.1fr 0.9fr` | 60px |
| Craft cards | `repeat(4, 1fr)` | 32px |
| Featured lehenga | `1.2fr 1fr` | 80px |
| Packages | `repeat(3, 1fr)` | 24px |
| Gallery | `repeat(4, 1fr)` | 24px |
| Before/After | `repeat(3, 1fr)` | 32px |
| Testimonials | `repeat(3, 1fr)` | 24px |
| Contact | `1fr 1fr` | 80px |
| Stats | `repeat(4, 1fr)` | — |
| Footer | `1.3fr 1fr 1fr 1fr` | 48px |
| Makeup cards (mkup-grid) | repeat 3 col | 24px |
| Team cards | repeat 3 col | varies |

### Section Vertical Rhythm

```
Standard section padding:    140px 0
Featured / BA section:       120px 0
Footer:                       80px 0 40px
Hero:                         80px 0 120px
sec-head margin-bottom:       64px
```

---

## 6. Decorative System

### Asterisk / MiniSpark / Spark (SVG icons)

```jsx
<Asterisk size={N} className="css-class"/>    /* 4-point star, gold-2 default */
<MiniSpark size={N} className="css-class"/>   /* 4-point mini, gold-deep default */
<Spark size={N} color="var(--ink-gold-1)"/>   /* 8-point star, color prop = dynamic */
```

- **`color` prop is the only legitimate inline style** on these components (used dynamically for star ratings)
- All positional styling (position:absolute, offsets) goes in CSS classes

### Positioned Decorator Classes

```css
/* Hero section */
.hero-deco-1     { position: absolute; top: 80px;  left: 42%; }
.hero-deco-2     { position: absolute; top: 180px; left: 30%; }
.hero-deco-3     { position: absolute; top: 380px; right: 8%; }
.hero-deco-4     { position: absolute; bottom: 120px; left: 44%; }
.hero-portrait-deco { position: absolute; top: 280px; left: 240px; }

/* Featured section */
.featured-deco-1 { position: absolute; top: 40px;    right: 80px; }
.featured-deco-2 { position: absolute; bottom: 140px; left: 260px; }
```

### Eyebrow

```css
.eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  color: var(--ink-gold-2);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: .32em; text-transform: uppercase;
}
.eyebrow::before { content: ""; width: 28px; height: 1px; background: var(--ink-gold-2); }
```

### Body Background

```css
body {
  background:
    radial-gradient(ellipse 1600px 600px at 50% -200px, rgba(201,149,108,0.10), transparent 70%),
    var(--bg);
}
body::before {
  /* fractalNoise SVG — opacity 0.55, mix-blend-mode: overlay */
}
```

---

## 7. Components

### Navigation

```
Position: sticky top, z-index 100
Background: rgba(13,11,10,0.72) + backdrop-filter: blur(14px)
Border-bottom: 1px solid var(--line)
Grid: auto 1fr auto, gap 32px, padding 18px 48px
Logo: Pinyon Script 34px, gold-2 / small: JetBrains Mono 9px, mute
Nav links: JetBrains Mono 11px, 0.22em, uppercase, mute → gold-2 on active
Active indicator: 1px gold-2 underline (::after)
CTA button: .btn.sm.solid
```

### Buttons

```css
.btn        /* pill, border: var(--line-strong), gold-2 text, JetBrains Mono 11px */
.btn.solid  /* bg: var(--ink-gold-1), text: #14110F, border: var(--ink-gold-1) */
.btn.sm     /* 10px 18px padding, 10px font */
.btn.lg     /* 20px 36px padding, 12px font */
.btn.block  /* display:block; text-align:center */
.btn-full   /* width:100%; margin-top:6px — form submit only */
```

Hover: `translateY(-1px)` + subtle bg `rgba(212,175,122,0.08)`.

### Cards — Package

```css
background: linear-gradient(160deg, rgba(40,30,22,0.5), rgba(20,15,12,0.7));
border: 1px solid var(--line);
border-radius: 28px;
padding: 40px 36px 36px;
```

Featured: `border-color: var(--ink-gold-2)`, ring shadow, `transform: scale(1.02)`.
Badge: absolute top -14px, centered, solid gold-1, pill, 9px mono.

### Cards — Gallery Item

```css
cursor: pointer;
/* .img */ aspect-ratio varies (stagger), transition: transform .4s
/* meta */ centered, Cormorant italic 18px gold-2, JetBrains Mono 9px mute
```

### Cards — Testimonial

```css
background: linear-gradient(160deg, rgba(40,30,22,0.4), rgba(20,15,12,0.5));
border: 1px solid var(--line);
border-radius: 24px;
padding: 32px 28px;
quote: Cormorant Garamond italic 22px, line-height 1.4, ivory
name: JetBrains Mono 10px, 0.22em, gold-2, uppercase
```

### Chip / Filter

```css
.chip        /* pill, border: var(--line), mute text, JetBrains Mono 10px */
.chip.active /* gold-2 border + text, rgba(212,175,122,0.06) bg */
```

### Form

```css
.form-card  { border-radius: 28px; border: 1px solid var(--line); padding: 44px 40px; }
input/select/textarea:
  background: rgba(20,17,15,0.6); border-radius: 14px; padding: 22px 18px 14px;
  font: Inter 15px 300; border: 1px solid var(--line);
  focus: border-color gold-2 + box-shadow rgba(212,175,122,0.1)
label: JetBrains Mono 9px, 0.22em, gold-2, absolute top:8px left:18px
```

### WhatsApp Card

```css
background: linear-gradient(145deg, rgba(37,211,102,0.1), rgba(20,15,12,0.5));
border: 1px solid rgba(37,211,102,0.4);
border-radius: 20px;
icon: 60×60px circle, linear-gradient(145deg, #25D366, #128C7E), shadow rgba(37,211,102,0.3)
title: Cormorant Garamond italic 24px, ivory
subtitle: JetBrains Mono 10px, 0.22em, mute, uppercase
```

### WhatsApp FAB

```css
position: fixed; right: 32px; bottom: 32px; z-index: 150;
width/height: 64px; border-radius: 50%;
background: linear-gradient(145deg, #25D366, #128C7E);
box-shadow: ring: rgba(13,11,10,0.9) + gold outer ring rgba(212,175,122,0.6)
animation: wapulse 2.4s ease-in-out infinite (scale 1 → 1.06 → 1)
```

### Stats Strip

```css
grid: repeat(4, 1fr), padding 56px 0
border-top + border-bottom: 1px solid var(--line)
value: Cormorant Garamond 64px, gold-2
label: JetBrains Mono 10px, 0.28em, mute, uppercase, margin-top 10px
divider: border-right 1px var(--line) (last: none)
```

### Marquee

```css
padding 28px 0; border-top + border-bottom: 1px solid var(--line);
animation: scroll 40s linear infinite (translateX 0 → -50%)
item: Cormorant Garamond 32px italic, ivory
separator: <Asterisk size={14} className="marquee-ast"/> (margin-left: 40px)
```

### Before/After Slider

```css
.ba { aspect-ratio: 4/5; border-radius: 20px; border: 1px solid var(--line); }
handle: 2px wide, gold-2, box-shadow glow, ew-resize cursor
handle::after: 42×42px circle, gold-2 bg, dark text "‹ ›"
after panel bg: diagonal stripe + radial glow + dark base (CSS .ba .after.ph)
clipPath: inset(0 0 0 var(--split, 50%)) — JS-driven via CSS custom property
```

### Footer

```css
background: var(--bg-2); padding: 80px 0 40px;
grid: 1.3fr 1fr 1fr 1fr, gap 48px
logo: Pinyon Script 48px, gold-2
h4: JetBrains Mono 10px, 0.28em, gold-2, uppercase
links: Inter 14px 300, ivory → gold-2 on hover
sig: JetBrains Mono 10px, 0.28em, mute, centered, padding-top 48px, margin-top 64px, border-top
```

---

## 8. Motion

| Element | Transition | Value |
|---------|-----------|-------|
| Craft card hover | transform | `translateY(-6px)` .35s |
| Package card hover | transform + shadow | `translateY(-6px)` .3s |
| Gallery item hover | transform | `translateY(-4px)` .4s |
| Button hover | transform + bg | `translateY(-1px)` .25s |
| WA card hover | transform | `translateY(-2px)` .25s |
| WA FAB | pulse animation | scale 1↔1.06, 2.4s infinite |
| Fade in | fadeUp keyframe | opacity 0→1 + translateY 16px→0, .6s ease-out |
| Nav link | color | .2s |
| Footer link | color | .2s |

Scroll animations (enhance.js): `reveal`, `reveal-oval`, `reveal-stagger` trigger on IntersectionObserver.

---

## 9. Responsive Breakpoints

**Single breakpoint at 1100px.** No mobile-specific breakpoint in styles.css — refine.css adds 640px.

### ≤ 1100px (Tablet)

```
hero-grid → 1 column
featured-grid → 1 column
contact-grid → 1 column
craft-grid → 2 columns
pkg-grid → 1 column
gallery-grid → 2 columns
ba-grid → 1 column
test-grid → 1 column
stats → 2×2 grid
footer-grid → 2×2 grid
nav-center → display:none (hide links)
hero h1 → clamp(64px, 12vw, 110px)
.pkg.featured-pkg → transform:none (no scale lift)
gallery stagger corrected for 2-col
```

### ≤ 640px (Mobile — refine.css)

```
hero padding: 40px 0 48px
gallery-grid → 1 column, all stagger margins = 0
stats → 32px 0 padding, stat → 16px 20px
footer-sig → padding-right:80px (WA FAB clearance)
marquee → 22px font, 32px gaps
awards → celeb sub-section margin-top: 56px
contact info grid → 1 column
```

---

## 10. CSS Class Reference

### Layout / Structure (styles.css)

```
.container          max-width 1440px, auto margin, 48px gutter
.sec-head           grid 1fr auto, gap 40px, mb 64px
.eyebrow            gold-2 mono label with line prefix
```

### Typography (styles.css)

```
.serif   .script   .display   .mono   .sans
.gold    .gold-deep   .ivory   .mute
.it      .sc
```

### Section-specific (styles.css)

```
.hero .hero-grid .hero-portraits .hero-lede .hero-cta .hero-decor
.craft .craft-grid .craft-card
.featured .featured-grid .featured-imgs .featured-tags .tag
.pkgs .pkg-grid .pkg .pkg.featured-pkg .pkg .badge
.gallery .gallery-filters .chip .chip.active .gallery-grid .gallery-item
.ba-section .ba-grid .ba
.testimonials .test-grid .test-card
.contact .contact-grid .contact-left .contact-card-wa .form-card
.stats .stat
.footer .footer-grid .footer-logo .footer-sig
.wa-fab
.marquee .marquee-track .marquee-item
.oval .arch .rect .ph .ph-img .spark
.btn .btn.solid .btn.sm .btn.lg .btn.block .btn-full
```

### Added by refine.css (v5)

```
/* Section headings */
.sec-head h2.serif         104px heading — all sections
.sec-head h2.serif.fs-80   80px variant
.sec-head h2.serif.fs-88   88px variant
.sec-head h2 .it           gold-1 italic span
.sec-head h2 .script       gold-1 + 1.1em script span
.sec-head h2 .script-lg    1.25em variant
.sec-head .mute            14px section description

/* Decorative positions */
.hero-deco-1 through .hero-deco-4
.hero-portrait-deco
.featured-deco-1 .featured-deco-2
.marquee-ast

/* Component internals */
.featured-btns             flex CTA row
.mkup-meta                 flex header row in makeup card
.mkup-body h3.serif        44px makeup card title
.mkup-body h3.serif .it    italic sub in makeup title
.mkup-body hr              1px gold-line divider
.mkup-price-label          9px price header
.mkup-price-val            40px price value
.mkup-price-note           10px pricing note
.mkup-body .btn.block      display:block + margin-top:24px

.team-card h3.serif        34px name
.team-card .team-title     10px mono gold-1 title
.team-card .team-bio       13px bio

.award-year                9px mono year
.award-card h4.serif       22px award title
.award-card .award-body    12px body text

.celeb-sec-head            margin-top:120px
.celeb-card .celeb-name    20px serif gold-2
.celeb-card .celeb-caption 11px mono caption

.ba .after.ph              static background (diagonal stripe + glow)
.ba-after-label            rgba(245,240,232,0.5) after-label text

.contact-info              40px top, 2-col grid, gap 28px
.contact-info-val          15px address/hours text
.form-success              centered success state
.form-success h3           48px success heading
.form-success .ivory       15px success copy
.form-success .btn         margin-top:24px
.form-desc                 13px form description
.form-privacy              10px privacy note mono

.footer-desc               13px footer paragraph
.footer-sig-ast            margin-right:10px, vertical-align:middle
.nav-logo                  22px, white-space:nowrap (overrides Pinyon Script size for nav)
```

---

## 11. Inline Style Rules

**Zero hardcoded inline `style={{}}` are permitted for layout, colour, or typography.**

The only `style={{}}` allowed in JSX are legitimately dynamic (JS state or prop-driven):

| Location | Inline style | Why it must stay inline |
|----------|-------------|------------------------|
| `BASlider` div.ba | `style={{ '--split': split + '%' }}` | CSS custom property from React state |
| `BASlider` div.after | `style={{ clipPath: \`inset(0 0 0 ${split}%)\` }}` | Derived from JS state |
| `Ph` img | `style={{ objectPosition }}` | Prop value — dynamic per usage site |
| `Spark/MiniSpark/Asterisk` span | `style={{ color: color \|\| 'var(--...)' }}` | `color` prop used dynamically (star ratings) |
| `app.jsx` color inputs | inline style on `<input type="color">` | Live color picker values |

Any other `style={{}}` found in JSX is a bug to be fixed.

---

## 12. File Structure

```
ankitsahnimakeover (Remix)/
├── Ankit Sahni Makeover.html   # Entry — loads styles.css?v=5, refine.css?v=5
├── styles.css                  # Core design system — DO NOT EDIT casually
├── refine.css                  # Overrides, responsive fixes, inline-style replacements
├── enhance.js                  # Scroll reveals, counter animations, WA FAB
├── app.jsx                     # Root — Nav, WaFab, Tweaks, section assembly
├── parts.jsx                   # Shared: Spark, MiniSpark, Asterisk, Ph, Nav, WaFab, Marquee
├── sec-hero.jsx                # Hero + Stats
├── sec-craft.jsx               # Craft cards + Featured Lehenga
├── sec-packages.jsx            # Package cards
├── sec-makeups.jsx             # Makeup types (Bridal/Engagement/Party)
├── sec-about.jsx               # Team + About story
├── sec-awards.jsx              # Awards + Celebrity clients
├── sec-gallery.jsx             # Gallery + Before/After + Testimonials
└── sec-contact.jsx             # Contact form + Footer
```

**CSS load order:** `styles.css` → `refine.css`. refine.css always wins on conflicts. Never put design tokens in refine.css — they live in styles.css `:root`.

**Cache busting:** bump `?v=N` in HTML link tags after any CSS edit.

---

## 13. Do Not

- Do not use `!important` for layout or typography. Fix specificity properly.
- Do not use inline `style={{}}` for hardcoded values. Add a CSS class.
- Do not change background from near-black (#0D0B0A) to any lighter value.
- Do not add pastel, pink, or warm-white colour accents.
- Do not use square-cropped images for portraits — always oval or arch.
- Do not change font families. The four-font stack (Cormorant / Pinyon / Inter / JetBrains Mono) is locked.
- Do not add new Google Font imports.
- Do not add borders with full opacity — always use `var(--line)` or `var(--line-strong)`.
- Do not add box shadows with white or light colours — shadows are always dark rgba.
- Do not change section padding below 80px on desktop.
- Do not use `border-radius` below 14px on cards or 999px on pills.
- Do not add new breakpoints without documenting them here.

---

*Compiled from living source: styles.css + refine.css + 9 JSX section components. April 2026.*
