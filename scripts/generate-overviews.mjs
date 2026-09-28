#!/usr/bin/env node
// Generates the pages in content/Overviews/ from note properties.
// These pages are the "queryable" face of the Atlas — they work both in
// Obsidian and on the Quartz website, without any plugin.
//
// Usage:
//   node scripts/generate-overviews.mjs            write pages
//   node scripts/generate-overviews.mjs --check    exit 1 if pages are out of date
//   node scripts/generate-overviews.mjs --out DIR  write into another folder (used by the site build)

import fs from "node:fs"
import path from "node:path"
import {
  CONTENT, loadAtlas, loadConfig, ofType, wl, incoming, toolsForMetric, toolsForMethod,
  gapsFor, metricCoverage, COVERAGE_LABEL, asList, monthsSince, byTitle,
} from "./lib/atlas.mjs"

const args = process.argv.slice(2)
const check = args.includes("--check")
const outIdx = args.indexOf("--out")
const OUT = outIdx >= 0 ? path.resolve(args[outIdx + 1]) : path.join(CONTENT, "Overviews")

const cfg = loadConfig()
const atlas = loadAtlas()
const { ontology } = atlas
const challenges = ofType(atlas, "challenge")
const metrics = ofType(atlas, "metric")
const methods = ofType(atlas, "method")
const tools = ofType(atlas, "tool")
const standards = ofType(atlas, "standard")
const gaps = ofType(atlas, "gap")

const links = (list) => (list.length ? list.map(wl).join(", ") : "—")
const esc = (s) => String(s ?? "—").replace(/\|/g, "\\|").replace(/\n/g, " ")
const table = (head, rows) =>
  [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.join(" | ")} |`),
  ].join("\n")
const STATUS_ICON = { verified: "✅ verified", reviewed: "☑️ reviewed", proposed: "📝 proposed", deprecated: "⛔ deprecated" }
const status = (n) => STATUS_ICON[n.data.status] ?? n.data.status

function page(title, description, body) {
  return `---
title: ${title}
description: ${JSON.stringify(description)}
generated: true
---

> [!abstract] Generated page
> ${description}
> This page is rebuilt automatically from note properties — do not edit it by hand. Change the underlying notes instead.

${body.trim()}
`
}

const pages = {}

// ── 1. Finder ────────────────────────────────────────────────────────────────
{
  const domainEnum = ontology.common.fields.domain.enum
  const quantityEnum = ontology.types.metric.fields.quantity.enum
  let body = `## Step 1 — What are you trying to evaluate?\n\nPick the area your design problem belongs to, then the challenge that fits best.\n\n`
  for (const dom of domainEnum) {
    const cs = challenges.filter((c) => asList(c.data.domain).includes(dom))
    if (!cs.length) continue
    body += `### ${dom.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase())}\n\n`
    for (const c of cs) {
      const ms = c.links.metrics ?? []
      body += `- ${wl(c)} → measure: ${links(ms)}\n`
    }
    body += "\n"
  }
  const emptyDomains = domainEnum.filter((d) => !challenges.some((c) => asList(c.data.domain).includes(d)))
  if (emptyDomains.length) body += `*No challenges yet in:* ${emptyDomains.join(", ")}. [[How to contribute|Add one →]]\n\n`

  body += `## Step 2 — What do you want to measure?\n\nIf you already know the kind of quantity, start here. Each metric page lists methods, tools and known gaps.\n\n`
  const rows = []
  for (const q of quantityEnum) {
    const ms = metrics.filter((m) => m.data.quantity === q)
    if (!ms.length) continue
    for (const m of ms) {
      const cov = metricCoverage(m)
      rows.push([q.replace(/-/g, " "), wl(m), links(m.links.methods ?? []), links(cov.tools), COVERAGE_LABEL[cov.level]])
    }
  }
  body += table(["Quantity", "Metric", "How to measure", "Tools", "Tool coverage"], rows)
  body += `\n\n## Step 3 — No adequate tool?\n\nIf the path ends in 🔴 or 🟠, check the [[Gap register]]. If your case is not there, [report a tool gap](${cfg.repoUrl}/issues/new?template=report-gap.yml) — gaps are one of the most valuable things you can contribute.\n`
  pages["Finder"] = page("Finder", "A guided path: design challenge → what to measure → how → with which tool → where no tool exists.", body)
}

