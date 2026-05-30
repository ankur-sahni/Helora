# CLIENT_FACTS — Ankit Sahni Makeover

> **Single source of truth.** Every other doc references these facts — it must NOT restate them.
> If a value changes, change it **here only**. Items marked `[CONFIRM]` are unverified — do not treat as fact.
> Last verified: 2026-05-30

## Identity
- **Brand name (customer-facing):** Ankit Sahni Makeover
- **Legacy / legal name:** Sahni Beauty Salon (historically also "Sahni Beauty Parlour") — use only as legacy context, never as the public brand
- **Domain:** ankitsahnimakeover.com
- **Instagram (business):** @ankitsahnimakeovers (25,000+ followers)
- **Photographer credit:** @ankur_sahni (Ankur's handle, for photo credits only — not the business account)
- **GitHub repo:** github.com/ankur-sahni/ankitsahnimakeover

## NAP (Name / Address / Phone — keep identical everywhere, incl. Google Business)
- **Phone / WhatsApp (canonical):** +91 9098888134  (E.164: `919098888134`)
- **⚠ NEVER publish:** `9098909088` — that is Ankur's PERSONAL number. A smoke-test guard (`scripts/smoke.mjs`) enforces it stays off the live site.
- **Address:** Main Road, Ward No 12, Lahar, Dist. Bhind, Madhya Pradesh 477445
- **Hours:** 10:30–20:00 daily `[CONFIRM]`

## Reputation
- **Google Business (canonical for the site):** 4.8 ★, 169 reviews (Ankur manages the profile)
- **Justdial (different platform — do NOT confuse with Google):** 4.6 ★, 116 reviews. Any doc citing "4.6" or "116" means **Justdial**, not Google. Goal: migrate these toward Google.
- **Established:** 1994 (30+ years)
- **Owners:** Ankit Sahni & Kusum Sahni

## Services & Rentals
- Hair (cut/style/colour/straighten/spa) · Makeup (bridal primary, engagement, party) · Skin (facials, bleach) · Nails, threading, waxing
- **Rentals:** bridal lehenga, bridal jewellery, party-wear lehengas & gowns (largest rental collection in the area)

## Pricing
- **Salon bridal packages:** ₹15,000–₹25,000 `[CONFIRM range]`
- **Do NOT confuse with:** ₹20,000/month = Helora's service fee TO the client (first invoice), not a salon price

## Service-Area Towns (canonical — from Ankur's Google Business service area)
Home base: **Lahar**. Targeted: Bhind, Gwalior, Datia, Bhander, Mihona, Daboh, Gormi, Seondha, Mehgaon, Raun, Indergarh, Pandokhar, Alampur, Gwalior West, Orai (UP), Mau (UP), Konch (UP), Jalaun (UP), Chirgaon (UP).
(Which become full landing pages vs `areaServed`-only is a Phase-2 decision — see ROADMAP.)

## Tech Stack
- **Next.js 16** (App Router) + **Sanity** (project `xdc18rnt`, dataset `production`) + **Vercel** (git-connected: push to `main` auto-deploys prod ~60s; ISR revalidate = 60s)
- Embedded Studio at `/studio`; visual editing live

## Current Status — 2026-05-30
- ✅ **Phase 1** (visual floor: images/voids/map/form/canonical/reviews) — SHIPPED LIVE, verified
- ✅ **Sanity Studio upgrade** (structure, singletons, media, visual editing) — SHIPPED LIVE, verified
- ⏳ **Phase 2** (SEO/AEO/GEO depth + world-class elevation: proportions/spacing/UX, responsive 360→1440, WCAG AA, INP perf + authority content: lehenga-rental page, town pages, FAQ 7→20+, team bios, blog) — PENDING / in planning
- ⏳ **Phase 3** (Supabase booking + admin, n8n flows, Google Calendar, WABA, security review) — PENDING
- ⏸ **Revenue side-work** ($500/7-day kit) — PARKED behind ASM completion (Ankur's call)
