#!/usr/bin/env node
// Builds the public website with Quartz.
//
//  1. Validates the content (stops on errors).
//  2. Copies content/ into .build/content and, in that copy only:
//       - regenerates the Overview pages,
//       - adds a trust badge + key properties at the top of every note,
//       - adds a "Connections" section (forward and reverse links from properties),
//       - adds a "Measurement path" to every challenge,
//       - adds tags (type/…, status/…, evidence/…, domain/…) so Quartz tag pages act as filters.
//     Your Obsidian vault is never modified.
//  3. Fetches the pinned Quartz version into .quartz/ (first run only) and builds into public/.
//
// Usage: node scripts/build-site.mjs [--serve] [--skip-quartz]

import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"
import yaml from "js-yaml"
import {
  ROOT, CONTENT, loadAtlas, loadConfig, relationsFor, asList, wl, metricCoverage, COVERAGE_LABEL,
} from "./lib/atlas.mjs"

const serve = process.argv.includes("--serve")
const skipQuartz = process.argv.includes("--skip-quartz")
const cfg = loadConfig()
const repoUrl = process.env.ATLAS_REPO_URL || cfg.repoUrl
const baseUrl = process.env.ATLAS_BASE_URL || cfg.baseUrl
const BUILD = path.join(ROOT, ".build", "content")
const QUARTZ = path.join(ROOT, ".quartz")
const run = (cmd, cwd = ROOT) => execSync(cmd, { cwd, stdio: "inherit", env: { ...process.env, ATLAS_REPO_URL: repoUrl, ATLAS_BASE_URL: baseUrl, ATLAS_TITLE: cfg.title } })

// ── 1. Validate ──────────────────────────────────────────────────────────────
run("node scripts/validate.mjs --quiet")

// ── 2. Prepare content copy ──────────────────────────────────────────────────
fs.rmSync(path.join(ROOT, ".build"), { recursive: true, force: true })
fs.cpSync(CONTENT, BUILD, {
  recursive: true,
  filter: (src) => !/[\\/](Templates|\.obsidian|\.trash)([\\/]|$)/.test(path.relative(ROOT, src)),
})
run(`node scripts/generate-overviews.mjs --out "${path.join(BUILD, "Overviews")}"`)

const atlas = loadAtlas()
const { ontology } = atlas

