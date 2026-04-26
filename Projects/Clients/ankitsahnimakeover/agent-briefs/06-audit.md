# Agent Brief — Performance + Mobile Audit

**Target agent:** `tester`
**Inputs required:** All pages content-complete and SEO-implemented on staging
**Expected duration:** 1 day audit + fix loop with implementer
**Deliverable location:** `Projects/Clients/sahni-bridal-studio/audits/`

---

## Prompt (copy into tester agent run)

You are the `tester` agent. Run a full pre-launch audit on the staging deploy. Produce a prioritized defect list.

**Targets:**
| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse mobile Performance | ≥ 90 | Chrome DevTools MCP `lighthouse_audit` |
| Lighthouse mobile Accessibility | ≥ 95 | Chrome DevTools MCP |
| Lighthouse mobile SEO | 100 | Chrome DevTools MCP |
| Lighthouse mobile Best Practices | ≥ 95 | Chrome DevTools MCP |
| LCP mobile | < 2.5s | PageSpeed Insights |
| CLS | < 0.1 | PageSpeed Insights |
| INP | < 200ms | PageSpeed Insights |
| WCAG AA | no critical violations | axe via Playwright |
| Broken links | 0 | Playwright crawl |
| Mobile viewport issues | 0 | Chrome DevTools MCP `resize_page` at 360, 375, 414 |
| Form submission | success on all actions | Playwright MCP |
| WhatsApp sticky button | works on iOS Safari + Android Chrome | device or emulation |

**Tests per page, every viewport [360, 375, 414, 768, 1024]:**
1. Visual render — screenshot, compare to design brief
2. Tap targets ≥ 44px
3. Font rendering correct (Google Fonts loaded)
4. Images sharp (no upscaled blur)
5. No horizontal scroll
6. Sticky elements don't overlap content
7. Form fields work with mobile keyboard (correct input types)
8. Contact form sends and Ankur receives

**Schema + SEO checks:**
- Rich Results Test on all 7 pages — save screenshots
- `robots.txt` tester
- `sitemap.xml` validation

**Content QA:**
- Read every page — flag anything off-brand
- Verify every price matches approved `content-drafts/03-services.md`
- Verify every WhatsApp link and phone number is correct

**Output:**
- `audits/pre-launch-audit-[date].md` — all results, screenshots linked
- `audits/defects.md` — prioritized P0/P1/P2 list with repro + suggested fix
- P0 = must fix before launch. P1 = fix Week 1 post-launch. P2 = backlog.

**Done when:**
- Audit report complete
- P0 list handed to `implementer` for fixes
- Re-audit passes
- `devops` cleared to deploy

**Escalate if:**
- A P0 defect requires > 1 day of work — talk to `coo` for scope call
