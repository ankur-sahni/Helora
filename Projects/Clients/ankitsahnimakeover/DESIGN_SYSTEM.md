# Ankit Sahni Makeover — Design System
## Canonical Reference · Version 2.0 · May 2026

> This document is the single source of truth for the visual identity of the Ankit Sahni Makeover website.
> **Design reference:** `localhost:8090` (remix static site — read-only, do not edit)
> **Implementation target:** `ankitsahnimakeover-nextjs` (Next.js — all code changes go here)
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

All values live in `:root` in `styles.css` / `globals.css`. Never hardcode hex values in components — always use the CSS variable.

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
--max-w:        1440px
--gutter:       48px       /* 32px at ≤1100px, 20px at ≤640px */
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
Featured section bg:      radial-gradient(1400px 600px at 70% 40%, rgba(201,149,108,0.18), transparent 65%),
                          radial-gradient(900px 400px at 10% 80%, rgba(139,106,71,0.16), transparent 65%),
                          linear-gradient(180deg, #1a130c 0%, #0a0705 100%)
Stats strip bg:           linear-gradient(90deg, transparent, rgba(212,175,122,0.04), transparent)
Selection bg:             rgba(212,175,122,0.85)  — dark text #14110F
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
H1 hero:           clamp(80px, 9vw, 144px) — Cormorant Garamond 500, lh 0.95, ls -0.02em
H2 sec-head:       104px                   — Cormorant Garamond 400, lh 0.9, gold-2
H2 featured:       120px                   — Cormorant Garamond 400
H2 fs-80 variant:  80px                    — modifier class .fs-80
H2 fs-88 variant:  88px                    — modifier class .fs-88
H3 makeup cards:   44px                    — Cormorant Garamond 400, lh 1.0
H3 craft cards:    32px                    — Cormorant Garamond 400, lh 1.05
H3 team card:      34px                    — Cormorant Garamond 400
H4 award:          22px                    — Cormorant Garamond 400, lh 1.2
Price/stat value:  72px                    — Cormorant Garamond 400, gold-2
Marquee:           32px italic             — Cormorant Garamond italic (22px at ≤640px)
Eyebrow:           11px, 0.32em tracking   — JetBrains Mono, uppercase (9px at ≤640px)
Nav links:         11px, 0.22em tracking   — JetBrains Mono, uppercase
Button:            11px sm / 12px lg       — JetBrains Mono, 0.26em tracking
Tag/chip:          10px, 0.20–0.22em       — JetBrains Mono, uppercase
Body copy:         16–17px, weight 300     — Inter
Form body:         15px, weight 300        — Inter
Form inputs:       font-size: 16px         — MANDATORY — prevents iOS auto-zoom
Small labels:      9–10px                  — JetBrains Mono, uppercase
```

### Typography Utility Classes

```css
.serif   /* Cormorant Garamond 400 */
.script  /* Pinyon Script — font-family only; colour set by context */
.display /* Cormorant Garamond italic */
.mono    /* JetBrains Mono, 11px, 0.22em tracking, uppercase */
.sans    /* Inter */
.gold    /* color: var(--ink-gold-2) */
.gold-deep /* color: var(--ink-gold-1) */
.ivory   /* color: var(--ink-ivory) */
.mute    /* color: var(--ink-mute) */
.it      /* font-style: italic */
.sc      /* Pinyon Script inline, 0.85em, translateY(-0.08em) — used in hero h1 */
```

### Typography Refinements (implementation guidelines)

```css
/* Apply to headings */
h1, h2, h3 { text-wrap: balance; }

/* Apply to body copy */
p { text-wrap: pretty; }

/* Apply to body tag */
body { font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1; }

/* Selection highlight */
::selection { background: rgba(212,175,122,0.85); color: #14110F; }

/* Placeholder */
::placeholder { color: var(--ink-mute); opacity: 0.6; }
```

### Section Heading Pattern

Every section (except hero) uses this structure:

```jsx
<div className="sec-head">        {/* grid: 1fr auto, gap 40px, mb 64px */}
  <div>
    <div className="eyebrow">Chapter N · Label</div>
    <h2 className="serif">        {/* .sec-head h2.serif = 104px */}
      Main line,<br/>
      <span className="script">italic tail.</span>
    </h2>
  </div>
  <p className="mute">            {/* 14px, max-width 360px */}
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

**Shape fill rule:** Always `width: 100%; height: 100%` — shapes fill their parent container, never size from content.

### Rim + Spotlight Pseudo-elements

```css
/* Gold gradient rim via mask technique */
.oval::before, .arch::before, .rect::before {
  content: ""; position: absolute; inset: -1px;
  border-radius: inherit; padding: 1px;
  background: linear-gradient(145deg,
    rgba(212,175,122,0.7),
    rgba(201,149,108,0.1) 40%,
    rgba(139,106,71,0.5) 70%,
    rgba(212,175,122,0.6));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  opacity: 0.55; pointer-events: none; z-index: 3;
  transition: opacity .4s;
}

/* Inner radial spotlight */
.oval::after, .arch::after, .rect::after {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 40%, rgba(245,232,208,0.18), rgba(13,11,10,0) 62%);
  pointer-events: none; z-index: 2;
  transition: opacity .4s;
}

/* Hover states */
.oval:hover::before, .arch:hover::before, .rect:hover::before { opacity: 1; }
.oval:hover .ph, .arch:hover .ph, .rect:hover .ph { filter: brightness(1.15); }

/* Image base */
.ph { transition: filter .4s ease; filter: brightness(0.88); }
.ph-img { width: 100%; height: 100%; object-fit: cover; display: block; }
```

### Ph Component (JSX)

```jsx
<Ph label="Alt text" shape="oval|arch|rect" category="bride|makeup|woman|man" src="optional-url" objectPosition="top|center"/>
```

- `shape` controls which CSS class is applied
- `objectPosition` is the only legitimate inline style (dynamic prop)

### Image Aspect Ratios

```
Craft cards:    aspect-ratio: 0.78/1
Makeup cards:   aspect-ratio: 0.78/1
Team cards:     aspect-ratio: 0.78/1
Award cards:    aspect-ratio: 0.78/1
Celebrity:      aspect-ratio: 0.78/1
Featured imgs:  tall portrait stacks (absolute positioned)

Gallery stagger:
  4n+1: aspect-ratio 4/5,  margin-top: 0
  4n+2: aspect-ratio 3/4,  margin-top: 32px
  4n+3: aspect-ratio 4/5,  margin-top: 64px  (0 at ≤1100px)
  4n+4: aspect-ratio 3/4,  margin-top: 0     (32px at ≤1100px 2-col)
  All stagger margins: 0 at ≤640px (single column)
```

---

## 5. Layout

```
Max width:   1440px (--max-w)
Gutter:       48px desktop / 32px tablet / 20px mobile
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
| Makeups | `repeat(3, 1fr)` | 28px |
| Team | `repeat(3, 1fr)` | 40px |
| Awards | `repeat(4, 1fr)` | 24px |
| Celebrity | `repeat(3, 1fr)` | 28px |

### Section Vertical Rhythm

```
Standard section padding:    140px 0  (80px at ≤1100px, 60px at ≤640px)
Featured / lehenga:          160px 0  (80px at ≤1100px, 60px at ≤640px)
Footer:                       80px 0 40px  (48px 0 24px at ≤640px)
Hero:                         standard (40px 0 48px at ≤640px)
sec-head margin-bottom:       64px (48px at ≤1100px)
```

### Section Soft Transitions

```css
section + section::before,
section + .featured::before {
  content: ""; position: absolute; top: 0; left: 0; right: 0; height: 80px;
  background: linear-gradient(to bottom, var(--bg) 0%, transparent 100%);
  pointer-events: none; z-index: 1;
}
.featured + section::before {
  background: linear-gradient(to bottom, rgba(10,7,5,0.9) 0%, transparent 100%);
}
```

---

## 6. Decorative System

### Scroll Progress Bar

```css
.scroll-progress {
  position: fixed; top: 0; left: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--ink-gold-2), var(--ink-gold-1));
  z-index: 999; width: 0%;
  box-shadow: 0 0 8px rgba(212,175,122,0.6);
  transition: width .1s linear;
}
```

Width is set by enhance.js via scroll event.

### Loading Screen

```css
.loader {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center; flex-direction: column;
  animation: loaderOut 1.2s ease-out 1.8s forwards;
}
.loader-logo {
  font-family: 'Pinyon Script', cursive;
  font-size: 88px; color: var(--ink-gold-2); line-height: 1;
  opacity: 0;
  animation: loaderIn 1s ease-out .2s forwards;
}
.loader-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .4em; text-transform: uppercase;
  color: var(--ink-mute); margin-top: 14px;
  opacity: 0;
  animation: loaderIn 1s ease-out .8s forwards;
}
```

Hidden immediately when `@media (prefers-reduced-motion: reduce)`.

### Custom Cursor

```css
/* Only on devices with fine pointer — enhance.js also gates on this */
@media (hover: hover) and (pointer: fine) {
  body { cursor: none; }
  a, button, .chip, .craft-card, .gallery-item,
  input, textarea, select, .ba .handle { cursor: none; }

  .cursor-dot {
    position: fixed; top: 0; left: 0; width: 8px; height: 8px;
    background: var(--ink-gold-2); border-radius: 50%;
    pointer-events: none; z-index: 9998;
    box-shadow: 0 0 12px rgba(212,175,122,0.7);
    transition: transform .12s ease-out, width .2s, height .2s, background .2s;
  }
  .cursor-ring {
    position: fixed; top: 0; left: 0; width: 36px; height: 36px;
    border: 1px solid var(--line-strong); border-radius: 50%;
    pointer-events: none; z-index: 9997;
    transition: transform .25s ease-out, width .25s, height .25s, border-color .25s;
  }
  .cursor-hover .cursor-dot { width: 4px; height: 4px; }
  .cursor-hover .cursor-ring { width: 56px; height: 56px; border-color: var(--ink-gold-2); }
}
```

Both `.cursor-dot` and `.cursor-ring` are injected by enhance.js — never hardcode in JSX.

### Asterisk / MiniSpark / Spark (SVG icons)

```jsx
<Asterisk size={N} className="css-class"/>    /* 4-point star, gold-2 default */
<MiniSpark size={N} className="css-class"/>   /* 4-point mini, gold-deep default */
<Spark size={N} color="var(--ink-gold-1)"/>   /* 8-point star, color prop = dynamic */
```

- `color` prop is the only legitimate inline style on these components (star ratings)
- All positional styling goes in CSS classes, never inline

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

At ≤640px: `font-size: 9px; letter-spacing: 0.12em`.

### Body Background

```css
body {
  background:
    radial-gradient(ellipse 1600px 600px at 50% -200px, rgba(201,149,108,0.10), transparent 70%),
    var(--bg);
}
body::before {
  content: "";
  position: fixed; inset: 0;
  /* fractalNoise SVG — opacity 0.55, mix-blend-mode: overlay */
  opacity: .55; mix-blend-mode: overlay; pointer-events: none; z-index: 1;
}
```

---

## 7. Components

### Navigation

```
Position:         sticky top, z-index 100
Background:       rgba(13,11,10,0.72) + backdrop-filter: blur(14px)
Border-bottom:    1px solid var(--line)
Grid:             auto 1fr auto, gap 32px, padding 18px 48px
Logo:             Pinyon Script 22px (nav override), gold-2, white-space: nowrap
Small tagline:    JetBrains Mono 9px, 0.32em, mute, uppercase
Nav links:        JetBrains Mono 11px, 0.22em, uppercase, mute → gold-2 on active/hover
CTA button:       .btn.sm.solid in .nav-right
Phone:            white-space: nowrap (hidden at ≤640px)
```

**8 canonical nav links (do not change count or order):**
Our Craft · Makeup · Lehenga · Packages · Our Story · Awards · Portfolio · Contact

#### Hamburger Menu

```css
.nav-right { display: flex; gap: 12px; align-items: center; }

