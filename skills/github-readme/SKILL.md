---
name: github-readme
description: 撰写、重构、瘦身或审查 GitHub 项目的 README.md（含双语 README、头部徽章、安装段、benchmark 主张、docs/ 分流）。当用户要求写 README、优化或美化 README、README 太长、改 README 头部或安装说明、或提到 github-readme 时使用。产出说人话、短句、数字可验证的工程师式 README。
---

# GitHub README 写作规范

本 Skill 有两个来源：
- **uv、shadcn/ui、Supabase、Astro、Tailwind** 等高星仓库的 README 范式。
- **answer-me-with-html** 一个仓库里 50 多次 README 提交、两次瘦身、维护者在 GitHub 网页上亲手做的修改。规则后面括号里的「实战」就是从那里来的。

核心只有三条：**说人话**；**读者 3 秒看懂首屏**；**README 只回答四件事**。

下文的 `scripts/`、`references/`、`assets/` 都相对于本 skill 的目录，不是目标仓库。

---

## 零、先分任务

先判断用户要做哪一种，再按对应的流程走。拿不准就问。

| 任务 | 什么时候 | 流程 |
| :--- | :--- | :--- |
| **新写** | 没有 README，或者要整篇重写 | 事实清单 → 问用户缺的事实 → 按第三节的顺序写 → 跑脚本 → 独立核查 |
| **更新** | 功能变了，README 有地方过时 | 读 README 和 `git log -p -- README.md` → 对照代码，把每条主张标成「仍然对 / 过时 / 查不到」→ 在原处改，过时的删掉 → 两种语言一起改 → 跑脚本 |
| **瘦身** | README 超过 350 行，或者用户说太长 | 列出每节行数 → 按第一节决定留下还是移走 → 移进 `docs/`（两种语言）并留摘要和深链接 → 跑脚本，确认锚点都还有效 |
| **审查** | 用户要你检查 README | 事实清单 + 跑脚本 + 第八节清单 → 交报告。用户没要求就不改文件 |

- **改原处，不追加**。过时的段落直接改写或删除，不要在后面再加一节「更新说明」。
- **大改**（新写，或改动超过全文约 1/3）完成后做一次独立核查：把 `references/verification-brief.md` 里的 prompt 交给一个没参与写作的子代理，修完它报的 blocker 和 high。日常小改跳过这一步。

### 事实清单
动笔或改动前，把要写的每条主张对应到出处：

| 主张 | 去哪里查 |
| :--- | :--- |
| 安装、使用命令 | `package.json` scripts、`Makefile`、CLI 的 `--help` 输出 |
| 默认值、设置项 | 读取这个值的代码，不看注释或 `.env.example` |
| 运行时版本、License | manifest 的 `engines` / `requires-python` / `license` 字段、`LICENSE` 文件 |
| 支持哪些平台或 agent | 安装脚本、测试、CI 矩阵 |
| 测量数字 | 数据文件和生成它的命令 |

- **查不到出处的主张不写**。
- **只有用户知道的事，先问**：测量数字、动机故事、和别的项目比较的结论、截图和视频。问不到就写成 `<!-- TODO: ... -->`。交付时把 TODO 列给用户，脚本也会把它们报成错误。
- **外部链接只用确认能打开的 URL**，不拼接猜测的地址。
- **遗漏检查**：把用户能看到的命令和设置项列一遍，每一项至少要在 README 或它链接的 `docs/` 里出现一次。

---

## 一、README 只回答四件事

1. **是什么**：一句话定义，加一个可验证的数字。
2. **为什么用它**：对比图、实测数字、和替代方案的区别。
3. **怎么装**：复制就能跑。
4. **长什么样**：截图、视频、「你问 → 你得到」示例。

其余内容放进 `docs/`，例如完整配置表、命令参数、边缘情况、旧版本迁移说明、少数人才需要的开关。README 原处留**一句摘要和一个深链接**：`Defaults and values: [reference](docs/reference.md#settings)`。

