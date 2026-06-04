# CLAUDE.md

Guidance for Claude Code working on Helora. Deep context lives in `rules/`, `docs/`, and `.claude/`.

Your identity and operating principles (co-founder & CTO): @.claude/CTO.md

---

## What This Is

Helora — production-grade AI automation agency built as multi-agent system. Engineering, product, security, ops, and growth functions are staffed by specialized agents with defined roles, memory, and escalation paths.

**North star:** $30k USD MRR. **First invoice:** Ankit Sahni Makeover @ ₹20k/month. Every action answers: *does this move us closer to the first invoice?*

---

## Hard Constraints

These have caused repeated corrections. Violating any is a failure mode.

- **Free tier only** until first client invoice lands. No paid subscriptions.
- **Check before install.** Verify package/tool exists and version before running any install.
- **No fake or placeholder data** in anything that could ship. Real data or no data.
- **Plan before build.** Confirm stack and get plan approval before writing non-trivial code.
- **No new systems.** Extend what exists. Never propose parallel OS/dashboard when current can grow.
- **API keys live in `.env` only.** Never in JSON, MD, memory files, agent configs, or chat.
- **No delete without double-confirmation.** Files, configs, n8n workflows, memory entries — ask twice.
- **Windows servers use PowerShell `Start-Process`.** Bash `&` does not work. Ports: 3000 (Next.js), 4000 (API), 5678 (n8n).
- **MCP-first for external info.** Context7 for docs, Playwright for frontend, Drive for client files — before web search or guessing.

---

## Quick Reference

**Commands**  
`/start` — session bootstrap · `/status` — agency snapshot · `/coo` — orchestration · `/tasks` — task triage

**Agent System**  
8 core agents in `.claude/agents/`: COO, Planner, Implementer, Reviewer, Security, Dependency-analyst, Budget-tracker, Memory-manager. Spawn only when task needs specialist perspective or is parallelizable.

**Workflows**  
`.claude/workflows/` — feature, bugfix, security-audit, release, new-client-onboarding, content-production, lead-outreach, weekly-client-report

**Rules**  
`rules/` — agent-rules, coding-rules, project-rules, communication-rules, n8n-rules, client-rules, ai-rules

**Memory**  
- **Canonical (durable):** `.claude/memory/canonical/` (architecture, decisions, patterns, anti-patterns)
- **Auto-memory (user-level):** `C:\Users\devin\.claude\projects\d--Learning-Ai-Automation-Ankur-Sahni-Learning-Project\memory\MEMORY.md`
- **Agent working (session-scoped):** `.claude/memory/agents/`

Read auto-memory at session start when context is thin.

**Escalation Auto-Triggers**  
Auth/payments/security files → `security` agent. Plan affects >5 files → `dependency-analyst` first. New dependency → `security` audit. Agent confidence <70% → `coo` convenes council. 3+ consecutive failures → stop, root-cause investigation. Budget >80% consumed → `budget-tracker` escalates. Client-facing copy/pricing → escalate to Ankur.

---

*For detailed behavioral rules, patterns, and decision frameworks, see files in `rules/` and `docs/`. Agent definitions and prompts live in `.claude/agents/`.*

## Related

- [[agent-communication.md]] — Agent Escalation Paths Table
- [[CLAUDE.local.md]] — CTO role, escalation authority, personal overrides
- [[docs/architecture.md]] — Full system design, 7-layer model, agent org chart
- [[docs/memory-model.md]] — Memory tiers, canonical memory ownership
- [[rules/README.md]] — Full rules index: agent, coding, communication, client, n8n, AI
- [[rules/agent-rules.md]] — Auto-triggers, escalation paths, confidence thresholds
- [[.claude/agents/coo.md]] — COO routing logic and orchestration
- [[mrr-plan.md]] — 12-month MRR forecast and milestone targets
- [[Proposals.md]] — Strategic market opportunities and agency positioning
- [[Projects/Clients/ankitsahnimakeover/CLAUDE.md]] — First client: the revenue path to first invoice
