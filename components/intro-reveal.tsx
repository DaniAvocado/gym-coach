'use client'

import { useEffect, useRef, useState } from 'react'
import { createTimeline, scrambleText, stagger } from 'animejs'

const WORD = 'Coach'

const introRows = [2, 3, 4, 5, 4, 3, 2]

const featureRows: { word: string; color: string }[][] = [
  [{ word: 'Entrenamientos', color: 'var(--pink)' }, { word: 'Nutrición', color: 'var(--blue)' }],
  [
    { word: 'Recuperación', color: 'var(--purple)' },
    { word: 'Coach IA', color: 'var(--blue-light)' },
    { word: 'Macros', color: 'var(--pink)' },
  ],
  [
    { word: '302 ejercicios', color: 'var(--blue)' },
    { word: 'Sobrecarga progresiva', color: 'var(--purple)' },
    { word: 'Cards de progreso', color: 'var(--pink)' },
    { word: 'Body Map', color: 'var(--blue-light)' },
  ],
  [{ word: 'Workout Timer', color: 'var(--pink)' }, { word: 'Recovery Zone', color: 'var(--blue)' }],
]

export default function IntroReveal() {
  const [gone, setGone] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true)
      return
    }

    const tl = createTimeline({ defaults: { ease: 'out(3)' } })

    tl.add('.intro-slide-1', {
      opacity: { to: 1, duration: 250, ease: 'linear' },
      scale: { from: 0.75, to: 1, duration: 1500, ease: 'inOut(3)' },
      ease: 'inOut(3)',
    })
    tl.add(
      '.intro-slide-1 p.center',
      {
        scale: { from: 3 },
        color: { from: 'var(--text-faint)', to: 'var(--pink)' },
        innerHTML: scrambleText({ override: ' ', ease: 'inQuad', duration: 500, from: 'center', cursor: '░▒▓█' }),
      },
      '<<'
    )
    tl.add(
      '.intro-slide-1 p:not(.center)',
      {
        scale: { from: 0.75 },
        color: { to: 'var(--text-muted)' },
        innerHTML: scrambleText({ override: ' ', from: 'center', duration: 500, revealDelay: 250, cursor: '░▒▓', perturbation: 0.25 }),
      },
      stagger([250, 750], { grid: true, from: 'center', ease: 'out(3)', start: '<<' })
    )
    tl.add(
      '.intro-slide-1 p:not(.center)',
      { innerHTML: scrambleText({ text: '', override: false, from: 'center', ease: 'outQuad', reversed: true, duration: 200, cursor: '░▒▓' }) },
      '<+=150'
    )
    tl.add(
      '.intro-slide-1 p.center',
      {
        scale: 1.35,
        color: { to: 'var(--blue)' },
        ease: 'inOutExpo',
        duration: 900,
        innerHTML: scrambleText({ text: 'Tu coach en el bolsillo', ease: 'inQuad', override: false, from: 'center', duration: 700, perturbation: 0.25 }),
      },
      '<<'
    )

    tl.set('.intro-slide-2', { opacity: 1 }, '<<')
    tl.add(
      '.intro-slide-2 p',
      { innerHTML: scrambleText({ override: ' ', from: 'center', duration: 500, revealDelay: 250, cursor: '░▒▓', perturbation: 0.5 }) },
      stagger([0, 600], { grid: true, from: 'center', ease: 'out(3)', start: '<<+=200', reversed: true })
    )
    tl.add(
      '.intro-slide-2 p',
      { scale: [0.8, 1] },
      stagger([0, 120], { grid: true, from: 'center', ease: 'out(3)', start: '<<', reversed: true })
    )

    tl.set('.intro-slide-3', { opacity: 1 }, '<<')
    tl.add(
      '.intro-slide-3 p.brand',
      {
        color: { to: 'var(--text)' },
        scale: 1.25,
        ease: 'inOutExpo',
        innerHTML: scrambleText({ override: ' ', from: 'center', settleDuration: 500, revealRate: 33, perturbation: 0.2 }),
      },
      '-=250'
    )
    tl.add(
      '.intro-slide-3 p.brand',
      {
        color: { to: 'var(--text)' },
        duration: 1250,
        innerHTML: scrambleText({ text: 'Tu entrenador personal en el bolsillo', override: false, from: 'center', cursor: '░▒▓', duration: 750, ease: 'inOut' }),
      },
      '<+=750'
    )
    tl.add('.intro-slide-3 p.tag', {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 500,
      ease: 'outExpo',
    })
    tl.add(
      overlay,
      {
        opacity: 0,
        ease: 'outExpo',
        duration: 600,
        onComplete: () => setGone(true),
      },
      '<+=600'
    )

    tl.init()
    return () => {
      tl.cancel()
    }
  }, [])

  if (gone) return null

  return (
    <div ref={overlayRef} aria-hidden className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[var(--ink)] select-none">
      <div className="relative aspect-video flex w-full max-w-[1000px] flex-col items-center justify-center">
        <div className="intro-slide intro-slide-1 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          {introRows.map((count, r) => (
            <div className="flex flex-row flex-nowrap justify-center" key={r}>
              {Array.from({ length: count }, (_, c) => (
                <p
                  key={c}
                  className={`font-[var(--font-mono)] text-[clamp(1rem,3vw,2rem)] leading-none text-[var(--text-faint)] m-[1ch] shrink-0 whitespace-nowrap ${r === 3 && c === 2 ? 'center' : ''}`}
                >
                  {WORD}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="intro-slide intro-slide-2 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          {featureRows.map((row, r) => (
            <div className="flex flex-row flex-nowrap justify-center" key={r}>
              {row.map(({ word, color }) => (
                <p
                  key={word}
                  style={{ color }}
                  className="font-[var(--font-mono)] text-[clamp(1rem,3vw,2rem)] leading-none m-[1ch] shrink-0 whitespace-nowrap"
                >
                  {word}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="intro-slide intro-slide-3 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <p className="brand font-[var(--font-mono)] text-[clamp(1.4rem,4.5vw,3rem)] font-bold leading-tight text-[var(--text)] text-center m-[1ch] whitespace-nowrap">
            Gym Coach
          </p>
          <p className="tag mt-4 text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">Hecho con anime.js</p>
        </div>
      </div>
    </div>
  )
}