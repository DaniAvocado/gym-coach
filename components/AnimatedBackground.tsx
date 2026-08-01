'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight
    let raf: number
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) { mouse.x = t.clientX; mouse.y = t.clientY }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch)

    const palette = ['91,141,239', '167,139,250', '125,240,192', '255,179,221', '255,169,77']

    interface P {
      x: number; y: number; vx: number; vy: number; r: number; c: string; a: number
    }
    const particles: P[] = []
    const count = Math.min(90, Math.floor(w * h / 16000))

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.2 + 0.6,
        c: palette[Math.floor(Math.random() * palette.length)],
        a: Math.random() * 0.5 + 0.15,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // connections
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.strokeStyle = `rgba(111,160,255,${0.10 * (1 - d / 130)})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // particles + mouse attraction
      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 220 && d > 0.1) {
          const force = (220 - d) / 220 * 0.05
          p.vx += (dx / d) * force
          p.vy += (dy / d) * force
        }
        p.vx *= 0.96
        p.vy *= 0.96
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c},${p.a})`
        ctx.fill()
      }

      // glow near cursor
      if (mouse.x > -9000) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180)
        g.addColorStop(0, 'rgba(124,58,237,0.10)')
        g.addColorStop(1, 'rgba(124,58,237,0)')
        ctx.fillStyle = g
        ctx.fillRect(mouse.x - 180, mouse.y - 180, 360, 360)
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
      }}
    />
  )
}
