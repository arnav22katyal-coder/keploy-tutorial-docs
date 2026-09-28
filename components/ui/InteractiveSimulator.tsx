'use client'

import * as React from 'react'
import { Play, RotateCcw, ServerOff, Terminal, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogEntry {
  text: string
  color?: string
  delay: number
}

const simulationLogs: LogEntry[] = [
  { text: '$ docker stop redis-server', color: 'text-amber-400 font-bold', delay: 200 },
  { text: 'redis-server stopped. (Notice: Redis is now offline!)', color: 'text-zinc-400 italic', delay: 600 },
  { text: '$ sudo -E keploy test -c "go run main.go" --delay 10', color: 'text-brand-400 font-bold', delay: 1100 },
  { text: '[KEPLOY] 🐰 Keploy v2.4.0 (Zero-code eBPF engine initialized)', color: 'text-zinc-300', delay: 1500 },
  { text: '[KEPLOY] Starting target application: "go run main.go"', color: 'text-blue-400', delay: 1900 },
  { text: '[GIN-debug] POST   /user/getOTP              --> main.handleGetOTP (3 handlers)', color: 'text-zinc-500', delay: 2300 },
  { text: '[GIN-debug] POST   /user/verifyOTP           --> main.handleVerifyOTP (3 handlers)', color: 'text-zinc-500', delay: 2500 },
  { text: '[GIN-debug] [WARNING] Listening and serving HTTP on :8080', color: 'text-zinc-400', delay: 2800 },
  { text: '[KEPLOY] ⚡ Intercepting outgoing TCP connections on port 6379...', color: 'text-brand-300 font-medium', delay: 3200 },
  { text: '[KEPLOY] >>> Replaying test case: test-1 [POST /user/getOTP]', color: 'text-cyan-400 font-semibold', delay: 3700 },
  { text: '[APP] Received getOTP request for devrel@keploy.io', color: 'text-zinc-400', delay: 4100 },
  { text: '[KEPLOY MOCK] Virtualized Redis SETEX devrel@keploy.io 300 849201 -> returned (+OK) [0.4ms]', color: 'text-emerald-400', delay: 4500 },
  { text: '[KEPLOY TEST] ✅ test-1 PASSED (Status: 200 OK | Response matched expected baseline)', color: 'text-emerald-300 font-bold', delay: 4900 },
  { text: '[KEPLOY] >>> Replaying test case: test-2 [POST /user/verifyOTP]', color: 'text-cyan-400 font-semibold', delay: 5400 },
  { text: '[APP] Received verifyOTP request for devrel@keploy.io', color: 'text-zinc-400', delay: 5800 },
  { text: '[KEPLOY MOCK] Virtualized Redis GET devrel@keploy.io -> returned ($6 849201) [0.3ms]', color: 'text-emerald-400', delay: 6200 },
  { text: '[KEPLOY TEST] ✅ test-2 PASSED (Status: 200 OK | OTP verified successfully)', color: 'text-emerald-300 font-bold', delay: 6600 },
  { text: '==================================================', color: 'text-zinc-600', delay: 7000 },
  { text: '🎉 TEST RUN COMPLETE: 2 Passed, 0 Failed, 0 Skipped', color: 'text-emerald-400 font-bold', delay: 7200 },
  { text: '🚀 Total execution time: 1.2s (Zero live Redis dependency required!)', color: 'text-brand-300 font-semibold', delay: 7400 },
]

export function InteractiveSimulator() {
  const [isRunning, setIsRunning] = React.useState(false)
  const [displayedLogs, setDisplayedLogs] = React.useState<LogEntry[]>([])
  const [isCompleted, setIsCompleted] = React.useState(false)
  const logsEndRef = React.useRef<HTMLDivElement>(null)
  const timeoutIdsRef = React.useRef<NodeJS.Timeout[]>([])

  const clearAllTimeouts = () => {
    timeoutIdsRef.current.forEach(clearTimeout)
    timeoutIdsRef.current = []
  }

  React.useEffect(() => {
    return () => {
      clearAllTimeouts()
    }
  }, [])

  const runSimulation = () => {
    clearAllTimeouts()
    setIsRunning(true)
    setIsCompleted(false)
    setDisplayedLogs([])

    simulationLogs.forEach((entry, index) => {
      const tid = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, entry])
        if (index === simulationLogs.length - 1) {
          setIsRunning(false)
          setIsCompleted(true)
        }
      }, entry.delay)
      timeoutIdsRef.current.push(tid)
    })
  }

  const resetSimulation = () => {
    clearAllTimeouts()
    setIsRunning(false)
    setIsCompleted(false)
    setDisplayedLogs([])
  }

  React.useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayedLogs])

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 shadow-xl overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 py-3 gap-3">
        <div className="flex items-center gap-2.5">
          <Terminal className="h-4 w-4 text-brand-400" />
          <div>
            <h4 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-200">
              Interactive Test Replay Simulator
            </h4>
            <p className="text-[11px] text-zinc-400 font-normal">
              Experience the &quot;A-Ha!&quot; moment: run tests with Redis completely stopped
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isRunning && !isCompleted && (
            <button
              type="button"
              onClick={runSimulation}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow transition-all active:scale-95"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Simulate Test Run
            </button>
          )}

          {isRunning && (
            <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-brand-500 animate-ping" />
              Replaying tests...
            </span>
          )}

          {isCompleted && (
            <button
              type="button"
              onClick={runSimulation}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Run Again
            </button>
          )}

          {displayedLogs.length > 0 && !isRunning && (
            <button
              type="button"
              onClick={resetSimulation}
              className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="p-4 font-mono text-xs leading-relaxed min-h-[260px] max-h-[380px] overflow-y-auto bg-black/90">
        {displayedLogs.length === 0 ? (
          <div className="h-[220px] flex flex-col items-center justify-center text-center text-zinc-500">
            <ServerOff className="h-8 w-8 mb-2 text-zinc-600 animate-bounce" />
            <p className="text-zinc-400 text-xs font-sans font-medium">
              Click &quot;Simulate Test Run&quot; above
            </p>
            <p className="text-[11px] text-zinc-600 max-w-sm mt-1">
              Watch Keploy launch the Go app, intercept TCP calls on port 6379, and serve mocks without Redis running.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {displayedLogs.map((log, index) => (
              <div
                key={index}
                className={cn('animate-fade-in whitespace-pre-wrap', log.color || 'text-zinc-300')}
              >
                {log.text}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        )}
      </div>

      {/* Educational Insight Footer */}
      {isCompleted && (
        <div className="border-t border-emerald-500/30 bg-emerald-950/30 p-3.5 text-xs text-emerald-300 flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
          <div>
            <strong className="text-emerald-200 font-semibold">The Core DevRel Insight: </strong>
            Notice how Redis was shut down before running tests, yet the OTP verification passed seamlessly. Keploy intercepted Redis wire requests and supplied the captured responses from <code className="text-white font-mono bg-zinc-900 px-1 py-0.5 rounded">mocks.yaml</code>. Your tests become fast, 100% deterministic, and ready for CI without test databases!
          </div>
        </div>
      )}
    </div>
  )
}
