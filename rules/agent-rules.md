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
