# Agent Brief — Vercel Deployment + Domain + Analytics

**Target agent:** `devops`
**Inputs required:** G2 (domain purchased), audit P0 clear, security sign-off
**Expected duration:** 0.5 day
**Deliverable location:** `Projects/Clients/sahni-bridal-studio/ops/`

---

## Prompt (copy into devops agent run)

You are the `devops` agent. Ship sahnibridal.in to production on Vercel free tier. Zero downtime target, zero leaked secrets.

**Pre-flight:**
- Confirm `.env` contains: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `NEXT_PUBLIC_GA_ID`, `FORM_SUBMIT_ENDPOINT`. Never commit these. Verify `.env.local` is gitignored.
- Confirm `security` has reviewed the form submission path
- Confirm `reviewer` has approved final code

**Steps:**
1. Create Vercel project, link GitHub repo
2. Set env vars in Vercel project settings (Production + Preview separately)
3. First deploy to preview URL; smoke test
4. Add custom domain `sahnibridal.in` + `www.sahnibridal.in` (www → apex redirect)
5. Configure DNS at registrar per Vercel instructions
6. Wait for SSL issuance (Let's Encrypt, auto)
7. Verify HTTPS + redirect chain: `http://` → `https://`, `www` → apex (one redirect hop, not two)
8. Submit `sitemap.xml` to Google Search Console + Bing Webmaster Tools
9. Verify GA4 receiving events (real-time view)
10. Turn on Vercel Analytics free tier
11. Set Vercel deployment protection: production = main branch only

**Monitoring:**
- Vercel deploy notifications → Ankur email
- Uptime check: UptimeRobot free (5-min poll on `/`)
- Create `ops/runbook.md` with rollback steps, DNS record, env var list (names only, not values)

**Post-launch (within 24h):**
- Submit to Google Business Profile listing (link from GBP to site)
- Submit to Justdial, Sulekha — link the new URL
- Post launch notice on Instagram stories (handoff to `content`)

**Done when:**
- `https://sahnibridal.in` loads on 3 networks (mobile data, home wifi, office wifi)
- SSL grade A+ on SSL Labs
- `curl -I https://sahnibridal.in/robots.txt` returns 200
- Search Console verified and sitemap submitted
- Runbook committed

**Escalate if:**
- DNS takes > 24h to propagate
- SSL doesn't issue within 1h of DNS cutover
- Any env var needs to be rotated (talk to `security`)
