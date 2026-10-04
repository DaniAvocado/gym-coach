'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { animate, createTimeline, stagger, utils } from 'animejs'
import { cn } from 'cn'
import AnimatedBackground from '@/components/AnimatedBackground'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

const features = [
  {
    title: 'Catálogo de Ejercicios',
    desc: '302 ejercicios con ilustraciones SVG, búsqueda y filtros por músculo, equipo y tipo.',
    accent: 'var(--pink)',
    num: '01',
  },
  {
    title: 'Entrenamientos',
    desc: 'Registra series, pesos y repeticiones. Sobrecarga progresiva automática.',
    accent: 'var(--blue)',
    num: '02',
  },
  {
    title: 'Nutrición',
    desc: 'Macros calculados con Mifflin-St Jeor y comidas rápidas predefinidas.',
    accent: 'var(--purple)',
    num: '03',
  },
  {
    title: 'Coach IA',
    desc: 'Recomendaciones basadas en tus datos reales de entrenamiento y dieta.',
    accent: 'var(--blue-light)',
    num: '04',
  },
]

const stats = [
  { value: 302, suffix: '', label: 'ejercicios ilustrados' },
  { value: 4, suffix: '', label: 'módulos integrados' },
  { value: 24, suffix: '/7', label: 'coach disponible' },
]

const blobs = [
  { top: '-10%', left: '-10%', size: 500, color: 'rgba(255,107,157,0.25)' },
  { top: '20%', right: '-10%', size: 600, color: 'rgba(91,141,239,0.22)' },
  { bottom: '-15%', left: '30%', size: 500, color: 'rgba(167,139,250,0.20)' },
]

export default function Home() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const tl = createTimeline({ defaults: { ease: 'easeOutExpo' } })
      .add('.enter-hero', { opacity: [0, 1], translateY: [26, 0], duration: 900, delay: stagger(90) }, 0)
      .add('.enter-fade', { opacity: [0, 1], translateY: [14, 0], duration: 800, delay: stagger(110) }, 0.25)
      .add('.enter-cards', { opacity: [0, 1], translateY: [22, 0], duration: 700, delay: stagger(120) }, 0.45)

    animate('.logo-float', {
      translateY: [0, -6], duration: 3800, loop: true, ease: 'inOutSine', direction: 'alternate',
    })

    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count)
      const obj = { v: 0 }
      animate(obj, {
        v: [0, target],
        duration: 1800,
        ease: 'outQuart',
        delay: 500,
        modifier: utils.round(0),
        onUpdate: () => { el.textContent = String(obj.v) },
      })
    })

    tl.play()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--ink)] font-[var(--font-mono)]">
      <AnimatedBackground />

      {blobs.map((b, i) => (
        <div
          key={i}
          className="pointer-events-none fixed z-0 rounded-full blur-[40px]"
          style={{
            top: b.top, left: b.left, right: b.right, bottom: b.bottom,
            width: b.size, height: b.size,
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
          }}
        />
      ))}

      <div className="relative z-1 mx-auto flex w-full max-w-[1000px] flex-col items-center px-6 py-20 text-center">
        <Badge
          variant="outline"
          className="logo-float enter-hero h-12 rounded-2xl border-white/15 bg-white/[0.06] px-7 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
        >
          <span className="text-lg font-bold text-[var(--text)]">
            Gym <span className="italic text-[var(--pink)]">Coach</span>
          </span>
        </Badge>

        <h1 className="enter-hero mt-10 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--text)]">
          Tu <span className="text-[var(--pink)]">entrenador</span> personal
          <br />
          en el <span className="text-[var(--blue)]">bolsillo</span>
        </h1>

        <p className="enter-hero mt-5 max-w-[560px] text-base leading-relaxed text-[var(--text-muted)]">
          302 ejercicios con ilustraciones, tracking de entrenamientos, nutrición y
          recuperación. El coach IA te dice cuánto peso subir, qué comer y cuándo descansar.
        </p>

        <div className="enter-hero mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/auth"
            className={cn(
              buttonVariants({ size: 'lg' }),
              '!h-11 !px-7 bg-gradient-to-r from-[var(--pink)] to-[var(--blue)] font-bold text-[#0b0b12] shadow-[0_8px_32px_rgba(255,107,157,0.35)] hover:opacity-90'
            )}
          >
            Empezar ahora
          </Link>
          <Link
            href="/auth"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              '!h-11 !px-7 border-white/15 bg-white/[0.06] font-bold text-[var(--text)] backdrop-blur-xl hover:bg-white/[0.1]'
            )}
          >
            Iniciar sesión
          </Link>
        </div>

        <div className="enter-fade mt-12 grid w-full grid-cols-3 gap-3 sm:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.04] px-2 py-5 backdrop-blur-md">
              <span className="text-3xl font-bold text-[var(--text)] sm:text-4xl">
                <span data-count={s.value}>0</span>
                {s.suffix}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)] sm:text-xs">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="enter-cards mt-8 grid w-full gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <Card
              key={f.num}
              className="group/card border border-white/10 bg-white/[0.06] backdrop-blur-xl hover:-translate-y-1 hover:bg-white/[0.09] transition-all duration-200 ring-white/10"
            >
              <CardContent className="flex items-start gap-4 !pt-5">
                <span
                  className="shrink-0 rounded-md px-2 py-1 text-xs font-bold text-[#0b0b12]"
                  style={{ background: `linear-gradient(135deg, ${f.accent}, var(--blue))` }}
                >
                  {f.num}
                </span>
                <div className="text-left">
                  <h3 className="text-sm font-bold" style={{ color: f.accent }}>{f.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="enter-fade mt-14 text-[11px] text-[var(--text-faint)]">
          Hecho con rosa, azul y morado. React + Supabase + Next.js
        </p>
      </div>
    </div>
  )
}