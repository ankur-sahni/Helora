# Workflow: Content Production

**Purpose:** Produce one full month of Instagram content for one client in under 4 hours, at consistent quality, without Ankur becoming a content person.

**Trigger:** (a) New client Day 3 of onboarding, or (b) last week of each active client's current month.

**Owner:** Ankur → later delegated to content agent + VA for scheduling.

---

## Steps

1. **Pull client context (10 min)**
   - Read `Projects/Clients/[client-slug]/intake.md` and last month's `content-calendar-*.md` if it exists.
   - Read last month's report: what posts performed best?
   - Verify: context packet has services, price range, target locality, last-month top 3 posts.

2. **Invoke content agent (30 min)**
   - Tool: `.claude/agents/content.md` with Groq (fast, free) for draft generation.
   - Input: client context + current month theme (festival, wedding season, monsoon, etc).
   - Output: 16 post ideas with: hook, caption, hashtags, suggested visual type (photo/reel/carousel).
   - Verify: 16 distinct ideas; no duplicates; language matches client tone (Hinglish for salons).

3. **Categorise the 16 posts (15 min)**
   - 4 service showcase (straight "we do X, book now")
   - 4 before/after (visual proof)
   - 4 reels (transformation, day-in-life, process)
   - 2 owner story (founder voice, legacy, values)
   - 2 customer testimonial (quote + photo, permission required)
   - Verify: exact 4/4/4/2/2 split. If content agent returns off-ratio, re-prompt.

4. **Generate visuals (90 min for 16 posts)**
   - Reels: write 30-second scripts with on-screen text + b-roll suggestions. Client or VA shoots, Ankur edits in CapCut.
   - Photos: pull from client's raw photo library (collected at intake). If gap, request specific photos on WhatsApp.
   - Graphics: Canva template library in `Projects/Agency/canva-templates/` — one brand kit per client.
   - Verify: every post has an approved visual attached or a clear shot-list for the client.

5. **Schedule & approval (45 min)**
   - Draft full calendar in `Projects/Clients/[client-slug]/content-calendar-m[N].md` — one row per post: date, time, type, caption, hashtags, visual status.
   - Send to client on WhatsApp as a single PDF. Ask for approval with 1 reply: "OK" or "change #3 and #7".
   - Verify: client approval received within 48 hours. If not, follow up once — then publish with disclaimer "auto-approving per SLA".

6. **Load into scheduler (30 min)**
   - Tool: Meta Business Suite scheduler (free) — NOT a paid tool like Buffer.
   - Load all 16 posts with times.
   - Verify: scheduled posts preview correctly on IG mobile app.

---

## Output Artifacts

- `Projects/Clients/[client-slug]/content-calendar-m[N].md`
- 16 scheduled posts in Meta Business Suite
- PDF version of calendar sent to client on WhatsApp
- Weekly reels b-roll shot-list sent to client (Mondays)

---

## Done Criteria

- [ ] 16 posts scheduled in Meta Business Suite with visuals attached.
- [ ] Client WhatsApp approval archived in `Projects/Clients/[client-slug]/approvals/`.
- [ ] First post of the month publishes on schedule (verify Day 1 of month).
- [ ] Content calendar file committed to repo.

---

## Rules

- No generic stock photos. If visual is missing, ask client — don't fake it.
- Hashtags: 15 max, mix of city (#lahar #bhopalbride), service (#bridalmakeup), and legacy (#since1994).
- Captions: first line is the hook (must work without seeing the image). Never start with the business name.
- Never use AI-generated people in photos. Real salon, real clients only (with permission).
- Do not post during owner's off-days unless pre-approved.

---

## Escalation

- If content agent returns low-quality drafts 2 weeks in a row: switch base model, re-check prompt, re-check context packet.
- If client keeps rejecting >5 posts/month: schedule a re-alignment call, revise tone guide.

## Related

- [[Projects/Clients/ankitsahnimakeover/CLAUDE.md]] — Client content requirements
- [[Projects/Clients/ankitsahnimakeover/PIPELINE.md]] — Phase 1 deliverable: content calendar for Month 1
- [[rules/client-rules.md]] — Content delivery and handoff standards
- [[rules/n8n-rules.md]] — n8n content publishing pipeline
- [[rules/ai-rules.md]] — Groq model selection for content draft generation
