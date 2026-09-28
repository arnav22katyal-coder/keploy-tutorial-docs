# 🐰 Keploy Go Quickstart: Developer Documentation & Interactive Guide

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![MDX](https://img.shields.io/badge/Content-MDX-yellow?style=flat-square&logo=markdown)](https://mdxjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Keploy](https://img.shields.io/badge/Keploy-v2.4-FF6B00?style=flat-square)](https://keploy.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> A modern, single-page, developer-focused documentation website built with **Next.js 14**, **MDX**, and **Tailwind CSS** for the **Keploy DevRel Candidate Assignment**.

This project provides an intuitive, beginner-friendly walkthrough explaining how to use Keploy with a **Go (Gin framework) + Redis** authentication microservice. It explains not just *how* to run the commands, but the technical **"why"** behind Keploy's zero-code eBPF/proxy network interception, wire-level mock generation, and hermetic offline replay.

---

## 🌟 Key Features & Bonus Implementations

### 🎨 Visual & Interactive Components (Bonus Points)
- **🌓 Light / Dark / System Mode:** Smooth theme switcher with persistent user preference using `next-themes`.
- **⌨️ ⌘K Command Palette & Quick Search (`<SearchDialog />`):** Full keyboard-navigable search modal with real-time section filtering and instant jumping.
- **🔄 Interactive Architecture Diagram (`<ArchitectureDiagram />`):** Visualizes how Keploy sits between incoming client traffic, the Go Gin binary, and downstream Redis on port 6379, toggling between **Record Mode** and **Test Mode**.
- **📊 4-Phase Lifecycle Stepper (`<KeployFlowDiagram />`):** Clickable interactive tabs explaining the 4 stages: Zero-Code Instrumentation ➔ Ingress/Egress Capture ➔ Test & Mock Generation ➔ Hermetic Replay.
- **🔍 3-File Interactive YAML Inspector (`<YamlViewer />`):** Side-by-side inspectable view of captured `test-1.yaml` (getOTP HTTP spec), `test-2.yaml` (verifyOTP HTTP spec), and `mocks.yaml` (Redis RESP wire protocol payload) with token syntax styling and deep-dive annotations explaining `assertions.noise`.
- **⚡ Interactive Test Runner Simulator (`<InteractiveSimulator />`):** A simulated interactive terminal where users can trigger a test replay with Redis completely shut down to witness the "A-ha!" moment without needing a local CLI.
- **💻 Syntax-Highlighted Code Blocks (`<CodeBlock />`):** Tokenized syntax highlighting for Go, Bash, YAML, JSON, and Dockerfile with line numbers, terminal header dots, and copy-to-clipboard functionality.
- **✅ Prerequisites Checklist (`<PrereqChecklist />`):** Interactive checklist calculating readiness percentage for Go, Docker, Keploy CLI, and cURL.
- **🎉 Confetti Celebration (`<ConfettiCelebration />`):** Interactive celebratory card with particle burst upon completing the tutorial.
- **📜 Reading Progress Bar & Sticky TOC (`<TableOfContents />`):** Top scroll progress bar and sticky sidebar with active scrollspy heading highlighting and smooth scrolling.

---

## 🏗 Project Architecture & Tech Stack

```
keploy-tutorial-docs/
├── app/
│   ├── globals.css              # Tailwind base, dark mode tokens & custom typography
│   ├── layout.tsx               # Root layout with ThemeProvider, fonts & SEO metadata
│   └── page.tsx                 # Documentation shell, navbar, ⌘K search, hero & MDX renderer
├── components/
│   ├── theme-provider.tsx       # next-themes client provider
│   └── ui/
│       ├── ArchitectureDiagram.tsx # Interactive Record vs Replay network flow
│       ├── Callout.tsx          # Info, tip, warning, success, and Keploy-magic callouts
│       ├── CodeBlock.tsx        # Syntax-highlighted code blocks with copy button & tabs
│       ├── ConfettiCelebration.tsx # Completion milestone component
│       ├── CopyButton.tsx       # Accessible one-click clipboard copy
│       ├── InteractiveSimulator.tsx# Terminal simulator demonstrating offline replay
│       ├── KeployFlowDiagram.tsx   # 4-stage testing lifecycle visualizer
│       ├── PrereqChecklist.tsx  # Dynamic checklist for dev environment
│       ├── ReadingProgress.tsx  # Scroll depth progress bar
│       ├── SearchDialog.tsx     # ⌘K Command palette search modal
│       ├── StepGroup.tsx        # Sequential walkthrough steps with timeline lines & scroll anchors
│       ├── TableOfContents.tsx  # Scrollspy-driven table of contents with DOM offset tracking
│       ├── Tabs.tsx             # Interactive tabbed interface
│       ├── ThemeToggle.tsx      # Dark / light mode toggle
│       └── YamlViewer.tsx       # 3-file YAML viewer for test-1, test-2, and mocks
├── content/
│   └── tutorial.mdx             # The complete tutorial authored in rich MDX
├── lib/
│   └── utils.ts                 # Classname merge utility (clsx + tailwind-merge)
├── mdx-components.tsx           # Global MDX component mapping for Next.js App Router
├── mdx.d.ts                     # Ambient TypeScript declarations for MDX
├── next-env.d.ts                # Next.js ambient environment declarations
├── next.config.mjs              # Next.js configuration with MDX and remark/rehype plugins
├── package.json                 # Project dependencies and build scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration with custom theme tokens
├── tsconfig.json                # TypeScript compiler configuration
└── README.md                    # Comprehensive documentation and setup guide
```

---

## 🚀 Quickstart: Running Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended)
- `npm` or `pnpm` or `yarn`

### 2. Installation
Clone this repository and install dependencies:

```bash
git clone https://github.com/<your-username>/keploy-tutorial-docs.git
cd keploy-tutorial-docs

# Install dependencies
npm install
```

### 3. Development Server
Run the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
Verify the production build:

```bash
npm run build
npm run start
```

---

## 🌐 Deploying to Vercel

This repository is optimized for one-click deployment on [Vercel](https://vercel.com):

1. Push this project to a public GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Keploy Go quickstart documentation site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/keploy-tutorial-docs.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `keploy-tutorial-docs` GitHub repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **"Deploy"**. Your live static documentation site will be ready in under 60 seconds!

---

## 📖 The Tutorial Walkthrough: Go (Gin + Redis) with Keploy

Here is a summary of the workflow demonstrated in the tutorial:

### Phase 1: Infrastructure & App Setup
1. **Clone the Sample:** `git clone https://github.com/keploy/samples-go.git && cd samples-go/gin-redis`
2. **Start Redis:** `docker run -p 6379:6379 --name redis-server -d redis:alpine`

### Phase 2: Record Traffic with Zero Code Changes
Run Keploy in recording mode wrapping the Go entrypoint:
```bash
sudo -E keploy record -c "go run main.go"
```
Send sample HTTP requests to trigger the full OTP workflow:
```bash
# 1. Request OTP for email
curl -X POST http://localhost:8080/user/getOTP \
  -H "Content-Type: application/json" \
  -d '{"email":"devrel@keploy.io"}'

# 2. Verify the OTP code
curl -X POST http://localhost:8080/user/verifyOTP \
  -H "Content-Type: application/json" \
  -d '{"email":"devrel@keploy.io","otp":"849201"}'
```
Keploy automatically captures the incoming HTTP requests, the outgoing Redis `SETEX` and `GET` commands on port 6379, and saves:
- `keploy/test-set-0/tests/test-1.yaml` (getOTP HTTP assertion spec)
- `keploy/test-set-0/tests/test-2.yaml` (verifyOTP HTTP assertion spec)
- `keploy/test-set-0/mocks.yaml` (Redis wire protocol RESP mocks)

### Phase 3: The "A-Ha!" Moment — Hermetic Offline Replay
Shut down the Redis server completely:
```bash
docker stop redis-server
```
Replay the test suite with Keploy:
```bash
sudo -E keploy test -c "go run main.go" --delay 10
```
**Result:** All tests pass in milliseconds! Keploy intercepted the app's TCP calls to port 6379 and served the recorded mock data without touching external infrastructure.

---

## 📝 Assignment Deliverables Format

When submitting your assignment, provide:
1. **Public GitHub Repository Link:** `https://github.com/<your-username>/keploy-tutorial-docs`
2. **Live Vercel Deployment Link:** `https://keploy-tutorial-docs.vercel.app`

---

## 📄 License

This project is licensed under the MIT License. Built with ❤️ for the Keploy community.
