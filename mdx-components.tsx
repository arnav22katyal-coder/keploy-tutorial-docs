import type { MDXComponents } from 'mdx/types'
import * as React from 'react'
import { Callout } from '@/components/ui/Callout'
import { StepGroup, Step } from '@/components/ui/StepGroup'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Pre, Figure, Figcaption } from '@/components/ui/Pre'

export const customMDXComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans mt-8 mb-4 border-b border-border/70 pb-3"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }) => (
    <h2
      id={id}
      className="text-2xl font-bold tracking-tight text-foreground font-sans mt-10 mb-4 border-b border-border/60 pb-2 scroll-mt-24 group flex items-center"
      {...props}
    >
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          className="ml-2 text-muted-foreground/40 hover:text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Link to ${children}`}
        >
          #
        </a>
      )}
    </h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3
      id={id}
      className="text-xl font-bold text-foreground font-sans mt-6 mb-3 scroll-mt-24"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="text-base font-semibold text-foreground font-sans mt-4 mb-2"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="text-muted-foreground leading-relaxed my-3 text-[15px]" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground text-[14.5px]" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-muted-foreground text-[14.5px]" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-5 border-l-4 border-brand-500 bg-brand-500/5 px-4 py-2 italic text-muted-foreground rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border shadow-sm">
      <table className="w-full text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted text-xs font-mono uppercase text-foreground border-b border-border" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-3 font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 border-b border-border/50 text-muted-foreground text-xs font-mono" {...props}>
      {children}
    </td>
  ),
  code: ({ children, className, ...props }: any) => {
    return (
      <code
        className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[13px] font-semibold text-brand-600 dark:text-brand-400 border border-border/60"
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: Pre as any,
  figure: Figure as any,
  figcaption: Figcaption as any,
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http')
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="font-medium text-brand-600 dark:text-brand-400 underline underline-offset-4 decoration-brand-500/40 hover:decoration-brand-500 transition-colors"
        {...props}
      >
        {children}
      </a>
    )
  },

  Callout,
  StepGroup,
  Step,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customMDXComponents,
    ...components,
  }
}
