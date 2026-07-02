# Architecture

> Customize after init. Canonical system design lives here; `second-brain/wiki/Architecture Overview.md` is the navigable summary.

## Overview

_One paragraph: what the system does and who uses it._

## System context

```text
[External actors] → [Your system] → [External dependencies]
```

## Components

| Component | Path / service | Responsibility |
|-----------|----------------|----------------|
| _e.g. API_ | _src/api/_ | _HTTP endpoints, auth_ |
| _e.g. client_ | _apps/web/_ | _UI_ |

## Data flow

_Describe the main request or job path through the system._

## Key boundaries

| Layer | Owns | Does not own |
|-------|------|--------------|
| _e.g. client_ | _presentation, local state_ | _business rules_ |
| _e.g. server_ | _domain logic, persistence_ | _UI layout_ |

## Deployment

_Where it runs (local, cloud, containers) and how environments differ._

## Related

- [[Architecture Overview]] — wiki summary (run **sync project docs** → **ingest all** after editing this file)
- `documentation/adr/` — architecture decision records
- `AGENT.md` — project layout table
