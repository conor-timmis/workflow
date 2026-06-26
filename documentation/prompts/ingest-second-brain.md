# Prompt: Ingest second brain

Run after dropping files in `second-brain/raw/inbox/` or changing `documentation/`.

---

```
Ingest the second brain per second-brain/AGENT.md.

## Mode

[Pick one: "ingest all" | "ingest this: path/to/file.md" | "sync project docs" then "ingest all"]

## Instructions

1. Read second-brain/AGENT.md for full rules
2. Distill sources into second-brain/wiki/ — no raw dumps
3. Add wikilinks between related pages
4. Update second-brain/wiki/Home.md if new top-level pages were created
5. Mark sources with ingested frontmatter
6. Run update status on second-brain/wiki/Current Status.md if README checklist changed

## Report

- Files processed
- Wiki pages created or updated
- Anything blocked or needing human input
```

---

## After documentation changes

```
sync project docs
```

Then paste the prompt above with **ingest all**.