- **长度**：约 300 行。超过 350 行就做一次瘦身。（实战：两次瘦身，388 → 320，361 → 310。）
- **瘦身只移动、不删除**。在 commit 里写清楚移到了哪里。
- **迁移提示是临时的**。破坏性变更的「旧插件怎么卸载」只在过渡期放在 README，之后移进 docs。
- **少数人的需求放在相反功能的旁边**。例如「想让它少主动一点」放在「高频模式」一节末尾，写一句话加链接。

---

## 二、说人话

详见 `references/anti-ai-slop.md`。

### 1. 是什么就叫什么
- 写基础特性的实际行为，用日常工程师词汇。
- ❌ *「采用双核悬浮胶囊工具栏配合 600ms 环形蓄力载入机制构成首屏性能守护矩阵」*
- ✅ *「卡片默认只显示静态封面。点击或悬停才启动预览，后台最多保持 6 个沙箱。」*

### 2. 一句话只讲一件事
- 中文单句不超过 25 个字，英文不超过 20 个单词。
- ❌ *「运行端点通过严格 CSP 响应头在独立路径下物理隔绝，且坚决不赋予 allow-same-origin，从根源切断访问宿主主域 Cookie 与会话凭证。」*
- ✅ *「页面运行在独立的 `/raw/` 路径下，并禁用了 `allow-same-origin`。哪怕跑未知脚本，也碰不到主站的 Cookie。」*

### 3. 用人的动作做主语
- 拖入、打开、复制、粘贴、部署。
- ✅ *「支持桌面、平板、手机三种视口一键切换。」*

### 4. 动机讲真实的麻烦
- 动机来自用户本人的经历。用户没讲过，就先问「当时为什么做这个？卡在哪里？」。
- 写的时候像真人讲自己踩的坑，带具体细节。下面是语气示例，不是内容：*「页面质量不错，但很慢：一个页面要一两分钟，大多是几百行每次都差不多的 CSS。箭头还经常指向空白。」*
- 动机放在哪里，见第三节。

### 5. 标题写成名词或读者会问的问题
- `## Background` 比 `## Why` 好，`## How it works` 比 `## Why it's fast` 好。
- 标题要短：括号里的字会进锚点，改标题就会改锚点。

---

## 三、结构与顺序

按下面的顺序排。没有的部分跳过，顺序不变。

| # | 部分 | 要点 |
| :--- | :--- | :--- |
| 1 | Masthead | 见下文「头部六层」 |
| 2 | 首屏画面 | 前后对比图 → 用户会怎么问 → 演示视频 |
| 3 | 回应质疑 | `## Why not just X?`、`## How is this different from Y?` |
| 4 | Install | 见第五节 |
| 5 | 示例 | 「你问 → 你得到」表格，包含一行反例 |
| 6 | 功能与设置 | 每项一段摘要 + 链接到 docs |
| 7 | Background | 动机故事，10 行以内 |
| 8 | How it works / Features / Development | 机制、`- **关键词:** 事实` 列表、开发命令 |
| 9 | 页脚 | Community → Star History → License，License 永远最后 |

### 头部六层

```html
<p align="center"><img src="docs/logo.svg" width="64" height="64" alt="..."></p>
<h1 align="center">Project</h1>
<p align="center"><b>Feature A&nbsp;&nbsp;|&nbsp;&nbsp;Feature B&nbsp;&nbsp;|&nbsp;&nbsp;Feature C</b></p>   <!-- 可选关键词行 -->
<p align="center"><b>是什么 + 解决什么。<br>一个可验证的数字。</b></p>
<p align="center"> 徽章 </p>
<p align="center"><a href="..."><b>Website</b></a> · <a href="#install">Install</a> · ... · <a href="README.zh-CN.md">简体中文</a></p>
```

- **Logo**：居中，48 到 64px。
- **关键词行**：可选，最多 4 项，每项都是可验证的特性名，例如 `One File, Offline`、`ASD-STE100`。
- **Tagline**：先说它是什么、解决什么，再给一个可验证的数字。例如：*「An agent skill. Ask a hard question, get a page you can actually read. The model writes about 1/8 of the tokens.」*
- **徽章**：只选对读者有用的，风格统一。见下文和 `assets/badges.md`。
- **链接行**：只占一行。官网放第一位并加粗，语言切换放最后。中间放读者最常找的 4 到 5 个锚点和 docs 链接。GitHub 页面宽度放不下就删项。（实战：三行合成一行，Settings 和 How it works 被移出去。）

