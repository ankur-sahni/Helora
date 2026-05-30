# Canonical Memory: Anti-Patterns

Things that have failed. What went wrong and what to do instead.
Only memory-manager writes here.

---

## Entry Format

```
### [Anti-Pattern Name]
**Domain**: [area]
**Added**: [date]
**What failed**: [description of failure]
**Why it fails**: [root cause]
**What to do instead**: [correct approach]
```

---

## Active Anti-Patterns

### Skipping Dependency Analyst on Shared Utilities
**Domain**: Planning
**Added**: 2026-04-14
**What failed**: Changes to shared utilities appear low-risk but break multiple consumers.
**Why it fails**: Shared utilities have implicit dependents not visible from the file alone.
**What to do instead**: Always run dependency-analyst before changing anything in `packages/`, `shared/`, `utils/`, or similar cross-cutting directories.

### Combining Bug Fix with Refactor
**Domain**: Implementation
**Added**: 2026-04-14
**What failed**: "While I'm here" refactors during bug fixes introduce new failures and make root cause analysis harder.
**Why it fails**: Larger diff = larger review surface = higher chance of new issues. Bug fix rationale and refactor rationale are different — mixing them obscures both.
**What to do instead**: Fix the bug with minimal scope. Open a separate task for the refactor. Reference each from the other.

### Agent Writing Directly to Canonical Memory
**Domain**: Memory
**Added**: 2026-04-14
**What failed**: Agents writing unvalidated facts to canonical memory causes downstream agents to operate on hallucinated or session-specific "truths."
**Why it fails**: One agent's confident but wrong output becomes everyone's operating assumption.
**What to do instead**: All canonical memory writes through memory-manager with validation. Agent working memory is the correct place for session-specific notes.

### Treating Council Rounds as Open-Ended
**Domain**: Decision Making
**Added**: 2026-04-14
**What failed**: Councils without a hard stop consume tokens indefinitely and produce analysis paralysis rather than decisions.
**Why it fails**: Each round surfaces new concerns — without a stop rule, the council never converges.
**What to do instead**: Hard stop at consensus OR 3 rounds, whichever comes first. Remaining unresolved concerns are flagged to the human, not deliberated further.

### Model Uniformity (Using Opus for Everything)
**Domain**: Cost / Performance
**Added**: 2026-04-14
**What failed**: Using the highest-capability model for every task inflates cost by 10–50x with no quality improvement for simple tasks.
**Why it fails**: Tester, Dispatcher, Docs Writer, Context Manager don't need deep reasoning — they need speed and reliability.
**What to do instead**: Follow the model tiering in architecture.md. Reserve Opus for COO and Retrospective. Use Haiku for high-frequency, low-judgment tasks.

## Related

- [[docs/memory-model.md]] — This file is Tier 3 canonical memory; memory-manager owns writes
- [[.claude/agents/memory-manager.md]] — Only agent with write authority here
- [[.claude/memory/canonical/patterns.md]] — Counterpart: established patterns to follow (sibling file)
- [[.claude/workflows/bugfix.md]] — Bug fixes that reveal systemic failures get added here
- [[.claude/agents/dependency-analyst.md]] — "Skipping Dependency Analyst" is an active anti-pattern here
- [[rules/agent-rules.md]] — Several auto-triggers exist specifically to prevent these failures
