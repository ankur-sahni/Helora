# Agent Brief — SEO Implementation

**Target agent:** `implementer` (uses `seo-page` skill)
**Inputs required:** Scaffold complete, content in Sanity, `seo/` folder complete
**Expected duration:** 3 days
**Deliverable location:** Inside `website/` — code changes

---

## Prompt (copy into implementer agent run)

You are the `implementer` agent. Apply full Phase 1 SEO to the site. Use the `seo-page` skill — read it first. Do not write content; content is already in Sanity.

**Tasks (in order):**

1. **Per-page metadata function** — every route exports `generateMetadata` pulling title, description, OG image, canonical from Sanity `siteSettings` + page doc. No hardcoded strings.

2. **Structured data** — build `src/components/seo/StructuredData.tsx`. Emit:
   - `LocalBusiness` on Home + Contact (with opening hours, address, geo, image, priceRange, aggregateRating)
   - `Service` on every service
   - `FAQPage` on pages with FAQ blocks
   - `BreadcrumbList` on every non-home page
   - `ImageObject` on gallery items
   - `Organization` on About
   All pulled from Sanity. Validate against Google Rich Results Test before merging.

3. **Sitemap + robots** — `next-sitemap` config excludes `/studio` and draft routes. `robots.txt` allows GPTBot, PerplexityBot, ClaudeBot, Googlebot, Bingbot; disallows `/studio`.

4. **Canonical URLs** — every page has a canonical `<link>`. Handle trailing slash consistently (document decision in `seo/decisions.md`).

5. **OpenGraph + Twitter cards** — dynamic OG image route at `src/app/opengraph-image.tsx` using `ImageResponse`. Per-page OG via Sanity.

6. **Image optimization** — all Sanity images via `@sanity/image-url` + `next/image`. Explicit width/height, lazy by default, eager on LCP hero only.

7. **Internal linking** — `<RelatedPages>` component driven by Sanity `siteSettings.internalLinks`. `content` agent will populate.

8. **Performance** — defer non-critical JS, preload hero font + hero image, remove unused Tailwind via JIT, audit bundle with `@next/bundle-analyzer`.

9. **Analytics** — GA4 via env-gated `<Script>` component with consent-ready hook; Search Console verification via HTML file in `public/`; Bing Webmaster same pattern.

10. **llms.txt** — create `/public/llms.txt` listing key pages with 1-line entity-rich summaries (see `seo/ai-discoverability-plan.md`).

11. **AI-discoverability signals** — named-entity intro paragraph (business name + owners + location + years active + signature service) within first 120 words of every page. `content` wrote it; ensure template renders it in the right semantic position.

**Validation (all must pass before PR merge):**
- Google Rich Results Test green on Home, Bridal, Services
- schema.org validator green on all schema types
- Lighthouse SEO = 100 on every page
- `next-sitemap` output valid XML
- Zero broken links, zero missing titles, zero missing H1

**Done when:**
- Every page: unique title, unique meta, canonical, OG image, valid schema
- `robots.txt` allows AI crawlers explicitly
- `sitemap.xml` lists every Phase 1 URL
- `reviewer` approves

**Escalate if:**
- Sanity schema lacks a field you need → ask `planner` to amend, do not hardcode
- A schema type has no Sanity data yet → ship schema but flag page as incomplete in `progress.md`
