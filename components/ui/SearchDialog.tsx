'use client'

import * as React from 'react'
import { Search, X, ChevronRight, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchItem {
  id: string
  title: string
  category: string
  description: string
}

const searchItems: SearchItem[] = [
  {
    id: 'why-keploy-for-go',
    title: 'Why Keploy for Go Developers?',
    category: 'Architecture',
    description: 'Understand interface pollution, eBPF socket interception, and zero-code testing.',
  },
  {
    id: 'prerequisites',
    title: 'Prerequisites & System Setup',
    category: 'Setup',
    description: 'Verify Go, Docker, Keploy CLI, and cURL with our interactive checklist.',
  },
  {
    id: 'architecture-deep-dive',
    title: 'The 4-Phase Keploy Lifecycle',
    category: 'Architecture',
    description: 'Zero-Code Instrumentation, Traffic Capture, Test Generation, Hermetic Replay.',
  },
  {
    id: 'step-1-clone-app',
    title: 'Step 1: Clone the Gin + Redis Application',
    category: 'Tutorial Steps',
    description: 'Clone keploy/samples-go and inspect the getOTP and verifyOTP handlers.',
  },
  {
    id: 'step-2-start-redis',
    title: 'Step 2: Spin Up Downstream Redis',
    category: 'Tutorial Steps',
    description: 'Start a transient Redis container using Docker for the initial record phase.',
  },
  {
    id: 'step-3-record-traffic',
    title: 'Step 3: Record Traffic with Keploy',
    category: 'Tutorial Steps',
    description: 'Wrap your Go application with keploy record to capture network I/O.',
  },
  {
    id: 'step-4-trigger-endpoints',
    title: 'Step 4: Trigger Endpoints (getOTP & verifyOTP)',
    category: 'Tutorial Steps',
    description: 'Execute API requests to generate and verify OTP codes in real time.',
  },
  {
    id: 'step-5-inspect-artifacts',
    title: 'Step 5: Inspect Generated Tests & Mocks',
    category: 'Tutorial Steps',
    description: 'Explore test-1.yaml, test-2.yaml, and mocks.yaml in the interactive viewer.',
  },
  {
    id: 'step-6-replay-tests',
    title: 'Step 6: Replay Tests Offline with Redis Stopped',
    category: 'Tutorial Steps',
    description: 'Stop Docker Redis and execute keploy test to witness the A-Ha moment.',
  },
  {
    id: 'interactive-simulator',
    title: 'Interactive Test Runner Simulator',
    category: 'Interactive Demo',
    description: 'Simulate Keploy replaying tests without Redis directly in the browser.',
  },
  {
    id: 'ci-cd-integration',
    title: 'CI/CD Pipeline Integration (GitHub Actions)',
    category: 'DevOps',
    description: 'Automate hermetic regression tests on every pull request without test databases.',
  },
  {
    id: 'key-takeaways',
    title: 'Key Takeaways & Comparison Table',
    category: 'Summary',
    description: 'Compare traditional unit testing, integration testing, and Keploy side-by-side.',
  },
]

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          // Open triggered by parent state
          const event = new CustomEvent('open-search')
          window.dispatchEvent(event)
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filtered = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (id: string) => {
    onClose()
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 84
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-background/80 backdrop-blur-sm transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border/80 px-4 py-3 bg-muted/30">
          <Search className="h-4 w-4 text-brand-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tutorial sections, commands, or topics..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No results found for &quot;{query}&quot;. Try searching for &quot;Redis&quot;, &quot;eBPF&quot;, or &quot;Step 3&quot;.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className="group flex w-full items-start gap-3 p-3 rounded-xl text-left hover:bg-muted/70 transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <Hash className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-foreground shrink-0 self-center" />
              </button>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-border/70 px-4 py-2 bg-muted/20 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded border bg-background font-mono text-[10px]">
                Esc
              </kbd>{' '}
              to close
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded border bg-background font-mono text-[10px]">
                ↵
              </kbd>{' '}
              to select
            </span>
          </div>
          <span>Keploy DevRel Guide</span>
        </div>
      </div>
    </div>
  )
}
