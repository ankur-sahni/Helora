# Memory Model

How knowledge is stored, retrieved, and protected in this system.

---

## Memory Tiers

```
TIER 1: In-Context (ephemeral)
  └── Lives in the active LLM context window
  └── Duration: single agent call
  └── Owner: agent itself
  └── Use: reasoning, intermediate steps

TIER 2: Agent Working Memory (session-scoped)
  └── .claude/memory/agents/[agent-name]/
  └── Duration: persists between calls, cleaned periodically
  └── Owner: individual agent
  └── Use: session notes, working hypotheses, task progress

TIER 3: Canonical Memory (permanent)
  └── .claude/memory/canonical/
  └── Duration: permanent (manually deprecated)
  └── Owner: Memory Manager (single gatekeeper)
  └── Use: architectural decisions, patterns, anti-patterns
```

---

## Canonical Memory Files

| File | Contains | Update Frequency |
|------|----------|-----------------|
| `architecture.md` | System design decisions | Rarely |
| `decisions.md` | Key choices + rationale | Per major decision |
| `patterns.md` | Established patterns to follow | Per new pattern |
| `anti-patterns.md` | Failed approaches to avoid | Per failure |

---

## Memory Write Rules

### What belongs in canonical memory
- Durable facts that survive multiple sessions
- Decisions that future agents must respect
- Patterns that should be consistently applied
- Failures worth avoiding system-wide

### What does NOT belong in canonical memory
- Task-specific notes → agent working memory
- Debugging steps → agent working memory
- Code snippets → Skills files
- Ephemeral session state → in-context only

### Write validation (Memory Manager checks)
1. Is this fact durable (not task-specific)?
2. Is it accurate (not hallucinated or one-off)?
3. Does it contradict an existing entry? Resolve explicitly.
4. Is it duplicated? Update existing entry instead.

---

## Memory Decay Strategy

| Type | Decay Rule |
|------|-----------|
| Agent working memory | Auto-clean entries > 30 days old |
| Canonical memory | Flag entries > 180 days for review |
| Observability logs | Retain 90 days, then archive |
| Budget logs | Retain 1 year for cost analysis |

Retrospective agent handles decay on its periodic runs.

---

## Context Assembly (Context Manager)

When an agent is called, Context Manager builds a packet:

```
System definition (agent's own .md file)
+ Task frame (from COO)
+ Filtered canonical memory (domain-relevant only)
+ Agent working memory (recent entries)
+ Compressed session history (if long session)
+ Tool schemas (only what agent needs)
```

Total fits within agent's token budget. Compression applies when history exceeds budget.
Compression preserves: decisions, errors, verdicts. Drops: greetings, restatements, reasoning chains (keeps conclusions).

---

## Memory Poisoning Prevention

The primary risk: an agent writes a confident but wrong fact to canonical memory, and all future agents operate on that false premise.

Prevention:
1. Memory Manager is the only write path — validates every entry
2. Confidence scores required — only high/medium confidence in canonical memory
3. Source tracking — every entry records which agent submitted it
4. Contradiction detection — Memory Manager resolves conflicts explicitly
5. Retrospective review — periodic audit flags stale or wrong entries
