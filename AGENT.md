# workflow — Agent Instructions

> **Canonical AI instruction file for this meta-repo.** When bootstrapping other projects, `bin/init.mjs` copies `templates/AGENT.md` into the target repo.

See [README.md](./README.md) for how to use this package.

---

## Precedence

1. User message for this task
2. This `AGENT.md`
3. `documentation/` workflows and prompts
4. `second-brain/wiki/`
5. `.agent-memory/`

---

## Behavioral guidelines (Karpathy)

### 1. Think before coding

State assumptions. Ask when uncertain. Surface tradeoffs. Don't pick silently between interpretations.

### 2. Simplicity first

Minimum code for the problem. No speculative features or abstractions.

### 3. Surgical changes

Touch only what the task requires. Match existing style.

### 4. Goal-driven execution

Every task needs verifiable success criteria. Multi-step work gets a plan with **verify:** per step.

---

## This repo's job

Maintain the **default new-repo template**:

| Area | Path | Maintain when |
|------|------|---------------|
| Agent instructions | `templates/AGENT.md`, root `AGENT.md` | Changing default agent behavior |
| Second brain | `second-brain/` | Improving ingest/wiki patterns |
| Workflows | `documentation/workflows/` | Changing dev/git/role process |
| Prompts | `documentation/prompts/` | Adding reusable AI prompts |
| Installer | `bin/init.mjs` | Changing what gets copied to new repos |

When editing templates, run `node bin/init.mjs <test-dir> --dry-run` to verify output.

---

## Second brain

Search `second-brain/wiki/` before redesigning template structure. See `second-brain/AGENT.md` for ingest commands.

---

## Memory

Save cross-session context to `.agent-memory/` using the standard categories: `decisions/`, `patterns/`, `context/`, `feedback/`.

---

## Development workflow

1. Plan → 2. TDD → 3. Review → 4. Commit (conventional commits)

Details: `documentation/workflows/development.md`

---

*This file is both the live agent guide for this repo and the reference for `templates/AGENT.md`.*
