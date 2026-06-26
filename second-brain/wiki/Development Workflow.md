# Development Workflow

Distilled from `documentation/workflows/development.md`. See canonical doc for full detail.

## Pipeline

```
Plan → TDD → Review → Commit
```

## Plan

- Break feature into steps with **verify:** criteria
- Read relevant `documentation/` and wiki pages first
- Flag dependencies and risks

## TDD

1. Write failing test (RED)
2. Minimal implementation (GREEN)
3. Refactor (IMPROVE)
4. Target 80%+ coverage on critical paths

## Review

- Scope: only task-related changes
- Security on auth/input boundaries
- Standards: guard clauses, named constants, no dead code

## Commit

Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`

Only commit when user asks (unless project rules say otherwise).

## Related

- [[Agent Roles]]
- [[Current Status]]
- `documentation/workflows/development.md`
