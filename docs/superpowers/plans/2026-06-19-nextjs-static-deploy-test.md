# Next.js Static Deploy Test Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal Next.js static export site that deploys cleanly to both Netlify and Coolify.

**Architecture:** Next.js App Router with `output: 'export'` produces a static `out/` directory at build time. Netlify is configured via `netlify.toml` to publish that directory. Coolify auto-detects the Next.js project and runs the build command.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: all project files via `create-next-app`

- [ ] **Step 1: Scaffold with create-next-app**

```bash
cd /home/riz/netlify
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias="@/*" --no-git
```

Accept all defaults when prompted.

- [ ] **Step 2: Verify scaffold**

```bash
ls /home/riz/netlify
```

Expected: `app/`, `package.json`, `next.config.ts`, `tsconfig.json`, `public/`, `node_modules/`

- [ ] **Step 3: Init git and commit**

```bash
git init && git add . && git commit -m "chore: scaffold Next.js app"
```

---

### Task 2: Configure static export

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Replace next.config.ts with static export config**

Full file contents:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
}

export default nextConfig
```

- [ ] **Step 2: Run build to verify static export**

```bash
npm run build
```

Expected: Build succeeds, `out/` directory created.

```bash
ls out/
```

Expected: `index.html` present alongside `_next/` directory.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts && git commit -m "feat: configure static export"
```

---

### Task 3: Build landing page

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/page.tsx**

Full file contents:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">It works.</h1>
        <p className="text-gray-400 text-xl">Deployed successfully.</p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Replace app/layout.tsx**

Full file contents:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deploy Test',
  description: 'Testing Netlify and Coolify deployments',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Run build to verify no errors**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript or lint errors. `out/index.html` contains "It works."

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/layout.tsx && git commit -m "feat: add landing page"
```

---

### Task 4: Add Netlify config

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Create netlify.toml**

Full file contents:

```toml
[build]
  command = "npm run build"
  publish = "out"
```

- [ ] **Step 2: Run build one final time to confirm everything is clean**

```bash
npm run build && echo "Build OK"
```

Expected: `Build OK` printed with no errors.

- [ ] **Step 3: Commit**

```bash
git add netlify.toml && git commit -m "chore: add netlify.toml for Netlify deployment"
```

---

## Done

The repo is ready to push to GitHub. 

- **Netlify:** Connect the repo in the Netlify dashboard — it will detect `netlify.toml` and deploy automatically.
- **Coolify:** Add the repo as a new resource, select "Static Site" or let it auto-detect Next.js. Set build command `npm run build` and publish directory `out` if not auto-detected.
