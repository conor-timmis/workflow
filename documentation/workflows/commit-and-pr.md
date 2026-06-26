# Commit and pull request workflow

## Commit messages

```
<type>: <description>

<optional body>
```

**Types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

Focus on **why**, not only what changed.

## Before committing

- [ ] No hardcoded secrets
- [ ] Tests pass for touched areas
- [ ] Diff is scoped to the task
- [ ] User requested commit (default rule)

## Pull requests

1. Analyze **full** commit history on the branch (`git log`, `git diff main...HEAD`)
2. Draft summary: what, why, how to test
3. Include a **Test plan** checklist
4. Push branch with `-u` if new
5. Open PR via `gh pr create`

### PR body template

```markdown
## Summary
- ...

## Test plan
- [ ] ...
```

## What not to do

- Force-push to `main`/`master` without explicit user request
- `git commit --amend` after push unless user asks
- Skip hooks (`--no-verify`) unless user asks
- Commit `.env` or credential files

## Project-specific note (toyfront / team-buddies style)

Some projects use descriptive non-conventional messages (`Add .gitignore to project`). Match the **existing** commit style in the repo when joining a project; use conventional commits for **new** repos bootstrapped from this template unless the team decides otherwise.
