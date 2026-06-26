# Second brain — agent instructions

How AI agents curate and query the knowledge vault at `second-brain/`.

---

## Paths

| Path | Purpose |
|------|---------|
| `second-brain/wiki/` | Distilled, interlinked project knowledge — **search here first** |
| `second-brain/raw/inbox/` | Unprocessed sources (notes, articles, transcripts) |
| `second-brain/raw/project/` | Synced copies from `documentation/` and root `README.md` |
| `second-brain/wiki/Home.md` | Map of content — start here |

---

## Before developing

1. Read `second-brain/wiki/Home.md`
2. Read `second-brain/wiki/Current Status.md` if it exists
3. Search `second-brain/wiki/` for pages related to the task
4. Read canonical specs in `documentation/` when implementing

Do not assume scope from chat history alone.

---

## Commands

### ingest this

When the user points at a file in `second-brain/raw/`:

1. Read the source file fully
2. Identify topics and which wiki pages they belong to
3. Update or create wiki pages in `second-brain/wiki/` with distilled content
4. Add wikilinks between related pages
5. Add frontmatter to the source file:

```yaml
---
ingested: true
ingested_at: YYYY-MM-DD
wiki_pages: ["Page One", "Page Two"]
---
```

6. Do **not** copy raw text wholesale into wiki — distill and link

### ingest all

Process every file under `second-brain/raw/` where `ingested: true` is not set. Run **ingest this** logic for each.

Report: files processed, wiki pages created/updated, anything blocked.

### sync project docs

1. Copy `documentation/**/*.md` into `second-brain/raw/project/documentation/` (mirror structure)
2. Copy root `README.md` to `second-brain/raw/project/README.md`
3. Reset or add frontmatter `ingested: false` on synced files
4. Run **ingest all**

Use after changing canonical docs so the wiki stays aligned.

### update status

Refresh `second-brain/wiki/Current Status.md`:

1. Read root `README.md` for checklists and milestones
2. Read recent git log (if available) for what changed
3. Update status sections: done, in progress, blocked, next up
4. Link to relevant wiki pages with wikilinks

---

## Answering questions

When asked about the project:

1. Search `second-brain/wiki/` by keyword and wikilinks
2. Follow links to related pages
3. Cite wiki page names in your answer
4. If wiki is stale vs `documentation/`, say so and offer **sync project docs**

---

## Rules

- **Canonical specs** live in `documentation/` — don't move authority to wiki alone
- **Wiki** is for navigable understanding, cross-links, and status
- **Distill** on ingest — one idea per section, link don't duplicate
- **New sources** go in `raw/inbox/` first, never directly into wiki as unprocessed dumps
- When creating wiki pages, use Title Case filenames: `Monorepo Architecture.md`

---

## Example ingest output

After ingesting a playtest note from `raw/inbox/playtest-2025-06-26.md`:

- Updated `[[Current Status]]` with playtest blockers
- Updated `[[Known Issues]]` with new items
- Created `[[Playtest 2025-06-26]]` summary page
- Marked source `ingested: true`
