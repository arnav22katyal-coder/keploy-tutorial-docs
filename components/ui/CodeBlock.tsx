'use client'

import * as React from 'react'
import { Terminal, FileCode, Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CopyButton } from './CopyButton'

interface CodeBlockProps {
  children?: React.ReactNode
  code?: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  className?: string
}

export function CodeBlock({
  children,
  code: rawCodeProp,
  language = 'bash',
  filename,
  showLineNumbers = false,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  // Extract text from children if code prop is not explicitly passed
  let code = rawCodeProp || ''
  if (!code && typeof children === 'string') {
    code = children
  } else if (!code && React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode; className?: string }
    if (typeof props.children === 'string') {
      code = props.children
    }
  }

  // Clean trailing newlines
  const trimmedCode = code.replace(/\n$/, '')
  const lines = trimmedCode ? trimmedCode.split('\n') : []

  const isTerminal =
    language === 'bash' ||
    language === 'sh' ||
    language === 'shell' ||
    language === 'zsh' ||
    language === 'terminal' ||
    language === 'curl'

  const langDisplayName: Record<string, string> = {
    bash: 'BASH',
    sh: 'SHELL',
    zsh: 'ZSH',
    go: 'GO',
    yaml: 'YAML',
    yml: 'YAML',
    json: 'JSON',
    dockerfile: 'DOCKER',
    http: 'HTTP',
  }

  return (
    <div
      className={cn(
        'group relative my-5 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-950 text-zinc-100 shadow-md dark:border-zinc-800/80',
        className
      )}
    >
      {/* Top Header Bar */}
      <div className="flex h-10 items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90 px-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          {isTerminal ? (
            <div className="flex items-center gap-1.5 mr-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            </div>
          ) : (
            <FileCode className="h-3.5 w-3.5 text-zinc-400" />
          )}

          {filename ? (
            <span className="font-sans font-medium text-zinc-300">
              {filename}
            </span>
          ) : (
            <span className="font-semibold text-zinc-400">
              {langDisplayName[language.toLowerCase()] || language.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <CopyButton value={trimmedCode} />
        </div>
      </div>

      {/* Code Container */}
      <div className="overflow-x-auto p-4 text-[13px] font-mono leading-relaxed selection:bg-brand-500/30">
        {lines.length > 0 ? (
          <pre className="m-0 p-0 bg-transparent">
            <code>
              {lines.map((line, idx) => {
                const lineNum = idx + 1
                const isHighlighted = highlightLines.includes(lineNum)
                const isCommandPrompt = isTerminal && line.trimStart().startsWith('$')

                return (
                  <div
                    key={idx}
                    className={cn(
                      'table-row transition-colors',
                      isHighlighted && 'bg-brand-500/15 -mx-4 px-4 block w-full border-l-2 border-brand-500'
                    )}
                  >
                    {showLineNumbers && (
                      <span className="table-cell select-none pr-4 text-right text-zinc-600 text-xs">
                        {lineNum}
                      </span>
                    )}
                    <span className="table-cell whitespace-pre">
                      {isCommandPrompt ? (
                        <>
                          <span className="text-brand-400 select-none mr-1.5 font-bold">$</span>
                          <span className="text-zinc-100">{line.replace(/^\s*\$\s*/, '')}</span>
                        </>
                      ) : (
                        <span className="text-zinc-200">{line || ' '}</span>
                      )}
                    </span>
                  </div>
                )
              })}
            </code>
          </pre>
        ) : (
          <div className="text-zinc-300">{children}</div>
        )}
      </div>
    </div>
  )
}
