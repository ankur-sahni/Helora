# ASM Phase 1 — Stabilize the Floor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate the blank-image placeholders and invisible "black void" sections, make the WhatsApp contact submit reliable, add the one missing SEO tag (canonical), and make site data (phone, reviews) single-sourced — so the live site visibly matches or beats baseline `2ef08df`.

**Architecture:** Surgical fixes inside the existing Next.js 16 + Sanity app. No redesign, no new dependencies except a minimal test runner. Each fix targets a confirmed root cause found by live-DOM + code audit (2026-05-30). The dark-luxury design system, existing JSON-LD/metadata, and the WhatsApp funnel are preserved.

**Tech Stack:** Next.js 16.2.6 (App Router, Turbopack), React 19, TypeScript 5, Sanity (`@sanity/image-url`), Tailwind 4, Vitest (new, dev-only).

**Corrections from code audit (vs the design spec):** the contact form is NOT fake (real `<form>` exists; only `window.open` reliability is the issue); the SEO head already has OG + LocalBusiness + FAQPage JSON-LD (only `canonical` is missing); there are NO `href="#"` dead links; image blanks are a missing-content + missing per-item-fallback issue, not a query bug.

**Prerequisite:** PR #1 (`feature/deploy-safety-net`) should be merged to `main` first so `npm run preflight` / `smoke` exist for verification. All Phase 1 branches are cut from updated `main`.

**Branch strategy:**
- `fix/visual-floor` → Tasks 1.0, 1.1, 1.2 (the "stop looking broken" batch; verified together in browser)
- `fix/form-seo-data` → Tasks 1.3, 1.4, 1.5

**Build/verify note:** `next build` and the pre-push hook require Sanity CDN network — these run on Ankur's machine, not the Claude sandbox. Browser verification uses the live/preview URL.

---

## File Structure

| File | Responsibility | Tasks |
|------|----------------|-------|
| `lib/sanityImg.ts` (new) | Single helper: Sanity image URL or real local fallback (never empty) | 1.1 |
| `lib/sanityImg.test.ts` (new) | Unit tests for the helper | 1.0, 1.1 |
| `components/ContactSection.tsx` | Robust WhatsApp submit + fallback link | 1.3 |
| `lib/wa.test.ts` (new) | Unit test for WhatsApp URL builder | 1.0, 1.3 |
| `app/page.tsx` | Use fallback helper in services/makeupTypes/team/awards/celebs maps | 1.1 |
| `components/Enhance.tsx` | MutationObserver so late Sanity nodes reveal | 1.2 |
| `app/globals.css` | Reveal visibility fallback (reduced-motion + JS-gated) | 1.2 |
| `app/layout.tsx` | Add `alternates.canonical`; single-source phone/rating defaults; inline `js` class script | 1.2, 1.4, 1.5 |
| `vitest.config.ts` (new) | Test runner config | 1.0 |

---

## Task 1.0: Minimal test harness (Vitest)

Only pure functions are unit-tested in Phase 1 (the image-fallback helper and the WhatsApp URL builder). Visual/integration fixes are verified in the browser. No React-component testing libs (avoids jsdom/over-engineering).

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (scripts + devDependency)

- [ ] **Step 1: Verify Vitest exists and pick a version**

Run: `npm view vitest version`
Expected: prints a current 3.x version (confirms package exists before install — do not guess).

- [ ] **Step 2: Install Vitest (dev only)**

Run: `npm install -D vitest`
Expected: `vitest` added to `devDependencies`; no errors.

- [ ] **Step 3: Create the config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: Add the test script**

In `package.json` `"scripts"`, add after the `"lint"` line:

```json
    "test": "vitest run",
```

- [ ] **Step 5: Verify the runner works (no tests yet)**

