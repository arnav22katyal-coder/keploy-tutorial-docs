import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Keploy Go Quickstart Tutorial | Zero-Code Testing for Gin & Redis',
  description:
    'A developer-first, beginner-friendly tutorial on recording real HTTP traffic, capturing wire-level Redis mocks, and running hermetic offline test suites with Keploy and Go.',
  keywords: [
    'Keploy',
    'Go',
    'Golang',
    'Gin',
    'Redis',
    'API Testing',
    'Integration Testing',
    'eBPF',
    'Mock Generation',
    'DevRel',
  ],
  authors: [{ name: 'Keploy DevRel Team' }],
  openGraph: {
    title: 'Testing Go Applications with Keploy: The Zero-Code Guide',
    description:
      'Record real HTTP traffic, capture wire-level Redis mocks, and replay deterministic tests with zero code changes.',
    siteName: 'Keploy Documentation',
    locale: 'en_US',
    type: 'article',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans selection:bg-brand-500/20 selection:text-brand-600 dark:selection:text-brand-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
