# workflow

Default setup for new repositories — AI agent instructions, second brain, workflow docs, and bootstrap prompts.

Use this repo as the source of truth when starting a project. Run the installer to copy the standard layout into any new repo.

## Quick start

Bootstrap a new project (from this repo):

```bash
node bin/init.mjs path/to/your-new-repo
```

Or after publishing:

```bash
npx --yes git+https://github.com/conor-timmis/workflow.git init path/to/your-new-repo
```

### Options

| Flag | Meaning |
|------|---------|
| `--name <name>` | Project display name (defaults to directory name) |
| `--force`, `-f` | Overwrite existing workflow files |
| `--compat` | Also write `AGENTS.md` and `CLAUDE.md` as copies of `AGENT.md` for tool compatibility |
| `--dry-run` | Print actions without writing files |

## What gets installed

| Path | Purpose |
|------|---------|
| `AGENT.md` | **Single** AI instruction file — replaces `CLAUDE.md`, `AGENTS.md`, etc. |
| `second-brain/` | Obsidian-style compounding knowledge base |
| `documentation/` | Human + agent workflow specs and reusable prompts |
| `.agent-memory/` | Per-project cross-session memory (decisions, patterns, context, feedback) |
| `.gitignore` | Sensible defaults with a managed block for refresh |

## Layout (this repo)

```
workflow/
├── AGENT.md                 # Canonical agent instructions
├── README.md
├── bin/init.mjs             # Bootstrap installer
├── second-brain/              # Knowledge vault template
│   ├── README.md
│   ├── AGENT.md             # Second-brain-specific agent rules
│   ├── raw/                 # Unprocessed sources inbox
│   └── wiki/                # Distilled, interlinked knowledge
├── documentation/
│   ├── workflows/           # How we work (dev, git, roles)
│   └── prompts/             # Copy-paste AI prompts for common tasks
└── templates/               # Files merged into target repos by init
```

## Second brain

Open `second-brain/` as an Obsidian vault (optional but recommended).

1. Drop sources in `second-brain/raw/inbox/`
2. Tell your agent: **ingest this** or **ingest all**
3. Search `second-brain/wiki/` before starting from scratch

See [second-brain/README.md](./second-brain/README.md) for setup.

## New project with existing docs?

1. Run `bin/init.mjs` on the repo
2. Paste [documentation/prompts/project-alignment.md](./documentation/prompts/project-alignment.md) into a chat (fill in the `[brackets]`)
3. Agent aligns `AGENT.md`, README, wiki, ingests your docs — no feature work in that session

## Documentation

- [documentation/workflows/new-repo.md](./documentation/workflows/new-repo.md) — checklist for new projects
- [documentation/prompts/project-alignment.md](./documentation/prompts/project-alignment.md) — **align template to your project**
- [documentation/workflows/development.md](./documentation/workflows/development.md) — plan → TDD → review → commit
- [documentation/workflows/agent-roles.md](./documentation/workflows/agent-roles.md) — orchestrator and specialist roles
- [documentation/prompts/](./documentation/prompts/) — ready-to-use prompts

## Developing this package

```bash
node bin/init.mjs ../my-test-project --dry-run
```
