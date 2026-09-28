'use client'

import * as React from 'react'
import { BookOpen, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  title: string
  level: number
}

const tocItems: TocItem[] = [
  { id: 'why-keploy-for-go', title: 'Why Keploy for Go?', level: 2 },
  { id: 'prerequisites', title: 'Prerequisites & Setup', level: 2 },
  { id: 'step-1-clone-app', title: 'Step 1: Clone Gin + Redis App', level: 2 },
  { id: 'step-2-start-redis', title: 'Step 2: Start Redis Downstream', level: 2 },
  { id: 'step-3-record-traffic', title: 'Step 3: Record with Keploy', level: 2 },
  { id: 'step-4-trigger-endpoints', title: 'Step 4: Trigger OTP Workflow', level: 2 },
  { id: 'step-5-inspect-artifacts', title: 'Step 5: Inspect Generated Artifacts', level: 2 },
  { id: 'step-6-replay-tests', title: 'Step 6: Replay Offline with Keploy', level: 2 },
  { id: 'interactive-simulator', title: 'Interactive Test Simulator', level: 2 },
  { id: 'architecture-deep-dive', title: 'Architecture Deep Dive', level: 2 },
  { id: 'ci-cd-integration', title: 'CI/CD Pipeline Integration', level: 2 },
  { id: 'key-takeaways', title: 'Key Takeaways & Next Steps', level: 2 },
]

export function TableOfContents() {
  const [activeId, setActiveId] = React.useState<string>('why-keploy-for-go')

  React.useEffect(() => {
    const handleScroll = () => {
      const headingElements = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[]

      const scrollPosition = window.scrollY + 120

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i]
        if (el.offsetTop <= scrollPosition) {
          setActiveId(el.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
        <BookOpen className="h-3.5 w-3.5 text-brand-500" />
        <span>On This Page</span>
      </div>

      <nav className="space-y-1">
        {tocItems.map((item) => {
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToHeading(item.id)}
              className={cn(
                'group flex w-full items-center text-left py-1.5 px-2.5 rounded-lg text-xs transition-all duration-150',
                isActive
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full mr-2 transition-all',
                  isActive
                    ? 'bg-brand-500 scale-125'
                    : 'bg-border group-hover:bg-muted-foreground'
                )}
              />
              <span className="truncate">{item.title}</span>
            </button>
          )
        })}
      </nav>

      {/* Meta Quick Info Box */}
      <div className="pt-4 mt-4 border-t border-border/70 space-y-2 text-[11px] text-muted-foreground">
        <div className="flex justify-between">
          <span>Reading time:</span>
          <span className="font-mono font-medium text-foreground">~10 mins</span>
        </div>
        <div className="flex justify-between">
          <span>Difficulty:</span>
          <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">Beginner Friendly</span>
        </div>
        <div className="flex justify-between">
          <span>Target App:</span>
          <span className="font-mono font-medium text-foreground">Gin + Redis</span>
        </div>
      </div>
    </div>
  )
}
