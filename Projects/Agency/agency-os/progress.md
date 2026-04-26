# Agency OS — Progress Log

**Purpose:** The internal operating system for Helora — the automations, agents, and dashboards that run the agency itself (not client deliverables).
**Start date:** 2026-04-14
**Current phase:** Phase 1 — Core 5 agents live, dashboards missing.

---

## Current Status — 2026-04-18

5 n8n agents live and running on COO heartbeat. Workflow JSONs exported to repo. Control center UI scaffold exists but not functional. No operator dashboard yet. Canonical memory seeded but not updated with real decisions.

---

## Done

- `.claude/` directory structure with agents, memory, workflows, skills.
- 18 Claude agent definitions (COO, council, engineering, system, support).
- 5 live n8n workflows:
  - COO Heartbeat (runs every 6 hours, checks system health).
  - Lead Discovery (scrapes Google Maps + Justdial for MP-UP businesses).
  - Content Generator (Groq-based IG caption + hashtag drafts).
  - WhatsApp Outreach (manual-send queue builder, no auto-send yet).
  - KPI Snapshot (daily metrics pull to Supabase).
- Rules directory (agent-rules, coding-rules, project-rules, communication-rules, n8n-rules, client-rules, ai-rules).
- Canonical memory seeded (architecture, decisions, patterns, anti-patterns).
- `.env` structured with API keys for Gemini, Groq, Supabase, Anthropic.

---

## In Progress

- Agency Control Center (Next.js dashboard scaffolded, not wired to Supabase yet).
- Canonical `decisions.md` update with real decisions (Gemini default, Groq content, Supabase, ICP shift).
- Operational workflows (onboarding, content, outreach, reporting) — just drafted, need one real execution.
- LinkedIn 30-day content calendar — just drafted, Day 1 not yet posted.
- Offer document (`salon-growth-stack.md`) — just drafted, not yet sent to a prospect.

---

## Next

**This week (2026-04-19 to 2026-04-25):**
- Wire Control Center to Supabase read-only (weekly metrics).
- Run new-client-onboarding workflow end-to-end on Sahni as live test.
- Post Day 1 LinkedIn build-in-public.
- Update canonical `patterns.md` with the 3 patterns that emerged in Sahni build.

**Next 2 weeks (2026-04-26 to 2026-05-10):**
- Ship operator dashboard v1: pipeline count, active clients, weekly MRR, upcoming reports due.
- Automate weekly-client-report n8n flow.
- Register 6 WhatsApp proactive templates with Meta.
- Write ReviewLoop SaaS spec (separate from agency OS).

**Next month (May 2026):**
- Hire first VA (₹15k/month) contingent on 3 paying clients.
- Ship client-facing "owner dashboard" (WhatsApp-only, no login).
- Start ReviewLoop build (Supabase + Next.js, 3-week sprint).

---

## Blockers

1. **No paying client yet — validates nothing.** Sahni pilot must produce numbers by 2026-06-15 or the whole OS gets restructured around a different vertical.
2. **Supabase free tier row limits.** Need to monitor `events` table growth — will hit free-tier cap around 500k events. Plan: archive >90-day events to a JSON file in repo.
3. **Claude API usage.** Budget-tracker not yet implemented. Currently relying on manual token checks. Action: implement before clients onboard to avoid runaway spend.
4. **No monitoring on n8n workflows.** If a workflow silently fails, no alert goes anywhere. Action: add Telegram alert node to every critical flow by 2026-04-30.

---

## Key Architecture Decisions (Active)

See `.claude/memory/canonical/decisions.md` for full ADR-style entries. High-level:
- Gemini is default conversational API (cost + Hindi).
- Groq handles content generation (speed + free tier).
- Supabase is system-of-record (realtime, auth, free tier sufficient for 12 months).
- No Redis/Kafka/message broker until 20+ concurrent clients.
- All client data in India region (Supabase Singapore as fallback).

---

## Metrics to Watch

- n8n workflow success rate (target: > 98%).
- Claude API spend / week (target: < $10 during pre-revenue phase).
- Supabase row count (target: < 400k rows until M6).
- GitHub repo size (target: < 1 GB — watch for JSON workflow bloat).
- Ankur's focus hours per week on agency OS vs client work (target: 30/70 split by M3).

---

## Known Technical Debt

- n8n workflow JSONs not version-controlled properly (exported as opaque blobs).
- No test harness for WhatsApp templates — every change needs manual end-to-end test.
- Error handling in n8n is ad-hoc (see `rules/n8n-rules.md`).
- No backup strategy for Supabase — daily dump to repo not yet automated.
- Control Center frontend has no auth — currently localhost-only.

These are accepted for Phase 1. Will be revisited at end of Phase 1 retro (end of M2).
