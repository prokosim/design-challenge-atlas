---
title: How to use
description: The questions the Atlas can answer, and where to find the answers.
---

## On the website

| Question | Where |
| --- | --- |
| **A.** *I have this design challenge — what should I measure?* | Open the challenge (via the [[Finder]]). Its **Measurement path** table lists metrics → methods → tools → coverage. |
| **B.** *I need to measure X — which methods exist?* | Open the metric. **How to measure it** lists methods; **Tools that can measure it** lists tools. Or use Step 2 of the [[Finder]]. |
| **C.** *Which software exists for this method?* | Open the method → **Tools for this method**, or the [[Tool directory]]. |
| **D.** *Which design metrics have no good digital tool today?* | [[Metric coverage]] and the [[Gap register]]. |
| **E.** *Which tools and metrics relate to standard X?* | Open the standard → **Metrics defined or required here**; see also the [[Standards register]]. |

Also useful: full-text **search** (top left), the **graph** (right) and **tag pages** for filtering by type, domain, status and evidence level (click any tag on a page).

## In Obsidian (for authors)

1. Clone the repository and open the `content/` folder as an Obsidian vault.
2. Create new notes from the templates (*Templates: Insert template*) — one per entity type.
3. Fill in the **Properties** panel; links go in properties as `"[[Note name]]"`.
4. The generated [[Overviews]] pages work in Obsidian too. Run `npm run overviews` to refresh them locally (they are refreshed automatically on every push).

Optional: the Dataview community plugin can query the same properties, but nothing in the Atlas depends on it.
