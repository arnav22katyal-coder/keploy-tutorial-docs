'use client'

import * as React from 'react'
import { FileCode } from 'lucide-react'
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

const GO_KEYWORDS = new Set([
  'package',
  'import',
  'func',
  'return',
  'type',
  'struct',
  'interface',
  'var',
  'const',
  'if',
  'else',
  'for',
  'range',
  'nil',
  'true',
  'false',
  'make',
  'new',
  'select',
  'case',
  'default',
  'go',
  'defer',
  'switch',
  'break',
  'continue',
  'map',
  'chan',
])

const GO_TYPES = new Set([
  'string',
  'int',
  'int64',
  'int32',
  'bool',
  'error',
  'byte',
  'float64',
  'uint',
  'uint64',
  'any',
  'Context',
  'Engine',
  'Client',
  'Options',
  'H',
])

const BASH_COMMANDS = new Set([
  'sudo',
  'curl',
  'docker',
  'keploy',
  'git',
  'cd',
  'go',
  'echo',
  'export',
  'mv',
  'tar',
  'grep',
  'rm',
  'cat',
  'chmod',
  'mkdir',
  'brew',
  'wsl',
  'http',
  'run',
  'test',
  'record',
])

function highlightYamlValue(val: string): React.ReactNode {
  if (!val) return null
  const trimmed = val.trim()
  if (trimmed.startsWith('#')) {
    return <span className="text-zinc-500 italic">{val}</span>
  }
  if (trimmed === 'true' || trimmed === 'false' || trimmed === 'null') {
    return <span className="text-amber-400 font-semibold">{val}</span>
  }
  if (trimmed.startsWith('"') || trimmed.startsWith("'")) {
    return <span className="text-emerald-400">{val}</span>
  }
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return <span className="text-amber-300">{val}</span>
  }
  return <span className="text-zinc-300">{val}</span>
}

function highlightTokens(line: string, language: string): React.ReactNode {
  const lang = (language || '').toLowerCase()
  if (!line || line.trim() === '') return ' '

  // 1. Full line comments
  if (
    ((lang === 'bash' ||
      lang === 'sh' ||
      lang === 'zsh' ||
      lang === 'shell' ||
      lang === 'yaml' ||
      lang === 'yml' ||
      lang === 'dockerfile') &&
      line.trimStart().startsWith('#')) ||
    ((lang === 'go' || lang === 'golang') && line.trimStart().startsWith('//'))
  ) {
    return <span className="text-zinc-500 italic">{line}</span>
  }

  // 2. YAML Key-Value detection
  if (lang === 'yaml' || lang === 'yml') {
    if (line.trim() === '---' || line.trim() === '...') {
      return <span className="text-zinc-500 font-bold">{line}</span>
    }
    const yamlKeyMatch = line.match(/^(\s*)(-\s+)?([a-zA-Z0-9_\-\.]+):(.*)$/)
    if (yamlKeyMatch) {
      const [, indent, bullet, key, rest] = yamlKeyMatch
      return (
        <>
          {indent}
          {bullet && <span className="text-rose-400 font-bold">{bullet}</span>}
          <span className="text-brand-300 font-semibold">{key}:</span>
          {highlightYamlValue(rest)}
        </>
      )
    }
  }

  // 3. Regex tokenization
  let regex: RegExp
  if (lang === 'go' || lang === 'golang') {
    regex =
      /(\/\/[^\n]*)|(`[^`]*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_][a-zA-Z0-9_]*\b)|(\S)/g
  } else if (
    lang === 'bash' ||
    lang === 'sh' ||
    lang === 'zsh' ||
    lang === 'shell' ||
    lang === 'curl' ||
    lang === 'terminal'
  ) {
    regex =
      /(#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(--?[a-zA-Z0-9_\-]+)|(https?:\/\/[^\s'"]+)|(\$[A-Z0-9_]+|\$\{[^}]+\})|(\b\d+\b)|(\b[a-zA-Z_][a-zA-Z0-9_]*\b)|(\S)/g
  } else {
    regex =
      /(#[^\n]*|\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_][a-zA-Z0-9_]*\b)|(\S)/g
  }

  const tokens: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(line.slice(lastIndex, match.index))
    }
    const token = match[0]
    const tokenIndex = match.index

    if (token.startsWith('//') || token.startsWith('#')) {
      tokens.push(
        <span key={tokenIndex} className="text-zinc-500 italic">
          {token}
        </span>
      )
    } else if (
      token.startsWith('"') ||
      token.startsWith("'") ||
      token.startsWith('`')
    ) {
      tokens.push(
        <span key={tokenIndex} className="text-emerald-400">
          {token}
        </span>
      )
    } else if (token.startsWith('--') || (token.startsWith('-') && token.length > 1 && !/^\d/.test(token))) {
      tokens.push(
        <span key={tokenIndex} className="text-amber-400">
          {token}
        </span>
      )
    } else if (token.startsWith('http://') || token.startsWith('https://')) {
      tokens.push(
        <span
          key={tokenIndex}
          className="text-blue-400 underline decoration-blue-500/40"
        >
          {token}
        </span>
      )
    } else if (token.startsWith('$') && token.length > 1) {
      tokens.push(
        <span key={tokenIndex} className="text-rose-400">
          {token}
        </span>
      )
    } else if (/^\d+(\.\d+)?$/.test(token)) {
      tokens.push(
        <span key={tokenIndex} className="text-amber-300">
          {token}
        </span>
      )
    } else if (GO_KEYWORDS.has(token)) {
      tokens.push(
        <span key={tokenIndex} className="text-purple-400 font-semibold">
          {token}
        </span>
      )
    } else if (GO_TYPES.has(token)) {
      tokens.push(
        <span key={tokenIndex} className="text-cyan-400">
          {token}
        </span>
      )
    } else if (BASH_COMMANDS.has(token)) {
      tokens.push(
        <span key={tokenIndex} className="text-cyan-400 font-semibold">
          {token}
        </span>
      )
    } else {
      tokens.push(
        <span key={tokenIndex} className="text-zinc-200">
          {token}
        </span>
      )
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < line.length) {
    tokens.push(line.slice(lastIndex))
  }

  return tokens
}

export function CodeBlock({
  children,
  code: rawCodeProp,
  language = 'bash',
  filename,
  showLineNumbers: explicitShowLineNumbers,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  // Extract text from children if code prop is not explicitly passed
  let code = rawCodeProp || ''
  if (!code && typeof children === 'string') {
    code = children
  } else if (!code && React.isValidElement(children)) {
    const props = children.props as {
      children?: React.ReactNode
      className?: string
    }
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

  const showLineNumbers =
    explicitShowLineNumbers !== undefined
      ? explicitShowLineNumbers
      : !isTerminal && lines.length > 2

  const langDisplayName: Record<string, string> = {
    bash: 'BASH',
    sh: 'SHELL',
    zsh: 'ZSH',
    go: 'GO',
    golang: 'GO',
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
                const lineContentToHighlight = isCommandPrompt
                  ? line.replace(/^\s*\$\s*/, '')
                  : line

                return (
                  <div
                    key={idx}
                    className={cn(
                      'table-row transition-colors',
                      isHighlighted &&
                        'bg-brand-500/15 -mx-4 px-4 block w-full border-l-2 border-brand-500'
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
                          <span className="text-brand-400 select-none mr-2 font-bold font-mono">
                            $
                          </span>
                          {highlightTokens(lineContentToHighlight, language)}
                        </>
                      ) : (
                        highlightTokens(lineContentToHighlight, language)
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
