# Template: Agent Skill / Plugin / MCP Server

适用于：给 Claude Code、Codex、Cursor、OpenCode、Pi 等 agent 用的 skill、插件、MCP server、规则包。

这类项目的读者有两个：**人**决定装不装，**agent** 负责真正去装。README 写给人，`INSTALL.md` 写给 agent。

骨架来自 answer-me-with-html 的 README（约 300 行，迭代 50 多次）。

---

## 一、这类 README 的四个重点

1. **支持哪些 agent**：放进徽章（`works with Claude Code · Codex · Cursor`）和安装段。
2. **为什么不直接让模型做**：读者第一个疑问通常是「模型自己就能做，为什么要装这个？」。用一个问句标题回答，给出实测数字。
3. **一句话 agent 安装**：用户把一句话粘贴给自己的 agent，agent 读取 `INSTALL.md` 后自己装。
4. **可粘贴的规则片段**：常开模式这类功能写成一段文字，让用户粘贴进 `CLAUDE.md` 或 `AGENTS.md`。这比再发一个插件好维护，所有 agent 也都能用。

---

## 二、骨架

````markdown
<p align="center"><img src="docs/logo.svg" width="64" height="64" alt="Project logo"></p>

<h1 align="center">Project Name</h1>

<p align="center">
  <b>An agent skill. [用户做什么], [得到什么].<br>[一个可验证的数字，例如 The model writes about 1/8 of the tokens].</b>
</p>

<p align="center">
  <a href="https://github.com/owner/repo/releases"><img src="https://img.shields.io/github/v/release/owner/repo?style=flat-square&logo=github&labelColor=16181d&color=2ea44f" alt="Release"></a>
  <a href="https://github.com/owner/repo/stargazers"><img src="https://img.shields.io/github/stars/owner/repo?style=flat-square&logo=github&labelColor=16181d&color=2ea44f" alt="Stars"></a>
  <img src="https://img.shields.io/badge/works%20with-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Cursor-2ea44f?style=flat-square&labelColor=16181d" alt="Works with Claude Code, Codex, Cursor">
</p>

<p align="center">
  <a href="https://example.com/"><b>Website</b></a> · <a href="#install">Install</a> · <a href="#what-you-ask-what-you-get">Examples</a> · <a href="docs/reference.md">Reference</a> · <a href="README.zh-CN.md">简体中文</a>
</p>

<p align="center">
  <img src="docs/images/before-after.png" alt="The same request without and with the skill: [左边是什么], [右边是什么]" width="100%">
</p>

Once installed, ask the way you always do:

```
> [用户原话 1]
> [用户原话 2]
```

https://github.com/user-attachments/assets/xxxxxxxx

<p align="center"><sub>20-second demo.</sub></p>

## Why not just ask the model to [do it]?

You can. [承认模型能做到什么]. But [差距，一句话].

| | Ask the model directly | With Project Name | |
| :--- | ---: | ---: | :--- |
| [稳健指标 1] | 4,893 | **612** | **8× fewer** |
| [稳健指标 2] | 31 s | **12 s** | **2.6× faster** |

[测量条件：样本、次数、取值、模型、环境]. The data is in [bench/data.json](bench/data.json); `node bench/run.mjs` reproduces it. [不利指标一句话 + 原因 + 链接].

## Install

You need [运行时和版本]. [有没有单独的 install 步骤].

### Let your agent install it (recommended)

Paste this into Claude Code, Codex, Cursor or any other agent:

> Install Project Name: read https://raw.githubusercontent.com/owner/repo/main/INSTALL.md and follow it.

[INSTALL.md](INSTALL.md) is written for agents. It [装什么、已安装时怎么办、会不会问你问题、最后怎么验证].

### Claude Code plugin

```
/plugin marketplace add owner/repo
/plugin install name@name
```

### One command

```bash
npx skills add owner/repo
```

<details>
<summary>Manual install</summary>

[复制目录的命令]. Skill folders for other agents: Codex `~/.codex/skills/`, Cursor `~/.cursor/skills/`.

</details>

No setup is needed after install. [指向推荐功能的一句话].

## What you ask, what you get

| You ask | You get |
| :--- | :--- |
| "[用户原话]" | [具体产出] |
| "[一行就能答的问题]" | Nothing extra. [说明什么时候不触发] |

## How is this different from [同类项目]?

[对方做什么]. [我们做什么]. See the [full comparison](docs/compare.md).

## Settings

[一句话说明怎么改设置]. [plugin 和 skill 两种安装的命令差异，用表格分行]. Defaults and values: [reference](docs/reference.md#settings).

## [推荐功能] (recommended)

[开了之后会怎样]. It is off by default. [为什么推荐]. [代价]. To turn it on, paste this to your agent:

> [一段完整的规则文本，用户原样粘贴]

## Background

[触发契机，带链接]. [自己试过什么、卡在哪]. So [项目做了什么].

## How it works

[agent 写什么 → 工具做什么，最好贴一段真实输入]

## Development

```bash
npm install
npm test
```

## Star History

[<picture> 深浅两版，见 assets/badges.md]

## License

[MIT](LICENSE)
````

---

## 三、`INSTALL.md`：写给 agent 的安装说明

README 里那句 prompt 指向它。安装逻辑变了只改这个文件，README 的 prompt 不用动。

结构：

```markdown
# Project Name: install guide for AI agents

> This file is written for the AI agent that installs the project. A person can follow it too.

I want you to install Project Name for me. Execute all the steps below autonomously.
Do not ask me anything. Tell me what you did in one report at the end.

OBJECTIVE: [安装完成后的状态].

DONE WHEN: [一条可以执行的检查命令，以及它应该输出什么].

## Rules
- The only reason to stop is [唯一的阻塞条件，例如运行时缺失].
- Run only the commands in this file.
- Install **one** way per agent. A skill and a plugin with the same name load twice.
- Keep any existing install.
- Put the commands of one step in a single shell call, so I approve as few prompts as possible.

## TODO
- [ ] Check [运行时]
- [ ] Check for an existing install
- [ ] Install: [按 agent 分支]
- [ ] Check that it works
- [ ] Send the final report

## Step 1 … Step N
[每步一个代码块，写清楚每种结果怎么处理]

## Report
[报告里要写哪几项]
```

要点：
- **完成条件写成命令**，agent 能自己判断装没装好。
- **已安装时的处理写成规则**：保留现有安装，按情况更新或跳过。
- **按 agent 分支**：Claude Code 走插件，其他 agent 走 skill。
- **最后做一次真实使用**来验证，例如生成一个示例页面，并加上不弹窗的参数。
- **会改用户配置的事交给用户决定**：例如修改规则文件，在报告里推荐，并问用户要不要做。

---

## 四、这类项目的额外检查项

- [ ] 用户和 agent 会被整个克隆安装的仓库里，没有新增视频、GIF 或大文件。
- [ ] README 里的安装 prompt、规则片段与 `INSTALL.md`、`SKILL.md` 中的对应文字一致。
- [ ] 在全新的 `HOME` 里，按 README 的每条安装路线都跑通过一次。
- [ ] plugin 和 skill 两种安装下，slash command 的写法差异已写明（例如 `/name:config` 与 `/name config`）。
