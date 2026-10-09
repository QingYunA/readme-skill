# Template: Self-Hosted Platform & SaaS Alternative (Coolify / Umami / Supabase Style)

适用于：开源自托管应用、PaaS/IaaS 替代品、自建分析/监控系统、自托管后端与数据库工具、以及强调“数据在自己手里”、“隐私”与“无厂商锁定”的自建项目。

---

## 一、自托管类 README 核心设计哲学

自托管开源项目（如 **Coolify、Umami、Plausible、Supabase、Dokku**）最重要的是让读者在 1 分钟内搞清楚三件事：
1. **这是谁的开源自建版？** 直说对标哪个高价 SaaS（如 *"An open-source alternative to Heroku / Netlify"*）。
2. **帮我省了什么事/钱？** 没有每月订阅费、没有天价下行流量费、数据在自己手里。
3. **我怎么把它跑起来？** 给出一行 Docker Compose 命令，不扯长篇大论。

不要在开头写大段行业宏观分析，像一个开发者在跟朋友推荐实用小工具一样，直接说痛点和解法。

---

## 二、标准骨架与范式母版

```markdown
<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/logo-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="./assets/logo-light.png">
  <img src="./assets/logo-light.png" alt="Project Logo" width="76" height="76">
</picture>

# ProjectName

<p><strong>An open-source, self-hosted [SaaS] alternative.</strong><br>
Run [workloads] on your own server or VPS — no subscriptions, no platform limits, and zero egress fees.</p>

<p>
  <a href="https://github.com/owner/repo/releases"><img src="https://img.shields.io/badge/version-1.0.0-18181b?style=flat" alt="Version"></a>
  <a href="https://hub.docker.com/"><img src="https://img.shields.io/badge/Docker-ready-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker"></a>
  <a href="https://coolify.io/"><img src="https://img.shields.io/badge/Deploy%20on-Coolify-6366F1?style=flat" alt="Coolify"></a>
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fowner%2Frepo"><img src="https://img.shields.io/badge/Deploy%20with-Vercel-000000?style=flat&logo=vercel" alt="Deploy with Vercel"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-18181b?style=flat" alt="License"></a>
</p>

<p>
  <a href="https://your-domain.com">Website</a> ·
  <a href="https://your-domain.com/demo">Live Demo</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#comparison">Comparison</a> ·
  <a href="https://your-domain.com/api/docs">API Docs</a> ·
  <a href="README_zh.md">简体中文</a>
</p>

</div>

---

## About the Project

ProjectName is an open-source, self-hostable alternative to [Proprietary Platform].

Hosting [workloads] usually comes with annoying friction:
1. **[Pain Point 1]:** [e.g. Tedious setup just to host a few files — configuring Nginx, SSL certs, and reverse proxies].
2. **[Pain Point 2]:** [e.g. Monthly subscription fees or surprise egress bills from cloud providers].
3. **[Pain Point 3]:** [e.g. Vendor lock-in — your data is trapped in proprietary formats].

**ProjectName keeps things simple and keeps you in control:**
- **No vendor lock-in:** Everything lives on your disk or your own S3/R2 bucket.
- **Run anywhere:** Deploy on a cheap VPS (Hetzner, DigitalOcean), a home lab, Docker, Coolify, or Vercel.
- **Safe by default:** [Explain sandbox/isolation in 1 sentence].
- **Zero cloud markup:** Pay only for your server, no bandwidth or per-seat markups.

---

## Self-Hosted vs. Cloud

| | Self-Hosted (This Repo) | Managed Cloud |
| :--- | :--- | :--- |
| **Pricing** | **100% Free & Open Source (MIT)** | Free & Paid Subscription Tiers |
| **Infrastructure** | Your own VPS, Coolify, Docker, or Vercel | Fully managed global cluster |
| **Data Ownership** | 100% stored on your hardware | Encrypted cloud tenancy |
| **Maintenance** | Controlled by you | Zero maintenance & automated backups |
| **Custom Domains** | Unlimited (via reverse proxy / Caddy) | Custom subdomain routing included |
| **Get Started** | [Follow deployment guide](#deployment) | [Sign up at your-domain.com](https://your-domain.com) |

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          System Architecture Flow                           │
│                                                                             │
│  [User Ingestion / Webhook / Agent] ──> [API / Ingestion Core]              │
│                                                   │                         │
│                                                   ▼                         │
│                                     ┌───────────────────────────┐           │
│                                     │  ProjectName Core Engine  │           │
│                                     └─────────────┬─────────────┘           │
│                           ┌───────────────────────┼──────────────────────┐  │
│                           ▼                       ▼                      ▼  │
│                   [Pluggable Storage]     [Drizzle / ORM DB]     [Sandbox]  │
│                   • Local NVMe Disk       • PostgreSQL           • CSP      │
│                   • S3 / Cloudflare R2    • Local SQLite         • Isolated │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Comparison

| Core Capability | ProjectName (Self-Hosted) | [Commercial SaaS A] | [Raw Bare-Metal Script] |
| :--- | :---: | :---: | :---: |
| **100% Data Ownership** | **Yes** | No | Yes |
| **Hardened Sandboxing** | **Yes** | Partial | No |
| **Multi-Asset Auto Unpack** | **Yes** | Paid add-on | Manual |
| **CLI & Agent Push API** | **Yes** | No | Shell scripts only |
| **Bandwidth Egress Cost** | **$0 (R2 or local NVMe)** | Pay-per-gigabyte | Bandwidth dependent |

---

## Highlights

- **[Feature 1]:** [Specific mechanism or concrete fact in 1-2 sentences].
- **[Feature 2]:** [Specific mechanism or concrete fact in 1-2 sentences].
- **[Feature 3]:** [Specific mechanism or concrete fact in 1-2 sentences].
- **[Feature 4]:** [Specific mechanism or concrete fact in 1-2 sentences].

---

## Deployment

### 1. Docker Compose (Recommended for Self-Hosters)

Deploy on any Linux server (Ubuntu, Debian, Hetzner, DigitalOcean) with one command:

```bash
# 1. Download pre-configured docker-compose.yml
curl -fsSL https://raw.githubusercontent.com/owner/repo/main/docker-compose.yml -o docker-compose.yml

# 2. Configure master secret
sed -i 's/change_me/your_secure_password/' docker-compose.yml

# 3. Launch container
docker compose up -d
```

### 2. Deploy on Coolify

1. In the Coolify dashboard, click **+ Create New Resource** → **Public Repository**.
2. Enter repository URL: `https://github.com/owner/repo`.
3. Coolify will auto-detect the root `Dockerfile`. Set container port to `3000`.
4. Add environment variables: `ADMIN_PASSWORD=your_password`, `NODE_ENV=production`.
5. Click **Deploy**. Coolify automatically handles build, volumes, and SSL certificates.

### 3. Deploy with Vercel (1-Click Cloud)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fowner%2Frepo)

### 4. Run from Source (Local / Bare Metal)

```bash
git clone https://github.com/owner/repo.git
cd repo
bun install # or npm install
bun run dev
```

---

## Configuration & Environment Variables

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `ADMIN_PASSWORD` | **Yes** | `admin888` *(dev)* | Master authentication password. |
| `DATABASE_URL` | Production | None *(local SQLite)* | PostgreSQL connection string. |
| `STORAGE_DRIVER` | Optional | `local` | Storage provider (`local`, `r2`, `s3`). |

---

## License

MIT License © 2026 [Author/Organization]
```
