<h1 align="center">readme-skill</h1>

<p align="center">
  <b>An agent skill for GitHub READMEs: write a new one, update it, slim it down, or review it.<br>Ships with a lint script that catches dead anchors, broken HTML and drift between language versions.</b>
</p>

<p align="center">
  <a href="#install">Install</a> · <a href="#what-it-does">What it does</a> · <a href="#the-lint-script">Lint script</a> · <a href="skills/github-readme/SKILL.md">SKILL.md</a> · <a href="README.zh-CN.md">简体中文</a>
</p>

Once installed, ask your agent the way you normally would:

```
> Write a README for this repo
> The README is too long, slim it down
> We renamed --watch to --follow, update the README
> Review the README before we go public
```

The skill picks the task, checks every claim against the code, and runs the lint script before it hands the README back. Here is the script on a real README from [answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) at commit `f3082c9`, after a hand edit on GitHub:

```
README.zh-CN.md: 2 error(s), 1 warning(s)
  warn inflated-word:298 赋能
  error broken-tag:9 </p has no ">"
  error unclosed-tag:7 <p>
```

## Install

You need Node.js 18 or newer for the lint script. The skill itself is plain Markdown.

```bash
npx skills add QingYunA/readme-skill
```

It asks which agents to install into. The installer is [vercel-labs/skills](https://github.com/vercel-labs/skills).

<details>
<summary>Manual install</summary>

Copy `skills/github-readme` into your agent's skill folder. For Claude Code:

```bash
git clone --depth 1 https://github.com/QingYunA/readme-skill.git /tmp/readme-skill
cp -R /tmp/readme-skill/skills/github-readme ~/.claude/skills/github-readme
```

</details>

## What it does

| Task | When | What the agent does |
| :--- | :--- | :--- |
| New | No README yet, or a full rewrite | Lists the facts with their sources, asks you what only you know, writes, lints, then has a second agent check it |
| Update | A feature changed | Marks each claim as still true, stale or unproven, and fixes it in place |
| Slim | Over about 350 lines | Moves reference material to `docs/` and leaves a one-line summary with a deep link |
| Review | Before a release | Reports problems and leaves the files alone |

- **Facts come from the code:** commands from `package.json` and `--help`, defaults from the code that reads them. A claim with no source is left out.
- **It asks before it guesses:** measured numbers, the story behind the project and comparisons with other tools come from you. Anything still missing stays as a `TODO`, and the lint script fails on it.
- **Plain writing:** one idea per sentence, no marketing adjectives, and every number comes with its test conditions.
- **Templates for five kinds of project:** agent skills and plugins, self-hosted apps, desktop apps, CLIs, and libraries.

The skill text is in Chinese. It works the same way when the README you ask for is in English.

## The lint script

```bash
node skills/github-readme/scripts/check_readme.mjs README.md README.zh-CN.md
```

No dependencies. It exits with 1 when there are errors.

| Level | Check |
| :--- | :--- |
| error | Anchors that go nowhere, including `docs/*.md#anchor` and Chinese headings |
| error | Relative files and images that do not exist |
| error | Machine-local paths such as `/Users/...` or `file:///...` |
| error | Leftover `TODO` and `{{placeholders}}` |
| error | Unclosed HTML tags, and tags with a missing `>` |
| error | A license badge with no `LICENSE` file |
| warning | More than 350 lines, and inflated words |
| warning | `README.md` and `README.<lang>.md` differ in sections, images, code blocks or badges |

## Background

The rules come from the README of [answer-me-with-html](https://github.com/QingYunA/answer-me-with-html): more than 50 commits, two passes that cut it from 388 to 320 and from 361 to 310 lines, and a few fixes the maintainer made by hand on GitHub. Ideas from other README skills are in too: the fact list, the lint checks and the second-agent review come from [Omer-Dahan/readme-skill](https://github.com/Omer-Dahan/readme-skill), the task split from [crafting-effective-readmes](https://github.com/softaworks/agent-toolkit/tree/main/skills/crafting-effective-readmes), and the rule to ask instead of guess from [portfolio-readme](https://github.com/barbaria888/Claude-repo-writing-skill).

## Development

```bash
npm test
npm run lint:readme
```

## License

[MIT](LICENSE)