/* Hamburger button — injected by enhance.js into .nav-right */
.nav-menu-btn {
  display: none; width: 40px; height: 40px;
  background: transparent; border: none; padding: 0; cursor: pointer;
  flex-direction: column; justify-content: center; align-items: center; gap: 4px;
  flex-shrink: 0;
}
.nav-menu-btn span {
  display: block; width: 20px; height: 2px;
  background: var(--ink-gold-2); border-radius: 1px;
  transition: transform .3s cubic-bezier(.2,.8,.2,1), opacity .3s;
}
@media (max-width: 1100px) {
  .nav-menu-btn { display: flex !important; }
}
@media (max-width: 640px) {
  .nav-menu-btn span { width: 18px; }
}
```

#### Mobile Menu Panel

```css
@media (max-width: 1100px) {
  .nav-center {
    position: fixed; left: 0; right: 0; top: 70px; z-index: 99;
    background: rgba(13,11,10,0.98); backdrop-filter: blur(14px);
    flex-direction: column; gap: 0; padding: 20px 0;
    max-height: calc(100vh - 70px); overflow-y: auto;
    transform: translateY(-100%);
    transition: transform .3s cubic-bezier(.2,.8,.2,1);
    border-bottom: 1px solid var(--line);
    display: none !important;
  }
  body.menu-open .nav-center {
    transform: translateY(0);
    display: flex !important;
  }
  .nav-center a {
    display: block; padding: 12px var(--gutter) !important;
    border-bottom: 1px solid var(--line);
  }
  .nav-center a:hover, .nav-center a.active {
    background: rgba(212,175,122,0.08); color: var(--ink-gold-2);
  }
  .nav-center a::after { display: none !important; }
}
```

#### Desktop Underline Slide

```css
.nav-center a::after {
  content: ""; position: absolute; left: 0; bottom: -2px;
  width: 100%; height: 1px; background: var(--ink-gold-2);
  transform: scaleX(0); transform-origin: left;
  transition: transform .35s cubic-bezier(.2,.8,.2,1);
}
@media (min-width: 1101px) {
  .nav-center a:hover::after,
  .nav-center a.active::after { transform: scaleX(1); }
}
```

---

### Buttons

```css
.btn        /* pill, border: var(--line-strong), gold-2 text, JetBrains Mono 11px */
.btn.solid  /* bg: var(--ink-gold-1), text: #14110F, border: var(--ink-gold-1) */
.btn.sm     /* 10px 18px padding, 10px font */
.btn.lg     /* 20px 36px padding, 12px font */
.btn.block  /* display:block; width:100%; text-align:center */
.btn-full   /* width:100%; margin-top:6px — form submit only */
```

Hover: `translateY(-1px)` + subtle bg `rgba(212,175,122,0.08)`.
Touch (≤768px): `min-height: 44px; padding: 12px 24px`.

#### Button Shimmer

```css
.btn { position: relative; overflow: hidden; }
.btn::before {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(115deg, transparent 30%, rgba(245,240,232,0.35) 50%, transparent 70%);
  transform: translateX(-120%);
  transition: transform .8s cubic-bezier(.2,.8,.2,1);
  pointer-events: none;
}
.btn:hover::before { transform: translateX(120%); }
```

---

### Featured / Lehenga Banner

```css
.featured {
  position: relative; padding: 160px 0;
  background: [multi-stop radial — see §2 Functional Colours];
  border-top: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line-strong);
  overflow: hidden;
}
/* Crosshatch texture */
.featured::before {
  content: ""; position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient(45deg, rgba(212,175,122,0.03) 0 1px, transparent 1px 80px),
    repeating-linear-gradient(-45deg, rgba(212,175,122,0.03) 0 1px, transparent 1px 80px);
  pointer-events: none;
}
/* Top gold rule */
.featured::after {
  content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--ink-gold-2), transparent);
}
.featured h2 { font-size: 120px !important; }
```

#### Lehenga Badge

```css
.lehenga-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 16px; border-radius: 999px;
  background: linear-gradient(90deg, var(--ink-gold-1), var(--ink-gold-2));
  color: #14110F;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .28em; text-transform: uppercase;
  margin-bottom: 22px;
  box-shadow: 0 8px 24px rgba(212,175,122,0.3);
}
```

---

### Package Cards

```css
/* Base card */
background: linear-gradient(160deg, rgba(40,30,22,0.5), rgba(20,15,12,0.7));
border: 1px solid var(--line); border-radius: 28px; padding: 40px 36px 36px;
transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s, border-color .35s;

