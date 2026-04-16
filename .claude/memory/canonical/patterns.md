# Canonical Memory: Established Patterns

Patterns that all agents must follow. Only memory-manager writes here.

---

## Entry Format

```
### [Pattern Name]
**Domain**: [area]
**Added**: [date]
**Confidence**: high / medium
[description + example]
```

---

## Active Patterns

### Schema Validation at System Boundaries
**Domain**: API / Input Handling
**Added**: 2026-04-14
**Confidence**: high

Validate all external inputs (HTTP requests, webhook payloads, file contents) with a schema library (Zod, Joi, Pydantic) before passing to any internal function. Internal functions trust their inputs — validation happens at the entry point only.

### DTO Mapping Before API Response
**Domain**: API / Data Exposure
**Added**: 2026-04-14
**Confidence**: high

Never return raw database objects in API responses. Always map to a DTO (Data Transfer Object) that explicitly lists which fields are included. New fields added to the DB model do not automatically become public.

### Planner Before Implementer
**Domain**: Agent Workflow
**Added**: 2026-04-14
**Confidence**: high

Implementer never starts without a written plan from Planner. If a task seems "simple enough to just do", that judgment belongs to the Planner — not to the Implementer making an autonomous decision.

### Researcher Before Planner
**Domain**: Agent Workflow
**Added**: 2026-04-14
**Confidence**: high

Planner produces better plans when Researcher has already mapped the relevant codebase. Skipping Researcher leads to plans with wrong file paths, missed dependencies, and invalid assumptions.

### Memory Write Through Memory Manager
**Domain**: System Memory
**Added**: 2026-04-14
**Confidence**: high

All writes to canonical memory go through memory-manager. Agents write to their own working memory directly. Canonical memory is the shared source of truth — it must be validated before entry.

### Confidence Scores on All Agent Outputs
**Domain**: Quality Gates
**Added**: 2026-04-14
**Confidence**: high

Planner, Researcher, Reviewer, Security, and Council members include a confidence score (0–100%) with every output. Scores < 60% trigger escalation. Scores are honest — not inflated to avoid escalation.
