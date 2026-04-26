# Canonical Memory: Key Decisions

Important choices made with rationale. Only memory-manager writes here.
Agents read this to understand why things are the way they are.

---

## Entry Format

```
### [Decision]
**Date**: [date]
**Made by**: [who/what]
**Rationale**: [why this, not alternatives]
**Alternatives rejected**: [what was considered and why rejected]
**Revisit if**: [conditions under which this should be reconsidered]
```

---

## Active Decisions

### COO Routes All Non-Trivial Requests
**Date**: 2026-04-14
**Made by**: system-init
**Rationale**: Single entry point prevents agents from being invoked out of sequence, ensures mandatory triggers are checked, and maintains system coherence.
**Alternatives rejected**: Direct agent invocation — leads to skipped security checks and missed dependency analysis.
**Revisit if**: COO becomes a bottleneck for clearly single-domain tasks.

### Dispatcher as Separate Routing Audit
**Date**: 2026-04-14
**Made by**: system-init
**Rationale**: COO routing decisions need an independent check. Combining orchestration and audit in one agent means errors compound silently. Dispatcher is cheap (Haiku) and fast.
**Alternatives rejected**: Self-auditing COO — conflict of interest; no external check.
**Revisit if**: Dispatcher false-positive rate exceeds 20% (blocking valid routes).

### Hard Stop After 3 Council Rounds
**Date**: 2026-04-14
**Made by**: system-init
**Rationale**: Councils that run indefinitely consume tokens without producing better decisions. Most real decisions converge in 2 rounds. Round 3 is a safety valve.
**Alternatives rejected**: Time-based stop — arbitrary; Round count-based is predictable.
**Revisit if**: Analysis shows high-quality decisions consistently require 4+ rounds.

### Security Agent as Hard Gate
**Date**: 2026-04-14
**Made by**: system-init
**Rationale**: Security findings discovered post-deployment cost 10–100x more to fix. A hard gate on CRITICAL findings prevents shipping known vulnerabilities.
**Alternatives rejected**: Advisory-only security — too easy to ignore under deadline pressure.
**Revisit if**: False positive rate from security agent exceeds 30%.

---

### Gemini as Default Conversational API
**Date**: 2026-04-18
**Made by**: Ankur + CTO review
**Rationale**: Gemini Flash free tier covers almost all conversational needs pre-revenue. Quality in Hindi / Hinglish is materially better than GPT-4-class equivalents for Indian SMB customer messages. No cost drag while the business is pre-revenue.
**Alternatives rejected**:
- OpenAI GPT-4 — no free tier usable for production traffic, cost would eat 30% of first client MRR.
- Anthropic Claude as default — best reasoning but free tier insufficient for receptionist-level volume; reserve for COO + council + complex draft work.
- Groq as default — superb speed but routed to content generation role instead (see next entry).
**Revisit if**: (a) Google paywalls Gemini free tier below 5M tokens/day, (b) Hindi quality degrades in a model update, (c) we hit $10k MRR and can afford a premium default.

### Groq for Content Generation
**Date**: 2026-04-18
**Made by**: Ankur + CTO review
**Rationale**: Groq's inference speed (sub-second for Llama-3-70B and Mixtral) means we can iterate on 16 Instagram captions in under 30 seconds per client. Free tier is generous for our volume (<1M tokens/month/client). Content quality is "good enough" — we're drafting captions, not writing novels, and a human approves each one.
**Alternatives rejected**:
- Claude for content — too expensive at scale, slow for batch generation.
- Local Ollama — speed depends on Ankur's machine being on; unreliable for 24/7 agency.
- Gemini for content — reserved for conversational / customer-facing work to avoid prompt cross-contamination.
**Revisit if**: Groq ends free tier, or content quality drops enough that rejection rate exceeds 20%.

### Supabase over Self-Hosted Postgres
**Date**: 2026-04-18
**Made by**: Ankur + CTO review
**Rationale**: Supabase gives us Postgres + Auth + Realtime + Storage on a free tier that handles up to ~500 MB DB and 5 GB storage — sufficient for the first 12 months. Self-hosting Postgres on Ankur's machine or a ₹500/month VPS means managing backups, uptime, auth, and realtime ourselves. Not worth the labour pre-revenue.
**Alternatives rejected**:
- Self-hosted Postgres — wrong labour tradeoff for solo founder.
- Firebase — vendor lock-in to NoSQL; data modelling for relational client/booking data gets painful.
- PlanetScale — free tier discontinued; paid tier overkill for our scale.
**Revisit if**: (a) Supabase free tier row cap hit before M10, (b) client data residency demands India-only hosting, (c) MRR justifies a dedicated Postgres VPS.

