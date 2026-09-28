// Shared loader for the Design Challenge Atlas.
// Reads the ontology, walks the content folder, parses every note and resolves
// wikilink relations (forward + inverse). Used by all other scripts.

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import yaml from "js-yaml"

const here = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(here, "..", "..")
export const CONTENT = path.join(ROOT, "content")
export const SKIP_DIRS = new Set(["Templates", ".obsidian", "Overviews", ".trash"])

export function loadConfig() {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "atlas.config.json"), "utf8"))
}

export function loadOntology() {
  return yaml.load(fs.readFileSync(path.join(ROOT, "schema", "ontology.yml"), "utf8"))
}

/** All relation definitions for a type (common + type specific). */
export function relationsFor(ontology, type) {
  const t = ontology.types[type]
  return { ...(t?.relations ?? {}), ...(ontology.common.relations ?? {}) }
}

/** Normalise YAML values: Dates → YYYY-MM-DD strings. */
function normalise(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (Array.isArray(value)) return value.map(normalise)
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalise(v)]))
  }
  return value
}

/** "[[Error rate|alias]]" → "Error rate" ; plain strings are accepted too. */
export function linkTarget(value) {
  if (typeof value !== "string") return null
  const m = value.match(/^\s*\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]\s*$/)
  return (m ? m[1] : value).trim()
}

export function asList(v) {
  if (v === undefined || v === null || v === "") return []
  return Array.isArray(v) ? v : [v]
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".") continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      walk(full, out)
    } else if (entry.name.endsWith(".md")) {
      out.push(full)
    }
  }
  return out
}

/**
 * Load every note under content/ (except Templates, Overviews, .obsidian).
 * Returns { ontology, notes, byName, byId } where each note has
 * { file, rel, name, data, body, type, links: {rel: [note|string]}, inverse: {label: [note]} }
 */
export function loadAtlas() {
  const ontology = loadOntology()
  const notes = []
  for (const file of walk(CONTENT)) {
    const raw = fs.readFileSync(file, "utf8")
    const parsed = matter(raw)
    const data = normalise(parsed.data ?? {})
    notes.push({
      file,
      rel: path.relative(CONTENT, file).split(path.sep).join("/"),
      name: path.basename(file, ".md"),
      data,
      body: parsed.content,
      type: data.type,
      links: {},
      unresolved: [],
      inverse: {},
    })
  }

  // Index by file name and aliases (case-insensitive, like Obsidian)
  const byName = new Map()
  const byId = new Map()
  for (const n of notes) {
    byName.set(n.name.toLowerCase(), n)
    for (const a of asList(n.data.aliases)) byName.set(String(a).toLowerCase(), n)
    if (n.data.id) {
      if (!byId.has(n.data.id)) byId.set(n.data.id, [])
      byId.get(n.data.id).push(n)
    }
  }

  // Resolve forward relations and build inverse relations
  for (const n of notes) {
    if (!ontology.types[n.type]) continue
    for (const [field, def] of Object.entries(relationsFor(ontology, n.type))) {
      n.links[field] = []
      for (const raw of asList(n.data[field])) {
        const name = linkTarget(raw)
        const target = name ? byName.get(name.toLowerCase()) : null
        if (!target) {
          n.unresolved.push({ field, value: raw })
          continue
        }
        n.links[field].push(target)
        const key = `${def.inverse}::${n.type}`
        target.inverse[key] ??= { label: def.inverse, fromType: n.type, notes: [] }
        if (!target.inverse[key].notes.includes(n)) target.inverse[key].notes.push(n)
      }
    }
  }

  return { ontology, notes, byName, byId }
}

// ── Small helpers used by the generators ──────────────────────────────────────

export const wl = (n) => `[[${n.name}]]`
export const byTitle = (a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" })
export const ofType = (atlas, type) => atlas.notes.filter((n) => n.type === type).sort(byTitle)

/** Notes of `type` that point at `note` through any relation. */
export function incoming(note, type) {
  const out = []
  for (const inv of Object.values(note.inverse)) {
    if (inv.fromType === type) for (const n of inv.notes) if (!out.includes(n)) out.push(n)
  }
  return out.sort(byTitle)
}

export const STATUS_RANK = { deprecated: 0, proposed: 1, reviewed: 2, verified: 3 }

export function monthsSince(dateStr, now = new Date()) {
  if (!dateStr) return Infinity
  const d = new Date(dateStr)
  if (isNaN(d)) return Infinity
  return (now - d) / (1000 * 60 * 60 * 24 * 30.44)
}

/** Tools that can measure a metric (via tool.measures). */
export const toolsForMetric = (metric) => incoming(metric, "tool")
/** Tools that support a method (via tool.supports_methods). */
export function toolsForMethod(method) {
  return incoming(method, "tool")
}
/** Gaps pointing at a note. */
export const gapsFor = (note) => incoming(note, "gap")

/**
 * Coverage of a metric by digital tools:
 *  none    → no tool in the Atlas claims to measure it
 *  gap     → tools exist, but a Tool Gap note says they are insufficient
 *  covered → at least one tool measures it and no gap is recorded
 * `confidence` is the best review status among those tools (proposed/reviewed/verified).
 */
export function metricCoverage(metric) {
  const tools = toolsForMetric(metric).filter((t) => t.data.status !== "deprecated")
  const gaps = gapsFor(metric)
  const best = tools.reduce((m, t) => Math.max(m, STATUS_RANK[t.data.status] ?? 0), 0)
  const confidence = Object.keys(STATUS_RANK).find((k) => STATUS_RANK[k] === best) ?? "—"
  const level = tools.length === 0 ? "none" : gaps.length ? "gap" : "covered"
  return { level, tools, gaps, confidence: tools.length ? confidence : "—" }
}

export const COVERAGE_LABEL = {
  covered: "🟢 covered",
  gap: "🟠 known gap",
  none: "🔴 no tool",
}