// ── 2. Challenge → tool map ──────────────────────────────────────────────────
{
  let body = `Each challenge is followed along its full measurement path. Tools listed are those that can measure the metric.\n\n`
  for (const c of challenges) {
    body += `## ${wl(c)}\n\n`
    const ms = c.links.metrics ?? []
    if (!ms.length) {
      body += `*No metrics linked yet — this challenge cannot be measured with the current Atlas content.*\n\n`
      continue
    }
    body += table(
      ["Metric", "How to measure", "Tools", "Coverage", "Tool gaps"],
      ms.map((m) => {
        const cov = metricCoverage(m)
        return [wl(m), links(m.links.methods ?? []), links(cov.tools), COVERAGE_LABEL[cov.level], links(cov.gaps)]
      }),
    )
    const cgaps = gapsFor(c)
    if (cgaps.length) body += `\n\nGaps recorded for this challenge: ${links(cgaps)}`
    body += "\n\n"
  }
  pages["Challenge to tool map"] = page("Challenge to tool map", "Every design challenge followed through metrics, methods and tools to its coverage status.", body)
}

// ── 3. Metric coverage ───────────────────────────────────────────────────────
{
  const rows = metrics.map((m) => {
    const cov = metricCoverage(m)
    return [wl(m), esc(m.data.quantity), esc(m.data.unit), links(m.links.methods ?? []), String(cov.tools.length), COVERAGE_LABEL[cov.level], esc(cov.confidence), links(cov.gaps)]
  })
  const n = (lvl) => metrics.filter((m) => metricCoverage(m).level === lvl).length
  const body = `**${metrics.length} metrics** — ${COVERAGE_LABEL.covered}: ${n("covered")} · ${COVERAGE_LABEL.gap}: ${n("gap")} · ${COVERAGE_LABEL.none}: ${n("none")}

- 🟢 **covered** — at least one tool in the Atlas can measure it, no gap recorded
- 🟠 **known gap** — tools exist, but a [[Gap register|Tool Gap]] explains why they are not good enough
- 🔴 **no tool** — nothing in the Atlas measures it yet (either a real gap or missing content)
- **Tool confidence** — the best review status among those tools

${table(["Metric", "Quantity", "Unit", "How to measure", "# tools", "Coverage", "Tool confidence", "Gaps"], rows)}
`
  pages["Metric coverage"] = page("Metric coverage", "Which metrics can be measured with a digital tool today, and how well.", body)
}

// ── 4. Gap register ──────────────────────────────────────────────────────────
{
  const curated = table(
    ["Gap", "Impact", "Type", "Metrics affected", "Challenges affected"],
    gaps.map((g) => [
      wl(g), esc(g.data.impact), esc(asList(g.data.gap_type).join(", ").replace(/_/g, " ")),
      links(g.links.metrics ?? []), links(g.links.challenges ?? []),
    ]),
  )
  const noToolMetrics = metrics.filter((m) => metricCoverage(m).level === "none")
  const noToolMethods = methods.filter((m) => toolsForMethod(m).length === 0)
  const noMetricChallenges = challenges.filter((c) => !(c.links.metrics ?? []).length)
  const cand = (list, why) => (list.length ? list.map((n) => `- ${wl(n)} — ${why(n)}`).join("\n") : "- *none*")

  const body = `## Recorded tool gaps

Curated notes describing what designers need to measure but cannot do well with current digital tools.

${curated}

## Gap candidates (computed)

These come straight from the structure of the Atlas. Each is either a **real gap** worth writing up, or simply **missing content** — both are good contributions.

### Metrics that no tool measures
${cand(noToolMetrics, (m) => `methods: ${links(m.links.methods ?? [])}`)}

### Methods without a supporting tool
${cand(noToolMethods, (m) => `produces: ${links(incoming(m, "metric"))}`)}

### Challenges without any metric
${cand(noMetricChallenges, () => "cannot be measured yet")}

---
Know a gap that is not listed? [Report a tool gap](${cfg.repoUrl}/issues/new?template=report-gap.yml).
`
  pages["Gap register"] = page("Gap register", "Recorded tool gaps plus gap candidates computed from the Atlas structure.", body)
}

// ── 5. Tool directory ────────────────────────────────────────────────────────
{
  const rows = tools.map((t) => [
    wl(t), esc(t.data.vendor), esc(asList(t.data.tool_type).join(", ")), links(t.links.supports_methods ?? []),
    String((t.links.measures ?? []).length), esc(t.data.cost_level), esc(t.data.automation_level),
    esc(asList(t.data.setting).join(", ")), status(t),
  ])
  const byMethod = methods
    .map((m) => `- ${wl(m)}: ${links(toolsForMethod(m))}`)
    .join("\n")
  const body = `## All tools

${table(["Tool", "Vendor", "Type", "Methods", "# metrics", "Cost", "Automation", "Setting", "Status"], rows)}

## Tools by method

${byMethod}
`
  pages["Tool directory"] = page("Tool directory", "All digital tools in the Atlas, and which methods they support.", body)
}