### Indian SMB ICP over Global B2B SaaS
**Date**: 2026-04-18
**Made by**: Ankur + CTO strategy review (post-audit)
**Rationale**: Original outreach agent targeted US B2B SaaS ($3k–$5k/month retainer). Reality check: (a) sales cycle is 3–6 months, not 2–4 weeks; (b) we have zero B2B SaaS case study; (c) global agencies with full teams already saturate that market; (d) Ankur's local advantage (Hindi, MP geography, Sahni as proof) is wasted on US prospects. Indian SMBs have shorter sales cycles (2–6 weeks), no entrenched AI agency competition, and we can demo in-person within 3 hours of Bhopal.
**Alternatives rejected**:
- Stay on B2B SaaS — zero traction for 3 months validates this is wrong.
- Dual ICP (Indian + global from Day 1) — splits attention; no focus means no case study; no case study means no sales anywhere.
- Target global Indian-diaspora SMBs — possible later but requires English content muscle we don't have yet.
**Revisit if**: We hit $5k MRR in Indian market AND build LinkedIn authority enough that global inbound exceeds 2/month.

### Salon Vertical First
**Date**: 2026-04-18
**Made by**: Ankur + CTO strategy review
**Rationale**: Sahni Bridal Studio is a live case study in the family — access to data, photos, owner cooperation, real numbers. 30-year legacy is a unique story. Lahar MP geography is cheap to visit, cheap to operate against. Salon operations are narrow enough to productise (WhatsApp + content + reviews = repeatable). Clinics and coaching centers share the same infrastructure and will be added in Phase 4 (M10+) as expansions from the same productised base.
**Alternatives rejected**:
- Clinics first — higher ticket but compliance risk (medical advice, HIPAA-adjacent) and no family case study.
- Coaching first — high churn (seasonal), emotionally charged parent interactions, thin margins.
- All three from Day 1 — dilutes productisation and kills the "one offer, one outcome" story.
**Revisit if**: Sahni case study fails to produce numbers by end of M2, OR salon vertical hits a regulatory/cultural wall (e.g. WhatsApp Business API restricts beauty content).

### Pricing Floor: ₹15,000/month
**Date**: 2026-04-18
**Made by**: Ankur + CTO review
**Rationale**: At ₹20,000/month retainer, the gross margin is roughly 55% after Claude API, WhatsApp template costs, VA time (from M7), hosting, and tooling. Below ₹15,000 the margin drops under 25% which is not recoverable at scale — every new client becomes a burden rather than a compounding asset. Also: low price anchors brand as "cheap software" — next client references start at the same low number.
**Alternatives rejected**:
- Start at ₹10,000 to "land the first client" — destroys pricing anchor permanently; first client's WhatsApp messages to other salon owners will cite the ₹10k number.
- No floor, negotiate each deal — kills operator focus; every deal becomes a 2-week negotiation instead of a 2-meeting close.
**Revisit if**: (a) costs drop materially (e.g. Gemini permanent free tier guaranteed, WhatsApp Business API pricing drops), (b) we want to launch a deliberately stripped "lite" tier ≤ ₹10k with half the deliverables — but never quietly discount the full stack.

### MRR Reality Check: $30k Is 18–24 Months, Not 12
**Date**: 2026-04-18
**Made by**: Ankur + CTO strategy review
**Rationale**: Math: $30k MRR = ~₹24.9 lakh/month. At ₹20k/salon that's 125 active salon clients — impossible for a solo founder even with 2 VAs (capacity caps around 40 clients). Realistic composition for $30k MRR: ~60 salon clients (₹12L) + 20 global clients ($7k) + 400 ReviewLoop users ($4.8k) + 8 clinic clients (₹2.4L) = the math works only at month 22–24 with normal churn and sustained outbound. The 12-month honest ceiling is ~$6.5k–$8k MRR. Declaring this publicly in the MRR plan (mrr-plan.md) and in canonical memory prevents future panic when month 6 shows $2k and the old target said $15k.
**Alternatives rejected**:
- Keep the $30k/12-month target for motivation — backfires when actual numbers miss; causes burnout and bad decisions (discounting, over-promising, shiny-new-vertical chasing).
- Private reality, public aspiration — creates dishonesty in LinkedIn build-in-public content, kills the credibility we're trying to build.
**Revisit if**: (a) ReviewLoop hits product-market fit earlier than M6 and revenue leverages beyond the model, (b) a strategic hire lands earlier than M7, (c) LinkedIn inbound starts producing $500+ MRR/month in month-adds by M4 (currently modelled as 1 client/month by M6).
