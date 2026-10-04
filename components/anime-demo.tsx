'use client'

import { useRef, useState } from 'react'
import { animate, createTimer, stagger } from 'animejs'
import { Button } from '@/components/ui/button'

const DURATION = 1500
const EASES = ['linear', 'inOutCubic', 'outExpo', 'outBack', 'outElastic', 'outBounce'] as const
const DOTS = Array.from({ length: 25 }, (_, i) => i)

export default function AnimeDemo() {
  const [ease, setEase] = useState<(typeof EASES)[number]>('outExpo')
  const [loop, setLoop] = useState(false)
  const [state, setState] = useState<'idle' | 'running'>('idle')
  const timeRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<ReturnType<typeof animate> | null>(null)
  const timerRef = useRef<ReturnType<typeof createTimer> | null>(null)

  const stop = () => {
    animRef.current?.cancel()
    timerRef.current?.cancel()
    animRef.current = null
    timerRef.current = null
  }

  const run = () => {
    stop()
    setState('running')
    animRef.current = animate('.demo-dot', {
      translateY: [0, -30],
      rotate: [0, 180],
      scale: [1, 1.3],
      duration: DURATION,
      delay: stagger(22),
      ease,
      onComplete: () => {
        if (loop) run()
      },
    })
    if (timeRef.current) timeRef.current.textContent = '0 ms'
    if (barRef.current) barRef.current.style.width = '0%'
    timerRef.current = createTimer({
      duration: DURATION,
      autoplay: false,
      onUpdate: (t) => {
        if (timeRef.current) timeRef.current.textContent = `${Math.round(t.currentTime)} ms`
        if (barRef.current) barRef.current.style.width = `${t.progress * 100}%`
      },
      onComplete: () => setState('idle'),
    })
    timerRef.current.play()
  }

  return (
    <div className="enter-cards mt-12 w-full rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch">
        <div className="flex w-full flex-col sm:w-56">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">timer</p>
          <span ref={timeRef} className="mt-2 font-[var(--font-mono)] text-4xl font-bold text-[var(--text)] sm:text-5xl">
            0 ms
          </span>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div ref={barRef} className="h-full rounded-full bg-gradient-to-r from-[var(--pink)] to-[var(--blue)]" style={{ width: '0%' }} />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <label htmlFor="ease" className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">ease</label>
            <select
              id="ease"
              value={ease}
              onChange={(e) => setEase(e.target.value as (typeof EASES)[number])}
              className="h-9 rounded-lg border border-white/15 bg-[var(--ink)] px-2 text-xs text-[var(--text)] outline-none"
            >
              {EASES.map((e) => (
                <option key={e} value={e} className="bg-[var(--ink)]">{e}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-black/20 p-5">
          <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
            {DOTS.map((i) => (
              <div
                key={i}
                className="demo-dot h-6 w-6 rounded-md sm:h-7 sm:w-7"
                style={{
                  background:
                    i % 7 === 0 ? 'var(--pink)' : i % 7 === 2 ? 'var(--blue)' : i % 7 === 4 ? 'var(--purple)' : 'var(--text-muted)',
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={run}
              className="!h-10 bg-gradient-to-r from-[var(--pink)] to-[var(--blue)] font-bold text-[#0b0b12] hover:opacity-90"
            >
              {state === 'running' ? 'Repetir' : 'Jugar'}
            </Button>
            <label className="flex cursor-pointer items-center gap-2 text-xs text-[var(--text-muted)]">
              <input
                type="checkbox"
                checked={loop}
                onChange={(e) => setLoop(e.target.checked)}
                className="h-3.5 w-3.5 accent-[var(--pink)]"
              />
              loop
            </label>
          </div>
        </div>

        <div className="hidden w-full rounded-xl border border-white/10 bg-black/30 p-4 lg:block lg:w-72">
          <pre className="overflow-x-auto font-[var(--font-mono)] text-[11px] leading-relaxed text-[var(--text-muted)]">
{`animate('.demo-dot', {
  translateY: [0, -30],
  rotate: [0, 180],
  scale: [1, 1.3],
  duration: 1500,
  delay: stagger(22),
  ease: '${ease}',
})`}
          </pre>
        </div>
      </div>
    </div>
  )
}