Run: `npm test`
Expected: Vitest runs and reports "No test files found" (exit 0 or 1 is fine) — confirms the runner is wired. Tests are added in 1.1 and 1.3.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts package.json package-lock.json
git commit -m "chore(test): add minimal vitest runner for pure-function tests"
```

---

## Task 1.1: Per-item image fallback (fixes the 17 blank images)

**Root cause:** When a Sanity doc exists but its image field is empty, `page.tsx` maps it to `img: ""` and renders `<Image src="" />` — a broken/blank image. `GallerySection` already avoids this with a `Boolean(i.image)` guard; we port that idea as a shared helper that returns a **real local photo** when the Sanity image is missing (no fake data — these are the salon's own `/images/*.webp`).

**Files:**
- Create: `lib/sanityImg.ts`
- Create: `lib/sanityImg.test.ts`
- Modify: `app/page.tsx` (services map ~356-366, makeupTypes ~462-474, team ~874-882, awards ~996-1006, celebs ~1008-1015)

- [ ] **Step 1: Write the failing test**

Create `lib/sanityImg.test.ts`:

```ts
import { describe, it, expect, vi } from "vitest";

// Mock the Sanity builder so the helper is testable in node.
vi.mock("../sanity/image", () => ({
  urlFor: (src: unknown) => ({
    width: () => ({ url: () => `https://cdn.sanity.test/${(src as { _ref?: string })._ref}` }),
  }),
}));

import { sanityImg } from "./sanityImg";

describe("sanityImg", () => {
  it("returns the local fallback when image is missing", () => {
    expect(sanityImg(undefined, 500, "/images/x.webp")).toBe("/images/x.webp");
    expect(sanityImg(null, 500, "/images/x.webp")).toBe("/images/x.webp");
  });

  it("returns a CDN url when an image ref is present", () => {
    const img = { _type: "image", asset: { _ref: "image-abc" } };
    expect(sanityImg(img, 500, "/images/x.webp")).toBe("https://cdn.sanity.test/image-abc");
  });

  it("never returns an empty string", () => {
    expect(sanityImg(undefined, 500, "/images/x.webp")).not.toBe("");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './sanityImg'` (helper not created yet).

- [ ] **Step 3: Create the helper**

Create `lib/sanityImg.ts`:

```ts
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "../sanity/image";

/**
 * Returns a Sanity CDN URL for `image`, or `fallback` (a real local
 * /images/*.webp path) when the image is missing. Never returns "".
 */
