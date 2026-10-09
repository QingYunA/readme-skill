#!/usr/bin/env node
// Lint a README before publishing it. No dependencies; Node 18+.
//
// Usage:  node check_readme.mjs README.md [--pair README.zh-CN.md] [--max-lines 350] [--strict]
// Exit:   1 when errors exist (or warnings with --strict), else 0.
//
// Errors:   dead anchors (also in linked .md files), missing relative files, machine-local paths,
//           leftover placeholders, unclosed or broken HTML tags, a license badge with no LICENSE file.
// Warnings: README longer than --max-lines, inflated words, bilingual drift against --pair
//           (the pair is found automatically for README.md next to README.<lang>.md).

import { existsSync, readFileSync, readdirSync, realpathSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const VOID_TAGS = new Set(['img', 'br', 'hr', 'source', 'input', 'meta', 'link', 'wbr'])
const CHECKED_TAGS = new Set(['p', 'div', 'picture', 'details', 'summary', 'table', 'tr', 'td', 'th', 'a', 'b', 'sub', 'sup', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'kbd'])
const PLACEHOLDER_RE = /\b(TODO|TBD|FIXME|XXX)\b|\{\{[^}]+\}\}|\[(?:Project Name|Author\/Organization|your[- ][^\]]*)\]/i
const LOCAL_PATH_RE = /file:\/\/\/?[^\s"'<>)]|(?:^|[\s("'=])(?:\/Users\/|\/home\/|\/root\/|\/tmp\/|\/private\/|[A-Za-z]:\\)/
const INFLATED_RE = /\b(blazing(?:ly)?[- ]fast|ultra[- ]?fast|lightning[- ]fast|world[- ]class|best[- ]in[- ]class|revolutioni[sz]e|seamless(?:ly)?|cutting[- ]edge|game[- ]chang\w*|enterprise[- ]grade|state[- ]of[- ]the[- ]art)\b|赋能|矩阵|全链路|颠覆|极致体验|无缝/i
const LICENSE_BADGE_RE = /shields\.io\/[^"')\s]*license|badge\/license/i

// Lines outside fenced code blocks, with inline code removed. Fence lines become blank.
export function proseLines(text) {
  let fence = null
  return text.split('\n').map((line) => {
    const m = line.match(/^\s*(`{3,}|~{3,})/)
    if (m) {
      if (!fence) fence = m[1]
      else if (m[1][0] === fence[0] && m[1].length >= fence.length) fence = null
      return ''
    }
    return fence ? '' : line.replace(/`[^`]*`/g, '``')
  })
}

// GitHub heading anchor: strip markup, lowercase, keep letters, digits, marks, '-', '_', spaces.
export function slugify(heading) {
  const plain = heading
    .replace(/<[^>]+>/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*]/g, '')
    .trim()
    .toLowerCase()
  return [...plain].filter((ch) => /[\p{L}\p{N}\p{M}\-_ ]/u.test(ch)).join('').replace(/ /g, '-')
}

export function anchorsOf(text) {
  const anchors = new Set()
  const seen = new Map()
  for (const line of proseLines(text)) {
    const h = line.match(/^#{1,6}\s+(.+?)\s*#*\s*$/)
    if (h) {
      const base = slugify(h[1])
      const n = seen.get(base) ?? 0
      anchors.add(n === 0 ? base : `${base}-${n}`)
      seen.set(base, n + 1)
    }
    for (const m of line.matchAll(/<a\s[^>]*(?:id|name)="([^"]+)"/g)) anchors.add(m[1])
  }
  return anchors
}

function linkTargets(line) {
  const targets = []
  for (const m of line.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) targets.push(m[1])
  for (const m of line.matchAll(/\b(?:href|src)="([^"]+)"/g)) targets.push(m[1])
  for (const m of line.matchAll(/\bsrcset="([^"]+)"/g)) targets.push(m[1].trim().split(/\s+/)[0])
  return targets
}

function checkHtml(lines, add) {
  const stack = []
  lines.forEach((line, i) => {
    const n = i + 1
    for (const m of line.matchAll(/<(\/?)([a-zA-Z][\w-]*)([^<>]*)(>|(?=<)|$)/g)) {
      const [, slash, rawName, attrs, end] = m
      const name = rawName.toLowerCase()
      if (!CHECKED_TAGS.has(name) && !VOID_TAGS.has(name)) continue
      if (end !== '>') { add('error', 'broken-tag', n, `<${slash}${rawName}${attrs.slice(0, 20)} has no ">"`); continue }
      if (VOID_TAGS.has(name) || attrs.trim().endsWith('/')) continue
      if (!slash) { stack.push({ name, n }); continue }
      const idx = stack.map((t) => t.name).lastIndexOf(name)
      if (idx === -1) { add('error', 'unopened-tag', n, `</${name}>`); continue }
      for (const t of stack.splice(idx)) if (t.name !== name) add('error', 'unclosed-tag', t.n, `<${t.name}>`)
    }
  })
  for (const t of stack) add('error', 'unclosed-tag', t.n, `<${t.name}>`)
}

function structure(text) {
  const prose = proseLines(text)
  const headings = prose.filter((l) => /^##\s/.test(l)).length
  const images = prose.join('\n').match(/!\[[^\]]*\]\(|<img\s/g)?.length ?? 0
  const badges = new Set(prose.join('\n').match(/https?:\/\/[^"')\s]*(?:shields\.io|\/badges?\/)[^"')\s]*/g) ?? [])
  const fences = text.split('\n').filter((l) => /^\s*(`{3,}|~{3,})/.test(l)).length / 2
  return { headings, images, badges, fences }
}

export function checkReadme(file, { pair, maxLines = 350 } = {}) {
  const findings = []
  const add = (level, kind, line, detail) => findings.push({ level, kind, line, detail })
  const text = readFileSync(file, 'utf8')
  const dir = dirname(resolve(file))
  const lines = proseLines(text)
  const ownAnchors = anchorsOf(text)
  const anchorCache = new Map()

  lines.forEach((line, i) => {
    const n = i + 1
    if (PLACEHOLDER_RE.test(line)) add('error', 'placeholder', n, line.trim().slice(0, 80))
    if (LOCAL_PATH_RE.test(line)) add('error', 'local-path', n, line.trim().slice(0, 80))
    const inflated = line.match(INFLATED_RE)
    if (inflated) add('warn', 'inflated-word', n, inflated[0])
    for (const target of linkTargets(line)) {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target)) continue
      const [path, anchor] = target.split('#')
      const decoded = anchor === undefined ? undefined : decodeURIComponent(anchor)
      if (!path) {
        if (!ownAnchors.has(decoded)) add('error', 'dead-anchor', n, `#${anchor}`)
        continue
      }
      const full = join(dir, decodeURIComponent(path))
      if (!existsSync(full)) { add('error', 'missing-file', n, target); continue }
      if (decoded && /\.md$/i.test(path)) {
        if (!anchorCache.has(full)) anchorCache.set(full, anchorsOf(readFileSync(full, 'utf8')))
        if (!anchorCache.get(full).has(decoded)) add('error', 'dead-anchor', n, target)
      }
    }
  })

  checkHtml(lines, add)

  if (LICENSE_BADGE_RE.test(text) && !readdirSync(dir).some((f) => /^(LICEN[CS]E|COPYING)(\.|$)/i.test(f))) {
    add('error', 'license', 0, 'license badge but no LICENSE file')
  }

  const total = text.split('\n').length
  if (total > maxLines) add('warn', 'length', 0, `${total} lines (limit ${maxLines}); move reference material to docs/`)

  const other = pair ?? defaultPair(file)
  if (other && existsSync(other)) {
    const a = structure(text)
    const b = structure(readFileSync(other, 'utf8'))
    const label = basename(other)
    for (const key of ['headings', 'images', 'fences']) {
      if (a[key] !== b[key]) add('warn', 'bilingual-drift', 0, `${key}: ${a[key]} here, ${b[key]} in ${label}`)
    }
    for (const url of a.badges) if (!b.badges.has(url)) add('warn', 'bilingual-drift', 0, `badge only here: ${url.slice(0, 90)}`)
    for (const url of b.badges) if (!a.badges.has(url)) add('warn', 'bilingual-drift', 0, `badge only in ${label}: ${url.slice(0, 90)}`)
  }
  return findings
}

function defaultPair(file) {
  if (basename(file) !== 'README.md') return undefined
  const dir = dirname(resolve(file))
  const match = readdirSync(dir).find((f) => /^README\.[\w-]+\.md$/.test(f))
  return match ? join(dir, match) : undefined
}

function main(argv) {
  const args = [...argv]
  const opt = (name) => {
    const i = args.indexOf(name)
    return i === -1 ? undefined : args.splice(i, 2)[1]
  }
  const strict = args.includes('--strict')
  const pair = opt('--pair')
  const maxLines = Number(opt('--max-lines') ?? 350)
  const files = args.filter((a) => a !== '--strict')
  if (files.length === 0) {
    console.error('usage: node check_readme.mjs README.md [--pair README.zh-CN.md] [--max-lines 350] [--strict]')
    return 2
  }
  let failed = false
  for (const file of files) {
    const findings = checkReadme(file, { pair, maxLines })
    const errors = findings.filter((f) => f.level === 'error').length
    if (findings.length === 0) { console.log(`clean: ${file}`); continue }
    console.log(`${file}: ${errors} error(s), ${findings.length - errors} warning(s)`)
    for (const f of findings) console.log(`  ${f.level} ${f.kind}:${f.line} ${f.detail}`)
    if (errors > 0 || (strict && findings.length > 0)) failed = true
  }
  return failed ? 1 : 0
}

// Compare real paths: skill folders are often symlinks, and /tmp is one on macOS.
if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) process.exit(main(process.argv.slice(2)))
