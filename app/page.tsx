import * as React from 'react'
import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { TableOfContents } from '@/components/ui/TableOfContents'
import { ReadingProgress } from '@/components/ui/ReadingProgress'
import { customMDXComponents } from '@/mdx-components'
import TutorialContent from '@/content/tutorial.mdx'

export default function TutorialPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <ReadingProgress />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-foreground text-lg group tracking-tight"
            >
              <span className="font-sans">Keploy + Go (Gin + Redis): a first-timer&apos;s walkthrough</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/arnavkatyal/keploy-tutorial-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm hover:bg-muted hover:text-foreground transition-all"
            >
              <Github className="h-4 w-4" />
              <span>Source Repo</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="mb-10 pb-8 border-b border-border/70">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-sans">
            Testing Go Applications with Keploy
          </h1>
          <p className="mt-3 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            A developer-first, step-by-step tutorial to record real HTTP requests, capture wire-level Redis mocks, and run offline test suites without mock boilerplate. By Arnav Katyal.
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <a href="https://keploy.io/docs" target="_blank" className="text-brand-500 hover:underline flex items-center gap-1"><ExternalLink className="h-3 w-3"/> Official Keploy Docs</a>
            <a href="https://github.com/keploy/samples-go" target="_blank" className="text-brand-500 hover:underline flex items-center gap-1"><ExternalLink className="h-3 w-3"/> Go Samples Repo</a>
          </div>
        </div>

        {/* Two-Column Documentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Tutorial Body (rendered MDX) */}
          <main className="lg:col-span-8 xl:col-span-9 max-w-none">
            <TutorialContent components={customMDXComponents} />
          </main>

          {/* Sticky Sidebar (Table of Contents) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm">
                <TableOfContents />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-border/80 bg-card/60 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs font-bold text-foreground">
                Arnav Katyal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a
              href="https://github.com/arnavkatyal/keploy-tutorial-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Source Repo
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
