'use client'

import * as React from 'react'
import {
  Code2,
  Radio,
  FileCheck2,
  PlayCircle,
  CheckCircle,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FlowStage {
  step: string
  title: string
  subtitle: string
  command: string
  icon: React.ElementType
  description: string
  highlights: string[]
}

const stages: FlowStage[] = [
  {
    step: '01',
    title: 'Zero-Code Instrumentation',
    subtitle: 'No SDK or handler refactoring',
    command: 'keploy record -c "go run main.go"',
    icon: Code2,
    description:
      'Unlike traditional testing frameworks that force you to write mock interfaces, dependency injection containers, and stub boilerplate, Keploy runs alongside your Go binary without touching a single line of application source code.',
    highlights: [
      'Zero code changes required',
      'eBPF / transparent socket-level capture',
      'Supports standard Gin router and go-redis client',
    ],
  },
  {
    step: '02',
    title: 'Traffic & Dependency Capture',
    subtitle: 'Intercepts ingress & egress in flight',
    command: 'curl -X POST http://localhost:8080/user/getOTP ...',
    icon: Radio,
    description:
      'Send real API calls to your endpoints. Keploy captures the exact HTTP request, HTTP response, and all downstream TCP network transactions made by your app to Redis (like SETEX and GET).',
    highlights: [
      'Synchronous correlation of API calls and DB operations',
      'Captures wire-level Redis RESP protocol commands',
      'Handles multi-step auth workflows seamlessly',
    ],
  },
  {
    step: '03',
    title: 'Deterministic Test Generation',
    subtitle: 'Human-readable YAML artifacts',
    command: 'ls keploy/test-set-0/',
    icon: FileCheck2,
    description:
      'Keploy serializes captured interactions into readable YAML files. test-1.yaml holds the HTTP assertions and schema, while mocks.yaml holds the Redis responses ready for instant virtualization.',
    highlights: [
      'Checked straight into Git version control',
      'Configurable noise filters for timestamps and tokens',
      'Self-contained and editable declarative specs',
    ],
  },
  {
    step: '04',
    title: 'Hermetic Offline Replay',
    subtitle: 'Run in CI/CD without Redis',
    command: 'keploy test -c "go run main.go"',
    icon: PlayCircle,
    description:
      'During test execution, Keploy boots your Gin app and feeds it recorded HTTP requests. When the app queries Redis, Keploy intercepts the call and serves the recorded mock. Redis can be completely shut down!',
    highlights: [
      'Tests run in milliseconds without external infra',
      'No flaky tests caused by dirty database state',
      'Instant code coverage reports in terminal and CI',
    ],
  },
]

export function KeployFlowDiagram() {
  const [activeStep, setActiveStep] = React.useState(0)
  const current = stages[activeStep]
  const Icon = current.icon

  return (
    <div className="my-8 rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-base font-bold text-foreground font-sans flex items-center gap-2">
            <Layers className="h-4 w-4 text-brand-500" />
            The Keploy 4-Step Lifecycle
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click through each phase to inspect how Keploy transforms manual API calls into resilient automated regression suites
          </p>
        </div>
      </div>

      {/* Step Selector Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {stages.map((stage, idx) => {
          const StageIcon = stage.icon
          const isActive = idx === activeStep
          return (
            <button
              key={stage.step}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={cn(
                'flex flex-col items-start p-3 rounded-xl border text-left transition-all',
                isActive
                  ? 'border-brand-500/80 bg-brand-50/80 dark:bg-brand-950/40 shadow-sm ring-1 ring-brand-500/50'
                  : 'border-border/70 bg-background/50 hover:bg-muted/60 text-muted-foreground'
              )}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span
                  className={cn(
                    'font-mono text-xs font-bold',
                    isActive ? 'text-brand-600 dark:text-brand-400' : 'text-muted-foreground'
                  )}
                >
                  PHASE {stage.step}
                </span>
                <StageIcon
                  className={cn(
                    'h-4 w-4',
                    isActive ? 'text-brand-500' : 'text-muted-foreground'
                  )}
                />
              </div>
              <span className="font-semibold text-xs text-foreground line-clamp-1">
                {stage.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Stage Detailed Card */}
      <div className="rounded-xl border border-border/80 bg-background/80 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border/70 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-bold text-foreground text-sm font-sans">
                {current.title}
              </h5>
              <p className="text-xs text-muted-foreground">{current.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center font-mono text-xs bg-zinc-900 text-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-800">
            <span className="text-brand-400 mr-2">$</span>
            {current.command}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
          {current.description}
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-border/60">
          {current.highlights.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-xs text-foreground/80 font-medium"
            >
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
