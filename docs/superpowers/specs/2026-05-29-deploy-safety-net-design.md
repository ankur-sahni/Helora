# Deploy Safety Net — Design Spec

> **Status:** Approved design (2026-05-29). Workstream (a) of the Helora/ASM separation sequence.
> **Repo:** `Projects/Clients/ankitsahnimakeover/ankitsahnimakeover-nextjs` (ASM nextjs subrepo).
> **Branch:** `feature/deploy-safety-net` (never commit to `main`).

---

## 1. Problem

The live site (ankitsahnimakeover.com) broke this session not because a bad build was pushed, but because of **missing Vercel env vars + wrong project link + a CORS redirect** — the build passed, the live site was broken. Current gates only check the *local build*, never the *live result*:

- `pre-commit`: `tsc --noEmit` + `lint-staged`
- `pre-push`: `npm run build`
- `vercel.json`: security headers only — **no deploy gate**

There is **zero verification that a deploy actually works in production.** That is the gap that breaks prod.

## 2. Goal

A safety net that blocks broken deploys and catches the *live-result* failure class (missing env vars, broken assets, wrong WhatsApp number) — without changing how the site itself works. **Do not break what already works.** No over-engineering: three small scripts + one hook change + a guided dashboard step.

## 3. Non-Goals

- No CI/CD platform migration. Vercel stays.
- No rewrite of existing husky hooks beyond adding the preflight call.
- No new runtime dependencies if avoidable (use Node built-ins / existing deps).
- No changes to app code, components, or styling.

## 4. Design — three layers

### Layer 1 — Preflight (local, blocks before deploy)
New script `scripts/preflight.mjs`, wired as `npm run preflight`. Runs in order, fails loud on first failure:
1. `tsc --noEmit` — type safety
2. **Env-var presence check** — assert all required vars exist (in `.env.local` for local, or process env in CI). Required set (verified from code 2026-05-29):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `NEXT_PUBLIC_PHONE`
   - `SANITY_API_TOKEN` (server-side; used by seed script + CI)
   - (`NEXT_PUBLIC_GA_ID` is NOT required — guarded/optional in `layout.tsx:320`, absent from `.env.local`.)
3. `next build` — compile

The env-var check is the new protection: it would have caught this session's outage.

### Layer 2 — Post-deploy smoke test (local, verifies live result)
New script `scripts/smoke.mjs`, wired as `npm run smoke -- <url>` (defaults to `https://ankitsahnimakeover.com`). After a deploy, asserts:
1. Homepage returns HTTP `200`
2. HTML contains the brand string "Ankit Sahni Makeover" — catches the blank/error-page class caused by missing Sanity env vars (the page falls back / fails to render real content)
3. A `/_next/static/*.js|css` asset referenced in the HTML returns `200` — this is the exact CORS/asset-block class (www→apex redirect) that broke prod on 2026-05-29. (Sanity images are served client-side via the Next optimizer, so a raw `cdn.sanity.io` URL is not reliably present in server HTML — the static-asset check is the correct, robust regression detector.)
4. The page contains the canonical WhatsApp number `919098888134` AND does **not** contain the personal number `9098909088` (catches wrong-number + privacy regressions)

Any failure → non-zero exit + a plain-English message naming what broke and where to look (env vars / project link / CORS).

### Layer 3 — Vercel Deployment Checks (server-side backstop, Ankur's guided clicks)
Unbypassable net: Vercel refuses to promote a deploy to production unless checks pass. Delivered as a **step-by-step dashboard guide** (`docs/deploy-runbook.md`) — ~5 clicks, free tier, no code. This is documentation + guidance, not an automated step, because it requires dashboard access.

### Deploy wrapper (ties 1 + 2 together)
New script `scripts/deploy.mjs`, run via `npm run deploy:prod`:
```
preflight  →  npx vercel --prod  →  smoke (against the deployment URL vercel returns)
```
It captures the `*.vercel.app` URL printed by `npx vercel --prod` and smokes **that exact deployment**, not the apex domain — avoiding the propagation race where the domain still points at the previous deploy. Falls back to the apex domain if no URL is parsed. (`npx vercel --prod` is the verified working deploy path from the 2026-05-29 prod-fix session.) The existing `pre-push` hook is updated to call `npm run preflight` (replacing the bare `npm run build`, since preflight includes build + more).

## 5. Components & boundaries

| Unit | Purpose | Depends on | Bypassable? |
|------|---------|-----------|-------------|
| `scripts/preflight.mjs` | Block bad local state before deploy | tsc, next build, env file | yes (`--no-verify`) — fast feedback layer |
| `scripts/smoke.mjs` | Verify the live result post-deploy | fetch (Node 18+ global) | no — runs after deploy, reports truth |
| `npm run deploy:prod` | Safe end-to-end deploy | the two scripts + vercel CLI | n/a (the safe path) |
| `.husky/pre-push` | Catch before code leaves machine | preflight | yes (`--no-verify`) |
| Vercel Deployment Checks | Server-side promotion gate | smoke endpoint / build | **no** — the real backstop |

Each script is independently runnable and independently useful. `smoke.mjs` has no knowledge of `preflight.mjs`; the wrapper composes them.

## 6. Error handling

- Every script exits non-zero on failure and prints a single plain-English line stating **what failed** and **the likely cause/fix** (no stack-trace dumps).
- `smoke.mjs` retries the homepage fetch up to 3× with backoff (Vercel propagation lag) before declaring failure — avoids false negatives on a just-promoted deploy.
- Scripts never mutate state; they only read/verify.

## 7. Testing

- `preflight.mjs`: run with a deliberately-missing env var → must fail with the named var. Run clean → must pass.
- `smoke.mjs`: run against live prod → must pass (site is currently green). Run against a known-bad URL → must fail at the 200 check. Manually assert the WA-number checks by grepping the fetched HTML.
- No new unit-test framework introduced — these are scripts verified by running them (the verification-before-completion principle).

## 8. Constraints honored

- Free tier only — no paid tooling; Node built-ins + existing deps.
- No fake data — scripts test the real live site.
- Don't break working things — zero app/component/style changes; hooks only gain a stricter check.
- Branch-per-change — all work on `feature/deploy-safety-net`, PR + code review before merge.
- No delete without double-confirm — nothing is deleted; `pre-push` line is replaced (not a file deletion).

## 9. Acceptance criteria

1. `npm run preflight` passes on a clean checkout and fails loudly when any required env var is missing.
2. `npm run smoke` passes against current live prod and fails against a broken URL.
3. `npm run deploy:prod` runs preflight → deploy → smoke as one command.
4. `pre-push` runs preflight (build still covered).
5. `docs/deploy-runbook.md` documents the Vercel Deployment Checks setup in plain steps.
6. No change to any rendered page, component, or style; site stays green.
7. Merged to `main` via reviewed PR.
