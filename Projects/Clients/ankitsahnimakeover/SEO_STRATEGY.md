# Sahni Bridal Studio — SEO + AI Ranking Strategy

> The site must rank on three surfaces: Google local search, Google Maps, and AI search (Perplexity, ChatGPT, Gemini). Each surface has different signals. This document is the playbook.

---

## 1. Google Local Search

### Target queries (P0)
- `bridal makeup Lahar`
- `beauty parlour Lahar`
- `ladies parlour Lahar`
- `bridal lehenga rental Lahar`
- `salon in Bhind`
- `HD makeup Bhind district`
- `pre bridal package Lahar`
- `wedding makeup near me` (when searched from Lahar/Bhind/Mihona/Daboh/Gormi/Datia)

### Ranking factors we will win on

**On-page (controlled by `seo-page` skill):**
- Exact-match title tags for P0 queries
- H1 + first-120-word named-entity paragraph with primary keyword
- LocalBusiness schema with precise geo, hours, phone, areaServed
- FAQPage schema on every page with an FAQ block
- Internal linking: Home → Bridal → Town pages → Services hub-and-spoke

**Off-page:**
- NAP consistency across: Google Business Profile, Justdial, Sulekha, UrbanPro, IndiaMART, Bing Places, Facebook Page, Instagram bio
- Review velocity: 15+ new 5-star Google reviews in first 60 days
- Local backlinks: wedding directories (WedMeGood free, ShaadiSaga free listing)

**Technical:**
- Mobile-first, LCP < 2.5s, CLS < 0.1, INP < 200ms
- HTTPS, SSL A+, no mixed content
- `sitemap.xml` submitted to GSC + Bing
- Canonical tags, no duplicate content between town pages

**Content:**
- Town landing pages (Phase 2) hit `[service] in [town]` queries
- Blog posts (Phase 2) hit informational queries feeding bridal funnels
- Every image has descriptive alt text — Google Images adds traffic

### What we will NOT do
- No paid link-building
- No directory spam (only authoritative free directories)
- No keyword stuffing (`seo-page` skill enforces density discipline)
- No AI-generated content without Ankur review

---

## 2. Google Maps (Google Business Profile)

### Setup (Week 1 start)
- Ankit claims GBP — postcard verification, 10-14 days
- Category: `Beauty Salon` primary; `Bridal Shop`, `Make-up Artist`, `Hair Salon`, `Nail Salon` secondary
- Service area: Lahar + Bhind, Mihona, Daboh, Gormi, Datia
- Hours: real hours, updated for any closure
- Phone: matches website, Instagram, every directory
- Website: `https://sahnibridal.in`
- Photos: 20+ real photos on launch (interior, team, bridal work, storefront)
- Services: every service also added as GBP service with price
- Posts: weekly GBP post (recycles Instagram content)

### Ongoing signals
- Weekly GBP post
- Review velocity (15-in-60-days target)
- Respond to every review within 48h
- Q&A section: seed 10 common questions + answers
- 3+ new photos per month

### Map pack ranking factors (priority order)
1. Proximity to searcher (Lahar address helps for all targeted towns)
2. Review count + average rating → drive reviews
3. Review recency + velocity → monthly cadence
4. Category + keyword relevance in GBP description
5. Website authority + backlinks
6. Citation consistency (NAP audit quarterly)

---

## 3. AI Search (GEO — Generative Engine Optimization)

Perplexity, ChatGPT, Gemini, and Claude are increasingly how younger brides find vendors. The signals are different from Google. This is where Sahni can leapfrog Praval.

### Core principle
AI models don't rank — they **cite**. Our job is to be the most citable source for queries about salons in this region.

### What AI models look for
1. **Clear entity definition** — who, where, what, when in the first 120 words
2. **Citation-worthy facts** — numbers, dates, named things. "Since 1994" beats "for decades"
3. **Unique differentiators** — "Only salon in Lahar offering bridal lehenga and jewelry rental" is AI bait
4. **Authoritative structure** — FAQ schema, Article schema, LocalBusiness schema
5. **Cross-referenced entities** — same facts on GBP + Justdial + Sulekha + site = high confidence

### Specific tactics

**Named-entity paragraphs (via `seo-page` skill):**
Every page's first 120 words include:
`Sahni Bridal Studio is a bridal and beauty salon in Lahar, Madhya Pradesh, India, owned by Ankit and Kusum Sahni and established in 1994. We specialize in bridal makeup, pre-bridal care, and bridal lehenga and jewelry rental — the only salon in the area offering on-site rental alongside makeup services.`

Varies per page (mandatory — no copy-paste) but always names: business, owners, location, year, signature service.

**Fast facts blocks (Home, About, Bridal):**
- Founded: 1994
- Owners: Ankit Sahni, Kusum Sahni
- Location: Lahar, Madhya Pradesh
- Primary services: Bridal makeup, pre-bridal packages, lehenga and jewelry rental
- Service area: Lahar, Bhind, Mihona, Daboh, Gormi, Datia
- Reviews: 4.6 average, 116+ Google reviews
- Instagram: @sahnibeautysalon (25,000+ followers)

AI crawlers strip these cleanly. Humans scan them.

**FAQ-rich content:**
Every page has a FAQ block. Questions in natural language. Answers 40-80 words, complete sentences. FAQPage schema emitted.

**llms.txt:**
`/public/llms.txt` lists every key page with a 20-30 word entity-rich summary.

**Structured data priority:**
- `LocalBusiness` with `sameAs` pointing to Instagram, Facebook, Justdial, Sulekha
- `Review` schema on published testimonials
- `AggregateRating` when >= 5 reviews
- `Offer` within `Service` for packages with specific prices

**robots.txt permissions:**
Explicit `Allow` for: `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `anthropic-ai`, `cohere-ai`, `CCBot`. Opting out forfeits this surface.

### Measurement — success by Month 3
- Perplexity query "best bridal salon in Lahar" returns Sahni as a named result with citation to sahnibridal.in
- ChatGPT query (with browsing) "bridal makeup in Lahar MP" mentions Sahni Bridal Studio
- Gemini query returns Sahni in local pack with our details
- Google AI Overviews shows Sahni for local bridal queries

### What we will NOT do
- No AI-specific doorway pages — same content serves Google + AI
- No cloaking (different content to AI vs humans)
- No paid "AI SEO" tools or services
- No prompt-stuffing content with LLM instructions

---

## 4. Synergy — one content strategy, three surfaces

A single well-built page with:
- Strong on-page SEO → ranks on Google
- Complete LocalBusiness schema + NAP consistency → ranks in Maps
- Named-entity paragraphs + Fast facts + FAQ → gets cited by AI

...serves all three surfaces with no parallel work. The `seo-page` and `salon-content` skills enforce this by default.

No surface is an afterthought. No surface has a separate budget. One content strategy, rigorously applied.
