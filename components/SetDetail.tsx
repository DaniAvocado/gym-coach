'use client'

import { useState } from 'react'

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
  const commit = () => onUpdate(parseFloat(weight) || 0, parseInt(reps) || 0)

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
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'rgba(111,160,255,0.06)', borderRadius: '4px', borderLeft: '3px solid var(--blue)', flexWrap: 'wrap', animation: 'slideIn .25s ease backwards' }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px', color: 'var(--blue)', minWidth: '52px', flexShrink: 0 }}>
        Serie {setNumber}
      </span>
      <input type="number" placeholder="kg" value={weight} onChange={(e) => setWeight(e.target.value)} onBlur={commit} step="0.5" style={{ ...inputStyle, width: '70px', flexGrow: 1, minWidth: '60px' }} />
      <span style={{ color: 'var(--text-faint)', flexShrink: 0 }}>×</span>
      <input type="number" placeholder="reps" value={reps} onChange={(e) => setReps(e.target.value)} onBlur={commit} style={{ ...inputStyle, width: '70px', flexGrow: 1, minWidth: '60px' }} />
      <button className="fx" onClick={onRemove} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '4px', marginLeft: 'auto', flexShrink: 0 }}>✕</button>
    </div>
  )
}
