# Design Challenge Atlas

**An open map from design challenges to metrics, standards, methods and digital tools — and the gaps where no good tool exists.**

The Atlas answers not only *"What software exists?"* but *"What do designers need to measure — and have no good digital tool for?"*

```
Design challenge → Metric → Standard / Method → Digital tool → Tool gap
```

- **Authoring:** Obsidian — the `content/` folder is the vault.
- **Source of truth:** this GitHub repository (Markdown + one ontology file).
- **Website:** Quartz static site on GitHub Pages, rebuilt on every push.
- **Community:** GitHub issue forms → maintainer review → auto-generated pull request → checks → website.

Version 0.1 is an MVP: the pilot domain is human factors / usability / physical ergonomics.

---

## Repository layout

```
content/                 ← Obsidian vault = website content
  index.md               home page
  About/                 ontology, trust levels, how to use / contribute, roadmap
  Challenges/ Metrics/ Standards/ Methods/ Tools/ Gaps/ Sources/ Case studies/
  Overviews/             GENERATED tables (finder, coverage, gap register …) — do not edit
  Templates/             one template per entity type (not published)
schema/ontology.yml      ← entity types, properties, allowed values, relations (single source of truth)
scripts/
  validate.mjs           checks every note against the ontology
  generate-overviews.mjs builds content/Overviews/ from note properties
  build-site.mjs         prepares a copy of content/ and builds the site with Quartz
  issue-to-note.mjs      turns an accepted GitHub issue form into a note
site/                    Quartz configuration, layout and styles
.github/                 issue forms, PR template, workflows (validate, deploy, issue → PR)
atlas.config.json        site title, repository URL, base URL, pinned Quartz version
```

Quartz itself is **not** committed: `build-site.mjs` fetches the pinned version into `.quartz/` on first use.

## Working locally

Requirements: Node.js 22+, Git.

```bash
npm install
npm run validate     # check all notes
npm run overviews    # refresh content/Overviews/
npm run preview      # build the site and serve it at http://localhost:8080
npm run build        # build the site into public/
```

Open `content/` as a vault in Obsidian to author notes (use *Templates: Insert template*).

## How the website differs from the vault

`build-site.mjs` never changes your notes. It works on a copy in `.build/content/` where it:

1. adds a **trust badge** (status, evidence level, origin, last verified) and a property table to every note,
2. renders relations from the properties as a **Connections** section, including reverse links,
3. adds a **Measurement path** table to every challenge (challenge → metrics → methods → tools → coverage),
4. adds tags (`type/…`, `status/…`, `evidence/…`, `domain/…`) so Quartz tag pages work as filters,
5. regenerates the Overview pages.

## Publishing on GitHub (one-time setup)

0. If this folder contains `_github/` instead of `.github/`, rename it to **`.github`** (it was delivered under a different name because the delivery tool cannot write dot-github folders).
1. Create a repository (e.g. `design-challenge-atlas`) and push this folder.
2. Edit `atlas.config.json` → `repoUrl` and `baseUrl`, and the two URLs in `.github/ISSUE_TEMPLATE/config.yml`.
3. **Settings → Pages → Source: GitHub Actions.**
4. **Settings → Actions → General → Workflow permissions:** *Read and write* + *Allow GitHub Actions to create and approve pull requests*.
5. Create the labels `contribution`, `accepted`, `correction` and `type:challenge`, `type:metric`, `type:standard`, `type:method`, `type:tool`, `type:gap`, `type:case-study` (forms add them automatically if they exist).
6. Optional: add a secret `ATLAS_BOT_TOKEN` (fine-grained PAT, contents + pull requests write) so auto-generated pull requests also trigger the Validate workflow.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

**To be decided.** Planned split: content (`content/`) under an open content licence, code (`scripts/`, `site/`) under an open-source software licence. See `LICENSE.md`.
