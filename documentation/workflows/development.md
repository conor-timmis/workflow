# Development workflow

Feature implementation pipeline: planning, TDD, code review, then git.

## Feature implementation workflow

### 1. Plan first

- Use a planner mindset (or agent) for non-trivial work
- Identify dependencies, risks, and affected packages/files
- Output numbered steps each with **verify:** criteria
- Read `documentation/` and `second-brain/wiki/` before assuming scope

**Example plan format:**

```markdown
## Plan: [Feature]
**Depends on:** [prior items]
**Docs:** [relevant spec paths]

| Step | Task | Verify |
|------|------|--------|
| 1 | Add schema/types | typecheck passes |
| 2 | Failing test | test fails for right reason |
| 3 | Implementation | test green |
```

### 2. TDD approach

1. **RED** — write a failing test
2. **GREEN** — minimal code to pass
3. **IMPROVE** — refactor without changing behavior
4. **Coverage** — 80%+ on critical paths where the stack supports it

Bug fixes: regression test first, then fix.

### 3. Code review

After implementation, before commit:

- CRITICAL and HIGH issues must be fixed
- MEDIUM when practical
- Check: scope creep, mutations, wrong package placement, missing validation

Security review required for: auth, networking, secrets, user input, new env vars.

### 4. Commit and push

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `perf:`, `ci`
- Only commit when the user asks (unless project rules override)
- PRs: full branch diff, test plan, push with `-u` on new branches

See [commit-and-pr.md](./commit-and-pr.md) for PR workflow.

---

## Modal verbs (coding standards)

| Level | Meaning |
|-------|---------|
| **MUST** | Binding unless user overrides |
| **SHOULD** | Default; skip with defensible reason |
| **MAY** | Optional polish, no scope creep |

Full standards: [coding-standards.md](./coding-standards.md)

---

## Multi-step / multi-agent work

For tasks spanning packages or roles, start with **Orchestrator** per [agent-roles.md](./agent-roles.md).

Standard pipeline:

```
Orchestrator → Planner (if needed) → Specialist → TDD → Review → QA → Commit
```

---

## Definition of done

A task is done when:

- [ ] Success criteria from the plan are met
- [ ] Tests pass (new + existing)
- [ ] Docs/wiki updated if behavior or architecture changed
- [ ] No secrets or debug cruft in the diff
- [ ] User approved commit (if applicable)
