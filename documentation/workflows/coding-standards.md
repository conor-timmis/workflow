# Coding standards

Norms for readability, maintainability, and consistency. Humans and **automated coding agents** apply the same bar.

Distilled from [coding-practices](https://github.com/conor-timmis/coding-practices). Install full `PRACTICES.md` separately if you want the complete document.

---

## Priority levels

| Level | Meaning |
|-------|---------|
| **MUST** | Required unless user overrides |
| **SHOULD** | Default; skip with good reason |
| **MAY** | Optional polish |

---

## Rules

### 1. Decompose

**MUST** split large functions, classes, or templates into small, single-purpose units.

**Heuristic:** If you scroll to grasp it, split it.

### 2. Guard clauses

**MUST** use early returns for invalid input, edges, and N/A paths.

**MUST NOT** wrap the entire body in `if (ok) { … }` when `if (!ok) return;` flattens it.

### 3. Named constants

**MUST NOT** leave unexplained literals for limits, thresholds, codes, or flags.

**SHOULD** name by intent (`MAX_RETRIES`), not only by value.

### 4. Dedup

**MUST** extract repeated non-trivial logic (~3+ meaningful lines) into a named helper.

### 5. Wide APIs

**SHOULD** use options objects for four+ parameters or evolving parameter groups.

### 6. Dead code

**MUST** remove unused code, imports, and large commented blocks you touch or that obscure.

**MUST NOT** keep old implementations only in comments.

### 7. Scope and consistency

**MUST** touch only what the task needs.

**MUST** match local naming, patterns, and abstraction level.

### 8. Names and comments

**SHOULD** name for purpose. **SHOULD** document non-obvious invariants — not what already reads plainly.

---

## Principles

Readable over clever. Explicit over hidden side effects. Small, testable units.

---

## Compliance checklist (before finish)

- [ ] Split where needed
- [ ] Guards + flat flow
- [ ] Meaningful literals named
- [ ] Duplication fixed or justified
- [ ] Fat signatures grouped
- [ ] No dead or comment-only cruft
- [ ] Minimal diff, consistent style
