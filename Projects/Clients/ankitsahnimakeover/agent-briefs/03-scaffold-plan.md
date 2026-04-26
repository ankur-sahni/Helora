# Agent Brief — Next.js + Sanity Scaffold Plan

**Target agent:** `planner` (then `implementer`)
**Inputs required:** `brand/tailwind.config.snippet.ts`, `seo/site-architecture.md`
**Expected duration:** 1 day plan + 3 days build
**Deliverable location:** `Projects/Clients/sahni-bridal-studio/website/`

---

## Prompt — Part A: `planner`

You are the `planner` agent. Produce a complete implementation plan for the Sahni Bridal Studio website scaffold. `implementer` will follow it exactly. Do not write code.

**Context:**
- Stack frozen: Next.js (latest stable, App Router) + Tailwind CSS + Sanity.io CMS (free tier) + Vercel (free tier)
- Domain: sahnibridal.in
- Brand tokens: `brand/tailwind.config.snippet.ts`
- IA: `seo/site-architecture.md`
- Phase 1 only. Do not scaffold Phase 2 or Phase 3 routes.

**Use Context7 MCP** to pull current docs for: Next.js App Router, `next-sanity`, Sanity Studio embedded, `sanity/image-url`, Tailwind (verify current stable version).

**Your plan must cover:**

1. **Repo structure** — exact directory tree, file-by-file
2. **Package list** — every dependency, version pinned, reason. Verify each package exists and is free-tier friendly. Flag anything paid.
3. **Sanity schema** — document types for: `service`, `package`, `galleryImage`, `review`, `teamMember`, `siteSettings`, `page`. For each, list every field with type + validation.
4. **Routing table** — every Phase 1 route, its data source (Sanity query or static), its layout, its metadata fn
5. **Component inventory** — atoms, molecules, organisms needed. Mark shared vs page-specific.
6. **Image pipeline** — Sanity CDN + Next `<Image>` config; art direction for bridal hero shots
7. **Form handling** — bridal inquiry form: validation library, submission (Web3Forms free OR Formspree free OR Next route to WhatsApp Click-to-Chat URL — recommend one with tradeoffs)
8. **Analytics + SEO primitives** — GA4, Search Console verification, `next-sitemap`, per-page metadata pattern, structured data component pattern
9. **Build + CI** — lint, typecheck, Lighthouse budget in CI (GitHub Actions on PR, free tier)
10. **Rollout order** — which files get built in which order to minimize rework

**Output format:**
Single file: `website/IMPLEMENTATION_PLAN.md`

**Done when:**
- `dependency-analyst` has reviewed the package list
- Plan is approved by Ankur (he sees stack + reasoning before install)

---

## Prompt — Part B: `implementer`

You are the `implementer` agent. Build the scaffold exactly per `website/IMPLEMENTATION_PLAN.md`. No architectural decisions — if the plan is ambiguous, stop and ask `planner`.

**Before installing anything, verify each package exists at the specified version.** Use `npm view <pkg> versions --json` or Context7. Hard constraint.

**Build order (strict):**
1. `npx create-next-app@latest` with TypeScript, Tailwind, App Router, src dir
2. Apply `brand/tailwind.config.snippet.ts` into `tailwind.config.ts`
3. Install Sanity dependencies per plan
4. Run `npx sanity init` with embedded Studio at `/studio`
5. Implement Sanity schemas from plan
6. Implement `src/lib/sanity/client.ts` + queries per route
7. Implement layout (header, footer, sticky WhatsApp button) — driven by `siteSettings`
8. Implement pages as stubs that query Sanity — no content yet
9. Implement metadata function pattern + structured-data component
10. Add `next-sitemap` config, `robots.txt`, `manifest.json`
11. Set up GA4 placeholder (env-gated)
12. Set up CI: lint, typecheck, Lighthouse via `@lhci/cli` on PR

**Commit rhythm:** one commit per numbered step. Message: `scaffold(step N): <what>`.

**Before each commit:**
- Run `npm run build` — must pass
- Run `npm run lint` — must pass
- Screenshot mobile (375px) via Playwright MCP

**Done when:**
- All 7 Phase 1 routes render in dev with dummy Sanity data
- Studio accessible at `/studio`, Ankur can log in
- `reviewer` approves
- `security` cleared form handling
- Lighthouse local mobile scores ≥ 85 baseline

**Escalate if:**
- A package in the plan is deprecated or paywalled
- Sanity free tier blocks any required feature
- The plan assumes a structure that Next.js current version has moved away from