.pkg:not(.featured-pkg) { opacity: 0.82; }
.pkg:not(.featured-pkg):hover { opacity: 1; }
.pkg:hover { transform: translateY(-10px); box-shadow: 0 50px 100px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,122,0.08); }

/* Featured card */
.pkg.featured-pkg {
  border-color: var(--ink-gold-2) !important;
  box-shadow: 0 0 0 1px rgba(212,175,122,0.35), 0 0 60px rgba(212,175,122,0.15), 0 50px 100px rgba(0,0,0,0.6);
  transform: translateY(-16px) scale(1.03);
  background: linear-gradient(160deg, rgba(60,44,30,0.7), rgba(26,19,13,0.85));
}
.pkg.featured-pkg:hover { transform: translateY(-20px) scale(1.03) !important; }

/* Gradient ring via mask */
.pkg.featured-pkg::before {
  content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
  background: linear-gradient(145deg, rgba(212,175,122,0.8), rgba(139,106,71,0.3), rgba(212,175,122,0.6));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
```

At ≤1100px: `.pkg.featured-pkg { transform: none !important; }`, hover → `translateY(-10px)`.
At ≤640px: `padding: 28px 22px`, h3 → 40px, price → 48px.

---

### Gallery / Gallery Item

```css
cursor: pointer;
/* .img: aspect-ratio varies (stagger), transition: transform .4s */
/* meta: centered, Cormorant italic 18px gold-2, JetBrains Mono 9px mute */
```

---

### Testimonial Cards

```css
background: linear-gradient(160deg, rgba(40,30,22,0.4), rgba(20,15,12,0.5));
border: 1px solid var(--line); border-radius: 24px; padding: 32px 28px;
position: relative; overflow: hidden;

/* Decorative quote mark */
.test-card::before {
  content: "\201C";
  position: absolute; top: -40px; right: -10px;
  font-family: 'Cormorant Garamond', serif; font-size: 280px; line-height: 1;
  color: var(--ink-gold-2); opacity: 0.08; pointer-events: none; font-style: italic;
}
.test-card > * { position: relative; z-index: 1; }

/* quote: Cormorant Garamond italic 22px, lh 1.4, ivory */
/* name:  JetBrains Mono 10px, 0.22em, gold-2, uppercase */
```

---

### Chip / Filter

```css
.chip        /* pill, border: var(--line), mute text, JetBrains Mono 10px */
.chip.active /* gold-2 border + text, rgba(212,175,122,0.06) bg */
```

Touch target (≤768px): `min-height: 44px; padding: 10px 16px`.

---

### Form

```css
.form-card  { border-radius: 28px; border: 1px solid var(--line); padding: 44px 40px; }
/* input/select/textarea: */
background: rgba(20,17,15,0.6); border-radius: 14px; padding: 22px 18px 14px;
font-size: 16px; font-weight: 300;  /* 16px MANDATORY — prevents iOS auto-zoom */
border: 1px solid var(--line);
/* focus: border-color gold-2 + box-shadow rgba(212,175,122,0.1) */
/* label: JetBrains Mono 9px, 0.22em, gold-2, absolute top:8px left:18px */
```

---

### Stats Strip

```css
background: linear-gradient(90deg, transparent, rgba(212,175,122,0.04), transparent);
padding: 64px 0;
grid: repeat(4, 1fr);
border-top + border-bottom: 1px solid var(--line);

.stat { position: relative; }
/* Gradient divider between stats */
.stat:not(:last-child)::after {
  content: ""; position: absolute; right: 0; top: 20%; bottom: 20%; width: 1px;
  background: linear-gradient(to bottom, transparent, var(--ink-gold-2), transparent);
  opacity: 0.6;
}
/* value: Cormorant Garamond 72px, gold-2 */
/* label: JetBrains Mono 10px, 0.28em, mute, uppercase, mt 10px */
/* .star inside value: gold-2, 1.15em, drop-shadow, sparkPulse animation */
```

At ≤1100px: 2×2 grid. At ≤640px: 1-col, `padding: 32px 0`, `stat padding: 16px 20px`.

---

### Marquee

```css
padding: 28px 0; border-top + border-bottom: 1px solid var(--line);
animation: scroll 40s linear infinite (translateX 0 → -50%)
/* item: Cormorant Garamond 32px italic, ivory */
/* separator: <Asterisk size={14} className="marquee-ast"/> margin-left: 40px */
```

At ≤640px: `font-size: 22px; gap: 32px; padding: 18px 0`.

---

### WhatsApp Card

```css
background: linear-gradient(145deg, rgba(37,211,102,0.1), rgba(20,15,12,0.5));
border: 1px solid rgba(37,211,102,0.4); border-radius: 20px;
/* hover: translateY(-2px) .25s */
/* icon: 60×60px circle, linear-gradient(145deg, #25D366, #128C7E), shadow rgba(37,211,102,0.3) */
/* title: Cormorant Garamond italic 24px, ivory */
/* subtitle: JetBrains Mono 10px, 0.22em, mute, uppercase */
```

---

### WhatsApp FAB

```css
position: fixed; right: 32px; bottom: 32px; z-index: 150;
width: 64px; height: 64px; border-radius: 50%;
background: linear-gradient(145deg, #25D366, #128C7E);
/* box-shadow: dark ring + gold outer ring rgba(212,175,122,0.6) */
animation: wapulse 2.4s ease-in-out infinite;

/* Soft expanding ring */
.wa-fab::before {
  content: ""; position: absolute; inset: 0; border-radius: 50%;
  border: 2px solid rgba(37,211,102,0.6);
  animation: waRing 4s ease-out infinite;
}
```

---

### Makeups Section

```css
.makeups { padding: 140px 0; }
.mkup-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 16px; }
.mkup-card {
  border-radius: 28px; overflow: hidden; border: 1px solid var(--line);
  display: flex; flex-direction: column;
  transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s;
}
.mkup-card:hover { transform: translateY(-10px); box-shadow: 0 50px 100px rgba(0,0,0,0.6); }
.mkup-img { width: 100%; aspect-ratio: 0.78/1; overflow: hidden; position: relative; }
.mkup-body { padding: 28px; display: flex; flex-direction: column; border-top: 1px solid var(--line); flex: 1; }
.mkup-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.mkup-body h3.serif { font-size: 44px; color: var(--ink-gold-2); margin: 0 0 4px; line-height: 1; }
.mkup-body h3.serif .it { font-style: italic; color: var(--ink-gold-1); }
.mkup-body hr { border: 0; height: 1px; background: var(--line); margin: 20px 0; }
.mkup-list { list-style: none; padding: 0; margin: 0 0 4px; display: flex; flex-direction: column; gap: 8px; }
.mkup-list li { display: flex; gap: 8px; align-items: flex-start; font-size: 12px; line-height: 1.5; font-weight: 300; }
.mkup-price { margin-top: 24px; }
.mkup-price-label { font-size: 9px; letter-spacing: .28em; color: var(--ink-gold-deep); margin-bottom: 6px; }
.mkup-price-val   { font-size: 40px; color: var(--ink-gold-2); line-height: 1; }
.mkup-price-note  { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--ink-mute); letter-spacing: .18em; text-transform: uppercase; margin-top: 4px; }
.mkup-body .btn.block { display: block; text-align: center; margin-top: 24px; }
```

At ≤1100px: single column, `max-width: 440px` centered.

---

### About Section

```css
.about-sec { padding: 140px 0; border-top: 1px solid var(--line); }
.about-desc { max-width: 860px; margin: 0 0 80px; display: flex; flex-direction: column; gap: 18px; }
.about-desc p { font-size: 16px; line-height: 1.75; color: var(--ink-ivory); font-weight: 300; margin: 0; }
.about-desc strong { color: var(--ink-gold-2); font-weight: 400; }
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-top: 16px; }
.team-card { display: flex; flex-direction: column; }
.team-img { width: 100%; aspect-ratio: 0.78/1; margin-bottom: 4px; }
.team-card h3.serif { font-size: 34px; color: var(--ink-gold-2); margin: 24px 0 4px; }
.team-card .team-title { font-size: 10px; letter-spacing: .28em; color: var(--ink-gold-1); margin-bottom: 14px; }
.team-card .team-bio { font-size: 13px; line-height: 1.7; font-weight: 300; margin: 0; }
```

At ≤1100px: single column, `max-width: 440px` centered, `about-desc max-width: 100%; mb: 48px`.
At ≤640px: `.about-desc p { font-size: 14px; line-height: 1.65 }`.

---

### Awards / Celebrity Section

```css
.awards-sec { padding: 140px 0; border-top: 1px solid var(--line); }
.awards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 16px; }
.award-card { display: flex; flex-direction: column; transition: transform .45s cubic-bezier(.2,.8,.2,1); }
.award-card:hover { transform: translateY(-8px); }
.award-img { width: 100%; aspect-ratio: 0.78/1; margin-bottom: 4px; }
.award-year { font-size: 9px; letter-spacing: .28em; color: var(--ink-gold-deep); text-transform: uppercase; }
.award-card h4.serif { font-size: 22px; color: var(--ink-gold-2); margin: 8px 0 4px; line-height: 1.2; }
.award-card .award-body { font-size: 12px; font-weight: 300; }

