'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface StepProps {
  number: number | string
  title: string
  time?: string
  badge?: string
  children: React.ReactNode
  className?: string
}

export function Step({
  number,
  title,
  time,
  badge,
  children,
  className,
}: StepProps) {
  return (
    <div className={cn('relative pl-10 pb-10 last:pb-2 group', className)}>
      {/* Vertical connecting line */}
      <div className="absolute left-[17px] top-9 bottom-0 w-[2px] bg-zinc-200 dark:bg-zinc-800 group-last:hidden" />

      {/* Step circle indicator */}
      <div className="absolute left-0 top-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 font-mono font-bold text-sm border-2 border-brand-500/40 shadow-sm transition-all group-hover:scale-105 group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-950/60 dark:text-brand-400 dark:border-brand-500/50">
        {number}
      </div>

      {/* Step Header */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1 mb-3">
        <h3 className="text-xl font-bold tracking-tight text-foreground font-sans m-0">
          {title}
        </h3>
        {badge && (
          <span className="inline-flex items-center rounded-md bg-brand-100 dark:bg-brand-950/70 px-2.5 py-0.5 text-xs font-medium text-brand-800 dark:text-brand-300 font-mono">
            {badge}
          </span>
        )}
        {time && (
          <span className="text-xs text-muted-foreground font-mono">
            ⏱ {time}
          </span>
        )}
      </div>

      {/* Step Content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-[15px]">
        {children}
      </div>
    </div>
  )
}

export function StepGroup({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('my-8 pl-1 border-l-0', className)}>
      {children}
    </div>
  )
}
