# Deploy Safety Net Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a three-layer deploy safety net to the ASM nextjs site so broken deploys (missing env vars, dead assets, wrong WhatsApp number) cannot silently reach production.

**Architecture:** Two standalone Node ESM scripts (`preflight.mjs` runs before deploy, `smoke.mjs` verifies the live result after deploy), composed by an `npm run deploy:prod` wrapper, with the `pre-push` hook calling preflight. A plain-English runbook documents the server-side Vercel Deployment Checks backstop (Ankur's dashboard clicks).

**Tech Stack:** Node 18+ ESM (`.mjs`, global `fetch`, no new deps), npm scripts, Husky, Vercel CLI.

**Working directory for all tasks:** `Projects/Clients/ankitsahnimakeover/ankitsahnimakeover-nextjs`
**Branch:** `feature/deploy-safety-net` (already created — never commit to `main`).

---

## File Structure

| File | Responsibility | Action |
|------|----------------|--------|
| `scripts/preflight.mjs` | Block deploy on type errors, missing env vars, or build failure | Create |
| `scripts/smoke.mjs` | Verify live URL: 200, Sanity image loads, correct WA number, no personal number | Create |
| `scripts/deploy.mjs` | Safe deploy: preflight → `npx vercel --prod` → smoke the **returned deployment URL** | Create |
| `package.json` | Wire `preflight`, `smoke`, `deploy:prod` scripts | Modify |
| `.husky/pre-push` | Replace bare build with full preflight | Modify |
| `docs/deploy-runbook.md` | Document Vercel Deployment Checks setup (Layer 3) | Create |

Required env vars (verified from code 2026-05-29): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_PHONE`, `SANITY_API_TOKEN`. (`NEXT_PUBLIC_GA_ID` is intentionally NOT required — it is guarded/optional in `layout.tsx:320` and absent from `.env.local`.)

Constants: canonical WhatsApp `919098888134`; personal number to forbid `9098909088`; default prod URL `https://ankitsahnimakeover.com`.

---

### Task 1: Preflight script — env-var check core

**Files:**
- Create: `scripts/preflight.mjs`

- [ ] **Step 1: Write the env-var check module**

Create `scripts/preflight.mjs` with the env-var check first (build/tsc added in Task 2). It reads `.env.local` if present, merges with `process.env`, and asserts every required key is present and non-empty.

```js
// scripts/preflight.mjs
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const REQUIRED_ENV = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "NEXT_PUBLIC_PHONE",
  "SANITY_API_TOKEN",
];

function fail(msg) {
  console.error(`\n  PREFLIGHT FAILED\n  ${msg}\n`);
  process.exit(1);
}

function loadEnv() {
  const env = { ...process.env };
  if (existsSync(".env.local")) {
    for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return env;
}

function checkEnv() {
  const env = loadEnv();
  const missing = REQUIRED_ENV.filter((k) => !env[k] || env[k].trim() === "");
  if (missing.length) {
    fail(
      `Missing required env var(s): ${missing.join(", ")}\n` +
      `  Fix: add them to .env.local (local) or the Vercel project (prod).\n` +
      `  This is the failure class that broke prod on 2026-05-29.`
    );
  }
  console.log(`  [ok] env vars present (${REQUIRED_ENV.length})`);
}

checkEnv();
console.log("\n  PREFLIGHT PASSED\n");
```

- [ ] **Step 2: Run against current clean state to verify it passes**

Run: `node scripts/preflight.mjs`
Expected: prints `[ok] env vars present (5)` then `PREFLIGHT PASSED`, exit 0.
(If it fails here, `.env.local` is genuinely missing a var — that is a real finding, report it, do not weaken the check.)

- [ ] **Step 3: Run against a forced-missing var to verify it fails**

Temporarily move `.env.local` so the required vars are absent from the file (process env won't have them either in a fresh shell).
Concretely (PowerShell): `Rename-Item .env.local .env.local.bak; node scripts/preflight.mjs`
Expected: `PREFLIGHT FAILED` naming the missing vars, exit 1.
Then restore immediately: `Rename-Item .env.local.bak .env.local`

- [ ] **Step 4: Commit**

```bash
git add scripts/preflight.mjs
git commit -m "feat(deploy): add preflight env-var presence check"
```

---

### Task 2: Preflight — add tsc and build gates

**Files:**
- Modify: `scripts/preflight.mjs`

- [ ] **Step 1: Add tsc + build steps before the success line**

Replace the final two lines (`checkEnv();` ... `PREFLIGHT PASSED`) with the full ordered run:

```js
function run(label, cmd) {
  console.log(`  [..] ${label}`);
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch {
    fail(`${label} failed. See output above.`);
  }
  console.log(`  [ok] ${label}`);
}

checkEnv();
run("type check (tsc --noEmit)", "npx tsc --noEmit");
run("production build (next build)", "npx next build");

console.log("\n  PREFLIGHT PASSED\n");
```

- [ ] **Step 2: Run the full preflight to verify it passes**

Run: `node scripts/preflight.mjs`
Expected: env ok → tsc ok → build ok → `PREFLIGHT PASSED`, exit 0. (Build takes ~1-2 min.)

- [ ] **Step 3: Commit**

```bash
git add scripts/preflight.mjs
git commit -m "feat(deploy): preflight runs tsc + build after env check"
```

---

### Task 3: Smoke test — live-result verification

**Files:**
- Create: `scripts/smoke.mjs`

- [ ] **Step 1: Write the smoke script**

Create `scripts/smoke.mjs`. Uses global `fetch` (Node 18+). Checks target the two real prod-failure classes: (a) blank/error page from missing env vars → brand-string check; (b) www→apex CORS redirect blocking `/_next/static` assets → asset 200 check. Plus the WhatsApp number guard.

```js
// scripts/smoke.mjs
const SITE = process.argv[2] || "https://ankitsahnimakeover.com";
const BRAND = "Ankit Sahni Makeover";
const CANONICAL_WA = "919098888134";
const FORBIDDEN_WA = "9098909088";

function fail(msg) {
  console.error(`\n  SMOKE FAILED for ${SITE}\n  ${msg}\n`);
  process.exit(1);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getHomepage() {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(SITE, { redirect: "follow" });
      if (res.status === 200) return await res.text();
      if (attempt === 3) fail(`Homepage returned HTTP ${res.status} (expected 200). Check Vercel env vars / project link / CORS redirect.`);
    } catch (e) {
      if (attempt === 3) fail(`Homepage fetch threw: ${e.message}`);
    }
    await sleep(attempt * 2000);
  }
}

function checkBrand(html) {
  if (!html.includes(BRAND)) fail(`Brand string "${BRAND}" not in HTML — page rendered blank/error (likely missing Sanity env vars).`);
  console.log(`  [ok] page rendered real content`);
}

async function checkStaticAsset(html) {
  const m = html.match(/\/_next\/static\/[^"'\s>]+\.(?:js|css)/);
  if (!m) fail("No /_next/static asset reference found in HTML — build output not linked.");
  const assetUrl = new URL(m[0], SITE).href;
  const res = await fetch(assetUrl, { redirect: "follow" });
  if (res.status !== 200) fail(`Static asset ${assetUrl} returned HTTP ${res.status} (expected 200) — this is the CORS/asset-block class that broke prod on 2026-05-29.`);
  console.log(`  [ok] /_next/static asset loads (${res.status})`);
}

function checkNumbers(html) {
  if (!html.includes(CANONICAL_WA)) fail(`Canonical WhatsApp number ${CANONICAL_WA} not found on page.`);
  if (html.includes(FORBIDDEN_WA)) fail(`PRIVACY LEAK: personal number ${FORBIDDEN_WA} present on live page — must be removed.`);
  console.log(`  [ok] WhatsApp number correct, personal number absent`);
}

const html = await getHomepage();
console.log(`  [ok] homepage 200`);
checkBrand(html);
await checkStaticAsset(html);
checkNumbers(html);
console.log("\n  SMOKE PASSED\n");
```

- [ ] **Step 2: Run against live prod to verify it passes**

Run: `node scripts/smoke.mjs`
Expected: homepage 200 → content ok → static asset 200 → numbers ok → `SMOKE PASSED`, exit 0.
(Site is currently green, so this must pass. If any check fails, that is a real live issue — report it, do not weaken the check.)

- [ ] **Step 3: Run against a known-bad URL to verify it fails**

Run: `node scripts/smoke.mjs https://example.com`
Expected: fails at the brand-string check ("Ankit Sahni Makeover" not in HTML), exit 1.

- [ ] **Step 4: Commit**

```bash
git add scripts/smoke.mjs
git commit -m "feat(deploy): add post-deploy smoke test for live result"
```

---

### Task 4: Wire npm scripts and pre-push hook

**Files:**
- Modify: `package.json`
- Modify: `.husky/pre-push`

- [ ] **Step 1: Create the deploy wrapper, then add scripts to package.json**

First create `scripts/deploy.mjs` — it deploys and then smoke-tests the **exact deployment URL** Vercel returns (not the apex domain), avoiding the propagation race:

```js
// scripts/deploy.mjs
import { execSync } from "node:child_process";

function run(label, cmd, opts = {}) {
  console.log(`\n  ${label}...`);
  return execSync(cmd, { stdio: opts.capture ? "pipe" : "inherit", encoding: "utf8" });
}

run("Preflight", "node scripts/preflight.mjs");
const out = run("Deploying to production (npx vercel --prod)", "npx vercel --prod", { capture: true });
process.stdout.write(out);
const url = (out.match(/https:\/\/[^\s]+\.vercel\.app/g) || []).pop();
const target = url || "https://ankitsahnimakeover.com";
run(`Smoke testing ${target}`, `node scripts/smoke.mjs ${target}`);
console.log("\n  DEPLOY + SMOKE OK\n");
```

Then in `package.json` `"scripts"`, add three entries (keep existing entries unchanged):

```json
    "preflight": "node scripts/preflight.mjs",
    "smoke": "node scripts/smoke.mjs",
    "deploy:prod": "node scripts/deploy.mjs"
```

- [ ] **Step 2: Verify scripts resolve**

Run: `npm run smoke`
Expected: `SMOKE PASSED` (proves the npm script wiring works against live prod).

- [ ] **Step 3: Update pre-push hook to run preflight**

Replace the contents of `.husky/pre-push` (currently `echo ...` + `npm run build`) with:

```sh
echo "Running preflight before push..."
npm run preflight
```

- [ ] **Step 4: Verify the hook runs preflight**

Run: `sh .husky/pre-push`
Expected: preflight runs (env → tsc → build) and ends `PREFLIGHT PASSED`, exit 0.

- [ ] **Step 5: Commit**

```bash
git add package.json .husky/pre-push
git commit -m "feat(deploy): wire preflight/smoke/deploy:prod scripts + pre-push gate"
```

---

### Task 5: Vercel Deployment Checks runbook (Layer 3)

**Files:**
- Create: `docs/deploy-runbook.md`

- [ ] **Step 1: Write the runbook**

Create `docs/deploy-runbook.md` documenting the safe deploy flow and the server-side backstop Ankur sets up by hand.

```markdown
# ASM Deploy Runbook

## Safe deploy (one command)
From `ankitsahnimakeover-nextjs`:

    npm run deploy:prod

This runs: preflight (env + tsc + build) → `vercel --prod` → smoke test against live.
If preflight fails, nothing deploys. If smoke fails after deploy, you are told exactly what broke.

## Manual checks
- `npm run preflight` — before any push; blocks bad local state.
- `npm run smoke` — verify live prod is healthy any time.
- `npm run smoke -- <preview-url>` — check a preview deployment.

## Layer 3 — Vercel Deployment Checks (one-time, dashboard)
This is the unbypassable server-side gate. Set up once:

1. Go to vercel.com → the **ankitsahnimakover** project (not the ghost `ankitsahnimakeover-nextjs`).
2. **Settings → Git** → confirm Production Branch is `main`.
3. **Settings → Deployment Protection** → enable checks so failed builds are not promoted to Production.
4. Confirm required env vars are set under **Settings → Environment Variables** (Production):
   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION,
   NEXT_PUBLIC_PHONE, SANITY_API_TOKEN. (NEXT_PUBLIC_GA_ID optional — add only if using GA.)
5. Trigger a test deploy; confirm it only goes live after the build succeeds.

## What broke before (so it does not repeat)
2026-05-29 outage cause: missing Vercel env vars + wrong project link + www->apex CORS redirect.
Build passed; live site was broken. The smoke test now catches this class.
```

- [ ] **Step 2: Commit**

```bash
git add docs/deploy-runbook.md
git commit -m "docs(deploy): add deploy runbook + Vercel Deployment Checks guide"
```

---

### Task 6: Code review + PR

- [ ] **Step 1: Run code review on the branch diff**

Use the `code-review` skill (or `feature-dev:code-reviewer` subagent) against the `feature/deploy-safety-net` diff vs `main`. Address any high-confidence findings.

- [ ] **Step 2: Final verification — run the full safe path (dry, no deploy)**

Run: `npm run preflight` then `npm run smoke`
Expected: both PASS. (Do NOT run `deploy:prod` as part of testing — only when actually shipping, with Ankur's go-ahead.)

- [ ] **Step 3: Push and open PR**

```bash
git push -u origin feature/deploy-safety-net
gh pr create --title "Deploy safety net: preflight + smoke + runbook" --body "Implements docs/superpowers/specs/2026-05-29-deploy-safety-net-design.md. No app/component/style changes."
```

- [ ] **Step 4: Merge after review approval** (Ankur's call — do not self-merge without go-ahead).

---

## Self-Review

**Spec coverage:**
- Layer 1 preflight (env+tsc+build) → Tasks 1, 2 ✓
- Layer 2 smoke (200, Sanity image, WA number, no personal number) → Task 3 ✓
- Deploy wrapper + pre-push → Task 4 ✓
- Layer 3 Vercel Checks runbook → Task 5 ✓
- Branch-per-change + code review → Task 6 ✓
- Acceptance criteria 1-7 → covered across Tasks 1-6 ✓

**Placeholder scan:** No TBD/TODO; all code blocks complete and runnable.

**Type/name consistency:** `preflight.mjs`, `smoke.mjs`, env-var names, constants (`919098888134`, `9098909088`, prod URL) consistent across all tasks and the spec.

**Don't-break check:** Zero changes to app code, components, or styles. Only additive scripts/docs + one hook line swap (build is still covered, now inside preflight).
