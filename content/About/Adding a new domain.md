---
title: Adding a new domain
description: How to bring content from another project or field into the Atlas.
---

The pilot covers human factors, usability and physical ergonomics. New domains — for example **logistics** from the *Rethinking.Logistics* project — are added the same way.

## 1. Check the domain exists

Allowed domains are listed in `schema/ontology.yml` under `common.fields.domain`. `logistics`, `manufacturing` and `sustainability` are already there. Add a new one there if needed.

## 2. Map your material onto the entity types

Go through the existing material and sort each piece of knowledge:

| Your material contains… | Becomes a… |
| --- | --- |
| a problem, pain point, requirement or "how might we" | **Design challenge** (with design questions) |
| a KPI, measure, indicator or threshold | **Metric** |
| a norm, regulation, guideline | **Standard** (paraphrased) |
| an evaluation or measurement approach | **Method** |
| a software, device or platform | **Digital tool** |
| a "we could not measure / had to do it by hand" finding | **Tool gap** |
| a paper, report, dataset | **Source** |
| a project story from problem to decision | **Case study** |

## 3. Reuse before you create

Search the Atlas first. Many metrics (task time, error rate, grip force, RULA) and methods apply across domains — link to the existing note and add your domain to its `domain` list instead of duplicating it.

## 4. Create notes from the templates

In Obsidian, use the templates in `Templates/`. Give each note the next free id (the validator tells you: `npm run validate`). Set `domain: [logistics]`, `origin: core`, `status: proposed`.

## 5. Write the chain, then the gaps

Start with 2–3 challenges and follow each through metrics → methods → tools. Wherever the chain breaks, write a **Tool gap** — that is where a domain adds the most value.

## 6. Check and publish

`npm run validate` → fix errors → `npm run preview` to see the site locally → commit.
