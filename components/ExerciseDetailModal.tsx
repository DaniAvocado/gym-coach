'use client'

import { motion } from 'framer-motion'
import { translateName, translateMuscle, translateEquipment } from '@/lib/translate'

interface ExerciseDetailModalProps {
  exercise: any
  onClose: () => void
}

export default function ExerciseDetailModal({ exercise, onClose }: ExerciseDetailModalProps) {
  if (!exercise) return null
  const steps = exercise.instruction_steps_es || []

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
    }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()}
        style={{ background: 'var(--ink-panel)', border: '1px solid var(--border2)', borderRadius: '12px', width: '100%', maxWidth: '520px', maxHeight: '85vh', overflowY: 'auto', padding: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', lineHeight: 1.2 }}>{translateName(exercise.name)}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-faint)', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {exercise.category} {exercise.equipment ? `· ${translateEquipment(exercise.equipment)}` : ''}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px', padding: '2px' }}>✕</button>
        </div>

        {exercise.gif_url && (
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '12px', background: '#0b0b12', display: 'flex', justifyContent: 'center' }}>
            <img src={exercise.gif_url} alt={translateName(exercise.name)} style={{ maxHeight: '240px', objectFit: 'contain', display: 'block' }} />
          </div>
        )}

        {exercise.target_muscle && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', padding: '3px 8px', borderRadius: '3px', background: 'rgba(255,107,157,0.12)', color: 'var(--pink-light)', border: '1px solid rgba(255,107,157,0.3)' }}>
              Foco: {translateMuscle(exercise.target_muscle)}
            </span>
            {(exercise.secondary_muscles || []).map((m: string, i: number) => (
              <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', padding: '3px 8px', borderRadius: '3px', background: 'rgba(91,141,239,0.1)', color: 'var(--blue-light)', border: '1px solid rgba(91,141,239,0.25)' }}>
                {translateMuscle(m)}
              </span>
            ))}
          </div>
        )}

        <div className="kpi-label" style={{ marginBottom: '8px', fontSize: '0.65rem' }}>CÓMO EJECUTARLO</div>
        {steps.length > 0 ? (
          <ol style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {steps.map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ol>
        ) : (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {exercise.description || 'Sin instrucciones disponibles.'}
          </p>
        )}
      </motion.div>
    </div>
  )
}
