# Image Optimization Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore gallery images and establish a permanent, quota-free image delivery strategy using `unoptimized: true` for local assets and Sanity CDN auto-format transforms for all CMS images.

**Architecture:** Next.js image optimization is disabled globally (`unoptimized: true`) so `public/images/` files serve directly without quota risk. All Sanity CMS images use `urlFor().auto('format').quality(80)` so Sanity's Imgix CDN automatically delivers WebP/AVIF to every browser — no Vercel involvement. The `urlFor` helper in `sanity/image.ts` is updated at the source so all 12 call sites benefit automatically with no per-file changes.

**Tech Stack:** Next.js 16.2.6, @sanity/image-url, Vercel (Hobby tier)

---

## File Map

| File | Action | Why |
|---|---|---|
| `next.config.ts` | Modify | Add `unoptimized: true` back alongside `remotePatterns` |
| `sanity/image.ts` | Modify | Chain `.auto('format').quality(80)` in `urlFor` so all 12 callers get it for free |

---

### Task 1: Restore `unoptimized: true` in next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Open next.config.ts and verify current state**

Current file content (confirm before editing):
```ts
import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
```

- [ ] **Step 2: Add `unoptimized: true` to the images config**

New file content:
```ts
import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd "D:\Learning\Ai Automation\Ankur Sahni Learning Project\Projects\Clients\ankitsahnimakeover\ankitsahnimakeover-nextjs"
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add next.config.ts
git commit -m "fix: restore unoptimized:true for local images, keep remotePatterns for Sanity"
```

---

### Task 2: Add auto-format + quality to Sanity image builder

**Files:**
- Modify: `sanity/image.ts`

- [ ] **Step 1: Open sanity/image.ts and verify current state**

Current file content:
```ts
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
```

- [ ] **Step 2: Chain `.auto('format').quality(80)` in urlFor**

New file content:
```ts
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) =>
  builder.image(source).auto("format").quality(80);
```

This means every existing call like `urlFor(img).width(600).url()` automatically produces a URL with `?w=600&auto=format&q=80`. Sanity CDN serves WebP to Chrome/Edge/Firefox and AVIF where supported. No caller changes needed.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors. `auto('format')` and `quality(80)` are both valid `ImageUrlBuilder` chain methods.

- [ ] **Step 4: Commit**

```bash
git add sanity/image.ts
git commit -m "fix: add auto-format and quality(80) to Sanity urlFor — CDN delivers WebP automatically"
```

---

### Task 3: Build and verify locally

**Files:** none (verification only)

- [ ] **Step 1: Run full production build**

```bash
npm run build
```

Expected output includes:
```
✓ Compiled successfully
✓ Generating static pages (5/5)
```

No errors. If TypeScript errors appear, stop and report — do not push.

- [ ] **Step 2: Check a Sanity image URL in build output**

In the build output or by running dev server briefly:
```bash
npm run dev
```

Open browser to `http://localhost:3000`. Inspect any Sanity image (hero portrait, team photo, gallery item). The `src` attribute should be a Sanity CDN URL like:
```
https://cdn.sanity.io/images/xdc18rnt/production/...?w=640&auto=format&q=80
```

NOT a `/_next/image?url=...` URL.

Local `public/images/` files should serve as:
```
/images/bride-red-dramatic.webp
```

NOT `/_next/image?url=%2Fimages%2F...`.

- [ ] **Step 3: Check gallery fallback images load**

Navigate to `/#gallery` section. All 9 fallback images should be visible in their oval/arch/rect frames.

---

### Task 4: Deploy and verify production

**Files:** none (deployment only)

- [ ] **Step 1: Deploy to Vercel production**

```bash
npx vercel --prod
```

Expected: build passes, deployment aliased to `https://www.ankitsahnimakeover.com`

- [ ] **Step 2: Verify gallery on live site with Playwright**

Use Playwright to navigate to `https://www.ankitsahnimakeover.com`, scroll to gallery, take screenshot. Confirm images visible.

Run this check:
```js
() => {
  const imgs = [...document.querySelectorAll('.gallery-item img')];
  return imgs.map(img => ({ complete: img.complete, naturalW: img.naturalWidth, src: img.src.slice(0, 60) }));
}
```

Expected: all 9 items `complete: true`, `naturalW > 0`.

- [ ] **Step 3: Verify Sanity images use CDN URL (not /_next/image)**

```js
() => document.querySelector('.gallery-item img')?.src
```

If Sanity has real images loaded: URL should start with `https://cdn.sanity.io/...`
If using fallback: URL should start with `https://www.ankitsahnimakeover.com/images/...`

Neither should contain `/_next/image`.

- [ ] **Step 4: Commit any cleanup and push**

If sitemap auto-generated:
```bash
git add public/sitemap-0.xml
git commit -m "chore: regenerate sitemap post-deploy"
git push
```

---

## Why This Won't Break Again

| Scenario | Behaviour |
|---|---|
| Ankit uploads JPG from phone to Sanity | Sanity CDN serves WebP to all modern browsers automatically |
| New `urlFor()` call added in future | Inherits `.auto('format').quality(80)` automatically — no extra steps |
| Vercel image quota exceeded | Irrelevant — `unoptimized: true` means Vercel's optimizer is never called |
| `public/images/` fallback used | Served directly as `.webp` — already optimized at source |
