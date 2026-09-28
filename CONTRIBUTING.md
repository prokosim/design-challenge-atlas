# Contributing to the Design Challenge Atlas

Thank you for helping map what designers need to measure — and what they cannot yet.

## Two ways to contribute

### 1. Issue forms (no Git needed)

Go to **Issues → New issue** and choose a form:

- 🕳️ **Report a tool gap** — the most valuable contribution
- 🛠️ Add a digital tool · 📏 Add a metric · 🔬 Add a method · ➕ Add a design challenge · 📘 Add a standard · 📚 Add a case study
- ✏️ Correct existing information

A maintainer reviews the issue. When it is labelled **`accepted`**, a GitHub Action creates the note and opens a pull request that closes your issue.

### 2. Pull requests (Git + Obsidian)

1. Fork, clone, `npm install`.
2. Open `content/` as an Obsidian vault; create notes from `content/Templates/`.
3. `npm run validate` — fix any errors (it tells you the next free id).
4. Open a pull request and complete the checklist.

## Rules

1. **Never copy text from standards** (or any copyrighted source). Paraphrase the scope in your own words and link the official catalogue page.
2. **Back claims with sources.** What a tool measures, thresholds, limitations — add a `Source` note or a link. If you can't, set `evidence_level: C` or `D`; honesty beats confidence.
3. **Neutral, not promotional.** Tools get limitations sections; vendors are welcome to contribute but not to market.
4. **One entity per note, file name = `title`.** Links go in properties as `"[[Page name]]"`.
5. **New notes start as `status: proposed`.** Only maintainers set `reviewed` / `verified`.
6. **Reuse before you create.** Link to existing metrics and methods; add your domain to their `domain` list instead of duplicating.

## Trust levels (summary)

| Property | Values |
| --- | --- |
| `status` | `proposed` → `reviewed` (maintainer checked) → `verified` (checked against sources, `verified_by` set) · `deprecated` |
| `evidence_level` | **A** primary source · **B** credible secondary · **C** partially sourced · **D** hypothesis |
| `origin` | `core` or `community` |
| `last_verified` | date of the last check; notes older than 12 months are flagged as stale |

Full explanation: `content/About/Trust levels.md`.

## For maintainers

- Review issues; add `accepted` to generate a pull request, or ask for changes in the issue.
- In the generated PR, match or create everything listed under **"To link"**, then merge.
- To promote a note: check its sources, set `status`, `last_verified`, `verified_by`.
- The **Verification queue** overview page lists what is waiting.

## Changing the ontology

Entity types, allowed values and relations are defined in `schema/ontology.yml`. Discuss changes in an issue first — they affect templates, issue forms and existing notes.
