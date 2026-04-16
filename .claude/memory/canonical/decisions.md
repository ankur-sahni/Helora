# Canonical Memory: Key Decisions

Important choices made with rationale. Only memory-manager writes here.
Agents read this to understand why things are the way they are.

---

## Entry Format

```
### [Decision]
**Date**: [date]
**Made by**: [who/what]
**Rationale**: [why this, not alternatives]
**Alternatives rejected**: [what was considered and why rejected]
**Revisit if**: [conditions under which this should be reconsidered]
```

---

## Active Decisions

### COO Routes All Non-Trivial Requests
**Date**: 2026-04-14
**Made by**: system-init
**Rationale**: Single entry point prevents agents from being invoked out of sequence, ensures mandatory triggers are checked, and maintains system coherence.
**Alternatives rejected**: Direct agent invocation — leads to skipped security checks and missed dependency analysis.
**Revisit if**: COO becomes a bottleneck for clearly single-domain tasks.

### Dispatcher as Separate Routing Audit
**Date**: 2026-04-14
**Made by**: system-init
**Rationale**: COO routing decisions need an independent check. Combining orchestration and audit in one agent means errors compound silently. Dispatcher is cheap (Haiku) and fast.
**Alternatives rejected**: Self-auditing COO — conflict of interest; no external check.
**Revisit if**: Dispatcher false-positive rate exceeds 20% (blocking valid routes).

### Hard Stop After 3 Council Rounds
**Date**: 2026-04-14
**Made by**: system-init
**Rationale**: Councils that run indefinitely consume tokens without producing better decisions. Most real decisions converge in 2 rounds. Round 3 is a safety valve.
**Alternatives rejected**: Time-based stop — arbitrary; Round count-based is predictable.
**Revisit if**: Analysis shows high-quality decisions consistently require 4+ rounds.

### Security Agent as Hard Gate
**Date**: 2026-04-14
**Made by**: system-init
**Rationale**: Security findings discovered post-deployment cost 10–100x more to fix. A hard gate on CRITICAL findings prevents shipping known vulnerabilities.
**Alternatives rejected**: Advisory-only security — too easy to ignore under deadline pressure.
**Revisit if**: False positive rate from security agent exceeds 30%.
