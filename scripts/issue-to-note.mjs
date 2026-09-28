#!/usr/bin/env node
// Turns an accepted GitHub issue (created with one of the issue forms) into an Atlas note.
// Used by .github/workflows/issue-to-pr.yml, but can be run locally for testing:
//
//   ISSUE_BODY="$(cat body.md)" ISSUE_LABELS='["contribution","type:tool"]' \
//   ISSUE_NUMBER=12 ISSUE_AUTHOR=octocat node scripts/issue-to-note.mjs
//
// How it works
//  - The entity type comes from the issue label "type:<type>".
//  - The matching form in .github/ISSUE_TEMPLATE/ maps each form label back to its field id.
//  - Field ids equal note property names (e.g. "unit", "measures").
//  - Fields whose id starts with "s_" become body sections, headed by the form label.
//  - Relation fields (one page name per line) become [[links]] if the page exists;
//    unknown names are listed in a "To link" section for the maintainer.
//  - The note is created with status: proposed, origin: community, and the next free id.
//
// Prints the created file path (relative to the repo root) on stdout.

import fs from "node:fs"
import path from "node:path"
import yaml from "js-yaml"
import { ROOT, CONTENT, loadAtlas, relationsFor } from "./lib/atlas.mjs"

const body = process.env.ISSUE_BODY ?? ""
const labels = JSON.parse(process.env.ISSUE_LABELS ?? "[]")
const issueNo = process.env.ISSUE_NUMBER ?? "?"
const author = process.env.ISSUE_AUTHOR ?? "unknown"

const typeLabel = labels.find((l) => l.startsWith("type:"))
if (!typeLabel) fail(`Issue has no "type:<entity>" label — cannot tell which kind of note to create.`)
const type = typeLabel.slice(5)

const atlas = loadAtlas()
const { ontology } = atlas
const t = ontology.types[type]
if (!t) fail(`Unknown entity type "${type}".`)

// Find the form that produces this type
const formDir = path.join(ROOT, ".github", "ISSUE_TEMPLATE")
const form = fs
  .readdirSync(formDir)
  .filter((f) => f.endsWith(".yml") && f !== "config.yml")
  .map((f) => yaml.load(fs.readFileSync(path.join(formDir, f), "utf8")))
  .find((f) => (f.labels ?? []).includes(typeLabel))
if (!form) fail(`No issue form carries the label "${typeLabel}".`)

// Parse "### Label\n\nvalue" blocks
const values = {}
const labelToField = new Map(
  form.body.filter((b) => b.id && b.attributes?.label).map((b) => [b.attributes.label.trim(), b]),
)
for (const block of body.split(/^### /m).slice(1)) {
  const nl = block.indexOf("\n")
  const label = block.slice(0, nl).trim()
  let value = block.slice(nl + 1).trim()
  if (value === "_No response_" || value === "None") value = ""
  const field = labelToField.get(label)
  if (field) values[field.id] = { value, field }
}

const title = (values.name?.value ?? "").replace(/[\\/:*?"<>|#^[\]]/g, "-").trim()
if (!title) fail("The form has no title.")
if (atlas.byName.has(title.toLowerCase())) fail(`A page called "${title}" already exists.`)

// Next free id
let max = 0
for (const id of atlas.byId.keys()) {
  const m = id.match(new RegExp(`^${t.id_prefix}-(\\d+)$`))
  if (m) max = Math.max(max, Number(m[1]))
}
const id = `${t.id_prefix}-${String(max + 1).padStart(3, "0")}`

const allFields = { ...ontology.common.fields, ...(t.fields ?? {}) }
const rels = relationsFor(ontology, type)
const fm = { type, id, title }
const sections = []
const toLink = []

const firstToken = (v) => v.split(" — ")[0].trim()
for (const [key, { value, field }] of Object.entries(values)) {
  if (!value || key === "name") continue
  if (key.startsWith("s_")) {
    sections.push(`## ${field.attributes.label}\n\n${value}`)
  } else if (key in rels) {
    const names = value.split(/\r?\n|,/).map((s) => s.replace(/^[-*]\s*/, "").replace(/^\[\[|\]\]$/g, "").trim()).filter(Boolean)
    const ok = []
    for (const n of names) {
      const target = atlas.byName.get(n.toLowerCase())
      if (target && target.type === rels[key].target) ok.push(`[[${target.name}]]`)
      else toLink.push(`- **${rels[key].label}:** ${n}`)
    }
    if (ok.length) fm[key] = ok
  } else if (key in allFields) {
    const def = allFields[key]
    if (def.boolean) fm[key] = /^(yes|true)/i.test(value)
    else if (def.list) fm[key] = value.split(/\r?\n|,/).map((s) => firstToken(s.replace(/^[-*]\s*/, ""))).filter(Boolean)
    else fm[key] = firstToken(value)
  }
}

fm.status = "proposed"
fm.origin = "community"
fm.evidence_level ??= "C"
fm.last_verified = new Date().toISOString().slice(0, 10)
fm.verified_by = ""

let text = `---\n${yaml.dump(fm, { lineWidth: -1, quotingType: '"' })}---\n\n`
text += `> [!info] Community contribution\n> Proposed by @${author} in issue #${issueNo}.\n\n`
text += sections.join("\n\n") + "\n"
if (toLink.length) {
  text += `\n## To link (not yet in the Atlas)\n\nThe contributor mentioned these, but no matching page exists yet. A maintainer should create or match them:\n\n${toLink.join("\n")}\n`
}

const rel = path.join("content", t.folder, `${title}.md`)
fs.mkdirSync(path.join(CONTENT, t.folder), { recursive: true })
fs.writeFileSync(path.join(ROOT, rel), text)
console.log(rel)

function fail(msg) {
  console.error(`issue-to-note: ${msg}`)
  process.exit(1)
}