const TRUST = {
  verified: { callout: "success", text: "✅ Verified — checked against the cited sources" },
  reviewed: { callout: "info", text: "☑️ Reviewed — checked by a maintainer, not yet verified against sources" },
  proposed: { callout: "warning", text: "📝 Proposed — not yet reviewed by a maintainer" },
  deprecated: { callout: "failure", text: "⛔ Deprecated — kept for history, do not rely on it" },
}
const EVIDENCE = { A: "A · primary source", B: "B · credible secondary source", C: "C · partially sourced", D: "D · hypothesis / unverified" }
const links = (list) => list.map(wl).join(", ")
const fmt = (v) => {
  if (typeof v === "boolean") return v ? "yes" : "no"
  const list = asList(v)
  return list.map((x) => (typeof x === "string" && /^https?:\/\//.test(x) ? `[${x.replace(/^https?:\/\//, "").replace(/\/$/, "")}](${x})` : String(x))).join(", ")
}

function trustBlock(n) {
  const d = n.data
  const t = TRUST[d.status] ?? TRUST.proposed
  const who = d.origin === "community" ? "Community contribution" : "Core team"
  const verified = d.last_verified ? `Last verified ${d.last_verified}${d.verified_by ? ` by ${d.verified_by}` : ""}.` : "Never verified."
  return `> [!${t.callout}] ${t.text}\n> **${ontology.types[n.type].label}** \`${d.id}\` · Evidence ${EVIDENCE[d.evidence_level] ?? d.evidence_level} · ${who}\n>\n> ${verified} [[Trust levels|What does this mean?]]\n`
}

function propertiesBlock(n) {
  const fields = ontology.types[n.type].fields ?? {}
  const rows = []
  if (asList(n.data.domain).length) rows.push(["Domain", fmt(n.data.domain)])
  for (const [key, def] of Object.entries(fields)) {
    const v = n.data[key]
    if (v === undefined || v === null || v === "" || (Array.isArray(v) && !v.length)) continue
    const label = key.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase())
    rows.push([label, fmt(v).replace(/\|/g, "\\|")])
  }
  if (!rows.length) return ""
  return `| Property | Value |\n| --- | --- |\n${rows.map(([k, v]) => `| ${k} | ${v} |`).join("\n")}\n`
}

function measurementPath(n) {
  const ms = n.links.metrics ?? []
  if (!ms.length) return `## Measurement path\n\n*No metrics linked yet.*\n`
  const rows = ms.map((m) => {
    const cov = metricCoverage(m)
    return `| ${wl(m)} | ${links(m.links.methods ?? []) || "—"} | ${links(cov.tools) || "—"} | ${COVERAGE_LABEL[cov.level]} |`
  })
  return `## Measurement path\n\nFrom this challenge to concrete tools. See the [[Finder]] for other challenges.\n\n| What to measure | How to measure | With which tool | Coverage |\n| --- | --- | --- | --- |\n${rows.join("\n")}\n`
}

function connections(n) {
  const lines = []
  for (const [field, def] of Object.entries(relationsFor(ontology, n.type))) {
    const targets = n.links[field] ?? []
    if (targets.length) lines.push(`- **${def.label}:** ${links(targets)}`)
  }
  for (const inv of Object.values(n.inverse)) {
    const label = inv.label
    lines.push(`- **${label}:** ${links(inv.notes)}`)
  }
  // merge duplicate labels (e.g. "Known tool gaps" reached via several gap fields)
  const merged = new Map()
  for (const l of lines) {
    const m = l.match(/^- \*\*(.+?):\*\* (.*)$/)
    const set = merged.get(m[1]) ?? new Set()
    m[2].split(", ").forEach((x) => set.add(x))
    merged.set(m[1], set)
  }
  if (!merged.size) return ""
  return `## Connections\n\n${[...merged].map(([k, v]) => `- **${k}:** ${[...v].join(", ")}`).join("\n")}\n`
}

function correctionLink(n) {
  const q = new URLSearchParams({ template: "correction.yml", title: `Correction: ${n.name}`, note: `${n.name} (${n.data.id})` })
  return `\n---\n*Something wrong or missing? [Suggest a correction](${repoUrl}/issues/new?${q}) · [How to contribute](${repoUrl}/blob/main/CONTRIBUTING.md)*\n`
}

let count = 0
for (const n of atlas.notes) {
  const target = path.join(BUILD, n.rel)
  if (!fs.existsSync(target)) continue
  let body = n.body.replaceAll("{{repo}}", repoUrl)
  const d = { ...n.data }

  if (ontology.types[n.type]) {
    const tags = new Set(asList(d.tags))
    tags.add(`type/${n.type}`)
    tags.add(`status/${d.status}`)
    tags.add(`evidence/${d.evidence_level}`)
    tags.add(`origin/${d.origin}`)
    for (const dom of asList(d.domain)) tags.add(`domain/${dom}`)
    d.tags = [...tags]
    if (d.last_verified) d.modified = d.last_verified
    // Relations are rendered in the body; drop them from frontmatter so Quartz does not show raw [[links]].
    for (const field of Object.keys(relationsFor(ontology, n.type))) delete d[field]

    const top = `${trustBlock(n)}\n${propertiesBlock(n)}`
    const bottom = [n.type === "challenge" ? measurementPath(n) : "", connections(n), correctionLink(n)].filter(Boolean).join("\n")
    body = `${top}\n${body.trim()}\n\n${bottom}`
    count++
  }
  fs.writeFileSync(target, `---\n${yaml.dump(d, { lineWidth: -1 })}---\n\n${body}`)
}
console.log(`Prepared ${count} entity pages in .build/content`)

if (skipQuartz) process.exit(0)

// ── 3. Quartz ────────────────────────────────────────────────────────────────
const version = cfg.quartzVersion
const marker = path.join(QUARTZ, ".atlas-quartz-version")
if (!fs.existsSync(marker) || fs.readFileSync(marker, "utf8").trim() !== version) {
  console.log(`Fetching Quartz ${version} …`)
  fs.rmSync(QUARTZ, { recursive: true, force: true })
  run(`git clone --depth 1 --branch ${version} https://github.com/jackyzha0/quartz.git .quartz`)
  run("npm ci --no-audit --no-fund", QUARTZ)
  fs.writeFileSync(marker, version)
}
fs.copyFileSync(path.join(ROOT, "site", "quartz.config.ts"), path.join(QUARTZ, "quartz.config.ts"))
fs.copyFileSync(path.join(ROOT, "site", "quartz.layout.ts"), path.join(QUARTZ, "quartz.layout.ts"))
fs.copyFileSync(path.join(ROOT, "site", "custom.scss"), path.join(QUARTZ, "quartz", "styles", "custom.scss"))
if (fs.existsSync(path.join(ROOT, "site", "static"))) {
  fs.cpSync(path.join(ROOT, "site", "static"), path.join(QUARTZ, "quartz", "static"), { recursive: true })
}

run(`npx quartz build -d "${BUILD}" -o "${path.join(ROOT, "public")}"${serve ? " --serve" : ""}`, QUARTZ)
