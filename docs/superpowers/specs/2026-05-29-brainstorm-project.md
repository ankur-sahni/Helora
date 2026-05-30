# Brainstorm — Project Understanding (Helora vs ASM separation)

> **Status:** Understanding capture during brainstorming. NOT a finalized plan.
> Open questions at the bottom must be answered before we write the execution plan.
> **Date:** 2026-05-29 · **Mode:** Claude acts as orchestrator/CTO; agents do labor; Ankur decides.

---

## 1. The core realization

There are **two completely different projects tangled inside one folder**, and that tangle is the entire source of the "mess" and confusion.

- **Helora** — Ankur's *real* business. An autonomous, human-in-loop system that solves real problems and sells SaaS subscriptions + automation. This is the actual venture.
- **ASM (Ankit Sahni Makeover)** — Ankur's brother's bridal-salon website. A real, useful site; built as a learning project and a portfolio/case-study piece. **It has nothing to do with Helora.**

ASM was built *inside* the Helora folder, sharing one Git repo, one set of docs, and one agent system. That single decision is why everything contradicts itself and feels chaotic. The folder is confused, so the work feels confused. This is normal and fixable.

## 2. Who Ankur is (collaboration context)

- Beginner, still learning; MCA + IT background, rebuilding after a career gap.
- Wants Claude to act as **boss/CTO** — run the session, direct agents for the labor, bring decisions. Not data entry, not spoon-feeding.
- Strongly wants to **stop re-doing work** and **stop reminding Claude of the same things**.
- Frustrated by: broken prod deploys, lost work, context rot, repeated mistakes.

## 3. The first task (agreed)

**Make ASM standalone** — give it its own clean home, separate from Helora. Everything else waits.

### Chosen approach: LIFT-OUT (not copy-and-delete)

Ankur's first idea was: copy the folder twice, delete Helora from one and ASM from the other. Rejected because:
- Hand-deleting traces from two folders is error-prone; references are deeply tangled.
- Both copies would still carry the *entire* old Git history — not actually clean.

Better approach (recommended):
1. **One full backup zip first** — nothing can ever be lost (Ankur's safety instinct, kept).
2. ASM's website is **already its own Git repo** (own history, own GitHub remote `github.com/ankur-sahni/ankitsahnimakover`), just nested inside the Helora folder — never truly merged. So we **lift it out**, not copy-delete.
3. Gather ASM's strategy docs (DONE_CHECKLIST, design system, audits) into that standalone home.
4. In Helora, remove the ASM folder and scrub leftover mentions **once**.

### Key reassurance (resolves Ankur's "so much rework" fear)

Almost all of Ankur's setup is **global (user-level), not in the project folder**, so separation does **not** mean reinstalling anything:
- **Plugins** (superpowers, claude-mem, context-mode, graphify) live in `C:\Users\devin\.claude\plugins\` → work in every folder.
- **Skills** (handover, etc.), **MCP servers** (Playwright, Context7), **global rules/CLAUDE.md** → all user-level, follow him everywhere.
- Only the project-local `.claude/` configs + project CLAUDE.md live in the folder — and most of that is *Helora's* agency machinery ASM doesn't need.
- Whatever small bits ASM needs (its memory files, a short CLAUDE.md), **Claude copies them, not Ankur.** Zero manual rework.

**Leaning (pending confirmation):** keep **ASM where it is** and move **Helora out** to a fresh folder instead — because the current folder's auto-memory is ~90% ASM content, so ASM keeps its memory/setup untouched and Helora (built fresh anyway) starts clean.

### Timing

**Not now.** Execute the separation only **after** the live ASM site is stable and a deploy safety net is in place — never pull things apart while they're still breaking.

## 4. The deeper goal (separate, later workstream)

Beyond separation, Ankur wants a **reliability system** so mistakes stop recurring: tight CLAUDE.md, hooks that *enforce* instead of *hope*, verification before shipping, durable memory + handover across sessions, and docs that tell the truth. This is its own project, sequenced after ASM is clean.

## 5. What the 4 audit agents found (so we don't re-discover it)

- **Agency system is ~80% documentation theater.** 8 referenced agents have no file (researcher, tester, devops, dispatcher…). Docs/COO map route into dead ends.
- **The one hook guards the wrong door.** `check-approval.cjs` gates file *edits* (gameable, fails open) but there is **zero gate on `git push` / `vercel --prod`** — the thing that breaks prod.
- **Fake data can ship.** `FALLBACK_TESTIMONIALS` (invented brides) + `FALLBACK_PACKAGES` (invented prices) render if a Sanity query fails silently — violates "no fake data."
- **Load-bearing undocumented config.** `images: { unoptimized: true }` keeps getting removed → breaks the gallery (today's bug).
- **`app/page.tsx` ≈ 1,258 lines**; global `window.__rescanReveal` coupling; hardcoded phone in 6+ places; tracked junk (`build.log`, `compare.mjs`); boilerplate README.
- **Docs lie about state.** `progress.md` (2026-04-18) says "no website yet" though it's live. `lead-gen/CLAUDE.md` contradicts the ICP pivot.
- **Only ~8 commits total** for ~2 months → work churns uncommitted and gets lost.
- **Conflicting WhatsApp numbers** across docs: `919098888134` (live site) vs `9098909088` (docs) — a live lead leak.

## 6. Principles to bake in (from Ankur's three guides)

- **Verify, never trust memory** — pair every change with a test/run/screenshot before shipping. (Proven today: Claude claimed Opus 4.8 didn't exist; Ankur showed it live on claude.ai Max. Trust observed reality over remembered facts.)
- **Write memory only after a confirmed-successful action** — don't pollute memory with failed attempts.
- **Mandatory session handover** with a fixed schema (goal, decisions, files touched, open issues, next step).
- **Tight CLAUDE.md (<1 page)** — durable context only; everything else → load-on-demand skills + one-line rules each with a verification step.
- **Hooks over prose** — enforce deterministically (deploy gate, PostToolUse auto-lint).
- **Compact proactively at 70–90% context;** push high-output work to subagents.

## 7. Constraints (always honor)

- Free tier only until first invoice (ASM = ₹20k/month, first revenue).
- No fake/placeholder data in anything that could ship.
- Plan before build; get approval before non-trivial code.
- No delete without double-confirmation.
- Claude = orchestrator/boss; agents do labor; give one recommendation, not menus.

## 8. Open questions (must answer before writing the execution plan)

1. **Direction of separation:** "ASM stays put, Helora moves out" (recommended — keeps ASM's memory/setup) vs "ASM moves out, Helora stays"? — *pending Ankur*
2. **Canonical WhatsApp number** — needed when we touch the live-site fixes track. Live site uses `919098888134`. — *pending Ankur*
3. **Overall sequence** — recommended: (a) deploy safety net → (b) write ASM-standalone plan → (c) execute separation once live site stable → (d) governance overhaul → (e) live-site real fixes. — *pending Ankur confirm*
