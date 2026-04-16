# Canonical Memory: Architecture

Durable system design decisions. Only memory-manager writes here.

---

## Entry Format

```
### [Decision Title]
**Added**: [date]
**Source**: [agent]
**Confidence**: high / medium / low
[content]
```

---

## System Architecture

### Multi-Agent Orchestration Model
**Added**: 2026-04-14
**Source**: system-init
**Confidence**: high

This system uses a hierarchical multi-agent model with a COO as the primary orchestrator. All requests route through COO → Dispatcher (audit) → domain agents. The COO does not implement — it routes, synthesizes, and quality-checks.

### Advisory Council Activation
**Added**: 2026-04-14
**Source**: system-init
**Confidence**: high

The Advisory Council (Evolution + Improvement + Keenness) is convened for:
- Architectural decisions
- Security model changes
- Changes affecting > 5 files
- Any agent confidence score < 60%
- Irreversible operations

Council operates in max 3 rounds. Stop on consensus OR round limit — not time.

### Memory Write Authority
**Added**: 2026-04-14
**Source**: system-init
**Confidence**: high

Only the memory-manager agent can write to `.claude/memory/canonical/`. All other agents submit write requests through memory-manager. This prevents memory poisoning from hallucinated or single-session facts.

### Model Tiering Strategy
**Added**: 2026-04-14
**Source**: system-init
**Confidence**: high

| Tier | Model | Used For |
|------|-------|----------|
| Deep judgment | claude-opus-4-6 | COO, Retrospective |
| Balanced | claude-sonnet-4-6 | Core engineering, council, product |
| Fast/cheap | claude-haiku-4-5 | Tester, dispatcher, context-manager, budget-tracker, docs-writer |

Upgrade model only when task complexity demonstrably requires it.

### Parallel Execution Tracks
**Added**: 2026-04-14
**Source**: system-init
**Confidence**: high

Researcher + Dependency Analyst always run in parallel during discovery.
Council members always deliberate in parallel (Round 1 simultaneous, Round 2 after all Round 1 outputs).
Tester prepares scaffolding while Implementer codes when plan is finalized.
