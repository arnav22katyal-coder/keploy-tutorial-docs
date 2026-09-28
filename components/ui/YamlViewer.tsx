'use client'

import * as React from 'react'
import { Sparkles, Database, Globe, KeyRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CopyButton } from './CopyButton'

const test1YamlContent = `version: api.keploy.io/v1beta1
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

const test2YamlContent = `version: api.keploy.io/v1beta1
kind: Http
name: test-2
spec:
  metadata: {}
  req:
    method: POST
    proto_major: 1
    proto_minor: 1
    url: /user/verifyOTP
    header:
      Accept: "*/*"
      Content-Length: "45"
      Content-Type: application/json
      Host: localhost:8080
      User-Agent: curl/8.4.0
    body: '{"email":"devrel@keploy.io","otp":"849201"}'
    timestamp: 2026-09-28T10:14:15.892014Z
  resp:
    status_code: 200
    header:
      Content-Type: application/json; charset=utf-8
    body: '{"message":"OTP verified successfully","status":"success"}'
    status_message: OK
    proto_major: 0
    proto_minor: 0
    timestamp: 2026-09-28T10:14:15.908231Z
  objects: []
  assertions:
    noise:
      - header.Date
  created: 1727518455`

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

type ActiveFileType = 'test-1' | 'test-2' | 'mocks'

export function YamlViewer() {
  const [activeFile, setActiveFile] = React.useState<ActiveFileType>('test-1')

  const fileMap: Record<ActiveFileType, { content: string; path: string }> = {
    'test-1': {
      content: test1YamlContent,
      path: 'keploy/test-set-0/tests/test-1.yaml',
    },
    'test-2': {
      content: test2YamlContent,
      path: 'keploy/test-set-0/tests/test-2.yaml',
    },
    mocks: {
      content: mockYamlContent,
      path: 'keploy/test-set-0/mocks.yaml',
    },
  }

  const current = fileMap[activeFile]

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
          <div className="flex flex-wrap items-center rounded-lg bg-zinc-800/80 p-0.5 border border-zinc-700/60 gap-0.5">
            <button
              type="button"
              onClick={() => setActiveFile('test-1')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all',
                activeFile === 'test-1'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              <Globe className="h-3.5 w-3.5" />
              test-1.yaml (getOTP)
            </button>

            <button
              type="button"
              onClick={() => setActiveFile('test-2')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all',
                activeFile === 'test-2'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              <KeyRound className="h-3.5 w-3.5" />
              test-2.yaml (verifyOTP)
            </button>

            <button
              type="button"
              onClick={() => setActiveFile('mocks')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all',
                activeFile === 'mocks'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              <Database className="h-3.5 w-3.5" />
              mocks.yaml (Redis Wire)
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-[11px] font-mono text-zinc-400 hidden md:inline">
            {current.path}
          </span>
          <CopyButton value={current.content} />
        </div>
      </div>

      {/* Code Display Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
        {/* YAML editor preview */}
        <div className="lg:col-span-2 p-4 overflow-x-auto font-mono text-xs leading-relaxed max-h-[440px] overflow-y-auto">
          <pre className="text-zinc-300">
            <code>
              {current.content.split('\n').map((line, idx) => {
                if (line.trim() === '---') {
                  return (
                    <div key={idx} className="table-row">
                      <span className="table-cell select-none pr-3 text-right text-zinc-600 text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="table-cell whitespace-pre text-zinc-500 font-bold">
                        {line}
                      </span>
                    </div>
                  )
                }
                if (line.trim().startsWith('#')) {
                  return (
                    <div key={idx} className="table-row">
                      <span className="table-cell select-none pr-3 text-right text-zinc-600 text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="table-cell whitespace-pre text-zinc-500 italic">
                        {line}
                      </span>
                    </div>
                  )
                }
                const match = line.match(/^(\s*)(-\s+)?([a-zA-Z0-9_\-\.]+):(.*)$/)
                if (match) {
                  const [, indent, bullet, key, rest] = match
                  return (
                    <div key={idx} className="table-row">
                      <span className="table-cell select-none pr-3 text-right text-zinc-600 text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="table-cell whitespace-pre">
                        {indent}
                        {bullet && (
                          <span className="text-rose-400 font-bold">{bullet}</span>
                        )}
                        <span className="text-brand-300 font-semibold">{key}:</span>
                        <span className="text-emerald-300">{rest}</span>
                      </span>
                    </div>
                  )
                }

                return (
                  <div key={idx} className="table-row">
                    <span className="table-cell select-none pr-3 text-right text-zinc-600 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="table-cell whitespace-pre text-zinc-200">
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
              {activeFile === 'test-1' && 'test-1.yaml (getOTP Spec)'}
              {activeFile === 'test-2' && 'test-2.yaml (verifyOTP Spec)'}
              {activeFile === 'mocks' && 'mocks.yaml (Redis Wire Mocks)'}
            </h5>

            <p className="text-zinc-400 leading-relaxed text-[12px] mb-3">
              {activeFile === 'test-1' &&
                'Captures the inbound HTTP request to generate an OTP. Keploy recorded the full request payload, HTTP headers, and verified the 200 OK response baseline.'}
              {activeFile === 'test-2' &&
                'Captures the verification step where the user submits their OTP. Keploy binds this request directly to the Redis mock holding the generated code.'}
              {activeFile === 'mocks' &&
                'Keploy intercepts network packets at the socket level. Notice how it recorded both SETEX and GET operations directly in raw Redis Serialization Protocol (RESP) frames!'}
            </p>

            <div className="space-y-2 border-t border-zinc-800 pt-3">
              {activeFile === 'test-1' && (
                <>
                  <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700/50">
                    <div className="font-semibold text-brand-400 font-mono text-[11px]">
                      assertions.noise
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Dynamically changing fields (like the Date header) are automatically marked as noise so tests never fail due to clock drift.
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700/50">
                    <div className="font-semibold text-emerald-400 font-mono text-[11px]">
                      spec.resp.body
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      The exact JSON response returned by Gin is preserved as the regression baseline.
                    </div>
                  </div>
                </>
              )}

              {activeFile === 'test-2' && (
                <>
                  <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700/50">
                    <div className="font-semibold text-brand-400 font-mono text-[11px]">
                      spec.req.body
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Records the verified email and the exact OTP code submitted by the user.
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700/50">
                    <div className="font-semibold text-emerald-400 font-mono text-[11px]">
                      Deterministic Assertion
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Confirms that Gin verified the OTP against Redis and returned &quot;OTP verified successfully&quot;.
                    </div>
                  </div>
                </>
              )}

              {activeFile === 'mocks' && (
                <>
                  <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700/50">
                    <div className="font-semibold text-brand-400 font-mono text-[11px]">
                      mock-0: SETEX
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Wire-level Redis SETEX command with 300s TTL storing the 6-digit OTP for devrel@keploy.io.
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700/50">
                    <div className="font-semibold text-emerald-400 font-mono text-[11px]">
                      mock-1: GET
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Returns the stored OTP ($6 849201) when Gin queries Redis during verification — even when Redis is dead!
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-brand-950/40 border border-brand-800/50 p-2.5 text-[11px] text-brand-300">
            💡 <strong>Git Versioned:</strong> Commit this directory into your GitHub repository so your CI pipeline tests every PR automatically without Redis!
          </div>
        </div>
      </div>
    </div>
  )
}
