# Prompt: New project setup

Copy everything inside the fence into a new chat after running `workflow` init.

> **Already have documentation or code?** Use [project-alignment.md](./project-alignment.md) instead — it maps the template onto your project and runs the ingest pipeline.

---

```
You are setting up a new project that was bootstrapped from the workflow template.

## Read first (in order)

1. AGENT.md — canonical agent instructions
2. README.md — project goals and MVP checklist
3. second-brain/wiki/Home.md — knowledge map
4. documentation/workflows/new-repo.md — setup checklist

## Your job this session

1. Summarize what exists and what's still placeholder
2. Walk through documentation/workflows/new-repo.md and list unchecked items
3. Propose the first 3 MVP tasks from README with verify criteria
4. Do NOT implement until I confirm the first task

## Rules

- Follow AGENT.md precedence and Karpathy guidelines
- Search second-brain/wiki/ before assuming architecture
- Save important decisions to .agent-memory/decisions/
- Conventional commits when I ask you to commit

Start by reading the files above and reporting project state.
```

---

## Variants

### With stack hint

Add after "Your job":

```
Stack: [e.g. React + Vite + FastAPI + Postgres]
Customize AGENT.md project layout and propose folder scaffold.
```

### With compat tools

Add:

```
Also verify AGENTS.md and CLAUDE.md match AGENT.md if --compat was used.
```
