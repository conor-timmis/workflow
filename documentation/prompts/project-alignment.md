# Prompt: Project alignment

**Use this** when a repo was bootstrapped from workflow and you already have documentation, an MVP in progress, or an existing codebase to map onto the template.

Copy the block below into a new chat. Fill in the `[brackets]` before sending.

---

```
You are aligning a bootstrapped workflow template to an existing project.

## Context

- **Project name:** [NAME]
- **One-line goal:** [WHAT THIS PROJECT DOES]
- **Stack:** [e.g. React + Vite / FastAPI / Postgres / etc.]
- **Repo state:** [greenfield after init | existing code | docs only | both code and docs]

## Existing documentation (if any)

List what already exists — paths, formats, authority:

| Path | Format | Role |
|------|--------|------|
| [e.g. docs/ARCHITECTURE.md] | markdown | canonical architecture |
| [e.g. Notion export in ./imports/] | markdown | product spec |
| [e.g. README.md checklist] | markdown | MVP tracker |

If docs live outside the repo, say where and what to read first.

## Read first (in order)

1. AGENT.md — template defaults (do not overwrite behavioral guidelines)
2. README.md — current checklist (mostly placeholder)
3. second-brain/wiki/Home.md — wiki map
4. second-brain/AGENT.md — ingest/sync rules
5. documentation/workflows/new-repo.md — setup checklist
6. **All existing project docs** listed above

## Your job — alignment only (no feature implementation)

### Phase 1: Discover

1. Inventory the repo: code layout, existing docs, tests, config
2. Report what's still generic template vs real project content
3. Flag conflicts (e.g. docs say X, code does Y) — do not silently pick a side

### Phase 2: Align canonical layer

Update these to reflect **this** project:

**AGENT.md**
- Fill **Project layout** table with real paths
- Add stack-specific notes (test runner, deploy, package manager)
- Remove sections that don't apply
- Keep Karpathy guidelines, precedence, memory, and second-brain rules unchanged

**README.md**
- Project description and goals
- Real MVP checklist (migrate from existing docs if present)
- Install / run / test commands if code exists
- Links to documentation/ and second-brain/wiki/Home.md

**documentation/**
- Move or copy existing specs here if they aren't already (preserve originals if unsure — ask)
- Suggested structure when missing:
  - documentation/ARCHITECTURE.md
  - documentation/adr/ for decisions
  - Keep documentation/workflows/ from template unless project overrides

### Phase 3: Align second brain

**second-brain/wiki/**
- Rewrite Home.md — project-specific map of content with wikilinks
- Rewrite Current Status.md — mirror README MVP checklist
- Create or update wiki pages for major domains (e.g. Architecture, API, Auth) by **distilling** docs — not copy-paste walls of text

Then run the ingest pipeline per second-brain/AGENT.md:
1. **sync project docs** — copy documentation/ + README into second-brain/raw/project/
2. **ingest all** — distill raw/ into wiki/ with wikilinks and ingested frontmatter

### Phase 4: Memory and decisions

- Save non-obvious alignment choices to .agent-memory/decisions/ (e.g. "docs/ merged into documentation/", "wiki uses X naming")
- Note anything that needs my confirmation before you edit

### Phase 5: Report

Deliver a short alignment report:

```markdown
## Alignment report

### Updated
- [files changed and why]

### Wiki pages created/updated
- [list]

### Still placeholder / needs me
- [items]

### Conflicts found
- [doc vs code, or doc vs doc]

### Suggested first implementation task
- [one task with verify criteria — do NOT start until I confirm]
```

## Rules

- Follow AGENT.md precedence
- **Distill** on ingest — wiki is navigable understanding; documentation/ stays canonical
- Surgical edits: align template to project, don't refactor application code
- Do not commit unless I say so
- Do not implement features — alignment session only
- If existing docs are PDF/Notion/Word, tell me to export to second-brain/raw/inbox/ and stop — don't guess content

Start with Phase 1 discovery and ask clarifying questions only if blockers exist.
```

---

## When to use which prompt

| Situation | Prompt |
|-----------|--------|
| Fresh init, no docs yet | [new-project-setup.md](./new-project-setup.md) |
| Init + existing docs and/or code | **This file** |
| Docs changed later | [ingest-second-brain.md](./ingest-second-brain.md) |
| Ready to build | [orchestrator.md](./orchestrator.md) or [feature-development.md](./feature-development.md) |

---

## Minimal example (filled in)

```
Project name: links-fe
One-line goal: SvelteKit link-in-bio frontend
Stack: SvelteKit 2, TypeScript, Tailwind
Repo state: existing code + README + memory/ folder

Existing documentation:
| Path | Format | Role |
| README.md | md | setup + route map |
| memory/MEMORY.md | md | agent context (legacy) |

…rest of prompt unchanged…
```

After alignment, legacy paths like `memory/` can be migrated into `.agent-memory/` or ingested into the wiki — the agent should propose that in the report, not delete without asking.
