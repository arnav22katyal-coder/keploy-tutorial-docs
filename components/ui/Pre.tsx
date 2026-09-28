'use client'

import * as React from 'react'
import { CopyButton } from './CopyButton'

export function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = React.useRef<HTMLPreElement>(null)
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    if (preRef.current) {
      setText(preRef.current.textContent || '')
    }
  }, [children])

  return (
    <div className="relative group rounded-xl bg-zinc-950 overflow-hidden my-4 border border-border">
      <pre ref={preRef} {...props} className="p-4 overflow-x-auto text-[13px] leading-relaxed">
        {children}
      </pre>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton value={text} className="bg-zinc-800/80 hover:bg-zinc-700/80" />
      </div>
    </div>
  )
}

export function Figure({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <figure {...props} className="relative group my-4 rounded-xl border border-border shadow-sm overflow-hidden bg-zinc-950">
      {children}
    </figure>
  )
}

export function Figcaption({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <figcaption {...props} className="px-4 py-2 border-b border-white/10 text-xs font-mono text-zinc-400 bg-zinc-900/50">
      {children}
    </figcaption>
  )
}
