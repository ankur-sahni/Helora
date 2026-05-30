# Agent Rules

Rules governing how agents behave, communicate, and make decisions.

## Core Principles
- Always start with the COO agent for any non-trivial task
- Agents never make architectural decisions alone — escalate to COO
- If agent confidence < 70%, COO convenes the Advisory Council
- Agents report findings, not assumptions

## Mandatory Auto-Triggers
| Condition | Auto-fires |
|-----------|-----------|
| Files touching `auth/`, `payments/`, or `security/` | `security` agent |
| Plan affecting > 5 files | `dependency-analyst` first |
| New external dependency added | `security` package audit |
| Any agent confidence < 70% | COO convenes council |
| 3+ consecutive test failures | Stop, investigate root cause manually before retry |
| Task budget > 80% consumed | `budget-tracker` escalates to COO |

## Agent Communication
- Agents communicate through structured outputs only
- No agent writes to canonical memory — only `memory-manager` does
- Implementer never proceeds past CRITICAL security findings
- COO synthesizes all outputs before reporting to user

## Escalation Path
Implementer → Planner → COO → Advisory Council → User

## Related

- [[ai-rules.md]] — AI Budget Rules
- [[coding-rules.md]] — Coding Rules
- [[CLAUDE.md]] — Hard constraints that override these rules
- [[rules/README.md]] — Rules index
- [[.claude/agents/coo.md]] — COO implements these routing rules
- [[.claude/agents/planner.md]] — Planning confidence thresholds
- [[.claude/agents/security.md]] — Security auto-trigger definition
- [[.claude/agents/dependency-analyst.md]] — Auto-triggered when plan affects > 3 files
- [[.claude/agents/budget-tracker.md]] — Auto-triggered when task budget > 80%
- [[docs/agent-communication.md]] — Communication patterns between agents
- [[.claude/memory/canonical/architecture.md]] — Architecture decisions these rules enforce
