# New repository checklist

Run when creating a project from the workflow template.

## 1. Bootstrap

```bash
node /path/to/workflow/bin/init.mjs ./your-new-repo --name "Your Project" --compat
cd your-new-repo
git init
```

Or from GitHub after publish:

```bash
npx --yes git+https://github.com/conor-timmis/workflow.git init ./your-new-repo --compat
```

## 2. Customize AGENT.md

- [ ] Replace `{{PROJECT_NAME}}` if not substituted by init
- [ ] Fill in **Project layout** table with real paths (`src/`, `apps/`, etc.)
- [ ] Add stack-specific notes (framework, test runner, deploy target)
- [ ] Remove sections that don't apply

## 3. Customize README.md

- [ ] Project description and goals
- [ ] MVP checklist with `[ ]` / `[x]` items
- [ ] Install and run instructions
- [ ] Link to `documentation/` and `second-brain/wiki/Home.md`

## 4. Second brain

- [ ] Open `second-brain/` in Obsidian (optional)
- [ ] Edit `second-brain/wiki/Home.md` — project map
- [ ] Edit `second-brain/wiki/Current Status.md` — mirror README checklist
- [ ] Add `[[Architecture Overview]]` or domain pages as needed

## 5. Documentation

- [ ] Customize `documentation/ARCHITECTURE.md` (template included)
- [ ] Copy `documentation/adr/0000-template.md` for non-obvious decisions
- [ ] Run **sync project docs** → **ingest all** after first docs land

## 6. Environment and secrets

- [ ] Add `.env.example` with required variables (no secrets)
- [ ] Verify `.gitignore` covers `.env` and build outputs

## 7. Agent tooling (optional)

| Tool | What to point at |
|------|------------------|
| Cursor | Reads `AGENT.md` via rules or @ mention |
| Claude Code | `AGENT.md` or `--compat` copies |
| Copilot | Symlink or copy to `.github/copilot-instructions.md` |
| Windsurf | Copy key sections to `.windsurf/rules/` |

With `--compat`, init writes `AGENTS.md` and `CLAUDE.md` as copies of `AGENT.md`.

## 8. First session prompt

| Your situation | Prompt |
|----------------|--------|
| Greenfield — no docs yet | [../prompts/new-project-setup.md](../prompts/new-project-setup.md) |
| **Existing docs and/or code** | [../prompts/project-alignment.md](../prompts/project-alignment.md) |

The alignment prompt walks the agent through customizing `AGENT.md`, README, `documentation/`, and `second-brain/wiki/`, then **sync project docs** → **ingest all** — without implementing features in that session.

## 9. Ongoing

- Canonical specs → `documentation/`
- Compounding knowledge → **ingest** into `second-brain/wiki/`
- Cross-session memory → `.agent-memory/`
- Workflow changes → update this repo's `documentation/workflows/` and re-init or merge manually
