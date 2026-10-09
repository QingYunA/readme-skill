<h1 align="center">readme-skill</h1>

<p align="center">
  <b>写 GitHub README 的 agent skill：新写、更新、瘦身、审查都能做。<br>自带一个 lint 脚本，能查出死锚点、坏掉的 HTML 和中英两版的差异。</b>
</p>

<p align="center">
  <a href="#安装">安装</a> · <a href="#能做什么">能做什么</a> · <a href="#lint-脚本">Lint 脚本</a> · <a href="skills/github-readme/SKILL.md">SKILL.md</a> · <a href="README.md">English</a>
</p>

装好后，照平常的说法跟 agent 说：

```
> 给这个仓库写个 README
> README 太长了，瘦一下身
> 我们把 --watch 改名成 --follow 了，更新一下 README
> 公开之前帮我审一下 README
```

skill 会先判断是哪种任务，再把每条主张和代码核对一遍，交回 README 之前还会跑一次 lint 脚本。下面是脚本对一份真实 README 的检查结果：[answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) 在提交 `f3082c9` 时的中文版，那次是在 GitHub 网页上手改的：

```
README.zh-CN.md: 2 error(s), 1 warning(s)
  warn inflated-word:298 赋能
  error broken-tag:9 </p has no ">"
  error unclosed-tag:7 <p>
```

## 安装

lint 脚本需要 Node.js 18 或更新版本。skill 本身只是 Markdown 文件。

```bash
npx skills add QingYunA/readme-skill
```

安装器会问你装到哪些 agent。安装器是 [vercel-labs/skills](https://github.com/vercel-labs/skills)。

<details>
<summary>手动安装</summary>

把 `skills/github-readme` 复制到 agent 的 skill 目录。以 Claude Code 为例：

```bash
git clone --depth 1 https://github.com/QingYunA/readme-skill.git /tmp/readme-skill
cp -R /tmp/readme-skill/skills/github-readme ~/.claude/skills/github-readme
```

</details>

## 能做什么

| 任务 | 什么时候 | agent 做什么 |
| :--- | :--- | :--- |
| 新写 | 还没有 README，或者要整篇重写 | 列出事实和出处，问你只有你知道的事，写完跑脚本，再交给另一个 agent 核查 |
| 更新 | 功能变了 | 把每条主张标成「仍然对 / 过时 / 查不到」，在原处改 |
| 瘦身 | 超过约 350 行 | 把参考类内容移进 `docs/`，原处留一句摘要和深链接 |
| 审查 | 发版之前 | 只报告问题，不改文件 |

- **事实来自代码**：命令看 `package.json` 和 `--help`，默认值看读取它的代码。找不到出处的主张不写。
- **先问，不猜**：测量数字、项目背后的故事、和其他工具的比较，都由你来提供。还缺的地方留成 `TODO`，lint 脚本会因此报错。
- **说人话**：一句话只讲一件事，不用营销形容词，每个数字都带测试条件。
- **五类项目的母版**：agent skill 和插件、自托管应用、桌面应用、CLI、库。

skill 正文是中文。让它写英文 README，效果是一样的。

## Lint 脚本

```bash
node skills/github-readme/scripts/check_readme.mjs README.md README.zh-CN.md
```

不需要装依赖。有 error 时退出码是 1。

| 级别 | 检查项 |
| :--- | :--- |
| error | 跳不过去的锚点，包括 `docs/*.md#anchor` 和中文标题 |
| error | 不存在的相对文件和图片 |
| error | 本机路径，例如 `/Users/...`、`file:///...` |
| error | 残留的 `TODO` 和 `{{占位符}}` |
| error | 没闭合的 HTML 标签、缺 `>` 的标签 |
| error | 有 License 徽章，却没有 `LICENSE` 文件 |
| warning | 超过 350 行、夸大用词 |
| warning | `README.md` 和 `README.<lang>.md` 的章节、图片、代码块或徽章不一致 |

## 为什么做这个

这些规则来自 [answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) 的 README：50 多次提交，两次瘦身（388 行减到 320 行，361 行减到 310 行），还有几处维护者在 GitHub 网页上的手改。也借鉴了其他 README skill：事实清单、lint 检查和第二个 agent 核查来自 [Omer-Dahan/readme-skill](https://github.com/Omer-Dahan/readme-skill)，分任务来自 [crafting-effective-readmes](https://github.com/softaworks/agent-toolkit/tree/main/skills/crafting-effective-readmes)，「先问，不猜」来自 [portfolio-readme](https://github.com/barbaria888/Claude-repo-writing-skill)。

## 开发

```bash
npm test
npm run lint:readme
```

## License

[MIT](LICENSE)
