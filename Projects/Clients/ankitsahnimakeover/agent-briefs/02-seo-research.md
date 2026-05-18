# Agent Brief — SEO Keyword Research + Information Architecture

**Target agent:** `researcher`
**Inputs required before running:** none (can run in parallel with brand)
**Expected duration:** 2 days
**Deliverable location:** `Projects/Clients/sahni-bridal-studio/seo/`

---

## Prompt (copy into researcher agent run)

You are the `researcher` agent. Do not write code or edit production files. Produce an SEO keyword map and site IA document that the `implementer` will use to build the site.

**Context:**
- Client: Ankit Sahni Makeover, Lahar MP. 30-year legacy. Bridal makeup + rental is the primary revenue driver.
- Service area: Lahar (primary), Bhind district, Mihona, Daboh, Gormi, Datia
- Primary competitor: pravalmakeover.in — study their URL structure, page count, schema, headings
- Dual ranking target: Google local + AI search (Perplexity, ChatGPT, Gemini)

**Tools to use:**
- Free keyword sources: Google autosuggest, Google People Also Ask, AnswerThePublic free quota
- Context7 MCP for any Next.js / Sanity / schema.org docs
- Playwright or WebFetch to scrape competitor structure

**Deliverables:**

1. `seo/keyword-map.md`
   - Table of 60+ keywords: keyword, intent (informational/commercial/transactional/local), volume estimate, difficulty estimate, target page, priority (P0/P1/P2)
   - Grouped into clusters: bridal services, pricing, rental, local (per town), services, reviews, legacy/trust, informational blog seeds
   - 15+ long-tail bridal queries (e.g. "bridal makeup package under 25000 in Lahar")

2. `seo/site-architecture.md`
   - URL tree for Phase 1 and Phase 2
   - Every URL has: H1, target keyword, secondary keywords, schema type, internal links in, internal links out
   - Pattern: `/`, `/bridal`, `/services`, `/gallery`, `/reviews`, `/about`, `/contact`, then Phase 2: `/blog/[slug]`, `/faq`, `/team`, `/locations/[town]`
   - Mark which URLs require dynamic Sanity-driven routes

3. `seo/competitor-teardown.md`
   - Praval Makeover: every URL, every schema type, meta title/description patterns, heading structure, backlink sources
   - 2 other premium Indian salon brands (Looks, Naturals) — brief teardown
   - Gap analysis: what Sahni must add to beat Praval in 6 months

4. `seo/ai-discoverability-plan.md`
   - GEO strategy for Sahni
   - Specific entities to establish (business name, owner names, location, services, years active)
   - Citation bait — 10 facts about Sahni that an AI would want to cite
   - llms.txt draft
   - Which pages must include named-entity-rich intro paragraphs

5. `seo/local-signals-checklist.md`
   - Google Business Profile setup checklist
   - NAP consistency across all citations
   - Justdial, Sulekha, UrbanPro, IndiaMART, Google Maps
   - Local directories to submit to (free only)
   - Review acquisition plan

**Process:**
1. Read `research/website-strategy.md` and `research/growth-plan.md` first.
2. Scrape Praval using Playwright MCP. Save URL list and on-page SEO to `seo/praval-scrape.json`.
3. Build keyword map bottom-up: start with what Ankit's actual customers search for, then expand.
4. Cross-reference Phase 1 IA with approved page list. Flag any missing pages.
5. Hand finished IA to `planner` for the scaffold plan.

**Done when:**
- All 5 files exist in `seo/`
- `site-architecture.md` shows zero orphan pages (every page reachable within 2 clicks from home)
- `keyword-map.md` has 15+ P0 keywords with clear page assignment

**Do not:**
- Pay for any SEO tool
- Guess volumes beyond "low / med / high" if free tools cap you — flag it rather than fabricate
- Propose pages outside Phase 1 list without tagging them Phase 2 or Phase 3
