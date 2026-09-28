#!/usr/bin/env node
// Validates every note against schema/ontology.yml.
//   errors   → CI fails (missing required fields, invalid values, broken links, duplicate ids…)
//   warnings → shown, CI passes (stale verification, A/B evidence without sources…)
//
// Usage: node scripts/validate.mjs [--quiet]

import { loadAtlas, loadConfig, relationsFor, asList, monthsSince } from "./lib/atlas.mjs"

const quiet = process.argv.includes("--quiet")
const cfg = loadConfig()
const atlas = loadAtlas()
const { ontology, notes, byId } = atlas
const errors = []
const warnings = []
const err = (n, msg) => errors.push(`${n.rel}: ${msg}`)
const warn = (n, msg) => warnings.push(`${n.rel}: ${msg}`)

function nextFreeId(prefix) {
  let max = 0
  for (const id of byId.keys()) {
    const m = id.match(new RegExp(`^${prefix}-(\\d+)$`))
    if (m) max = Math.max(max, Number(m[1]))
  }
  return `${prefix}-${String(max + 1).padStart(3, "0")}`
}

function checkField(n, name, def, value) {
  if (value === undefined || value === null || value === "") return
  const values = def.list ? asList(value) : [value]
  if (!def.list && Array.isArray(value)) err(n, `"${name}" must be a single value, not a list`)
  if (def.boolean && typeof value !== "boolean") err(n, `"${name}" must be true or false`)
  if (def.enum) {
    for (const v of values) {
      if (!def.enum.includes(v)) {
        err(n, `"${name}" has invalid value "${v}". Allowed: ${def.enum.join(", ")}`)
      }
    }
  }
}

for (const n of notes) {
  const d = n.data
  const t = ontology.types[d.type]

  // Pages without a type (home page, About pages) are allowed, but only outside entity folders.
  if (!d.type) {
    const inEntityFolder = Object.values(ontology.types).some((tt) =>
      n.rel.startsWith(tt.folder + "/"),
    )
    if (inEntityFolder) err(n, `missing "type" (notes in this folder must be an Atlas entity)`)
    continue
  }
  if (!t) {
    err(n, `unknown type "${d.type}". Allowed: ${Object.keys(ontology.types).join(", ")}`)
    continue
  }

  // Required fields
  for (const f of [...ontology.common.required, ...(t.required ?? [])]) {
    if (d[f] === undefined || d[f] === null || d[f] === "" || (Array.isArray(d[f]) && !d[f].length)) {
      err(n, `missing required field "${f}"${f === "id" ? ` (next free id: ${nextFreeId(t.id_prefix)})` : ""}`)
    }
  }

  // Field values
  for (const [name, def] of Object.entries(ontology.common.fields)) checkField(n, name, def, d[name])
  for (const [name, def] of Object.entries(t.fields ?? {})) checkField(n, name, def, d[name])

  // Id format and uniqueness
  if (d.id) {
    if (!new RegExp(`^${t.id_prefix}-\\d{3,}$`).test(d.id)) {
      err(n, `id "${d.id}" should look like ${t.id_prefix}-001 (next free id: ${nextFreeId(t.id_prefix)})`)
    }
    if ((byId.get(d.id) ?? []).length > 1) err(n, `duplicate id "${d.id}" (next free id: ${nextFreeId(t.id_prefix)})`)
  }

  // Title = file name (keeps wikilinks predictable)
  if (d.title && d.title !== n.name) err(n, `title "${d.title}" must equal the file name "${n.name}"`)

  // Folder
  if (!n.rel.startsWith(t.folder + "/")) warn(n, `a ${d.type} note should live in "${t.folder}/"`)

  // Relations: unresolved links and wrong target types
  const rels = relationsFor(ontology, d.type)
  for (const u of n.unresolved) err(n, `"${u.field}" links to "${u.value}", which does not exist`)
  for (const [field, targets] of Object.entries(n.links)) {
    for (const target of targets) {
      if (target.type !== rels[field].target) {
        err(n, `"${field}" must link to ${rels[field].target} notes, but [[${target.name}]] is a ${target.type ?? "page without type"}`)
      }
    }
  }
  for (const key of Object.keys(d)) {
    if (key in rels) continue
    if (key in ontology.common.fields || key in (t.fields ?? {})) continue
    warn(n, `unknown property "${key}" (not in schema/ontology.yml)`)
  }

  // Trust warnings
  // A/B evidence needs something to back it: sources, a linked standard, or (for tools/standards) an official URL.
  const backed =
    asList(d.sources).length > 0 ||
    (n.links.standards ?? []).length > 0 ||
    (["tool", "standard"].includes(d.type) && d.url) ||
    d.type === "source"
  if (["A", "B"].includes(d.evidence_level) && !backed) {
    warn(n, `evidence level ${d.evidence_level} but no sources, standards or official URL`)
  }
  if (d.status === "verified" && !d.verified_by) warn(n, `status "verified" but no "verified_by"`)
  if (monthsSince(d.last_verified) > (cfg.verificationMaxAgeMonths ?? 12)) {
    warn(n, `last_verified ${d.last_verified ?? "missing"} is older than ${cfg.verificationMaxAgeMonths} months`)
  }
  if (d.type === "metric") {
    for (const s of n.links.standards ?? []) {
      if (["withdrawn", "superseded"].includes(s.data.standard_status)) {
        warn(n, `references ${s.data.standard_status} standard [[${s.name}]]`)
      }
    }
  }
}

// Report
const counts = {}
for (const n of notes) if (n.type) counts[n.type] = (counts[n.type] ?? 0) + 1
if (!quiet) {
  console.log(`Design Challenge Atlas — ${notes.length} pages`)
  console.log("  " + Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(" · "))
}
if (warnings.length && !quiet) {
  console.log(`\n⚠️  ${warnings.length} warning(s)`)
  for (const w of warnings) console.log("  - " + w)
}
if (errors.length) {
  console.log(`\n❌ ${errors.length} error(s)`)
  for (const e of errors) console.log("  - " + e)
  process.exit(1)
}
console.log(`\n✅ No errors`)