### 徽章
- 按读者想知道的选：版本、Stars、支持哪些平台或 agent、第三方榜单或认可。自托管项目再加 Docker。
- 统一 `style`、`labelColor`、`color`。风格一致比数量重要。（实战：`style=flat-square&labelColor=16181d&color=2ea44f`。）
- License 写在页脚的 `## License`。CI 状态给贡献者看，留在 Actions 页。（实战：去掉了 License、CI、Node 版本、zero CDN 四个徽章，后两项正文已写。）

### 首屏画面
- **前后对比图最先**：同一个问题，左边是原来的样子，右边是用了项目之后。它同时回答「是什么」和「为什么用」。（实战：维护者在网页上亲手把对比图挪到 masthead 正下方。）
- 然后放用户实际会输入的 2 到 3 句话，再放演示视频。
- **视频用 GitHub 附件**：在 issue 或 PR 评论里上传 MP4，把 `https://github.com/user-attachments/assets/...` 链接单独放一行，GitHub 会内联播放并带声音。视频下方用 `<sub>` 写时长和提示，例如「24-second demo. Turn the sound on for the music.」
- **仓库会被整个克隆安装时**（skill、plugin、模板仓库），视频、GIF、benchmark 语料都放在 git 外：视频用附件链接，语料放 release 下载。
- 截图需要深浅两版时用 `<picture>`，写法见 `assets/badges.md`。

### 回应质疑
- 读者心里第一个「为什么不直接用 X？」写成问句标题，放在 Install 之前。正文先承认 X 能用，再给差距：*「You can. Models write decent HTML now. But most of what they write is not content.」*
- 和同类项目的区别：README 只写一段，完整对比表放 `docs/compare.md`。
- 如实承认对方的强项，没测过的写「没测」：*「Its diagram tools go further than ours.」*、*「We did not measure X.」* 这样反而更可信。

### 示例表格
- `| You ask | You get |` 两列，每行写用户的原话和具体产出。
- 加一行反例，说明什么时候不触发：*「"How do I show hidden files with `ls`?" → No page. A one-line question gets a one-line answer.」*

### Background
- 排在安装和示例之后，10 行以内。只有已经感兴趣的读者才会看到这里。
- 结构：触发契机（一个链接）→ 自己试过什么、卡在哪 → 所以这个项目做了什么。

---

## 四、数字与 benchmark

