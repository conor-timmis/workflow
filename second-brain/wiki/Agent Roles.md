# Agent Roles

Distilled from `documentation/workflows/agent-roles.md`.

## Default entry point

**Orchestrator** — plans, assigns, tracks, commits milestones.

## Specialists

| Role | When to use |
|------|-------------|
| Planner | Task spans 3+ areas or scope is unclear |
| Architect | Package boundaries, ADRs, "where does this live?" |
| TDD Guide | New features, bug fixes — test first |
| Code Reviewer | After implementation, before commit |
| Security Reviewer | Auth, networking, secrets, user input |
| QA / E2E | Acceptance tests, critical user flows |
| Build Resolver | CI or compile failures |

## Handoff format

```markdown
## Handoff: [Role] → Orchestrator
**Status:** done | blocked | needs-review
**Changed:** [files]
**Tests:** pass | fail
**Suggested next role:** [role]
```

## Related

- [[Development Workflow]]
- `documentation/workflows/agent-roles.md`
