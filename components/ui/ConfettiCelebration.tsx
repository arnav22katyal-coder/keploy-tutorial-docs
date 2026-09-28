'use client'

import * as React from 'react'
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ConfettiCelebration() {
  const [celebrated, setCelebrated] = React.useState(false)

  const triggerConfetti = async () => {
    setCelebrated(true)
    try {
      const confetti = (await import('canvas-confetti')).default
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B00', '#FFA94D', '#10B981', '#3B82F6', '#8B5CF6'],
      })
    } catch {
      // Graceful fallback if module not loaded
    }
  }

  return (
    <div className="my-10 rounded-2xl border-2 border-brand-500/30 bg-gradient-to-br from-brand-50/70 via-background to-orange-50/50 dark:from-brand-950/30 dark:via-background dark:to-orange-950/20 p-6 sm:p-8 text-center shadow-lg relative overflow-hidden">
      <div className="relative z-10 max-w-xl mx-auto">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-md mb-4 animate-bounce">
          <Sparkles className="h-7 w-7" />
        </div>

        <h3 className="text-2xl font-extrabold text-foreground font-sans tracking-tight">
          Congratulations! You Just Tested Go Without Writing Mocks
        </h3>

        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          You recorded real HTTP traffic, captured wire-level Redis RESP calls, inspected generated YAML specs, and replayed tests completely offline.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={triggerConfetti}
            className={cn(
              'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all active:scale-95',
              celebrated
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-brand-500 hover:bg-brand-600 glow-orange'
            )}
          >
            {celebrated ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Done! You Are a Keploy Master! 🎉
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Celebrate Tutorial Completion! 🚀
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
