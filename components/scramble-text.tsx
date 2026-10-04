'use client'

import { useEffect, useRef } from 'react'
import { animate, scrambleText } from 'animejs'

export default function ScrambleText({
  phrases,
  className,
}: {
  phrases: string[]
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const index = useRef(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const replay = () => {
      const text = phrases[index.current % phrases.length]
      index.current += 1
      animate(el, {
        innerHTML: scrambleText({
          text: text || phrases[0],
          cursor: '░▒▓█',
          from: 'left',
          duration: 750,
          settleDuration: 250,
        }),
      })
    }

    animate(el, {
      innerHTML: scrambleText({
        text: phrases[0],
        override: '',
        cursor: '░▒▓█',
        from: 'left',
        duration: 900,
        settleDuration: 300,
      }),
      delay: 600,
    })

    el.addEventListener('pointerenter', replay)
    el.addEventListener('pointerdown', replay)

    return () => {
      el.removeEventListener('pointerenter', replay)
      el.removeEventListener('pointerdown', replay)
    }
  }, [phrases])

  return <span ref={ref} className={className} aria-live="polite" />
}