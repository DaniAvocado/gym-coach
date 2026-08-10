'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMuscleCounts } from '@/lib/useMuscleCounts'

interface BodyMapVisualProps {
  userId: string
}

export default function BodyMapVisual({ userId }: BodyMapVisualProps) {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null)
  const { counts: muscleData, loading } = useMuscleCounts(userId)

  const getIntensityColor = (count: number) => {
    if (count === 0) return { bg: '#4a4e68', text: 'Sin entrenar', bar: '0%' }
    if (count <= 2) return { bg: '#4ade80', text: 'Poco', bar: '25%' }
    if (count <= 5) return { bg: '#fbbf24', text: 'Moderado', bar: '50%' }
    if (count <= 10) return { bg: '#fb923c', text: 'Intenso', bar: '75%' }
    return { bg: '#f87171', text: 'Muy intenso', bar: '100%' }
  }

  const muscleMeta: Record<string, { icon: string; label: string; desc: string }> = {
    pecho: { icon: '', label: 'Pecho', desc: 'Press banca, Aperturas, Flexiones' },
    espalda: { icon: '', label: 'Espalda', desc: 'Dominadas, Remo, Jalón al pecho' },
    piernas: { icon: '', label: 'Piernas', desc: 'Sentadilla, Peso muerto, Prensa' },
    hombros: { icon: '', label: 'Hombros', desc: 'Press militar, Elevaciones laterales' },
    brazos: { icon: '', label: 'Brazos', desc: 'Curl bíceps, Press francés' },
    core: { icon: '', label: 'Core', desc: 'Plancha, Crunch, Elevación piernas' },
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)' }}>Cargando mapa muscular...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Muscle grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '10px' }}>
        {Object.entries(muscleData).map(([muscle, count], idx) => {
          const colors = getIntensityColor(count)
          const meta = muscleMeta[muscle]
          const isSelected = selectedMuscle === muscle

          return (
            <motion.div
              key={muscle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => setSelectedMuscle(isSelected ? null : muscle)}
              style={{
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.05)',
                border: `2px solid ${isSelected ? 'var(--blue)' : 'var(--border)'}`,
                borderRadius: '6px',
                padding: '14px 16px',
                transition: 'border-color 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>
                      {meta?.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: colors.bg }}>
                      {count}
                    </div>
                  </div>
                  {/* Bar */}
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: Math.min(count / 10 * 100, 100) + '%' }}
                      transition={{ duration: 0.5 }}
                      style={{ height: '100%', background: colors.bg, borderRadius: '2px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)' }}>
                      {colors.text}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)' }}>
                      {meta?.desc}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Detail panel when selected */}
      {selectedMuscle && muscleMeta[selectedMuscle] && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="panel"
          style={{ borderLeft: '3px solid var(--blue)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>
                {muscleMeta[selectedMuscle].label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                {muscleMeta[selectedMuscle].desc}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div className="kpi-label">Sets esta semana</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.2rem', fontWeight: 700, color: getIntensityColor(muscleData[selectedMuscle] || 0).bg }}>
                {muscleData[selectedMuscle] || 0}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '10px' }}>
              <div className="kpi-label">Estado</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: getIntensityColor(muscleData[selectedMuscle] || 0).bg, marginTop: '4px' }}>
                {getIntensityColor(muscleData[selectedMuscle] || 0).text}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '10px' }}>
              <div className="kpi-label">Recomendación</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)', marginTop: '4px', lineHeight: 1.4 }}>
                {(muscleData[selectedMuscle] || 0) === 0 && 'Considera añadir ejercicios a tu rutina.'}
                {(muscleData[selectedMuscle] || 0) > 0 && (muscleData[selectedMuscle] || 0) <= 2 && 'Aumenta el volumen de entrenamiento.'}
                {(muscleData[selectedMuscle] || 0) > 2 && (muscleData[selectedMuscle] || 0) <= 5 && 'Buen balance. Mantén este nivel.'}
                {(muscleData[selectedMuscle] || 0) > 5 && 'Excelente volumen. Asegura recuperación.'}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
