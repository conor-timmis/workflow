# {{PROJECT_NAME}} — Agent Instructions

> **Canonical AI instruction file.** This replaces `CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md`, and similar per-tool duplicates. Point every coding agent here.

---

## Precedence

When instructions conflict, follow this order:

1. **This task's user message** — always wins
2. **`AGENT.md`** (this file) — project defaults
3. **`documentation/`** — workflows and specs the user or this file references
4. **`second-brain/wiki/`** — distilled project knowledge (search before assuming)
5. **`.agent-memory/`** — saved decisions and patterns from past sessions

If you follow a lower tier first, say briefly why.

---

## Behavioral guidelines (Karpathy)

**Tradeoff:** These bias toward caution over speed. Use judgment on trivial tasks.

### 1. Think before coding

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity first

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" that wasn't requested.
- If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical changes

- Touch only what the task requires. Match existing style.
- Remove imports/functions **your** changes made unused.
- Don't remove pre-existing dead code unless asked.
- Every changed line should trace to the user's request.

### 4. Goal-driven execution

Transform tasks into verifiable goals:

- "Add validation" → write tests for invalid inputs, then make them pass
- "Fix the bug" → write a test that reproduces it, then make it pass
- "Refactor X" → ensure tests pass before and after

For multi-step work, state a brief plan with **verify:** criteria per step.

---

## Coding standards

Apply these to all code you change unless the user overrides:

| Rule | Requirement |
|------|-------------|
| Decomposition | Split large units; one job per function/class |
| Guard clauses | Early return for invalid/edge paths; keep main path flat |
| Constants | Name policy limits, thresholds, codes — no unexplained literals |
| Dedup | Extract repeated non-trivial logic (~3+ meaningful lines) |
| Wide APIs | Use options objects for 4+ parameters |
| Dead code | Remove unused code you touch or that obscures |
| Scope | Minimal diff; no drive-by refactors |
| Comments | Only non-obvious invariants and external constraints |

Full detail: `documentation/workflows/coding-standards.md` (installed from workflow template).

---

## Second brain

This repo has a compounding knowledge base at `second-brain/`.

| Path | Purpose |
|------|---------|
| `second-brain/wiki/` | Distilled, interlinked knowledge — **search here first** |
| `second-brain/raw/` | Unprocessed sources inbox |
| `second-brain/AGENT.md` | Ingest / ask / sync commands |

**Before developing:** read `second-brain/wiki/Home.md`, then relevant wiki pages.

**Commands:**

- **ingest this** — read a file in `second-brain/raw/`, update wiki with wikilinks, mark source ingested
- **ingest all** — process all un-ingested files in `second-brain/raw/`
- **sync project docs** — copy `documentation/` and root `README.md` into `second-brain/raw/project/`, then ingest
- **update status** — refresh `second-brain/wiki/Current Status.md` from README and recent changes

Canonical specs stay in `documentation/`; the wiki is navigable understanding — keep both aligned.

---

## Memory (`.agent-memory/`)

When the user asks you to remember something, save a markdown file under `.agent-memory/`:

| Directory | Purpose |
|-----------|---------|
| `decisions/` | Architectural choices and rationale |
| `patterns/` | Recurring solutions that worked |
| `context/` | Project background, constraints |
| `feedback/` | User corrections and preferences |

Format:

```markdown
---
project: {{PROJECT_NAME}}
date: YYYY-MM-DD
tags: [relevant, tags]
---

One-line summary.

**Why:** motivation or constraint
**Apply:** when to use this in future sessions
```

At session start, scan `.agent-memory/` for entries matching this project.

---

## Development workflow

Default pipeline for features:

1. **Plan** — break down; identify dependencies and risks (`documentation/workflows/development.md`)
2. **TDD** — failing test → implement → refactor → 80%+ coverage where applicable
3. **Review** — check scope, security, and standards before commit
4. **Commit** — conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`

For multi-agent or multi-step work, see `documentation/workflows/agent-roles.md`.

---

## Security (always)

Before finishing work that touches boundaries:

- No hardcoded secrets — use environment variables
- Validate all user input at system boundaries
- Error messages must not leak sensitive internals
- Auth and authorization verified on server-side paths

---

## Project layout

<!-- Customize this section after init -->

| Path | Role |
|------|------|
| `documentation/` | Specs, ADRs, workflow docs |
| `second-brain/` | Obsidian vault for compounding knowledge |
| `.agent-memory/` | Cross-session agent memory |

---

## Quick prompts

Copy from `documentation/prompts/` or invoke inline:

- **New feature:** "Plan first per `documentation/workflows/development.md`, then implement with TDD."
- **Orchestrator:** "Act as Orchestrator. Read README checklist and `second-brain/wiki/Home.md`. Assign roles per `documentation/workflows/agent-roles.md`."
- **Ingest:** "Ingest all unprocessed files in `second-brain/raw/` per `second-brain/AGENT.md`."

---

*Installed from [workflow](https://github.com/conor-timmis/workflow). Edit project-specific sections above; keep behavioral guidelines unless you have a reason to diverge.*
