// Run: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { checkReadme, slugify } from '../skills/github-readme/scripts/check_readme.mjs'

function repo(files) {
  const dir = mkdtempSync(join(tmpdir(), 'readme-check-'))
  for (const [name, body] of Object.entries(files)) {
    mkdirSync(join(dir, name, '..'), { recursive: true })
    writeFileSync(join(dir, name), body)
  }
  return dir
}

const kinds = (findings) => findings.map((f) => f.kind)

test('a clean README has no findings', () => {
  const dir = repo({
    'README.md': '# Tool\n\n[Install](#install) · [Ref](docs/ref.md#settings)\n\n## Install\n\n```bash\n# TODO in a fence is fine\n```\n',
    'docs/ref.md': '# Ref\n\n## Settings\n',
  })
  assert.deepEqual(checkReadme(join(dir, 'README.md')), [])
})

test('slugs follow GitHub: Chinese kept, punctuation dropped, emoji variation selector kept', () => {
  assert.equal(slugify('高频模式（推荐）'), '高频模式推荐')
  assert.equal(slugify('Always-on mode (recommended)'), 'always-on-mode-recommended')
  assert.equal(slugify('⚙️ Deploy'), '️-deploy')
  assert.equal(slugify('Use `am video`'), 'use-am-video')
})

test('dead anchors are errors, in this file and in a linked .md file', () => {
  const dir = repo({
    'README.md': '[a](#nope)\n[b](docs/ref.md#gone)\n<a href="#also-nope">c</a>\n\n## Real\n',
    'docs/ref.md': '## Settings\n',
  })
  const f = checkReadme(join(dir, 'README.md'))
  assert.equal(f.filter((x) => x.kind === 'dead-anchor').length, 3)
})

test('missing relative files and images are errors; URLs are not checked', () => {
  const dir = repo({ 'README.md': '![x](docs/a.png)\n<img src="docs/b.png">\n[c](https://example.com/x)\n' })
  assert.deepEqual(kinds(checkReadme(join(dir, 'README.md'))), ['missing-file', 'missing-file'])
})

test('a closing tag without ">" is caught (the README.zh-CN.md bug)', () => {
  const dir = repo({ 'README.md': '<p align="center">\n  <img src="https://example.com/a.png">\n</p\n\n## Next\n' })
  assert.ok(kinds(checkReadme(join(dir, 'README.md'))).includes('broken-tag'))
})

test('unclosed and unopened tags are errors', () => {
  const dir = repo({ 'README.md': '<p align="center">\n<b>x</b>\n\n<details>\n</summary>\n' })
  const k = kinds(checkReadme(join(dir, 'README.md')))
  assert.ok(k.includes('unclosed-tag'))
  assert.ok(k.includes('unopened-tag'))
})

test('local paths and placeholders are errors outside code fences only', () => {
  const dir = repo({ 'README.md': 'See /Users/me/notes and file:///tmp/a.html\n\n{{TAGLINE}}\n\nEnds with a file:// link.\n```\n/Users/ok\n```\n' })
  assert.deepEqual(kinds(checkReadme(join(dir, 'README.md'))), ['local-path', 'placeholder'])
})

test('a license badge needs a LICENSE file', () => {
  const badge = '<img src="https://img.shields.io/badge/license-MIT-blue">\n'
  assert.ok(kinds(checkReadme(join(repo({ 'README.md': badge }), 'README.md'))).includes('license'))
  assert.deepEqual(checkReadme(join(repo({ 'README.md': badge, LICENSE: 'MIT' }), 'README.md')), [])
})

test('length and inflated words are warnings', () => {
  const dir = repo({ 'README.md': 'A seamless, 全链路 tool.\n' + 'x\n'.repeat(20) })
  const f = checkReadme(join(dir, 'README.md'), { maxLines: 10 })
  assert.ok(f.every((x) => x.level === 'warn'))
  assert.deepEqual(kinds(f), ['inflated-word', 'length'])
})

test('bilingual drift: badges and section counts are compared with README.<lang>.md', () => {
  const dir = repo({
    'README.md': '<img src="https://img.shields.io/badge/a-b-c">\n<img src="https://x.dev/badges/rank.svg">\n\n## One\n\n## Two\n',
    'README.zh-CN.md': '<img src="https://img.shields.io/badge/a-b-c">\n\n## 一\n',
  })
  const f = checkReadme(join(dir, 'README.md'))
  assert.ok(f.every((x) => x.kind === 'bilingual-drift' && x.level === 'warn'))
  assert.ok(f.some((x) => x.detail.startsWith('headings: 2 here, 1')))
  assert.ok(f.some((x) => x.detail.includes('badge only here: https://x.dev/badges/rank.svg')))
})

test('the CLI runs when started through a symlinked skill folder', async () => {
  const { execFileSync } = await import('node:child_process')
  const { symlinkSync } = await import('node:fs')
  const { fileURLToPath } = await import('node:url')
  const skillDir = fileURLToPath(new URL('../skills/github-readme', import.meta.url))
  const dir = repo({ 'README.md': '# Tool\n' })
  symlinkSync(skillDir, join(dir, 'linked-skill'))
  const out = execFileSync(process.execPath, [join(dir, 'linked-skill/scripts/check_readme.mjs'), join(dir, 'README.md')], { encoding: 'utf8' })
  assert.match(out, /^clean: /)
})
