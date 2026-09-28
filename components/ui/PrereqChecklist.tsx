'use client'

import * as React from 'react'
import { Check, CheckCircle2, Circle, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PrereqItem {
  id: string
  label: string
  command: string
  desc: string
}

const prereqs: PrereqItem[] = [
  {
    id: 'go',
    label: 'Go (Golang 1.20+)',
    command: 'go version',
    desc: 'Required to compile and run the Gin user authentication service.',
  },
  {
    id: 'docker',
    label: 'Docker Daemon',
    command: 'docker --version',
    desc: 'Used to run a transient local Redis instance for the initial recording phase.',
  },
  {
    id: 'keploy',
    label: 'Keploy CLI Binary',
    command: 'keploy --version',
    desc: 'The zero-code testing engine that records and mocks network calls.',
  },
  {
    id: 'curl',
    label: 'cURL or Postman',
    command: 'curl --version',
    desc: 'To trigger the /user/getOTP and /user/verifyOTP API endpoints.',
  },
]

export function PrereqChecklist() {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({
    go: true,
    docker: true,
    keploy: false,
    curl: true,
  })

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const completedCount = Object.values(checked).filter(Boolean).length
  const totalCount = prereqs.length
  const percentage = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="my-7 rounded-2xl border border-border bg-card/70 p-5 shadow-sm">
      {/* Header and Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4 mb-4">
        <div>
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">
            Interactive Environment Checklist
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Check off tools installed on your local machine before starting
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-foreground">
              {completedCount} of {totalCount} ready
            </span>
            <div className="w-28 h-2 rounded-full bg-muted overflow-hidden mt-1">
              <div
                className="h-full bg-brand-500 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          {percentage === 100 && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-500/30">
              Ready to Roll! 🚀
            </span>
          )}
        </div>
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {prereqs.map((item) => {
          const isDone = !!checked[item.id]
          return (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              className={cn(
                'cursor-pointer flex items-start gap-3 p-3 rounded-xl border transition-all text-xs select-none',
                isDone
                  ? 'border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20'
                  : 'border-border bg-background/50 hover:border-brand-500/40'
              )}
            >
              <div
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded transition-colors',
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : 'border border-muted-foreground/40 bg-background'
                )}
              >
                {isDone && <Check className="h-3 w-3" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-semibold text-foreground">{item.label}</span>
                  <code className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {item.command}
                  </code>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
