# Anti-AI Slop Guide for GitHub READMEs

顶级开源项目（如 uv、shadcn/ui、Paseo、Nimbalyst、Supabase、Astro）的 README 具有极其鲜明的“资深开源黑客”气质：**冷静、克制、事实先行、短句明快、开门见山、充满人类温度**。

大模型写 README 时常犯两种病：
1. **初级病：营销塑料套话（Marketing Fluff）**，满篇 `seamlessly`, `revolutionize`, Emoji 乱飞。
2. **高级病：技术过度包装与长难句炫技（Technical Pretension & Long-Windedness）**，满篇“护盾/矩阵/体系/双核”，一句话 70 个字不喘气，毫无“人味”。

编写或重构 README 时，必须严守以下去 AI 味与人文化规则：

---

## 1. 禁用词汇与句式黑名单 (Banned Clichés)

### ❌ 绝对禁止的假大空套话
- ❌ *"In today's fast-paced digital world / landscape..."*（在这个快节奏的时代……）
- ❌ *"Revolutionizing the way developers..."*（彻底改变开发者……的方式）
- ❌ *"Empowering seamless collaboration across diverse ecosystems..."*（赋能跨生态的无缝协作……）
- ❌ *"A testament to modern software engineering..."*
- ❌ *"Whether you are a beginner or a seasoned pro..."*（无论你是新手还是资深开发者……）
- ❌ *"Let's dive in!" / "Dive deep into..."*（让我们深入探讨……）
- ❌ *"Say goodbye to tedious X and hello to Y!"*（告别繁琐的 X，拥抱 Y！）
- ❌ *"Unleash the full power / potential of..."*（释放……的全部潜力）
- ❌ *"Game-changing / Cutting-edge / State-of-the-art"*（如果真牛逼，用 Benchmark 数据和架构事实说话，不自封定语）

### ❌ 绝对禁止的敷衍特性（把程序员基本素养当卖点）
- ❌ *"High Quality: Written with clean, maintainable code."*（谁会宣称自己写垃圾代码？）
- ❌ *"User Friendly: Intuitive interface for everyone."*（毫无事实增益）
- ❌ *"Robust & Secure: Built with enterprise security in mind."*（假大空，除非你写了具体的沙箱隔离机制）

---

## 2. 警惕高级 AI 病：技术炫技与概念膨胀 (Anti-Pretension)

很多时候 AI 自以为写得“很专业”，其实全是在堆砌高大上的虚词，人类读起来极其别扭。

### ❌ 典型的“概念膨胀”反例
- ❌ **把简单组件包装成科幻概念**：
  - *Bad*: “采用双核悬浮胶囊工具栏配合 600ms 环形蓄力载入机制构筑首屏性能守护矩阵”
  - *Good*: “列表卡片默认只加载静态封面，点击或悬停才启动预览，后台最多保持 6 个沙箱，避免占用过多内存。”
- ❌ **把常规逻辑包装成战略体系**：
  - *Bad*: “全链路多形态资产解构与摄取流水线”
  - *Good*: “拖入单个 HTML 或带图片的 zip 即可运行”
  - *Bad*: “异常死循环执行超时防御盾牌”
  - *Good*: “脚本执行超时（>6.5秒）自动中止，防止主站卡死”
- ❌ **把普通的接口抽象包装成哲学理论**：
  - *Bad*: “基于存储驱动多态适配器实现的零公网流量费数据主权架构”
  - *Good*: “文件可以存在本地磁盘、Cloudflare R2（免流量费）或 Vercel Blob，自由切换。”

### 规则：一律使用日常工程师词汇
问问自己：“我在跟同事代码审查（Code Review）或喝咖啡聊天时，会用这个词吗？”
如果不会（比如你平时绝不会对同事说“我已经接入了双核悬浮胶囊”），就坚决不要写进 README。

---

## 3. 强制切碎长难句 (Short, Punchy Sentences)

人类大脑一次只能舒适处理一个简单主谓宾结构。

### ❌ 窒息长句 vs. ✅ 清爽短句
| 窒息长句 (Bad) | 清爽短句 (Good) |
| :--- | :--- |
| *托管的所有外部 HTML 运行端点均指向独立的 `/raw/[slug]/`，强制注入严格 CSP 响应头（sandbox allow-scripts allow-forms allow-downloads allow-popups allow-modals; default-src * 'unsafe-inline' 'unsafe-eval' data: blob:），且坚决不赋予 allow-same-origin，物理隔绝访问宿主主域的 Cookie、管理员 Session 与 LocalStorage。*（一口气 140 字） | *页面运行在独立的 `/raw/[slug]/` 路径下，注入严格的 CSP 规则，并且禁用了 `allow-same-origin`。哪怕运行不受信任的第三方脚本，也碰不到你主站的 Cookie、登录态或本地存储。*（两句清晰短句） |
| *通过抽象 getStorage() 统一存储适配器实现本地磁盘与多云对象存储的无缝探测，规避厂商锁定的同时构筑零公网下行费用屏障。* | *存储随你选：可以直接保存在本地硬盘，也能连 Cloudflare R2（免公网流量费）或 Vercel Blob。切换存储不需要改动代码。* |

---

## 4. 标点与 Emoji 克制纪律 (Visual Discipline)

1. **严禁 Emoji 泛滥（Emoji Overdose）**：
   - ❌ 每一行列表前面都塞一个随机 Emoji：`🚀 Fast! ⚡ Blazing! 💡 Smart! 🔥 Hot! 🛠️ Powerful!`（典型的低端脚本味）。
   - ✅ 列表项直接使用标准的 `- **关键字:** 具体事实`。
   - ✅ Emoji 仅允许克制地作为大章节 H2 的视觉锚点（且全篇风格一致），或者全篇纯文字无 Emoji（如 uv、shadcn）。
2. **拒绝连续感叹号**：
   - 开源文档不是推销传单，语气应客观平静。全篇使用句号结尾，严禁出现 `Check it out! Awesome!` 类的感叹句。

---

## 5. 语言风格转换公式 (Before vs After)

| AI 塑料/炫技写法 (Bad) | 顶级开源 Maintainer 写法 (Good) |
| :--- | :--- |
| *Nimbalyst seamlessly empowers developers to revolutionize visual collaboration with cutting-edge AI agents.* | *Nimbalyst: Open-source visual workspace for building with Codex, Claude Code, and other coding agents. Work on sessions, worktrees, tasks, and code in one place.* (纯事实描述) |
| *Blazingly fast Python package management that solves all your dependency headaches effortlessly.* | *An extremely fast Python package and project manager, written in Rust. 10-100x faster than pip.* (带量化指标) |
| *Say goodbye to complex CSS setup and enjoy a beautiful developer experience.* | *Zero-dependency, single-file HTML design system. 0 npm packages, 0 CDN links, 100% offline.* (硬核参数) |
| *Features: 1. It is very fast. 2. It has a great UI.* | *- **Parallel agent sessions:** Run several coding agents at once, each isolated in its own git worktree.* (机制明晰) |

---

## 6. 黄金结构：加粗引导词 + 机制硬事实

描述 Features 或 Highlights 时，**永远采用以下高信息密度结构**：

`- **[名词/动词短语]:** [具体的实现机制或量化结果，不超过2句话]。`

示例（取自顶级仓库实测）：
- `- **Red/green diff review:** Step through the agent's proposed edits in the rendered document and accept or reject each one.`
- `- **Universal lockfile:** Provides cross-platform dependency resolution with hash verification.`
- `- **Plain files on disk:** Content and status in markdown, workflows in slash commands, everything in your git repo.`

