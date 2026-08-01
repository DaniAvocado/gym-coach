'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface RecoveryZoneProps {
  userId: string
}

export default function RecoveryZone({ userId }: RecoveryZoneProps) {
  const [muscleData, setMuscleData] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  const muscleCategories: Record<string, string[]> = {
    pecho: ['Pecho'],
    espalda: ['Espalda'],
    piernas: ['Pierna'],
    hombros: ['Hombro'],
    brazos: ['Brazos'],
    core: ['Core'],
  }

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchRecoveryData()
    const interval = setInterval(fetchRecoveryData, 30000)
    return () => clearInterval(interval)
  }, [userId])

  const fetchRecoveryData = async () => {
    setLoading(false) // Don't show loading on refresh
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: workouts } = await supabase
      .from('workouts')
      .select('*, workout_sets(*, exercises(*))')
      .eq('user_id', userId)
      .gte('date', sevenDaysAgo.toISOString())

    const counts: Record<string, number> = {
      pecho: 0, espalda: 0, piernas: 0, hombros: 0, brazos: 0, core: 0,
    }

    workouts?.forEach(workout => {
      workout.workout_sets?.forEach((set: any) => {
        const category = set.exercises?.category
        if (!category) return
        Object.entries(muscleCategories).forEach(([muscle, categories]) => {
          if (categories.includes(category)) counts[muscle]++
        })
      })
    })

    setMuscleData(counts)
  }

  const getColor = (count: number) => {
    if (count === 0) return { fill: '#4a4e68', label: 'Sin entrenar', dot: 'var(--text-faint)' }
    if (count <= 2) return { fill: '#4ade80', label: 'Fresco', dot: 'var(--green)' }
    if (count <= 5) return { fill: '#fbbf24', label: 'Moderado', dot: 'var(--orange)' }
    return { fill: '#f87171', label: 'Fatigado', dot: 'var(--red)' }
  }

  const muscleLabels: Record<string, string> = {
    pecho: 'Pecho',
    espalda: 'Espalda',
    piernas: 'Piernas',
    hombros: 'Hombros',
    brazos: 'Brazos',
    core: 'Core',
  }

  const muscleDetails: Record<string, string> = {
    pecho: 'Ejercicios: Press banca, Aperturas, Flexiones',
    espalda: 'Ejercicios: Dominadas, Remos, JalÃ³n al pecho',
    piernas: 'Ejercicios: Sentadilla, Peso muerto, Prensa',
    hombros: 'Ejercicios: Press militar, Elevaciones laterales',
    brazos: 'Ejercicios: Curl bÃ­ceps, Press francÃ©s trÃ­ceps',
    core: 'Ejercicios: Plancha, Crunch, ElevaciÃ³n piernas',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Legend */}
      <div className="panel">
        <div className="kpi-label" style={{ marginBottom: '10px' }}>LEYENDA DE RECUPERACIÃ“N</div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {[
            { color: '#4ade80', label: 'Fresco (48h+)', desc: 'Listo para entrenar' },
            { color: '#fbbf24', label: 'Moderado (24-48h)', desc: 'Entrenar con precauciÃ³n' },
            { color: '#f87171', label: 'Fatigado (<24h)', desc: 'Necesita descanso' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: item.color, flexShrink: 0 }}></div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Muscle Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {Object.entries(muscleData).map(([muscle, count], idx) => {
          const colors = getColor(count)
          return (
            <motion.div key={muscle} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.03, y: -3 }}
              style={{ background: 'var(--ink-panel)', border: `2px solid ${colors.fill}`, borderRadius: '6px', padding: '14px', textAlign: 'center', cursor: 'default' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>
                {muscleLabels[muscle]}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: colors.fill, marginTop: '8px' }}>
                {count} sets
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)', marginTop: '4px' }}>
                {colors.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)', marginTop: '8px', lineHeight: 1.4 }}>
                {muscleDetails[muscle]}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Auto-refresh indicator */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)', textAlign: 'center' }}>
        Se actualiza automÃ¡ticamente cada 30 segundos
      </div>
    </div>
  )
}
