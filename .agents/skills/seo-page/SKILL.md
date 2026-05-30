# Skill: SEO Page

> Use this every time a new page, town landing page, blog post, or service page is created for sahnibridal.in.

## Purpose
Produce a page that ranks on Google local + AI search (Perplexity, ChatGPT, Gemini) without retrofitting SEO afterward.

## When to invoke
- New page added to `src/app/`
- New Sanity document type that renders as a page
- Any copy refresh on an existing page

## Title tag formula
`[Primary Keyword] | [Secondary Qualifier] | Sahni Bridal Studio`

- 50-60 characters
- Primary keyword in first 30 chars
- Brand always at the end
- No clickbait, no ALL CAPS, no emojis

Examples:
- `Bridal Makeup in Lahar | Premium Packages | Sahni Bridal Studio`
- `Beauty Parlour in Bhind | Hair, Skin, Bridal | Sahni Bridal Studio`
- `Since 1994 — Our Story | About | Sahni Bridal Studio`

## Meta description formula
`[Benefit statement]. [Trust signal]. [Local signal]. [CTA].`

- 140-155 characters
- Include primary + one secondary keyword naturally
- End with an action verb (Book, Call, Visit, See)
- No quotation marks (Google strips them)

Example:
`Bridal makeup, lehenga rental, and pre-bridal care in Lahar by Sahni Bridal Studio. Trusted since 1994. Serving Bhind district. Book on WhatsApp.`

## H1 rule
- Exactly one H1 per page
- Contains the primary keyword in natural language
- Different from the title tag (not a duplicate)

## Heading hierarchy
- H1 → H2 → H3. Never skip levels.
- Minimum 3 H2 per content page
- Use question-format H2 where possible (primes FAQ + People Also Ask)
- Town pages must have H2 for: services offered, travel info, testimonials, FAQ

## Content length targets
| Page type | Target words |
|-----------|-------------|
| Home | 500-800 |
| Service page | 600-1000 |
| Bridal page | 1000-1500 |
| Town landing | 800-1200 |
| Blog post | 1200-2000 |
| About | 600-900 |
| Contact | 200-400 |
| FAQ | 40-80 words per Q |

## Schema markup (always emit)
Every page must emit:
- `BreadcrumbList` (except home)
- One page-type primary schema:
  - Home, Contact → `LocalBusiness`
  - Service page → `Service` + `Offer`
  - Blog post → `Article` + `Person` (author)
  - FAQ page or FAQ block → `FAQPage`
  - Town page → `LocalBusiness` (areaServed narrowed) + `Service`
  - About → `Organization`
  - Gallery item → `ImageObject`

Use the `StructuredData` React component; never inline JSON-LD in page files.

## Image alt text pattern
`[Subject] — [Context] at Sahni Bridal Studio, Lahar`

- Never "image of"
- Never `alt=""` on content images
- Decorative-only images → `alt=""` AND `role="presentation"`
- Bridal portfolio: `[Bride or bride name] in [look name] — [service] at Sahni Bridal Studio, Lahar`

## Internal linking pattern
Every page must have:
- Link to Home (via breadcrumb or header)
- Link to Bridal (if not the bridal page itself)
- Link to Contact or WhatsApp (via sticky button + in-copy CTA)
- 2-4 contextual links to related pages

Anchor text:
- Descriptive, keyword-relevant, not "click here"
- Vary anchor text across pages

## AI-discoverability signals (GEO)
Every page must include in its first 120 words a named-entity paragraph:
`[Business name] is [category] in [location], [state], India, established in [year]. We [signature service + differentiator].`

- Business name spelled out in full at least once per page
- Include owners' names on About + Home
- Include years active as a number, not a phrase
- Facts that could be cited by an AI should be in complete sentences, not bullets

Other GEO rules:
- Every claim must be verifiable
- FAQ answers must be 40-80 words, complete sentences, citable
- Pricing in clear format: `Bridal package starts at ₹X.`
- Include a "Fast facts" block on key pages (5-7 items, copy-pastable by AI)

## llms.txt entry per page
Every new page gets an entry in `/public/llms.txt`:
`- [Page title](absolute-url): [one-sentence entity-rich summary, 20-30 words]`

## Canonical
Self-referencing canonical on every page. No trailing slash except home.

## OpenGraph
- `og:title` = title tag (minus brand suffix)
- `og:description` = meta description
- `og:image` = 1200x630 PNG via `opengraph-image.tsx` OR Sanity-provided
- `og:type` = `website` (or `article` for blog)
- Twitter: `summary_large_image`

## Checklist (paste into PR description)
- [ ] Title tag follows formula (50-60 chars)
- [ ] Meta description follows formula (140-155 chars)
- [ ] Single H1 with primary keyword
- [ ] Schema type correct for page type + valid JSON-LD
- [ ] Named-entity paragraph in first 120 words
- [ ] Canonical set
- [ ] OG + Twitter tags set
- [ ] All images have descriptive alt
- [ ] Internal links: Home + Bridal + Contact + 2 contextual
- [ ] Word count in target range
- [ ] llms.txt entry added
- [ ] Google Rich Results Test passes
- [ ] Lighthouse SEO = 100