// ── 6. Standards register ────────────────────────────────────────────────────
{
  const ICON = { current: "🟢 current", "under-revision": "🟡 under revision", withdrawn: "🔴 withdrawn", superseded: "⚪ superseded" }
  const rows = standards.map((s) => [
    wl(s), esc(s.data.code), esc(s.data.publisher), esc(s.data.standard_kind),
    esc(asList(s.data.provides).join(", ")), ICON[s.data.standard_status] ?? esc(s.data.standard_status),
    links(incoming(s, "metric")),
  ])
  const body = `Standards are **referenced and paraphrased, never copied**. Always check the official catalogue for the current edition.

${table(["Standard", "Code", "Publisher", "Kind", "Provides", "Status", "Metrics"], rows)}
`
  pages["Standards register"] = page("Standards register", "Standards, regulations and guidelines referenced by the Atlas, with their current status.", body)
}

// ── 7. Verification queue ────────────────────────────────────────────────────
{
  const entities = atlas.notes.filter((n) => ontology.types[n.type]).sort(byTitle)
  const maxAge = cfg.verificationMaxAgeMonths ?? 12
  const group = (st) => entities.filter((n) => n.data.status === st)
  const rows = (list) =>
    table(
      ["Note", "Type", "Evidence", "Origin", "Last verified", "Verified by"],
      list.map((n) => [wl(n), n.type, esc(n.data.evidence_level), esc(n.data.origin), esc(n.data.last_verified), esc(n.data.verified_by || "—")]),
    )
  const stale = entities.filter((n) => monthsSince(n.data.last_verified) > maxAge)
  const counts = ["verified", "reviewed", "proposed", "deprecated"].map((s) => `${STATUS_ICON[s]}: ${group(s).length}`).join(" · ")
  const body = `${counts}

See [[Trust levels]] for what each status and evidence level means.

## 📝 Proposed — waiting for review
${group("proposed").length ? rows(group("proposed")) : "*Nothing waiting.*"}

## ☑️ Reviewed — waiting for verification against sources
${group("reviewed").length ? rows(group("reviewed")) : "*Nothing waiting.*"}

## ⏰ Stale — not verified in the last ${maxAge} months
${stale.length ? stale.map((n) => `- ${wl(n)} (${n.data.last_verified ?? "never"})`).join("\n") : "*Nothing stale.*"}
`
  pages["Verification queue"] = page("Verification queue", "What needs reviewing or re-verifying — the maintainers' to-do list.", body)
}

// ── Index of overviews ───────────────────────────────────────────────────────
{
  const count = (t) => ofType(atlas, t).length
  const body = `**Atlas at a glance:** ${count("challenge")} challenges · ${count("metric")} metrics · ${count("standard")} standards · ${count("method")} methods · ${count("tool")} tools · ${count("gap")} tool gaps · ${count("source")} sources · ${count("case-study")} case studies

| Page | Answers the question |
| --- | --- |
| [[Finder]] | *I have a design problem — what should I measure, how, and with what?* |
| [[Challenge to tool map]] | *For each challenge, is there a complete path to a tool?* |
| [[Metric coverage]] | *Which metrics can be measured with a digital tool today?* |
| [[Gap register]] | *What do designers need to measure but have no good tool for?* |
| [[Tool directory]] | *Which tools exist, and which methods do they support?* |
| [[Standards register]] | *Which standards are referenced, and are they still current?* |
| [[Verification queue]] | *What still needs to be checked by a maintainer?* |
`
  pages["index"] = page("Overviews", "Views computed from the properties of every note in the Atlas.", body)
}

// ── Write / check ────────────────────────────────────────────────────────────
fs.mkdirSync(OUT, { recursive: true })
let stale = []
for (const [name, text] of Object.entries(pages)) {
  const file = path.join(OUT, `${name}.md`)
  const old = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null
  if (old !== text) stale.push(name)
  if (!check) fs.writeFileSync(file, text)
}
if (check) {
  if (stale.length) {
    console.log(`❌ Overview pages out of date: ${stale.join(", ")}. Run: npm run overviews`)
    process.exit(1)
  }
  console.log("✅ Overview pages up to date")
} else {
  console.log(`Wrote ${Object.keys(pages).length} overview pages to ${path.relative(process.cwd(), OUT) || "."}`)
}
