'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  value: string
  className?: string
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setHasCopied(true)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = value
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setHasCopied(true)
    }
  }

  return (
    <button
      type="button"
      aria-label={hasCopied ? 'Copied to clipboard' : 'Copy code to clipboard'}
      onClick={copyToClipboard}
      className={cn(
        'relative inline-flex items-center justify-center rounded-md p-1.5 text-zinc-400 transition-colors',
        'hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50',
        hasCopied && 'text-emerald-400 hover:text-emerald-300',
        className
      )}
    >
      {hasCopied ? (
        <Check className="h-4 w-4 transition-transform scale-100" />
      ) : (
        <Copy className="h-4 w-4 transition-transform scale-100" />
      )}
      <span className="sr-only">{hasCopied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}
