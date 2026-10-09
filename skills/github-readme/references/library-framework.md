# Template: Library, SDK & Framework (shadcn / Supabase Style)

适用于：UI 组件库、前端框架、后端 SDK、数据层中间件、开发工具包。

---

## 骨架结构与标准范式

```markdown
# lib-name

> A set of beautifully designed, accessible components that you can copy and paste into your apps. Open Source. Zero black box.

<!-- Hero Banner / OpenGraph Preview -->
<p align="center">
  <img src="./assets/hero-banner.png" alt="Library Banner" width="100%">
</p>

<p align="center">
  <a href="https://your-domain.com/docs">Documentation</a> ·
  <a href="https://your-domain.com/components">Components</a> ·
  <a href="https://your-domain.com/examples">Examples</a> ·
  <a href="https://github.com/owner/repo/releases">Changelog</a>
</p>

---

## Philosophy

- **You own the code:** Not a bulky `npm` dependency that hides styles behind black-box abstraction. Components are copied directly into your codebase.
- **Accessible & headless:** Built on top of native web primitives with full WAI-ARIA and keyboard navigation compliance.
- **Themable tokens:** Driven by CSS variables. Supports Light & Dark mode seamlessly with zero runtime overhead.

---

## Quick Start

### 1. Initialize your project

```bash
npx lib-name init
```

This generates `lib-name.json` and sets up your design tokens in `globals.css`.

### 2. Add components

```bash
npx lib-name add button card dialog
```

The source code for `Button`, `Card`, and `Dialog` is placed directly in your `components/ui/` directory.

### 3. Use in your code

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline">Action</Button>
      </CardContent>
    </Card>
  )
}
```

---

## Components

| Component | Description | Preview |
| :--- | :--- | :--- |
| **Button** | Primary, secondary, outline, destructive, ghost, and icon states. | [View Docs](https://your-domain.com/docs/button) |
| **Dialog** | Accessible modal dialog with backdrop blur and trap focus. | [View Docs](https://your-domain.com/docs/dialog) |
| **DataTable** | Powerful table with sorting, filtering, and row selection. | [View Docs](https://your-domain.com/docs/data-table) |

---

## Documentation

Visit [your-domain.com/docs](https://your-domain.com/docs) for the full component API reference and recipes.

## License

MIT © 2026 [Author/Organization]
```
