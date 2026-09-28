---
title: Trust levels
description: How the Atlas separates tested core knowledge from proposals and claims.
---

In a public knowledge base, *"someone says tool X measures Y"* is not the same as *"it is true"*. Every note therefore carries four trust properties, shown as a badge at the top of each page.

## Review status — `status`

| Status | Meaning | Badge |
| --- | --- | --- |
| `proposed` | Submitted (by the core team or the community), not yet checked by a maintainer. | 📝 yellow |
| `reviewed` | A maintainer checked structure, links and plausibility. | ☑️ blue |
| `verified` | Checked against the cited sources by a named person (`verified_by`). Fit to rely on. | ✅ green |
| `deprecated` | Kept for history (e.g. a discontinued tool), do not rely on it. | ⛔ red |

**Core knowledge = `reviewed` or `verified`.** On the website every page carries tags such as `status/proposed`, `evidence/A` or `domain/safety` — click one to list all pages with that tag. The [tag index](../tags) shows them all.

## Evidence level — `evidence_level`

| Level | Meaning |
| --- | --- |
| **A** | Primary source: standard catalogue, peer-reviewed paper, official vendor specification |
| **B** | Credible secondary source: review, textbook, expert practice guide |
| **C** | Partially sourced: expert knowledge or a contribution without full references |
| **D** | Hypothesis or unverified claim — explicitly flagged as needing sources |

Status and evidence are independent: a *proposed* note can cite A-level sources; a *verified* note may honestly say that only C-level evidence exists.

## Origin — `origin`

`core` (written by the Atlas team) or `community` (came in through a GitHub contribution). Community contributions always start as `proposed`.

## Time — `last_verified`

Software changes, standards get revised. Every note records when it was last checked. Notes older than 12 months appear as *stale* in the [[Verification queue]].

Standards additionally track their own versions: `standard_status` (current, under revision, withdrawn, superseded) and `supersedes`. See [[ISO 11228-3]] and its withdrawn predecessor [[ISO 11228-3 2007 edition]] for an example.

## Promoting a note

1. Check the note against its sources.
2. Change `status: proposed` → `reviewed` or `verified`, set `last_verified` to today and `verified_by` to your name.
3. Commit — the badge on the website updates on the next build.