/* Celebrity sub-section */
.celeb-sec-head { margin-top: 120px; }
.celeb-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 16px; }
.celeb-card { display: flex; flex-direction: column; transition: transform .45s cubic-bezier(.2,.8,.2,1); }
.celeb-card:hover { transform: translateY(-6px); }
.celeb-img { width: 100%; aspect-ratio: 0.78/1; margin-bottom: 4px; }
.celeb-card .celeb-name { font-size: 20px; color: var(--ink-gold-2); margin: 18px 0 4px; }
.celeb-card .celeb-caption { font-size: 11px; font-family: 'JetBrains Mono', monospace; letter-spacing: .18em; text-transform: uppercase; }
```

At ≤1100px: awards → 2 col, celeb → 2 col.
At ≤640px: awards → 1 col max-width 340px, celeb → 1 col max-width 340px. `.awards-sec .awards-grid ~ .sec-head { margin-top: 56px }`.

---

### Before/After Slider

```css
.ba { aspect-ratio: 4/5; border-radius: 20px; border: 1px solid var(--line); }
/* handle: 2px wide, gold-2, box-shadow glow, ew-resize cursor */
/* handle::after: 42×42px circle, gold-2 bg, dark text "‹ ›" */

/* After panel static bg */
.ba .after.ph {
  background:
    repeating-linear-gradient(135deg, rgba(212,175,122,0.14) 0 2px, transparent 2px 12px),
    radial-gradient(ellipse at 50% 30%, rgba(245,240,232,0.22), transparent 60%),
    linear-gradient(155deg, #5a3f2a 0%, #241810 70%);
}
.ba-after-label {
  position: absolute; top: 14px; right: 14px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: .18em; text-transform: uppercase;
  color: rgba(245,240,232,0.7); pointer-events: none;
}

/* Clip path driven by CSS custom property from React state */
/* div.after { clip-path: inset(0 0 0 var(--split, 50%)); } */
```

---

### Footer

```css
background: var(--bg-2); padding: 80px 0 40px;
grid: 1.3fr 1fr 1fr 1fr, gap 48px

/* logo: Pinyon Script 48px, gold-2 */
/* h4: JetBrains Mono 10px, 0.28em, gold-2, uppercase */
/* links: Inter 14px 300, ivory → gold-2 on hover */
.footer-desc { font-size: 13px; line-height: 1.6; margin-top: 24px; max-width: 320px; font-weight: 300; }
/* sig: JetBrains Mono 10px, 0.28em, mute, centered, pt 48px, mt 64px, border-top */
/* At ≤640px: .footer-sig { padding-right: 80px } — WA FAB clearance */
```

#### Footer Contact Links

```css
.footer-contact { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
.footer-contact a {
  display: inline-flex !important; align-items: center; gap: 12px; padding: 10px 0 !important;
  font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-size: 22px !important; color: var(--ink-gold-2) !important;
  text-decoration: none; transition: color .2s, transform .2s;
}
.footer-contact a:hover { transform: translateX(4px); color: var(--ink-ivory) !important; }
.footer-contact a .ico {
  width: 32px; height: 32px; border-radius: 50%;
  border: 1px solid var(--line-strong);
  display: flex; align-items: center; justify-content: center;
  color: var(--ink-gold-2); flex-shrink: 0;
}
.footer-contact a:hover .ico { background: var(--ink-gold-2); color: #14110F; border-color: var(--ink-gold-2); }
```

---

## 8. Motion — Keyframe Inventory

All keyframes defined in refine.css. Standard easing: `cubic-bezier(.2,.8,.2,1)` unless noted.

| Keyframe | Trigger | Duration | What it does |
|----------|---------|----------|--------------|
| `loaderIn` | `.loader-logo`, `.loader-sub` | 1s ease-out | `opacity 0→1, translateY(10px)→0` |
| `loaderOut` | `.loader` | 1.2s ease-out, delay 1.8s | `opacity→0, visibility:hidden` |
| `heroLineUp` | `.hero.loaded h1 .line .inner` | 0.9s, delays 0.2/0.5/0.8s | `translateY(110%)→0, opacity 0→1` |
| `ruleIn` | `.hero-rule` | 1s ease-out, delay 1.4s | `scaleX(0)→scaleX(1)` |
| `kenBurns` | `.hero-portraits .ph` | 12s ease-in-out infinite alternate | `scale(1)→scale(1.06)` |
| `sparkPulse` | `.hero-decor .spark`, `.stat .star` | 3.5s ease-in-out infinite | opacity + scale + drop-shadow pulse |
| `wapulse` | `.wa-fab` | 2.4s ease-in-out infinite | `scale(1)→scale(1.06)→scale(1)` |
| `waRing` | `.wa-fab::before` | 4s ease-out infinite | `scale(1)→scale(1.7), opacity 0.8→0` |
| `scroll` | `.marquee-track` | 40s linear infinite | `translateX(0)→translateX(-50%)` |
| `fadeUp` | `.reveal.in` | 0.9s | `opacity 0→1, translateY(30px)→0` |

### Hero H1 Structure (for heroLineUp to work)

```jsx
<h1 className="serif">
  <span className="line"><span className="inner">Line one</span></span>
  <span className="line"><span className="inner">Line two</span></span>
  <span className="line"><span className="inner"><span className="sc">Script</span></span></span>
</h1>
```

`.hero` gets `.loaded` added by enhance.js after 1800ms. That triggers the cascade.

### Scroll Reveal — 4 Classes

```css
/* 1. Standard — fade up */
.reveal { opacity: 0; transform: translateY(30px); transition: opacity .9s ..., transform .9s ...; }
.reveal.in { opacity: 1; transform: translateY(0); }

/* 2. Oval/shape — scale up */
.reveal-oval { opacity: 0; transform: scale(0.92); transition: opacity .9s ..., transform .9s ...; }
.reveal-oval.in { opacity: 1; transform: scale(1); }

/* 3. Stagger — children cascade */
.reveal-stagger > * { opacity: 0; transform: translateY(24px); transition: opacity .7s ease-out, transform .7s ease-out; }
.reveal-stagger.in > * { opacity: 1; transform: translateY(0); }
/* nth-child(1)–(6): delays 0 / 80 / 160 / 240 / 320 / 400ms */

/* 4. Word mask — words slide from behind clipped container */
.reveal-words .w { display: inline-block; overflow: hidden; vertical-align: bottom; }
.reveal-words .w .i { display: inline-block; transform: translateY(110%); transition: transform .7s ...; }
.reveal-words.in .w .i { transform: translateY(0); }
/* nth-child(1)–(7): delays 0 / 80 / 160 / 240 / 320 / 400 / 480ms */
```

---

## 9. Responsive Breakpoints

| Breakpoint | Gutter | Key changes |
|---|---|---|
| ≤1100px | 32px | All major grids → 1 col. Nav hamburger visible, desktop links hidden (`display:none`). sec-head stacks. Makeups/team → 1 col max-width 440px centered. Awards/celeb → 2 col. Featured pkg no scale lift. Gallery stagger corrected for 2-col. Section padding 80px. |
| ≤768px | — | A11y touch targets only: `.btn` min-height 44px, `.chip` 44px, `.gallery-filters button` 44px, WA links 44px inline-flex. |
| ≤640px | 20px | Phone layout. Hero 40/48px. Gallery → 1 col, all stagger 0. Stats → 1 col, padding 32px. Craft/awards/celeb → 1 col max-width 340px. Footer → 1 col gap 28px. Footer-sig padding-right 80px. Marquee 22px. Eyebrow 9px/0.12em. `.nav-phone` hidden. Section padding 60px. |

---

## 10. CSS Class Reference

### Base System (styles.css)

```
.container          max-width 1440px, auto margin, gutter padding
.sec-head           grid 1fr auto, gap 40px, mb 64px
.eyebrow            gold-2 mono label with 28px line prefix
.serif .script .display .mono .sans
.gold .gold-deep .ivory .mute .it .sc
```

### UI Chrome (refine.css)

```
.scroll-progress    fixed top gold gradient bar, JS-driven width
.loader             full-screen entry animation
.loader-logo        Pinyon Script 88px gold-2
.loader-sub         JetBrains Mono 10px mute
.cursor-dot         8px gold circle fixed z-index 9998
.cursor-ring        36px circle border fixed z-index 9997
.cursor-hover       modifier: dot shrinks, ring expands gold
```

### Navigation

```
.nav .nav-inner .nav-logo .nav-center .nav-right
.nav-menu-btn .nav-menu-btn span    hamburger (inject via enhance.js)
.nav-phone                          hidden ≤640px
body.menu-open                      toggles mobile panel open
```

### Hero

```
.hero .hero-grid .hero-portraits .hero-lede .hero-cta .hero-decor
.hero-rule          scaleX animation bar
.hero h1 .line      overflow:hidden clip container per text line
.hero h1 .line .inner   the element that slides up
.hero.loaded        triggers heroLineUp (added by enhance.js at 1800ms)
.hero-deco-1 through .hero-deco-4
.hero-portrait-deco
```

### Sections

```
.craft .craft-grid .craft-card
.featured .featured-grid .featured-imgs .featured-tags .tag .lehenga-badge
.pkgs .pkg-grid .pkg .pkg.featured-pkg .badge
.makeups .mkup-grid .mkup-card .mkup-img .mkup-body .mkup-meta .mkup-list .mkup-price
  .mkup-price-label .mkup-price-val .mkup-price-note
.about-sec .about-desc .team-grid .team-card .team-img .team-title .team-bio
.awards-sec .awards-grid .award-card .award-img .award-year .award-body
  .celeb-sec-head .celeb-grid .celeb-card .celeb-img .celeb-name .celeb-caption
.gallery .gallery-filters .chip .chip.active .gallery-grid .gallery-item
.ba-section .ba-grid .ba .ba-after-label
.testimonials .test-grid .test-card
.stats .stat .stat .v .star
.contact .contact-grid .contact-left .contact-card-wa .form-card
  .contact-info .contact-info-val .form-success .form-desc .form-privacy
.footer .footer-grid .footer-logo .footer-desc .footer-contact .footer-sig .footer-sig-ast
.wa-fab
.marquee .marquee-track .marquee-item .marquee-ast
```

### Shapes / Ph

```
.oval .arch .rect   image containers with rim pseudo-elements
.ph .ph-img         inner image wrapper
.spark              SVG icon wrapper
```

### Scroll Reveal

```
.reveal             fade + slide up on intersect
.reveal-oval        scale reveal on intersect
.reveal-stagger     children cascade in with delays
.reveal-words .w .i word mask slide-up
```

### refine.css v5 — Inline Style Elimination Classes

```
.sec-head h2.serif / .fs-80 / .fs-88   heading size variants
.sec-head h2 .it / .script / .script-lg   style variants
.sec-head .mute                          14px description
.featured-btns                           flex CTA row
.mkup-meta .n                            10px mono gold-1
.award-year / h4.serif / .award-body     award card internals
.celeb-name / .celeb-caption             celebrity card
.team-card h3 / .team-title / .team-bio  team card
.ba .after.ph / .ba-after-label          slider panel
.contact-info / .contact-info-val        contact grid
.form-success h3 / .ivory / .btn         success state
.footer-desc / .footer-sig-ast           footer internals
.footer-contact / a / .ico               footer contact links
.nav-logo                                22px override
.marquee-ast                             margin-left 40px
.pkg h3.it                               italic pkg title
```

---

## 11. Inline Style Rules

**Zero hardcoded inline `style={{}}` are permitted for layout, colour, or typography.**

The only `style={{}}` allowed in JSX are legitimately dynamic:

| Location | Inline style | Why it must stay inline |
|----------|-------------|------------------------|
| `BASlider` div.ba | `style={{ '--split': split + '%' }}` | CSS custom property from React state |
| `BASlider` div.after | `style={{ clipPath: \`inset(0 0 0 ${split}%)\` }}` | Derived from JS state |
| `Ph` img | `style={{ objectPosition }}` | Prop value — dynamic per usage site |
| `Spark/MiniSpark/Asterisk` | `style={{ color: color \|\| 'var(--...)' }}` | `color` prop used dynamically (star ratings) |
| Tweaks panel color inputs | inline style on `<input type="color">` | Live color picker values |

Any other `style={{}}` in JSX is a bug to fix.

---

## 12. File Structure

### Design Reference (read-only — localhost:8090)

```
ankitsahnimakeover (Remix)/
├── Ankit Sahni Makeover.html   # Entry — loads styles.css, refine.css
├── styles.css                  # Core tokens + base layout
├── refine.css                  # All overrides, animations, responsive (930 lines)
├── enhance.js                  # Scroll reveals, cursor, counter, hamburger
├── app.jsx                     # Root component
├── parts.jsx                   # Shared: Spark, MiniSpark, Asterisk, Ph, Nav, WaFab, Marquee
├── sec-hero.jsx, sec-craft.jsx, sec-packages.jsx
├── sec-makeups.jsx, sec-about.jsx, sec-awards.jsx
├── sec-gallery.jsx, sec-contact.jsx
└── DESIGN_SYSTEM.md            # This file
```

**CSS load order:** `styles.css` → `refine.css`. refine.css always wins on conflicts.
Design tokens live in `styles.css :root` only — never in refine.css.
Cache-bust with `?v=N` in HTML link tags after any CSS edit.

### Implementation Target (Next.js — all code goes here)

```
ankitsahnimakeover-nextjs/
├── app/
│   ├── globals.css             # CSS (mirrors styles.css + refine.css content)
│   ├── layout.tsx              # Font imports, metadata, Loader, WaFab
│   └── page.tsx                # Section assembly
├── components/
│   ├── Nav.tsx                 # Navigation + hamburger toggle
│   ├── Enhance.tsx             # Client component: cursor, reveal, counter, scroll-progress
│   └── [section components]
└── public/                     # Images
```

When implementing from this spec: CSS goes into `globals.css`, enhance.js behavior maps to `Enhance.tsx` as a `'use client'` component.

---

## 13. Accessibility

### Focus Rings

```css
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--ink-gold-2);
  outline-offset: 2px;
}
.nav-menu-btn:focus-visible { outline: 2px solid var(--ink-gold-2); outline-offset: 2px; }
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001s !important;
    transition-duration: .001s !important;
  }
  .loader { display: none !important; }
}
```

In enhance.js: hero text appears immediately if motion is reduced (delay = 0).

### Touch Targets (WCAG 2.5.5 — 44px minimum)

```css
@media (max-width: 768px) {
  .btn              { min-height: 44px; padding: 12px 24px; }
  .chip             { min-height: 44px; padding: 10px 16px; }
  .gallery-filters button { min-height: 44px; }
  a[href*="wa.me"] { min-height: 44px; display: inline-flex; align-items: center; }
}
```

### Aria

- `.nav-menu-btn`: `aria-label="Toggle menu"`, `type="button"`
- WA FAB: `aria-label="Chat on WhatsApp"`
- All `<Ph>` images: meaningful `label` prop → `alt`

### Skip Link (TODO — not yet implemented)

Pattern to add: `.skip-link` off-screen by default, gold bg, slides into view on `:focus`.

---

## 14. enhance.js Behavior Spec

All behaviors run inside an IIFE. Maps to `Enhance.tsx` in Next.js as a `'use client'` component.

### Scroll Progress

Listens to `window scroll` (passive). Reads `scrollTop / (scrollHeight - clientHeight) * 100`. Writes result as `%` to `.scroll-progress` width style.

### Custom Cursor

**Gate:** `matchMedia('(hover:hover) and (pointer:fine)').matches` — fine pointer devices only.
Injects `.cursor-dot` and `.cursor-ring` into `document.body`.
Dot tracks `mousemove` directly (instant). Ring lerped at 0.18 rate via `requestAnimationFrame`.
`mouseover` on interactive elements adds `body.cursor-hover`. `window mouseleave/mouseenter` toggles opacity.

### Hero Loader

`setTimeout(1800ms)` → adds `.loaded` to `.hero` → triggers `heroLineUp` keyframe.
If `prefers-reduced-motion`: use delay 0 so hero text is visible immediately.

### Scroll Reveal Observer

`IntersectionObserver`: threshold 0.15, rootMargin `0px 0px -60px 0px`.
Watches 4 classes: `.reveal`, `.reveal-oval`, `.reveal-stagger`, `.reveal-words`.
On intersection: adds `.in`, triggers counter if `[data-count]` found inside.
Polls every 300ms for 3 seconds post-load to catch React-mounted nodes.
`window.__rescanReveal` exposed for manual re-trigger.

### Counter Animation

Triggered when a `.reveal` containing `[data-count]` intersects viewport.
Attributes: `data-count` (target number), `data-suffix` (e.g. `+`).
Duration 1400ms, cubic ease-out `1 - (1-p)^3`.
Values ≥1000 display as `X.XK`. Runs once per element (`data-done` flag prevents repeat).

### Hamburger Menu

Injects `.nav-menu-btn` into `.nav-right` if not already present.
`MutationObserver` re-injects if React reconciliation removes it.
Click on `.nav-menu-btn` → toggles `body.menu-open`.
Click on `.nav-center a` → removes `body.menu-open` (closes panel on link tap).

---

## 15. Do Not

- Do not use `!important` for layout or typography. Fix specificity properly.
- Do not use inline `style={{}}` for hardcoded values. Add a CSS class.
- Do not change background from near-black (#0D0B0A) to any lighter value.
- Do not add pastel, pink, or warm-white colour accents.
- Do not use square-cropped images for portraits — always oval or arch.
- Do not change font families. The four-font stack (Cormorant / Pinyon / Inter / JetBrains Mono) is locked.
- Do not add new Google Font imports.
- Do not add borders with full opacity — always use `var(--line)` or `var(--line-strong)`.
- Do not add box shadows with white or light colours — shadows are always dark rgba.
- Do not change section padding below 60px on mobile.
- Do not use `border-radius` below 14px on cards or 999px on pills.
- Do not add new breakpoints without documenting them in §9.
- Do not implement anything on the remix static site — all code changes go in Next.js.
- Do not change the cursor gate — fine pointer check is required, not just hover.
- Do not hardcode the 1800ms hero delay in components — it belongs in enhance.js / Enhance.tsx and must respect `prefers-reduced-motion`.
- Do not change the 8-link nav count or order without product sign-off.

---

*Compiled from: styles.css + refine.css (930 lines) + enhance.js · May 2026*
*Design reference: localhost:8090 (read-only) · Implementation: ankitsahnimakeover-nextjs*

## Related

- [[Projects/Clients/ankitsahnimakeover/PIPELINE.md]] — Phase breakdown; design work is Phase 1 Week 1–2
- [[Projects/Clients/ankitsahnimakeover/CLAUDE.md]] — Client context: brand constraints and aesthetic rules
- [[Projects/Clients/ankitsahnimakeover/TIMELINE.md]] — Week-by-week schedule referencing design deliverables
- [[Projects/Clients/ankitsahnimakeover/progress.md]] — Live implementation status
- [[Projects/Clients/ankitsahnimakeover/ankitsahnimakeover-nextjs/CLAUDE.md]] — Next.js project CLAUDE for implementation target
