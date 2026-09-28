import * as React from 'react'
import {
  Info,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type CalloutType = 'info' | 'tip' | 'warning' | 'success' | 'keploy'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
  className?: string
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: React.ElementType
    borderClass: string
    bgClass: string
    badgeBg: string
    badgeText: string
    titleText: string
    iconColor: string
  }
> = {
  info: {
    icon: Info,
    borderClass: 'border-blue-500/30 dark:border-blue-500/20',
    bgClass: 'bg-blue-50/70 dark:bg-blue-950/20',
    badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300',
    badgeText: 'NOTE',
    titleText: 'Note',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  tip: {
    icon: Lightbulb,
    borderClass: 'border-emerald-500/30 dark:border-emerald-500/20',
    bgClass: 'bg-emerald-50/70 dark:bg-emerald-950/20',
    badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300',
    badgeText: 'PRO TIP',
    titleText: 'Pro Tip',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  warning: {
    icon: AlertTriangle,
    borderClass: 'border-amber-500/30 dark:border-amber-500/20',
    bgClass: 'bg-amber-50/70 dark:bg-amber-950/20',
    badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300',
    badgeText: 'WARNING',
    titleText: 'Important Warning',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  success: {
    icon: CheckCircle2,
    borderClass: 'border-teal-500/30 dark:border-teal-500/20',
    bgClass: 'bg-teal-50/70 dark:bg-teal-950/20',
    badgeBg: 'bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300',
    badgeText: 'SUCCESS',
    titleText: 'Success',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
  keploy: {
    icon: Sparkles,
    borderClass: 'border-brand-500/40 dark:border-brand-500/30',
    bgClass: 'bg-orange-50/60 dark:bg-orange-950/20',
    badgeBg: 'bg-orange-100 text-orange-700 dark:bg-brand-950/80 dark:text-brand-300',
    badgeText: 'KEPLOY MAGIC',
    titleText: 'How Keploy Works Here',
    iconColor: 'text-brand-600 dark:text-brand-400',
  },
}

export function Callout({
  type = 'info',
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[type] || calloutConfig.info
  const Icon = config.icon

  return (
    <div
      className={cn(
        'my-6 rounded-xl border p-4 transition-all text-sm leading-relaxed shadow-sm',
        config.borderClass,
        config.bgClass,
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2 font-semibold text-foreground">
        <Icon className={cn('h-4 w-4 shrink-0', config.iconColor)} />
        <span
          className={cn(
            'uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-full text-[10px]',
            config.badgeBg
          )}
        >
          {config.badgeText}
        </span>
        <span className="font-medium text-foreground">
          {title || config.titleText}
        </span>
      </div>
      <div className="text-muted-foreground prose-sm dark:prose-invert max-w-none pl-6 text-[13.5px]">
        {children}
      </div>
    </div>
  )
}
