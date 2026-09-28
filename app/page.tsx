import * as React from 'react'
import Link from 'next/link'
import {
  Github,
  BookOpen,
  Terminal,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Zap,
  Layers,
  Search,
  MessageSquare,
} from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { TableOfContents } from '@/components/ui/TableOfContents'
import { ReadingProgress } from '@/components/ui/ReadingProgress'
import TutorialContent from '@/content/tutorial.mdx'

export default function TutorialPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <ReadingProgress />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          {/* Left: Brand */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-foreground text-lg group tracking-tight"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm transition-transform group-hover:scale-105">
                <span className="text-lg">🐰</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight">keploy</span>
                <span className="text-muted-foreground font-mono text-xs font-normal">
                  docs
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-500/20 px-2.5 py-0.5 text-[11px] font-mono font-medium text-brand-600 dark:text-brand-400">
              v2.4.0
            </span>
          </div>

          {/* Center / Search Mock */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/70 bg-muted/40 text-xs text-muted-foreground w-64">
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1">Search quickstarts...</span>
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-mono">
              ⌘K
            </kbd>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/keploy/keploy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Keploy GitHub Repository"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Star on GitHub</span>
            </a>

            <a
              href="https://keploy.io/community"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Keploy Community"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-brand-500" />
              <span>Community</span>
            </a>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="mb-10 pb-8 border-b border-border/70">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-muted-foreground">Quickstarts</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand-600 dark:text-brand-400 font-semibold">
              Go (Gin + Redis)
            </span>
          </nav>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 dark:bg-brand-950/70 border border-brand-500/30 px-2.5 py-1 text-xs font-mono font-semibold text-brand-700 dark:text-brand-300">
              <Sparkles className="h-3 w-3" />
              DevRel Quickstart Series
            </span>
            <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-500/20 px-2.5 py-1 text-xs font-mono font-medium text-blue-700 dark:text-blue-300">
              Go 1.21+
            </span>
            <span className="inline-flex items-center rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 text-xs font-mono font-medium text-emerald-700 dark:text-emerald-300">
              Gin + Redis
            </span>
            <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-950/60 border border-purple-500/20 px-2.5 py-1 text-xs font-mono font-medium text-purple-700 dark:text-purple-300">
              Zero Code Instrumentation
            </span>
            <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-mono text-muted-foreground">
              ⏱ ~10 min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-sans">
            Testing Go Applications with Keploy
          </h1>
          <p className="mt-3 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            A developer-first, step-by-step tutorial to record real HTTP requests, capture wire-level Redis mocks, and run hermetic offline test suites with zero mock boilerplate.
          </p>

          {/* Quick Jump Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#step-1-clone-app"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all active:scale-95"
            >
              <span>Get Started Step-by-Step</span>
              <ChevronRight className="h-4 w-4" />
            </a>

            <a
              href="#interactive-simulator"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 hover:bg-muted px-4 py-2 text-xs sm:text-sm font-semibold text-foreground shadow-sm transition-all"
            >
              <Terminal className="h-4 w-4 text-brand-500" />
              <span>Try Interactive Simulator</span>
            </a>

            <a
              href="#why-keploy-for-go"
              className="inline-flex items-center gap-2 rounded-xl border border-border/70 hover:bg-muted/60 px-3.5 py-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
            >
              <Layers className="h-4 w-4" />
              <span>Architecture Deep Dive</span>
            </a>
          </div>
        </div>

        {/* Two-Column Documentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Tutorial Body (rendered MDX) */}
          <main className="lg:col-span-8 xl:col-span-9 max-w-none">
            <TutorialContent />
          </main>

          {/* Sticky Sidebar (Table of Contents) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm">
                <TableOfContents />
              </div>

              {/* Resource Help Box */}
              <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 space-y-3">
                <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-foreground">
                  Need Help?
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Join the Keploy open-source community to ask questions, share feedback, or contribute to samples.
                </p>
                <div className="pt-1 flex flex-col gap-2">
                  <a
                    href="https://keploy.io/community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    <span>Join Slack / Discord</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="https://github.com/keploy/keploy/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline"
                  >
                    <span>Report an Issue</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-border/80 bg-card/60 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white font-bold text-sm">
              🐰
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">
                Keploy DevRel Candidate Assignment
              </p>
              <p className="text-[11px] text-muted-foreground">
                Built with Next.js 14, MDX, and Tailwind CSS.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a
              href="https://github.com/keploy/keploy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://keploy.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Docs
            </a>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Deploy on Vercel
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
