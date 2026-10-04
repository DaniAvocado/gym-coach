'use client'

import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const node = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const el = node.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    animate(el, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 420,
      ease: 'easeOutCubic',
    })
  }, [pathname])

  return <div ref={node}>{children}</div>
}