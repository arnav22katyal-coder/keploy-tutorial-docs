'use client'

import * as React from 'react'
import {
  ArrowRight,
  Database,
  Server,
  Terminal,
  FileCheck,
  Zap,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function ArchitectureDiagram() {
  const [mode, setMode] = React.useState<'record' | 'test'>('record')

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-card via-card/90 to-muted/30 p-6 shadow-lg backdrop-blur-sm">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <h4 className="text-base font-bold text-foreground font-sans">
              Interactive Keploy Architecture
            </h4>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Switch modes to visualize how Keploy captures and mocks network traffic without changing your code
          </p>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center rounded-xl bg-muted/80 p-1 border border-border/60">
          <button
            type="button"
            onClick={() => setMode('record')}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold font-mono transition-all',
              mode === 'record'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span className="h-2 w-2 rounded-full bg-red-400 animate-ping inline-block" />
            Record Mode
          </button>
          <button
            type="button"
            onClick={() => setMode('test')}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold font-mono transition-all',
              mode === 'test'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Zap className="h-3.5 w-3.5 text-emerald-200" />
            Test / Replay Mode
          </button>
        </div>
      </div>

      {/* Interactive Visual Canvas */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Node 1: Ingress / Driver */}
        <div
          className={cn(
            'flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all',
            mode === 'record'
              ? 'border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/20'
              : 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20'
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border shadow-sm mb-2 text-foreground">
            {mode === 'record' ? (
              <Terminal className="h-6 w-6 text-blue-500" />
            ) : (
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
            )}
          </div>
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground">
            {mode === 'record' ? 'Real Traffic' : 'Keploy Engine'}
          </span>
          <p className="text-sm font-semibold text-foreground mt-0.5">
            {mode === 'record' ? 'cURL / User Request' : 'Test Runner'}
          </p>
          <span className="mt-2 text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
            {mode === 'record' ? 'POST /user/getOTP' : 'Replays test-1.yaml'}
          </span>
        </div>

        {/* Node 2: Keploy Interception */}
        <div
          className={cn(
            'relative flex flex-col items-center justify-center p-5 rounded-xl border-2 text-center transition-all shadow-md',
            'border-brand-500/60 bg-brand-50/70 dark:bg-brand-950/40'
          )}
        >
          <div className="absolute -top-3 px-2 py-0.5 rounded-full bg-brand-500 text-white font-mono text-[10px] font-bold tracking-wider uppercase">
            eBPF / Proxy Core
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-brand-500/30 shadow-sm mb-2 text-brand-600 dark:text-brand-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-brand-700 dark:text-brand-300">
            Keploy Daemon
          </span>
          <p className="text-sm font-semibold text-foreground mt-0.5">
            Zero-Code Interceptor
          </p>
          <span className="mt-2 text-[11px] font-mono px-2 py-0.5 rounded bg-brand-100/80 dark:bg-brand-900/60 text-brand-800 dark:text-brand-200">
            {mode === 'record' ? 'Captures I/O bytes' : 'Injects Mocked RESP'}
          </span>
        </div>

        {/* Node 3: Go Gin App */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-purple-500/40 bg-purple-50/50 dark:bg-purple-950/20 text-center transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border shadow-sm mb-2 text-purple-600 dark:text-purple-400">
            <Server className="h-6 w-6" />
          </div>
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground">
            Target Service
          </span>
          <p className="text-sm font-semibold text-foreground mt-0.5">
            Go Gin Application
          </p>
          <span className="mt-2 text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
            Port 8080 : Unmodified
          </span>
        </div>

        {/* Node 4: Downstream Redis */}
        <div
          className={cn(
            'flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all',
            mode === 'record'
              ? 'border-red-500/40 bg-red-50/50 dark:bg-red-950/20'
              : 'border-zinc-300 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/40 opacity-70'
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border shadow-sm mb-2">
            <Database
              className={cn(
                'h-6 w-6',
                mode === 'record' ? 'text-red-500' : 'text-zinc-400'
              )}
            />
          </div>
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground">
            {mode === 'record' ? 'Live Downstream' : 'Virtual Downstream'}
          </span>
          <p className="text-sm font-semibold text-foreground mt-0.5">
            {mode === 'record' ? 'Redis Server (6379)' : 'Offline / Mocked'}
          </p>
          <span
            className={cn(
              'mt-2 text-[11px] font-mono px-2 py-0.5 rounded',
              mode === 'record'
                ? 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300'
                : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold'
            )}
          >
            {mode === 'record' ? 'Real SETEX / GET' : 'Zero Redis Needed!'}
          </span>
        </div>
      </div>

      {/* Explanatory Footer Box */}
      <div className="mt-6 rounded-xl border border-border/80 bg-background/60 p-4 text-xs leading-relaxed text-muted-foreground">
        {mode === 'record' ? (
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-brand-600">
              <Sparkles className="h-3 w-3" />
            </div>
            <div>
              <span className="font-semibold text-foreground">Record Mode Workflow: </span>
              As your Gin app interacts with Redis, Keploy intercepts network packets at the socket level. It automatically generates idempotent YAML test files (<code className="text-foreground font-mono">test-1.yaml</code>) and records the exact Redis binary protocol frames into <code className="text-foreground font-mono">mocks.yaml</code>. No mocks to write by hand!
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600">
              <Zap className="h-3 w-3" />
            </div>
            <div>
              <span className="font-semibold text-foreground">Test / Replay Mode Workflow: </span>
              Keploy launches your Gin app and sends recorded HTTP traffic into it. When your app tries to call Redis on port 6379, Keploy intercepts the TCP connection and serves the recorded responses from <code className="text-foreground font-mono">mocks.yaml</code>. Even with Redis completely stopped, all tests execute in milliseconds and pass deterministically!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
