# Template: CLI & High-Performance DevTools (uv / Biome Style)

适用于：命令行工具（CLI）、编译器、包管理器、代码分析器、基础设施守护进程（Daemon）。

---

## 骨架结构与标准范式

```markdown
# tool-name

<p>
  <a href="https://crates.io/crates/tool-name"><img src="https://img.shields.io/crates/v/tool-name.svg" alt="Crates.io"></a>
  <a href="https://github.com/owner/repo/actions"><img src="https://img.shields.io/github/actions/workflow/status/owner/repo/ci.yml" alt="CI"></a>
  <a href="https://discord.gg/your-discord"><img src="https://img.shields.io/badge/Discord-community-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License"></a>
</p>

An extremely fast [tool category], written in [Rust/Go/C++]. Designed as a drop-in replacement for [legacy tool].

<!-- Benchmark 或终端录屏 ASCII / SVG / PNG -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/benchmark-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="./assets/benchmark-light.png">
    <img src="./assets/benchmark-light.png" alt="Benchmark Comparison" width="100%">
  </picture>
</p>

---

## Highlights

- **10-100x faster:** [Explain specific benchmark condition and reason, e.g., zero-copy parsing].
- **Drop-in replacement:** Compatible with standard [legacy tool flags and config files].
- **Zero external dependencies:** Distributed as a single static binary.
- **Universal lockfile / cache:** Deduplicates disk storage across projects.
- **Cross-platform:** First-class support for macOS (Apple Silicon & Intel), Linux (x86_64, aarch64, musl), and Windows.

---

## Installation

### Standalone installer (recommended)

```bash
# macOS & Linux
curl -LsSf https://your-domain.sh/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://your-domain.sh/install.ps1 | iex"
```

### Package managers

```bash
# Homebrew (macOS)
brew install owner/tap/tool-name

# Cargo (Rust)
cargo install tool-name --locked

# NPM (Node.js wrapper)
npm install -g tool-name
```

---

## Usage

### Basic commands

```bash
# Run task against local directory
tool-name run --target ./src

# Watch mode with auto-reload
tool-name watch --debounce 200ms

# Benchmark / diagnostics report
tool-name check --strict --format json
```

### Configuration (`tool-name.toml`)

```toml
[general]
workers = 8
cache_dir = "~/.cache/tool-name"

[rules]
strict = true
ignore = ["**/dist/**", "**/node_modules/**"]
```

---

## Benchmarks

Apple M3 Max (64GB RAM), a 500,000 LOC codebase, 10 runs each, medians. Run `./bench/run.sh` to reproduce; raw results are in [bench/results.json](bench/results.json).

| Tool | Cold Cache | Warm Cache | Memory Peak |
| :--- | :--- | :--- | :--- |
| **tool-name (ours)** | **140ms** | **18ms** | **34 MB** |
| Legacy Tool A | 4.2s | 1.8s | 420 MB |
| Legacy Tool B | 2.9s | 950ms | 280 MB |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local development setup and test suite execution.

## License

MIT © 2026 [Author/Organization]
```
