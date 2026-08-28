'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { getExerciseSvgUrl } from '@/lib/exercise-utils'
import { translateName } from '@/lib/translate'

const CATEGORY_LABELS: Record<string, string> = {
  Pierna: 'Pierna', Pecho: 'Pecho', Espalda: 'Espalda',
  Hombro: 'Hombros', Brazos: 'Brazos', Core: 'Core', Cardio: 'Cardio',
}

export default function WorkoutHistory({ userId }: { userId: string }) {
  const [workouts, setWorkouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchHistory() }, [userId])

  const fetchHistory = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('workouts')
      .select('*, workout_sets(*, exercises(name, category))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)
    setWorkouts(data || [])
    setLoading(false)
  }

  const dateLabel = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short' }) +
      ' · ' + d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div className="section-header">
        <div className="section-num">HX</div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Historial de Entrenamientos</div>
          <div className="section-sub" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)' }}>Últimos {workouts.length} registros</div>
        </div>
      </div>

      {loading && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)', padding: '2rem', textAlign: 'center' }}>CARGANDO...</div>}

      {!loading && workouts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)' }}>Aún no tienes entrenamientos registrados.</p>
        </div>
      )}

      {workouts.map((w, idx) => {
        const totalSets = w.workout_sets?.length || 0
        const totalWeight = w.workout_sets?.reduce((s: number, x: any) => s + (x.weight || 0), 0) || 0
        return (
          <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="panel" style={{ borderLeft: '3px solid var(--blue)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)', textTransform: 'capitalize' }}>{dateLabel(w.created_at)}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)' }}>
                  {w.workout_sets?.length || 0} series · {(w.workout_sets || []).filter((s: any, i: number, a: any[]) => a.findIndex(x => x.exercise_id === s.exercise_id) === i).length} ejercicios
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--blue-light)' }}>
                {totalWeight ? `${totalWeight} kg levantados` : `${totalSets} sets`}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {w.workout_sets?.map((s: any, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                  {(() => { const svg = getExerciseSvgUrl(s.exercises?.name || ''); return svg ? <img src={svg} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }} /> : null })()}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {translateName(s.exercises?.name || '')}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>
                    {s.weight}kg × {s.reps}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}