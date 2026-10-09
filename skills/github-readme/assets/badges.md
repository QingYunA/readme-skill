# Shields.io Badges & GitHub Markdown Tricks

常用精美徽章与排版技巧，直接取用。

---

## 0. 先统一风格，再挑徽章

一排徽章好不好看，主要取决于三个参数是否一致：`style`、`labelColor`、`color`。整排使用同一组值：

```markdown
<a href="https://github.com/owner/repo/releases"><img src="https://img.shields.io/github/v/release/owner/repo?style=flat-square&logo=github&labelColor=16181d&color=2ea44f" alt="Release"></a>
<a href="https://github.com/owner/repo/stargazers"><img src="https://img.shields.io/github/stars/owner/repo?style=flat-square&logo=github&labelColor=16181d&color=2ea44f" alt="Stars"></a>
<img src="https://img.shields.io/badge/works%20with-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Cursor-2ea44f?style=flat-square&labelColor=16181d" alt="Works with Claude Code, Codex, Cursor">
```

挑选规则：
- 选读者想知道的：版本、Stars、支持的平台或 agent、第三方榜单。
- License 写在页脚，CI 状态留在 Actions 页。下文的 License 和 CI 写法适合面向贡献者的库。
- 第三方榜单徽章用对方提供的 SVG，不改颜色。
- 双语 README 的两份徽章要完全一样。

---

## 1. 核心状态徽章 (Flat & Minimal Style)

### GitHub 状态与版本
```markdown
<!-- Version / Release -->
<a href="https://github.com/owner/repo/releases"><img src="https://img.shields.io/github/v/release/owner/repo?style=flat&color=18181b" alt="Release"></a>

<!-- GitHub Stars -->
<a href="https://github.com/owner/repo/stargazers"><img src="https://img.shields.io/github/stars/owner/repo?style=flat&logo=github&color=18181b" alt="Stars"></a>

<!-- License -->
<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat" alt="License"></a>

<!-- CI / GitHub Actions -->
<a href="https://github.com/owner/repo/actions"><img src="https://img.shields.io/github/actions/workflow/status/owner/repo/ci.yml?branch=main&style=flat" alt="CI Status"></a>

<!-- Total Downloads -->
<img src="https://img.shields.io/github/downloads/owner/repo/total?style=flat&color=16a34a" alt="Downloads">
```

### 平台与生态
```markdown
<!-- Multi-platform -->
<img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey?style=flat" alt="Platforms">

<!-- Docker Image -->
<a href="https://hub.docker.com/r/owner/repo"><img src="https://img.shields.io/docker/v/owner/repo?logo=docker&color=2496ED" alt="Docker"></a>

<!-- Crates.io / PyPI / NPM -->
<a href="https://crates.io/crates/package"><img src="https://img.shields.io/crates/v/package?color=orange&logo=rust" alt="Crates.io"></a>
<a href="https://pypi.org/project/package"><img src="https://img.shields.io/pypi/v/package?color=blue&logo=pypi" alt="PyPI"></a>
<a href="https://www.npmjs.com/package/package"><img src="https://img.shields.io/npm/v/package?color=CB3837&logo=npm" alt="npm"></a>
```

### 社区链接
```markdown
<!-- Discord -->
<a href="https://discord.gg/your-invite"><img src="https://img.shields.io/badge/Discord-community-5865F2?logo=discord&logoColor=white" alt="Discord"></a>

<!-- X / Twitter -->
<a href="https://x.com/your_handle"><img src="https://img.shields.io/badge/X-%40your__handle-000000?logo=x" alt="X"></a>
```

---

## 2. GitHub 双模式自适应图片 (Dark / Light Mode Image Switch)

在 GitHub 上同时展示亮色与暗色界面的两种官方推荐技巧：

### 方法 A：使用 HTML `<picture>` 标签（推荐，现代规范）
```html
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/hero-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="./assets/hero-light.png">
    <img src="./assets/hero-light.png" alt="App Preview" width="100%">
  </picture>
</p>
```

### 方法 B：使用 GitHub 特有 URL Hash 后缀
```markdown
<p align="center">
  <img src="./assets/banner-light.png#gh-light-mode-only" alt="Banner Light" width="100%">
  <img src="./assets/banner-dark.png#gh-dark-mode-only" alt="Banner Dark" width="100%">
</p>
```

---

## 3. Star History（深浅两版）

放在页脚 `## Star History`，排在 `## Community` 之后、`## License` 之前：

```html
<a href="https://star-history.com/#owner/repo&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=owner/repo&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=owner/repo&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=owner/repo&type=Date" />
  </picture>
</a>
```

---

## 4. GitHub 内联视频

在任意 issue 或 PR 评论框里拖入 MP4，复制生成的 `https://github.com/user-attachments/assets/...` 链接，单独放一行。GitHub 会显示带声音的播放器。不要把这个链接包进 `<p>` 或其他标签里，否则只会显示成一个链接。

```markdown
https://github.com/user-attachments/assets/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

<p align="center"><sub>24-second demo. Turn the sound on for the music.</sub></p>
```
