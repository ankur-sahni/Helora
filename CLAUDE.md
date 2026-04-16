# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Keep this SHORT. Deep context lives in `docs/` and `.claude/`. Bloated files reduce instruction quality.

---

## What This Is

A **production-grade AI agency** — a multi-agent system that operates like a real company.
Every function (engineering, product, security, ops, growth) is staffed by specialized agents with defined roles, communication contracts, memory, and escalation paths.

---

## Agent System

Enable multi-agent orchestration:
```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

**Always start with the COO agent** for any non-trivial task. It routes, delegates, audits, and synthesizes.

### Agent Roster (by tier)

| Tier | Agent | Model | Role |
|------|-------|-------|------|
| Control | `coo` | Opus | Orchestrator, router, synthesizer |
| Control | `dispatcher` | Haiku | Routing audit & validation |
| Control | `product-owner` | Sonnet | User/business perspective |
| Council | `council/evolution` | Sonnet | Forward-looking analysis |
| Council | `council/improvement` | Sonnet | Flaw detection & correctness |
| Council | `council/keenness` | Sonnet | Blind spots & second-order effects |
| Engineering | `planner` | Sonnet | Implementation plans |
| Engineering | `researcher` | Sonnet | Codebase exploration |
| Engineering | `implementer` | Sonnet | Code writing |
| Engineering | `reviewer` | Sonnet | Code review |
| Engineering | `tester` | Haiku | Test execution |
| Engineering | `security` | Sonnet | Security audit |
| Engineering | `dependency-analyst` | Haiku | Impact mapping |
| Engineering | `devops` | Sonnet | Infrastructure |
| System | `memory-manager` | Sonnet | Canonical memory gatekeeper |
| System | `context-manager` | Haiku | Context packet assembly |
| System | `observability` | Haiku | Logging & metrics |
| System | `budget-tracker` | Haiku | Token cost tracking |
| System | `retrospective` | Opus | Periodic system self-improvement |
| Support | `docs-writer` | Haiku | Documentation |

Full agent definitions → `.claude/agents/`

---

## Mandatory Auto-Triggers

These fire automatically — not by human judgment:

| Condition | Auto-fires |
|-----------|-----------|
| Files touching `auth/`, `payments/`, or `security/` | `security` agent |
| Plan affecting > 5 files | `dependency-analyst` first |
| New external dependency added | `security` package audit |
| Any agent confidence < 70% | COO convenes council |
| 3+ consecutive test failures | `researcher` investigates before retry |
| Task budget > 80% consumed | `budget-tracker` escalates to COO |

---

## Canonical Memory

Durable, shared knowledge that survives sessions.
**Only `memory-manager` can write here.** All agents can read.

```
.claude/memory/canonical/
├── architecture.md    # System design decisions
├── decisions.md       # Key choices + rationale
├── patterns.md        # Established patterns in use
└── anti-patterns.md   # Things that failed + why
```

Agent working memory (session-scoped) → `.claude/memory/agents/`

---

## Workflow Definitions

Named, repeatable workflows for common tasks:

| Workflow | File | Use For |
|----------|------|---------|
| Feature development | `.claude/workflows/feature.md` | New features |
| Bug fix | `.claude/workflows/bugfix.md` | Defect resolution |
| Security audit | `.claude/workflows/security-audit.md` | Security reviews |
| Release | `.claude/workflows/release.md` | Deployment |

---

## Skills (Reusable Knowledge)

| Skill | Path |
|-------|------|
| API conventions | `.claude/skills/api-conventions/SKILL.md` |
| Frontend patterns | `.claude/skills/frontend-patterns/SKILL.md` |
| Database migrations | `.claude/skills/database-migrations/SKILL.md` |
| Security patterns | `.claude/skills/security-patterns/SKILL.md` |
| Testing patterns | `.claude/skills/testing-patterns/SKILL.md` |
| Release process | `.claude/skills/release-process/SKILL.md` |

---

## Rules

All agency-wide rules live in `rules/`:

| File | Covers |
|------|--------|
| `rules/agent-rules.md` | Agent behavior, triggers, escalation |
| `rules/coding-rules.md` | Code standards, security, git |
| `rules/project-rules.md` | Project structure, delivery, priorities |
| `rules/communication-rules.md` | Tone, decisions, what not to do |
| `rules/n8n-rules.md` | n8n workflow naming, error handling, docs |
| `rules/client-rules.md` | Client onboarding, handoff, case studies |
| `rules/ai-rules.md` | Model selection, prompts, API usage, cost |

---

## Deep Docs

- Architecture blueprint → `docs/architecture.md`
- Agent communication protocol → `docs/agent-communication.md`
- Memory model → `docs/memory-model.md`
- Observability design → `docs/observability.md`
