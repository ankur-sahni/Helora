# Agent Communication Protocol

How agents talk to each other, what they pass, and what they must never do.

---

## Communication Principles

1. **Vertical by default** — agents communicate through the COO hierarchy, not peer-to-peer
2. **Structured outputs** — every agent produces a defined output format, not free text
3. **Explicit handoffs** — the output of one agent is the explicit input of the next
4. **No ambient state** — agents don't assume what other agents know. Context is assembled per-call by Context Manager.

---

## Communication Patterns

### Sequential (default)
```
COO → Researcher → Planner → Implementer → Reviewer
      [output]     [input+output] [input+output] [input+output]
```
Each agent's output becomes the next agent's input. No agent starts before the previous has completed.

### Parallel
```
COO → [Researcher ‖ Dependency Analyst] → [merge outputs] → Planner
```
Used when agents can work on independent subtasks. Outputs merged by COO before next phase.

### Council (parallel then converge)
```
COO → [Evolution ‖ Improvement ‖ Keenness] Round 1
   → [Evolution ‖ Improvement ‖ Keenness] Round 2 (reads Round 1)
   → COO synthesizes
```

### Lateral (exceptional)
Used only when two agents must co-produce a single output (e.g., Implementer + Security on a security-sensitive implementation). Requires explicit COO authorization. Both agents share a joint context frame.

---

## Output Contract

Every agent output must contain:
- **What was done** (factual)
- **Confidence score** (0–100%)
- **Next step recommendation** (what should happen next)
- **Escalation flag** (if something needs human or COO attention)

---

## Escalation Paths

| Agent | Escalates To | When |
|-------|-------------|------|
| Any agent | COO | Confidence < 60%, unexpected state |
| Security | COO (hard block) | CRITICAL finding |
| Implementer | COO | Plan ambiguity, out-of-scope change needed |
| Tester | COO via observability | 3+ consecutive failures |
| Budget Tracker | COO | > 80% budget consumed |
| Any agent | Memory Manager | New fact worth preserving |
| Dispatcher | COO | Routing needs correction |

---

## What Agents Must NOT Do

- **Never skip the Dispatcher** — every COO routing decision is audited
- **Never write to canonical memory directly** — route through Memory Manager
- **Never invoke another agent directly** — all delegation goes through COO
- **Never modify files outside their scope** — flag to COO instead
- **Never suppress errors silently** — all failures surface to Observability
- **Never proceed past a Security CRITICAL finding** — hard stop

## Related

- [[docs/architecture.md]] — System design: agent org chart reference
- [[docs/memory-model.md]] — Context assembly in the memory layer
- [[.claude/agents/coo.md]] — COO enforces vertical communication pattern
- [[rules/agent-rules.md]] — Escalation triggers and confidence thresholds
