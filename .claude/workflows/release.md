# Workflow: Release

End-to-end release sequence. Every release follows this, no exceptions.

---

## Phase 1: Pre-Release Gate (COO)

```
COO checks:
→ Is this a patch / minor / major? (determines risk level)
→ Are there any open CRITICAL or HIGH security findings?
→ Are all feature branches merged and tested?
→ Is the rollback procedure defined?
```

Blockers that STOP release:
- Open CRITICAL security findings
- Failing tests on main
- Undefined rollback procedure

---

## Phase 2: Pre-Release Checks (Parallel)

```
[TRACK A]           [TRACK B]           [TRACK C]
tester              security            dependency-analyst
→ Full test suite   → Dependency audit  → Confirms no
→ Must be 100%      → pnpm audit        → unresolved
  green             → No HIGH+ CVEs       blast-radius issues
```

---

## Phase 3: Release Prep

```
docs-writer
→ CHANGELOG.md entry
→ Release notes (if public)
→ Version bump confirmed

devops
→ Migration sequence confirmed
→ Deployment runbook ready
→ Rollback command documented and tested
→ Monitoring/alerting configured
```

---

## Phase 4: Deploy Sequence

```
devops executes:
1. Database migrations → verify success
2. Application deploy (rolling)
3. Smoke tests → COO reviews results
4. Watch error rate: 10 minutes
5. Watch P95 latency: 10 minutes
```

If any check fails: immediate rollback → incident workflow.

---

## Phase 5: Post-Release

```
observability → log release event + metrics baseline
memory-manager → record release decisions and any deployment gotchas
docs-writer → archive release notes to docs/releases/
```

---

## Rollback Decision Tree

```
Error rate spike? ──────────────────► Rollback immediately
Latency spike (> 2x baseline)? ────► Rollback if not resolving in 5 min
Single feature broken? ────────────► Feature flag off (if available) → hotfix
Data corruption detected? ─────────► Rollback + incident response immediately
```

**Rollback command must be documented before deploy starts — not looked up after an incident.**