- **每个数字带条件**：样本量、重复次数、取值方式、模型或硬件、环境。例如 `(3 topics × 3 runs, medians, Claude Sonnet 5.5, a plain Claude Code setup)`。
- **可复现**：给出数据文件和一条命令，例如 `node bench/corpus.mjs gives the same numbers every time`。
- **口径逐步升级**：估算 → 实测 → 固定语料。升级后删掉旧口径的表和说法。
- **主表只放稳健的指标**，例如输出 token、耗时。不利的指标写一句话讲清原因，再链接细节：*「The bill drops less than the writing, about 15% here, because every turn also reads the system prompt.」*
- **小样本写成一句话**：*「about 18× fewer output tokens in [a small test](bench/README.md#...)」*。
- **写法**：`about` 加整数或简单分数（`about 1/8`、`8× fewer`、`2.6× faster`）。表格最后一列加粗结论。
- **同一个数字只在一处展开**。Tagline 可以引用主数字。其他地方用链接指过去。
- **重新测量后**，在 README、`docs/`、官网和中英两版里搜索旧数字，全部改掉。

---

## 五、安装段

- **先写前置条件**：运行时和版本、需不需要单独的 install 步骤。例如「You need Node.js 20 or newer. There is no `npm install` step.」
- **每种安装方式一个小节**，推荐的放第一个，标题写 `(recommended)`。
- **手动安装折叠**到 `<details><summary>Manual install</summary>`。
- **给 agent 用的工具**（skill、plugin、MCP server）：第一种方式是一句话 prompt，让 agent 读取仓库里的 `INSTALL.md` 后照着装。安装逻辑会变，只改 `INSTALL.md`，README 里的 prompt 保持不变。写法见 `references/agent-skill.md`。
- **安装段最后一句指向下一步**，例如「No setup is needed. We recommend turning on [always-on mode](#always-on-mode-recommended).」

### 推荐某个功能时
依次写四样：
1. 默认状态：「It is off by default.」
2. 为什么推荐，一句话。
3. 代价：「Pages pile up; clear them with `am clean`.」
4. 可以直接复制的命令或片段。

README 里给用户或 agent 直接粘贴的片段也是代码：和源文件保持一致，能写测试就写测试。

---

## 六、双语 README

- **先定主受众**。面向国际的开发者工具：`README.md` 用英文，`README.zh-CN.md` 用中文。语言切换放在链接行最后。
- **中文版是本地化**：换成中文截图、中文官网、中文示例问题、中文 docs 链接。术语按中文习惯意译。
- **两份在同一个 commit 里改**。从 README 移进 `docs/` 的内容也要有两种语言。
- **逐项对照**：徽章、图片、链接、锚点（中文标题生成中文锚点，如 `#安装`）、HTML 标签闭合。第八节的脚本会报出两份之间的差异。（实战：网页手改中文版时漏掉了一个 `</p>`；有个榜单徽章只加在英文版。）

---

## 七、项目形态路由

| 仓库形态 | 适用场景 | 参考文件 | 重点 |
| :--- | :--- | :--- | :--- |
| **Agent Skill / Plugin / MCP** | Claude Code、Codex、Cursor 等 agent 的 skill、插件、MCP server | `references/agent-skill.md` | 一句话 agent 安装 + `INSTALL.md`、支持哪些 agent、「为什么不直接让模型做」、可粘贴的规则片段 |
| **自托管应用 / Web 工具** | 私有部署服务、PaaS、自建平台 | `references/self-hosted.md` | 对标谁、自建和云端的区别、Docker 一键拉起、存储选择 |
| **桌面客户端** | Electron、Tauri、原生应用 | `references/app-desktop.md` | 界面大图、下载矩阵、使用流程、本地优先与隐私说明 |
| **CLI / 开发者工具** | 命令行工具、编译器、包管理器 | `references/cli-devtools.md` | 一行安装、带条件的 benchmark、常用命令、输出示例 |
| **组件库 / 框架 / SDK** | UI 组件库、Node/Python 包 | `references/library-framework.md` | 一句话主张、Init/Add/Use 三步、可直接拷贝的代码 |

母版给的是骨架。第一到第六节的规则优先于母版。

---

## 八、终审清单

先跑脚本（Node 18 以上，不需要安装依赖）：

```bash
node <本 skill 目录>/scripts/check_readme.mjs README.md README.zh-CN.md
```

- **error 必须修完**：死锚点（包括链接到 `docs/*.md#anchor` 的锚点）、找不到的相对文件、本机路径、残留占位符和 TODO、没闭合或缺 `>` 的 HTML 标签、挂了 License 徽章但没有 LICENSE 文件。
- **warning 逐条判断**：超过 350 行、夸大用词、中英两份的章节数、图片数、代码块数或徽章不一致。确实需要不一致的，在交付时说明原因。
- 脚本对 `README.md` 会自动找同目录的 `README.<lang>.md` 做对照。其他文件名用 `--pair` 指定。

脚本查不了的，逐项回答「是」或「否」：

- [ ] **四件事**：第一屏能看出它是什么、为什么用、怎么装、长什么样。
- [ ] **头部**：链接行只占一行；每个徽章都对读者有用。
- [ ] **首屏图**：如果能做前后对比图，它排在第一张。
- [ ] **事实**：每条主张都在事实清单里有出处；用户才知道的事已经问过。
- [ ] **数字**：每个数字都有条件和来源，没有和其他地方矛盾的旧数字。
- [ ] **朗读**：每句话一口气能读完。
- [ ] **可运行**：复制安装命令和粘贴片段，在干净环境里真的能跑通。
- [ ] **媒体**：会被克隆安装的仓库里，没有新增视频、GIF 或大文件。
- [ ] **核查**：新写或大改已经做过独立核查，blocker 和 high 都修了。
