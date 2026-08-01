'use client'

import Link from 'next/link'
import AnimatedBackground from '@/components/AnimatedBackground'

const features = [
  { title: 'Entrenamientos', desc: 'Registra series, pesos y repeticiones. Sobrecarga progresiva automática.' },
  { title: 'Nutrición', desc: 'Macros calculados con Mifflin-St Jeor y comidas rápidas predefinidas.' },
  { title: 'Recuperación', desc: 'Mapa muscular con estado de descanso y zonas listas para entrenar.' },
  { title: 'Coach IA', desc: 'Recomendaciones basadas en tus datos reales de entrenamiento y dieta.' },
]

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--ink)', overflow: 'hidden', fontFamily: 'var(--font-mono)' }}>
      <AnimatedBackground />

      {/* Glow blobs */}
      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,157,0.25), transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: '20%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,141,239,0.22), transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-15%', left: '30%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.20), transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto', padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* Glass logo badge */}
        <div style={{
          padding: '14px 28px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--text)' }}>
            Gym <span style={{ fontStyle: 'italic', color: 'var(--pink)' }}>Coach</span>
          </span>
        </div>

        {/* Hero */}
        <h1 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--text)', marginTop: '2.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Tu <span style={{ color: 'var(--pink)' }}>entrenador</span> personal
          <br />
          en el <span style={{ color: 'var(--blue)' }}>bolsillo</span>
        </h1>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '560px', marginTop: '1.25rem', lineHeight: 1.7 }}>
          Trackea entrenamientos, nutrición y recuperación. El coach IA te dice
          cuánto peso subir, qué comer y cuándo descansar — basado en ciencia real.
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/auth"
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, var(--pink), var(--blue))',
              color: '#0b0b12',
              borderRadius: '10px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(255,107,157,0.35)',
              transition: 'transform 0.15s',
            }}>
            Empezar ahora
          </Link>
          <Link href="/auth"
            style={{
              padding: '14px 32px',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--text)',
              borderRadius: '10px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              textDecoration: 'none',
            }}>
            Iniciar sesión
          </Link>
        </div>

        {/* Feature cards - glass */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', width: '100%', marginTop: '3.5rem' }}>
          {features.map((f, idx) => (
            <div key={idx} style={{
              padding: '24px',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '14px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              textAlign: 'left',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: idx % 3 === 0 ? 'var(--pink)' : idx % 3 === 1 ? 'var(--blue)' : 'var(--purple)' }}>
                {f.title}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.6 }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)', marginTop: '3.5rem' }}>
          Hecho con rosa, azul y morado. React + Supabase + Next.js
        </p>
      </div>
    </div>
  )
}
