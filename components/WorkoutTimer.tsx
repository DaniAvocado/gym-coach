'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function WorkoutTimer() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600)
    const mins = Math.floor((secs % 3600) / 60)
    const s = secs % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const reset = () => { setSeconds(0); setIsRunning(false) }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.25rem',
        background: 'var(--ink-panel)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--purple)',
        borderRadius: '6px',
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '4px' }}>
          Tiempo de Entrenamiento
        </div>
        <motion.p
          key={seconds}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '2.2rem',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '0.05em',
          }}
        >
          {formatTime(seconds)}
        </motion.p>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsRunning(!isRunning)}
          style={{
            padding: '10px 24px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '0.8rem',
            background: 'var(--blue)',
            color: '#0b0b12',
          }}
        >
          {isRunning ? 'Pausar' : 'Iniciar'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          style={{
            padding: '10px 24px',
            borderRadius: '4px',
            border: '1px solid var(--red)',
            background: 'transparent',
            color: 'var(--red)',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '0.8rem',
          }}
        >
          Reset
        </motion.button>
      </div>
    </motion.div>
  )
}
