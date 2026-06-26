# Second brain — setup in 5 minutes

An **Obsidian vault** (or plain markdown tree) for compounding project knowledge so agents and humans never start from a blank chat.

Based on the pattern used in **toyfront** (team-buddies).

## Open as Obsidian vault

1. Install [Obsidian](https://obsidian.md/)
2. **Open folder as vault** → select this `second-brain/` directory
3. Enable **Settings → Files & Links → Detect all file extensions**
4. Optional: install **Dataview** plugin for status dashboards

You can also use this folder without Obsidian — it's plain markdown with wikilinks.

## Directory layout

```
second-brain/
├── README.md          ← you are here
├── AGENT.md           ← ingest / ask / sync commands for AI
├── raw/               ← unprocessed sources (inbox)
│   ├── inbox/         ← drop notes, transcripts, articles
│   └── project/       ← synced copies from documentation/ (via agent)
└── wiki/              ← distilled, interlinked knowledge
    └── Home.md        ← start here
```

## Workflow

```
raw/inbox/  ──ingest──►  wiki/  ──search──►  answers & development
     ▲                        │
     └── sync project docs ───┘
```

### For humans

1. Drop anything useful in `raw/inbox/` (meeting notes, links, playtest feedback)
2. Ask your agent: **ingest all**
3. Browse `wiki/Home.md` for the map of content

### For agents

Read `AGENT.md` in this folder. Always search `wiki/` before assuming project state.

## Wikilink convention

Use Obsidian-style links: `[[Page Name]]` or `[[Page Name|display text]]`.

Cross-link related pages. Prefer updating an existing wiki page over creating duplicates.

## Keeping docs aligned

| Canonical (source of truth) | Navigable (understanding) |
|-----------------------------|---------------------------|
| `documentation/` | `second-brain/wiki/` |
| Root `README.md` checklist | `wiki/Current Status.md` |

When `documentation/` changes, run **sync project docs** then **ingest all**.

## Bootstrapping a new project

The `wiki/` folder ships with starter pages. After init:

1. Edit `wiki/Home.md` with your project map
2. Edit `wiki/Current Status.md` with your MVP checklist
3. Add project-specific wiki pages as you learn
