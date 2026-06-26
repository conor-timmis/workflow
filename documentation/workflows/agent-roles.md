# Agent roles

Define who does what when AI agents build a project. One **Orchestrator** coordinates; specialists implement and hand back.

> Trim this file for small projects — keep Orchestrator + TDD + Reviewer as minimum.

---

## How this works

```
                 ┌─────────────────┐
                 │   ORCHESTRATOR   │
                 │  plan · track ·  │
                 │  commit · close  │
                 └────────┬────────┘
      ┌───────────────────┼───────────────────┐
      ▼                   ▼                   ▼
┌───────────┐      ┌───────────┐      ┌───────────┐
│  PLANNER  │      │ ENGINEERS │      │  QA /     │
│ ARCHITECT │      │ (domain)  │      │ REVIEWERS │
└───────────┘      └───────────┘      └───────────┘
```

### Golden rules (all roles)

| Rule | Detail |
|------|--------|
| **Read before build** | Check README, `documentation/`, `second-brain/wiki/` |
| **Tests prove done** | A checkbox is not ticked until tests pass |
| **Commits** | Orchestrator (or human) unless user assigns another role |
| **Scope** | Touch only files the role owns unless cross-cutting work assigned |

---

## Role index

| Role | One-line job |
|------|--------------|
| **Orchestrator** | Plans sprints, assigns agents, ticks boxes, commits milestones |
| **Planner** | Breaks features into ordered tasks with verify criteria |
| **Architect** | Boundaries, ADRs, cross-cutting design |
| **TDD Guide** | Failing tests first; RED → GREEN → REFACTOR |
| **Code Reviewer** | Post-implementation review; CRITICAL/HIGH must fix |
| **Security Reviewer** | Secrets, auth, input validation before merge |
| **QA / E2E** | Acceptance tests, critical user flows |
| **Build Resolver** | Fixes compile, lint, CI failures — minimal diff |

Add domain engineers (frontend, backend, infra) as your stack requires.

---

## Orchestrator

**Default owner** of any task spanning more than one area.

### Responsibilities

- Parse user goals against README MVP checklist
- Assign specialist roles per subtask
- Enforce definition of done before ticking checkboxes
- Create git commits when milestones complete (if user allows)
- Summarize handoffs: changed, tests, blockers, next role

### Workflow template

```
1. READ   → README + documentation + wiki
2. PLAN   → Planner if task > 3 files or unclear scope
3. ASSIGN → domain engineers + tdd
4. VERIFY → implement → reviewer (+ security if sensitive)
5. INTEGRATE → QA runs acceptance tests
6. CLOSE    → tick checkbox, commit (if asked), report
```

### Prompt

> Act as **Orchestrator**. Read README checklist and `second-brain/wiki/Home.md`. Break work into subtasks, assign agent roles per `documentation/workflows/agent-roles.md`. Do not mark done until acceptance criteria pass.

---

## Planner

**Turns vague goals into an ordered build plan.**

Invoked when: new feature touches 3+ areas, request is ambiguous, or architecture order matters.

### Prompt

> Act as **Planner**. Produce an implementation plan for [goal]. Include verify criteria per step and doc references.

---

## TDD Guide

**Tests before implementation.**

### Prompt

> Act as **TDD Guide**. Write failing tests for [feature]. Do not implement — only test.

---

## Code Reviewer

**Quality gate after code is written.**

### Prompt

> Act as **Code Reviewer** on the current diff. List CRITICAL / HIGH / MEDIUM issues.

---

## Security Reviewer

**Before merge on sensitive surfaces.**

### Prompt

> Act as **Security Reviewer** on [files]. Check auth, input validation, and secrets.

---

## Handoff format

All specialists report to Orchestrator:

```markdown
## Handoff: [Role] → Orchestrator
**Status:** done | blocked | needs-review
**Changed:** [files]
**Tests:** pass | fail (details)
**Blockers:** none | [description]
**Suggested next role:** [role]
```

---

## Standard pipelines

### New feature

```
Orchestrator → Planner (if needed) → TDD Guide → Engineer → Reviewer → QA → Commit
```

### Bug fix

```
Orchestrator → TDD Guide (regression) → Engineer → Reviewer → Commit
```

---

*When in doubt, start with **Orchestrator**.*
