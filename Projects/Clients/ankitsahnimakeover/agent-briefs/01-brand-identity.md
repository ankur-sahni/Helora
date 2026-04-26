# Agent Brief — Brand Identity for Sahni Bridal Studio

**Target agent:** `designer`
**Inputs required before running:** G1 (3-5 design reference sites from Ankur)
**Expected duration:** 2 days
**Deliverable location:** `Projects/Clients/sahni-bridal-studio/brand/`

---

## Prompt (copy into designer agent run)

You are the `designer` agent. Produce a complete brand identity kit for Sahni Bridal Studio.

**Context:**
- Client: 30-year-old salon in Lahar MP, transitioning to a premium bridal studio brand
- Owners: Ankit and Kusum Sahni (non-technical; will not touch code)
- Primary audience: brides and their families across Lahar, Bhind, Mihona, Daboh, Gormi, Datia
- Emotional targets: warm, trustworthy, premium, Indian, legacy, feminine, aspirational
- References provided by Ankur: [INSERT 3-5 URLS FROM G1 HERE]
- Primary competitor tone: Praval Makeover (pravalmakeover.in) — study but do not imitate
- Aesthetic anchor: Sabyasachi-meets-local-warmth. Gold, rose, cream. Cursive/signature wordmark.

**Constraints:**
- Free and open-source tools only (Figma free, Inkscape, Google Fonts — no Adobe subscriptions)
- Output must be usable by a Next.js + Tailwind implementer without rework
- Logo must work at 32px favicon and 800px hero
- Must read well on mobile first

**Deliverables (write each as a separate file under `brand/`):**

1. `brand/identity-brief.md` — 1-page brand story: name rationale, positioning sentence, voice adjectives (5), what the brand is NOT (anti-patterns)
2. `brand/color-system.md` — Primary, secondary, accent, neutral, semantic (success/warn/error) with hex + Tailwind config block. Include WCAG AA contrast pairs for text.
3. `brand/typography.md` — Heading font, body font, accent/display font (for the cursive wordmark), with Google Font import lines. Type scale: h1-h6 + body + small, each with mobile and desktop size/line-height.
4. `brand/logo-direction.md` — 3 logo concepts with rationale, before handing to final design. Each concept = textual description + rough ASCII sketch + when to use.
5. `brand/spacing-and-radius.md` — Spacing scale (4px base), border radius tokens, shadow tokens.
6. `brand/tailwind.config.snippet.ts` — Ready-to-paste Tailwind `theme.extend` block with all tokens.
7. `brand/moodboard.md` — Links to 12 reference images (Pinterest boards, Unsplash, competitor screenshots) with one-line note on what each contributes.

**Process:**
1. Read `research/website-strategy.md` and `PIPELINE.md` before starting.
2. Analyze the 3-5 reference sites Ankur provided. Note what feels premium, what feels cheap, what feels Indian-specific.
3. Draft all 7 files.
4. Flag any decision you are <70% confident about — do not guess; escalate to Ankur via the brief.
5. Do not generate the final logo file in this pass; `logo-direction.md` is a brief for the next step.

**Done when:**
- All 7 files exist in `brand/`
- Tailwind snippet parses (run a local test)
- Ankur has reviewed and approved `color-system.md` + `typography.md` before any implementation begins

**Escalate to Ankur if:**
- You want to use a paid font or tool
- References conflict (e.g. some modern-minimal, some maximalist-traditional)
- You believe a different aesthetic direction would serve the business better — state your case, one paragraph