export function sanityImg(
  image: SanityImageSource | undefined | null,
  width: number,
  fallback: string,
): string {
  if (!image) return fallback;
  return urlFor(image).width(width).url();
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS (3 tests green).

- [ ] **Step 5: Use the helper in the services (Craft) map**

In `app/page.tsx`, add the import near the other `lib`/`sanity` imports at the top of the file:

```tsx
import { sanityImg } from "@/lib/sanityImg";
```

Then replace the services map (currently ~356-366). Add the index `i` and use the fallback array's real photo:

```tsx
  const cards = items.length
    ? items.map((s, i) => ({
        _id: s._id,
        number: s.number,
        title: s.title,
        subtitle: s.subtitle ?? "",
        description: s.description ?? "",
        img: sanityImg(s.image, 500, FALLBACK_CRAFT[i % FALLBACK_CRAFT.length].img),
        frame: s.frame ?? "arch",
      }))
    : FALLBACK_CRAFT;
```

- [ ] **Step 6: Use the helper in the makeupTypes map**

Replace the makeupTypes map (~462-474):

```tsx
  const cards = items.length
    ? items.map((t, i) => ({
        _id: t._id,
        number: t.number,
        title: t.title,
        subtitle: t.subtitle ?? "",
        tag: t.tag ?? "",
        img: sanityImg(t.image, 600, FALLBACK_MAKEUP[i % FALLBACK_MAKEUP.length].img),
        wa:
          t.whatsappMessage ??
          `Hi Ankit, I would like to enquire about ${t.title}.`,
      }))
    : FALLBACK_MAKEUP;
```

- [ ] **Step 7: Use the helper in the team map** (field is `photo`)

Replace the team map (~874-882):

```tsx
  const team = items.length
    ? items.map((m, i) => ({
        _id: m._id,
        name: m.name,
        role: m.role ?? "",
        img: sanityImg(m.photo, 400, FALLBACK_TEAM[i % FALLBACK_TEAM.length].img),
        bio: m.bio ?? "",
      }))
    : FALLBACK_TEAM;
```

- [ ] **Step 8: Use the helper in the awards map**

Replace the awards map (~996-1006):

```tsx
  const awardCards = awards.length
    ? awards.map((a, i) => ({
        _id: a._id,
        title: a.title,
        caption: a.caption ?? "",
        year: a.year ?? "",
        body: a.body ?? "",
        img: sanityImg(a.image, 500, FALLBACK_AWARDS[i % FALLBACK_AWARDS.length].img),
        frame: a.frame ?? "arch",
      }))
    : FALLBACK_AWARDS;
```

- [ ] **Step 9: Use the helper in the celebs map**

Replace the celebs map (~1008-1015):

```tsx
  const celebCards = celebs.length
    ? celebs.map((c, i) => ({
        _id: c._id,
        name: c.title,
        caption: c.caption ?? "",
        img: sanityImg(c.image, 300, FALLBACK_CELEBS[i % FALLBACK_CELEBS.length].img),
      }))
    : FALLBACK_CELEBS;
```

- [ ] **Step 10: Run tests + typecheck**

Run: `npm test`
Expected: PASS.
Run: `npx tsc --noEmit`
Expected: no errors. (If `FALLBACK_AWARDS` items lack an `img` field, the audit shows item 0 has `Bhumika Behal.webp` — confirm `.img` exists on its type; if the typed array uses a different key, use that key.)

- [ ] **Step 11: Commit**

```bash
git add lib/sanityImg.ts lib/sanityImg.test.ts app/page.tsx
git commit -m "fix(images): per-item local fallback so missing Sanity images never render empty src"
```

---

## Task 1.2: Reveal-animation resilience (fixes the black voids)

**Root cause:** `.reveal*` elements start at `opacity:0` and only become visible when `Enhance.tsx`'s IntersectionObserver adds `.in`. The observer rescans only for ~3s (10×300ms); Sanity-driven grids that paint later are never observed → permanently invisible. There is also no no-JS / reduced-motion fallback. Fix = (a) observe late nodes via MutationObserver, (b) guarantee content is visible when JS can't animate.

**Files:**
- Modify: `components/Enhance.tsx` (~98-128 observer/scan block)
- Modify: `app/globals.css` (reveal block ~2573-2626, reduced-motion ~3183-3203)
- Modify: `app/layout.tsx` (`<head>` — add inline `js`-class script)

- [ ] **Step 1: Add a MutationObserver to catch late-rendered reveal nodes**

In `components/Enhance.tsx`, locate the rescan interval block (ends with the `setInterval(... 300)` that caps at `ticks > 10`). Replace that interval block with a MutationObserver that re-scans whenever new DOM is added, plus keep one short interval as a safety:

Replace:

```tsx
    scan();
    window.__rescanReveal = scan;
    // Re-scan briefly in case React hasn't painted all nodes yet
    let ticks = 0;
    const iv = setInterval(() => {
      scan();
      if (++ticks > 10) clearInterval(iv);
    }, 300);
```

with:

```tsx
    scan();
    window.__rescanReveal = scan;
    // Re-scan whenever new nodes are added (e.g. async Sanity content),
    // so late-rendered grids are never stranded at opacity:0.
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });
    // Short safety interval for the first second of hydration.
    let ticks = 0;
    const iv = setInterval(() => {
      scan();
      if (++ticks > 4) clearInterval(iv);
    }, 250);
```

- [ ] **Step 2: Clean up the MutationObserver**

In the same file's cleanup/return function (where `clearInterval(iv)` already runs), add `mo.disconnect();` next to it:

```tsx
      clearInterval(iv);
      mo.disconnect();
```

- [ ] **Step 3: Add inline script so hidden state only applies when JS is active**

In `app/layout.tsx`, inside `<head>` (before the JSON-LD scripts), add a tiny inline script that marks the document as JS-enabled before paint:

```tsx
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
```

- [ ] **Step 4: Gate the reveal hidden-state on `.js` so no-JS shows content**

In `app/globals.css`, in the reveal block (~2573+), scope the three initial-hidden rules under `html.js`. Change:

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
```
to
```css
html.js .reveal {
  opacity: 0;
  transform: translateY(30px);
```

Apply the same `html.js ` prefix to the `.reveal-oval {` initial rule and the `.reveal-stagger > * {` initial rule. Leave the `.in` rules unchanged. Also prefix the `.reveal-words .w .i {` (translateY 110%) rule with `html.js `. (Without `.js`, content renders fully visible — the floor is guaranteed even if hydration fails.)

- [ ] **Step 5: Make reduced-motion show content immediately**

In `app/globals.css`, inside the existing `@media (prefers-reduced-motion: reduce)` block (~3183-3203), add:

```css
  .reveal,
  .reveal-oval,
  .reveal-stagger > * {
    opacity: 1 !important;
    transform: none !important;
  }
  .reveal-words .w .i {
    transform: none !important;
  }
```

- [ ] **Step 6: Browser verification (the real test for this task)**

Build + run on Ankur's machine (or preview deploy), then in the browser:
1. Load the homepage, scroll to the bottom slowly.
2. Run in console:
```js
[...document.querySelectorAll('*')].filter(el => getComputedStyle(el).opacity === '0' && el.getBoundingClientRect().height > 50).length
```
Expected: **0** (was 31).
3. Toggle "Emulate prefers-reduced-motion: reduce" in DevTools rendering, reload — all sections visible immediately.
4. Full-page screenshot — no black voids.

- [ ] **Step 7: Commit**

```bash
git add components/Enhance.tsx app/globals.css app/layout.tsx
git commit -m "fix(reveal): observe late Sanity nodes + no-JS/reduced-motion visibility fallback so sections never stay invisible"
```

---

## Task 1.3: Robust WhatsApp contact submit (no silent lead loss)

**Root cause:** `handleSubmit` calls `window.open(wa(...), "_blank")` and immediately `setSent(true)`. Mobile browsers frequently block `window.open` outside a direct user gesture chain, so the WhatsApp tab never opens but the user still sees "Brief received" — the enquiry is lost. Fix: navigate reliably and always present a real, clickable `wa.me` link in the success state.

**Files:**
- Create: `lib/wa.ts` (extract the URL builder so it is testable)
- Create: `lib/wa.test.ts`
- Modify: `components/ContactSection.tsx` (the local `wa` helper ~13-14, `handleSubmit` ~91-96, success state ~180-200)

- [ ] **Step 1: Write the failing test for the URL builder**

Create `lib/wa.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { waUrl } from "./wa";

describe("waUrl", () => {
  it("builds a wa.me link with encoded text", () => {
    expect(waUrl("919098888134", "Hi Ankit")).toBe(
      "https://wa.me/919098888134?text=Hi%20Ankit",
    );
  });

  it("strips non-digits from the phone number", () => {
    expect(waUrl("+91 90988 88134", "x")).toBe(
      "https://wa.me/919098888134?text=x",
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './wa'`.

- [ ] **Step 3: Create the builder**

Create `lib/wa.ts`:

```ts
export function waUrl(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Use the shared builder + robust open in ContactSection**

In `components/ContactSection.tsx`, add the import at the top:

```tsx
import { waUrl } from "@/lib/wa";
```

Add a state to hold the built URL for the success-state link. Near the existing `const [sent, setSent] = useState(false);` add:

```tsx
  const [lastWa, setLastWa] = useState("");
```

Replace `handleSubmit` (~91-96) with a version that navigates reliably and stores the link:

```tsx
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = `Hi Ankit,\n\n${form.name}\nPhone: ${form.phone}${form.date ? `\nWedding Date: ${form.date}` : ""}\n\nService: ${form.service}\n\n${form.message}`;
    const url = waUrl(phone, msg);
    setLastWa(url);
    const win = window.open(url, "_blank", "noopener");
    if (!win) window.location.href = url; // popup blocked → navigate in place
    setSent(true);
  };
```

(If the file's existing local `wa(...)` helper at ~13-14 becomes unused after this, delete it.)

- [ ] **Step 6: Add a guaranteed clickable link in the success state**

In the success block (~180-200), add a real WhatsApp link before the "Send another" button so the user always has a working path even if the auto-open was blocked:

```tsx
                <a
                  href={lastWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid btn-full"
                >
                  Open WhatsApp →
                </a>
```

- [ ] **Step 7: Typecheck + tests**

Run: `npm test` → PASS.
Run: `npx tsc --noEmit` → no errors.

- [ ] **Step 8: Browser verification**

On preview: submit the form. Expected: WhatsApp opens with the prefilled brief; success state shows an "Open WhatsApp" link that points to the same `wa.me` URL. Verify the phone digits in the URL match the canonical number (Task 1.5).

- [ ] **Step 9: Commit**

```bash
git add lib/wa.ts lib/wa.test.ts components/ContactSection.tsx
git commit -m "fix(contact): reliable WhatsApp submit + always-clickable fallback link to prevent silent lead loss"
```

---

## Task 1.4: Add canonical URL (only missing SEO tag)

**Root cause:** `generateMetadata` sets title/description/OG/Twitter but no `alternates.canonical`. JSON-LD (LocalBusiness, FAQPage) is already present and correct.

**Files:**
- Modify: `app/layout.tsx` (`generateMetadata` return object ~148-186)
- Modify: `app/privacy/page.tsx` (if it has its own `generateMetadata`/`metadata`)

- [ ] **Step 1: Add canonical to the root metadata**

In `app/layout.tsx`, inside the object returned by `generateMetadata`, add an `alternates` key (sibling to `openGraph`/`twitter`):

```tsx
    alternates: {
      canonical: "https://ankitsahnimakeover.com/",
    },
```

- [ ] **Step 2: Add canonical to the privacy page**

Check `app/privacy/page.tsx` for an exported `metadata` or `generateMetadata`. If present, add:

```tsx
  alternates: { canonical: "https://ankitsahnimakeover.com/privacy/" },
```

If the privacy page has no metadata export, skip (root canonical is inherited only as base; note it as a Phase 2 follow-up rather than inventing a metadata block here).

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Browser verification**

On preview, view page source. Expected: `<link rel="canonical" href="https://ankitsahnimakeover.com/"/>` in `<head>`.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/privacy/page.tsx
git commit -m "fix(seo): add canonical URL to page metadata"
```

---

## Task 1.5: Single-source data truth (phone + reviews)

**Root cause:** The phone number and the review figures (rating/count) are duplicated across files with at least one stale/contradictory value (docs: `919098888134` vs stale `9098909088`; reviews `4.8/163` in JSON-LD vs `4.6/116` in a research brief). No-fake-data requires one confirmed value used everywhere.

> **Owner input required (Ankur):** (1) canonical phone number, (2) true rating + review count. The steps below assume the documented canonical (`919098888134`, `4.8`, `163`) — update the constants if Ankur confirms otherwise.

**Files:**
- Modify: `app/layout.tsx` (JSON-LD `aggregateRating` ~188-244; ensure rating/count come from `siteSettings` with a single default)
- Modify: `app/page.tsx` (Stats defaults ~217-218,233; testimonials eyebrow ~1148-1154)
- Modify: `components/ContactSection.tsx` (the `phone` source)

- [ ] **Step 1: Confirm the single source for phone**

Grep the repo for the phone digits to enumerate every hardcoded occurrence:

Run: `git grep -n "9098888134\|9098909088"`
Expected: a list of files. The canonical value is `919098888134`. Any occurrence of `9098909088` in shippable code/content is wrong — replace with the confirmed canonical.

- [ ] **Step 2: Make ContactSection's phone come from settings with the canonical default**

In `components/ContactSection.tsx`, ensure `phone` resolves from `settings?.phone` (Sanity) with a fallback to the canonical constant. If the current default differs, set it to `"919098888134"` (or Ankur's confirmed value).

- [ ] **Step 3: Make review rating/count single-sourced**

In `app/layout.tsx` JSON-LD `aggregateRating`, ensure `ratingValue` and `reviewCount` read from `siteSettings` with one default pair (`4.8` / `163` unless Ankur corrects). In `app/page.tsx`, ensure the Stats and testimonials eyebrow use the **same** values (from settings / the same constants) — no second hardcoded figure.

- [ ] **Step 4: Verify no contradictory values remain**

Run: `git grep -n "9098909088"`
Expected: **no matches in shippable code** (docs/`progress.md` may be scrubbed separately in Phase 2 track e).
Run: `git grep -n "4.6\|116 Review\|163 Review"` and confirm only the single confirmed figure appears in shippable code.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/page.tsx components/ContactSection.tsx
git commit -m "fix(data): single-source phone number and review figures (no contradictory values)"
```

---

## Phase 1 verification gate (before PR)

- [ ] `npm test` — all pure-function tests pass.
- [ ] `npm run preflight` (Ankur's machine) — env + tsc + build pass.
- [ ] `npm run smoke <preview-url>` — homepage 200 + brand string + static assets + WA-number guard pass.
- [ ] Browser, desktop + mobile: 0 blank images, 0 `opacity:0` stranded sections (console check from Task 1.2 Step 6), contact submit opens WhatsApp + shows fallback link, `<link rel="canonical">` present.
- [ ] Third-party code review (reviewer plugin) on each branch — address findings.
- [ ] Open PR; Ankur approves merge.

---

## Self-review notes

- **Spec coverage:** Phase 1 rows 1.0–1.5 all mapped to tasks. Task 1.0 (Sanity pipeline) from the spec was reduced to the per-item fallback (1.1) after the audit showed `urlFor` works off the raw ref and query projection is not the cause; image-content population moves to the parallel Sanity content track per the spec's §5 sequencing.
- **Placeholders:** none — every code step shows real code derived from the verbatim current source.
- **Type consistency:** helper name `sanityImg` used in 1.1; builder `waUrl` used in 1.3; field names match schema (`service.image`, `teamMember.photo`, `award.image`, `celeb` = award with `type==="celeb"`, `gallery.image`).
- **Assumption flagged:** `FALLBACK_AWARDS` item shape — confirm it exposes `.img` (audit shows it is a typed single-item array using `Bhumika Behal.webp`); if the key differs, use the actual key in 1.1 Step 8.
