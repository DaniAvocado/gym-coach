'use client'

export default function AnimatedBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      background: `
        radial-gradient(ellipse 600px 400px at 20% 30%, rgba(91,141,239,0.08), transparent),
        radial-gradient(ellipse 500px 350px at 80% 70%, rgba(255,107,157,0.06), transparent),
        radial-gradient(ellipse 400px 300px at 50% 50%, rgba(167,139,250,0.05), transparent)
      `,
      animation: 'bgShift 20s ease-in-out infinite alternate',
    }} />
  )
}
