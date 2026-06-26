# Prompt: Feature development

Single-feature session with plan → TDD → review.

---

```
Implement [FEATURE] following documentation/workflows/development.md and AGENT.md.

## Before coding

1. Read relevant documentation/ specs and second-brain/wiki/ pages
2. Post a short plan with verify criteria per step
3. Wait for my OK unless I said "go ahead"

## Implementation

- TDD: failing test → minimal pass → refactor
- Surgical diff only — match existing style
- Update docs/wiki if behavior or architecture changed

## Before you say done

Run through documentation/workflows/coding-standards.md checklist mentally.

## Output

Plan → changes → how to verify → suggested commit message (do not commit unless I ask).
```
