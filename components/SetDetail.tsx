'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface SetDetailProps {
  setNumber: number
  onUpdate: (weight: number, reps: number) => void
  onRemove: () => void
  initialWeight?: number
  initialReps?: number
}

export default function SetDetail({ setNumber, onUpdate, onRemove, initialWeight = 0, initialReps = 0 }: SetDetailProps) {
  const [weight, setWeight] = useState(initialWeight.toString())
  const [reps, setReps] = useState(initialReps.toString())

  const inputStyle = {
    background: 'var(--ink)',
    color: 'var(--text)',
    border: '1px solid var(--border2)',
    borderRadius: '4px',
    padding: '8px 10px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    outline: 'none',
    width: '80px',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'rgba(111,160,255,0.06)', borderRadius: '4px', borderLeft: '3px solid var(--blue)' }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px', color: 'var(--blue)', minWidth: '60px' }}>
        Serie {setNumber}
      </span>
      <input type="number" placeholder="kg" value={weight} onChange={(e) => setWeight(e.target.value)} onBlur={() => onUpdate(parseFloat(weight) || 0, parseInt(reps) || 0)} step="0.5" style={inputStyle} />
      <span style={{ color: 'var(--text-faint)' }}>Ã—</span>
      <input type="number" placeholder="reps" value={reps} onChange={(e) => setReps(e.target.value)} onBlur={() => onUpdate(parseFloat(weight) || 0, parseInt(reps) || 0)} style={inputStyle} />
      <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={onRemove} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '4px', marginLeft: 'auto' }}>âœ•</motion.button>
    </motion.div>
  )
}
