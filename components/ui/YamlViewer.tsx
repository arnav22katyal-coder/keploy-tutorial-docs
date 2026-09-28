'use client'

import * as React from 'react'
import { FileCode, Sparkles, Check, Database, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CopyButton } from './CopyButton'

const testYamlContent = `version: api.keploy.io/v1beta1
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: POST
    proto_major: 1
    proto_minor: 1
    url: /user/getOTP
    header:
      Accept: "*/*"
      Content-Length: "32"
      Content-Type: application/json
      Host: localhost:8080
      User-Agent: curl/8.4.0
    body: '{"email":"devrel@keploy.io"}'
    timestamp: 2026-09-28T10:14:02.129482Z
  resp:
    status_code: 200
    header:
      Content-Type: application/json; charset=utf-8
    body: '{"message":"OTP generated and stored successfully","status":"success"}'
    status_message: OK
    proto_major: 0
    proto_minor: 0
    timestamp: 2026-09-28T10:14:02.145102Z
  objects: []
  assertions:
    noise:
      - header.Date
  created: 1727518442`

const mockYamlContent = `version: api.keploy.io/v1beta1
kind: Generic
name: mock-0
spec:
  metadata:
    type: redis
    operation: SETEX
    port: 6379
  generic_requests:
    - payload:
        # Raw RESP (Redis Serialization Protocol)
        - "*4\\r\\n$5\\r\\nSETEX\\r\\n$16\\r\\ndevrel@keploy.io\\r\\n$3\\r\\n300\\r\\n$6\\r\\n849201\\r\\n"
  generic_responses:
    - payload:
        - "+OK\\r\\n"
---
version: api.keploy.io/v1beta1
kind: Generic
name: mock-1
spec:
  metadata:
    type: redis
    operation: GET
    port: 6379
  generic_requests:
    - payload:
        - "*2\\r\\n$3\\r\\nGET\\r\\n$16\\r\\ndevrel@keploy.io\\r\\n"
  generic_responses:
    - payload:
        - "$6\\r\\n849201\\r\\n"`

export function YamlViewer() {
  const [activeFile, setActiveFile] = React.useState<'test' | 'mock'>('test')

  const currentYaml = activeFile === 'test' ? testYamlContent : mockYamlContent
  const filename =
    activeFile === 'test'
      ? 'keploy/test-set-0/tests/test-1.yaml'
      : 'keploy/test-set-0/mocks.yaml'

  return (
    <div className="my-8 rounded-2xl border border-border bg-zinc-950 text-zinc-100 shadow-xl overflow-hidden">
      {/* Top File Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 py-2.5 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center rounded-lg bg-zinc-800/80 p-0.5 border border-zinc-700/60">
            <button
              type="button"
              onClick={() => setActiveFile('test')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all',
                activeFile === 'test'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              <Globe className="h-3.5 w-3.5" />
              test-1.yaml (HTTP Spec)
            </button>
            <button
              type="button"
              onClick={() => setActiveFile('mock')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all',
                activeFile === 'mock'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              <Database className="h-3.5 w-3.5" />
              mocks.yaml (Redis Wire Mock)
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
            {filename}
          </span>
          <CopyButton value={currentYaml} />
        </div>
      </div>

      {/* Code Display Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
        {/* YAML editor preview */}
        <div className="lg:col-span-2 p-4 overflow-x-auto font-mono text-xs leading-relaxed max-h-[440px] overflow-y-auto">
          <pre className="text-zinc-300">
            <code>
              {currentYaml.split('\n').map((line, idx) => {
                let lineClass = 'text-zinc-300'
                if (line.startsWith('#')) lineClass = 'text-zinc-500 italic'
                else if (line.includes(':')) {
                  const [key, ...rest] = line.split(':')
                  const val = rest.join(':')
                  return (
                    <div key={idx} className="table-row">
                      <span className="table-cell select-none pr-3 text-right text-zinc-600 text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="table-cell whitespace-pre">
                        <span className="text-brand-300 font-semibold">{key}:</span>
                        <span className="text-emerald-300">{val}</span>
                      </span>
                    </div>
                  )
                }

                return (
                  <div key={idx} className="table-row">
                    <span className="table-cell select-none pr-3 text-right text-zinc-600 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className={cn('table-cell whitespace-pre', lineClass)}>
                      {line || ' '}
                    </span>
                  </div>
                )
              })}
            </code>
          </pre>
        </div>

        {/* Breakdown side panel */}
        <div className="p-4 bg-zinc-900/60 flex flex-col justify-between text-xs space-y-4">
          <div>
            <h5 className="font-sans font-bold text-zinc-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-2.5">
              <Sparkles className="h-3.5 w-3.5 text-brand-400" />
              {activeFile === 'test' ? 'HTTP Test Blueprint' : 'Redis RESP Wire Protocol'}
            </h5>
            <p className="text-zinc-400 leading-relaxed text-[12px] mb-3">
              {activeFile === 'test'
                ? 'This file captures the full lifecycle of the inbound HTTP request made to your Gin application, including headers, payload body, and deterministic assertion assertions.'
                : 'Keploy captures downstream network communication at the socket layer. Notice how it recorded the exact Redis command SETEX and GET directly using Redis serialization protocol (RESP)!'}
            </p>

            <div className="space-y-2 border-t border-zinc-800 pt-3">
              {activeFile === 'test' ? (
                <>
                  <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700/50">
                    <div className="font-semibold text-brand-400 font-mono text-[11px]">
                      assertions.noise
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Dynamically changing fields (e.g. Date headers, JWT expirations) are flagged so tests never fail spuriously.
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700/50">
                    <div className="font-semibold text-emerald-400 font-mono text-[11px]">
                      spec.resp.body
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      The exact JSON response returned by Gin is locked in as the regression baseline.
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700/50">
                    <div className="font-semibold text-brand-400 font-mono text-[11px]">
                      Zero DB Refactoring
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      No need for MockRedis or gomock interfaces in Go. Keploy intercepts the TCP stream directly on port 6379.
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700/50">
                    <div className="font-semibold text-emerald-400 font-mono text-[11px]">
                      Hermetic Offline Execution
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      During <code className="text-brand-300">keploy test</code>, Redis can be completely turned off! The mock payload (+OK) is instantly returned.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-brand-950/40 border border-brand-800/50 p-2.5 text-[11px] text-brand-300">
            💡 <strong>Git Versioned:</strong> Commit this directory into your GitHub repository so your CI pipeline tests every pull request automatically.
          </div>
        </div>
      </div>
    </div>
  )
}
