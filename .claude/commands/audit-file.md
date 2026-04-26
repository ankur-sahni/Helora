# /audit-file

Reusable Opus prompt for auditing any instruction file in the system.
Replace all {{variables}} before sending to Opus.

---

## Prompt Template

```
You are auditing an instruction file in a multi-agent system. Your job is to diagnose before you prescribe. Do not rewrite until you have graded.

## File under audit
- Name: {{FILE_NAME}}
- Purpose: {{FILE_PURPOSE}}
- Related files in system: {{RELATED_FILES_INVENTORY}}

## Observed gaps (rules the user has had to repeat, drift from intended behavior, contradictions noticed in practice)
{{OBSERVED_GAPS}}

## File content
{{FILE_CONTENT}}

---

## Step 1 — Diagnosis (required before rewrite)

Produce a diagnostic table. Be blunt. No hedging.

| Dimension | Grade A-F | Evidence (cite line or section) | Root cause |
|---|---|---|---|
| Accuracy (reflects actual system) | | | |
| Completeness (covers observed gaps) | | | |
| Signal density (load-bearing lines vs filler) | | | |
| Consistency (internal + vs related files) | | | |
| Enforceability (rules are testable/specific) | | | |
| Token efficiency | | | |

Then answer in <=5 bullets each:
- **Top 3 structural flaws** (not line edits — architectural issues)
- **Content to preserve verbatim** (load-bearing lines that must not be paraphrased)
- **Content to delete** (dead, redundant, or contradicted by related files)
- **Missing rules** inferred from {{OBSERVED_GAPS}} that the file should teach
- **Contradictions** between this file and {{RELATED_FILES_INVENTORY}}

## Step 2 — Revised file

Rewrite {{FILE_NAME}} applying the diagnosis. Rules:
- Every line must earn its place. If you cannot name which failure mode a line prevents, cut it.
- Preserve load-bearing lines verbatim (from Step 1).
- No decorative formatting, no ASCII art, no emoji unless the original had them and they carry meaning.
- Markdown lines <=150 chars.
- If a rule belongs in a related file instead, note it in the changelog and omit it here.

Output the full revised file inside a single fenced code block.

## Step 3 — Changelog

Table format:
| Change | Type (add/cut/move/rewrite) | Reason (link to diagnosis row or observed gap) |
|---|---|---|

End with one line: **Net delta:** +X lines / -Y lines / moved Z rules to [file].

Do not add commentary outside these three sections.
```

---

## Variable guide

| Variable | What to put |
|---|---|
| `{{FILE_NAME}}` | Path of file being audited |
| `{{FILE_PURPOSE}}` | One sentence: why it exists and who reads it |
| `{{FILE_CONTENT}}` | Full current text of the file |
| `{{OBSERVED_GAPS}}` | Rules you've had to repeat, drift symptoms, contradictions — highest-signal input |
| `{{RELATED_FILES_INVENTORY}}` | Names + one-line purpose of sibling files so auditor can spot overlap |
