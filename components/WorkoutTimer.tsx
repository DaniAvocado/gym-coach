'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const STORAGE_KEY = 'workout-timer'

function load() {
  if (typeof window === 'undefined') return { startTime: null as number | null, elapsed: 0, running: false }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { startTime: null, elapsed: 0, running: false }
    return JSON.parse(raw)
  } catch {
    return { startTime: null, elapsed: 0, running: false }
  }
}

export default function WorkoutTimer() {
  const init = load()
  const [startTime, setStartTime] = useState<number | null>(init.startTime)
  const [elapsedBase, setElapsedBase] = useState(init.elapsed)
  const [isRunning, setIsRunning] = useState(init.running)
  const [now, setNow] = useState(Date.now())
  const mountRef = useRef(true)

  // Persist on every change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ startTime, elapsed: elapsedBase, running: isRunning })) } catch {}
  }, [startTime, elapsedBase, isRunning])

  // Tick while running
  useEffect(() => {
    if (!isRunning || startTime === null) return
    const iv = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(iv)
  }, [isRunning, startTime])

  const elapsedSeconds = isRunning && startTime !== null
    ? Math.floor((Date.now() - startTime) / 1000) + elapsedBase
    : elapsedBase

  const toggle = () => {
    if (isRunning) {
      // pause: freeze accumulated time
      setElapsedBase(elapsedSeconds)
      setStartTime(null)
      setIsRunning(false)
    } else {
      setStartTime(Date.now())
      setIsRunning(true)
    }
  }

  const reset = () => { setElapsedBase(0); setStartTime(null); setIsRunning(false); setNow(Date.now()) }

  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600)
    const mins = Math.floor((secs % 3600) / 60)
    const s = secs % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.25rem',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--purple)',
        borderRadius: '6px',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '4px' }}>
          Tiempo de Entrenamiento
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em' }}>
          {formatTime(elapsedSeconds)}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggle}
          style={{ padding: '10px 24px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem', background: 'var(--blue)', color: '#0b0b12' }}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset}
          style={{ padding: '10px 24px', borderRadius: '4px', border: '1px solid var(--red)', background: 'transparent', color: 'var(--red)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem' }}>
          Reset
        </motion.button>
      </div>
    </motion.div>
  )
}
