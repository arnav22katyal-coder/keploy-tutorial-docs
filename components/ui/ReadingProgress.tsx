'use client'

import * as React from 'react'

export function ReadingProgress() {
  const [completion, setCompletion] = React.useState(0)

  React.useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        )
      }
    }

    window.addEventListener('scroll', updateScrollCompletion)
    return () => window.removeEventListener('scroll', updateScrollCompletion)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-500 via-amber-500 to-emerald-500 z-50 transition-all duration-150"
      style={{ width: `${completion}%` }}
    />
  )
}
