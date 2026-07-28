'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface ProgressiveOverloadProps {
  userId: string
}

interface ExerciseRecommendation {
  exercise_id: string
  exercise_name: string
  category: string
  last_weight: number
  last_reps: number
  last_sets: number
  suggested_weight: number
  suggested_reps: number
  suggestion_type: 'increase_weight' | 'increase_reps' | 'maintain' | 'deload'
  reason: string
  confidence: 'high' | 'medium' | 'low'
}

export default function ProgressiveOverload({ userId }: ProgressiveOverloadProps) {
  const [recommendations, setRecommendations] = useState<ExerciseRecommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null)

  const analyzeProgress = async () => {
    setLoading(true)
    try {
      // Get last 3 workouts for each exercise
      const { data: workoutSets } = await supabase
        .from('workout_sets')
        .select('*, workouts(date, user_id), exercises(name, category)')
        .eq('workouts.user_id', userId)
        .order('workouts.date', { ascending: false })
        .limit(100)

      if (!workoutSets || workoutSets.length === 0) {
        setRecommendations([])
        setLoading(false)
        return
      }

      // Group by exercise
      const exerciseMap: Record<string, any[]> = {}
      workoutSets.forEach((set: any) => {
        const exId = set.exercise_id
        if (!exerciseMap[exId]) exerciseMap[exId] = []
        exerciseMap[exId].push(set)
      })

      // Generate recommendations using progressive overload principles
      const recs: ExerciseRecommendation[] = []

      Object.entries(exerciseMap).forEach(([exId, sets]) => {
        if (sets.length < 2) return // Need at least 2 sessions

        const latestSet = sets[0]
        const previousSet = sets[1]

        const exerciseName = latestSet.exercises?.name || 'Ejercicio'
        const category = latestSet.exercises?.category || ''
        const lastWeight = latestSet.weight || 0
        const lastReps = latestSet.reps || 0
        const lastSets = latestSet.sets || 1

        // Progressive overload logic based on Stronger by Science research:
        // 1. If user completed target reps (>10) at current weight → increase weight
        // 2. If user hit target reps (8-12) consistently → increase weight by 2.5-5%
        // 3. If user struggling (failed reps) → maintain weight, increase reps
        // 4. If multiple sessions at same weight → suggest deload

        let suggestedWeight = lastWeight
        let suggestedReps = lastReps
        let suggestionType: ExerciseRecommendation['suggestion_type'] = 'maintain'
        let reason = ''
        let confidence: ExerciseRecommendation['confidence'] = 'medium'

        // Primary recommendation: weight increase for hypertrophy
        if (lastReps >= 12) {
          // User exceeded target rep range → increase weight
          const increment = category === 'Pierna' ? 2.5 : 1.25
          suggestedWeight = Math.round((lastWeight + increment) * 4) / 4
          suggestedReps = 8 // Reset to lower rep range with new weight
          suggestionType = 'increase_weight'
          reason = `Pudiste hacer ${lastReps} reps. Sube ${increment}kg y empieza con 8 reps.`
          confidence = 'high'
        } else if (lastReps >= 8 && lastReps <= 11) {
          // In the sweet spot → try to increase reps first
          suggestedReps = lastReps + 1
          suggestionType = 'increase_reps'
          reason = `Estás en el rango ideal (8-12). Intenta ${lastReps + 1} reps antes de subir peso.`
          confidence = 'medium'
        } else if (lastReps < 8) {
          // Below target → maintain weight, focus on form
          suggestionType = 'maintain'
          reason = `Estás por debajo del rango objetivo. Mantén ${lastWeight}kg y enfócate en técnica.`
          confidence = 'medium'
        }

        // If we can compare with previous session
        if (previousSet) {
          const prevWeight = previousSet.weight || 0
          const prevReps = previousSet.reps || 0

          if (lastWeight > prevWeight && lastReps >= 8) {
            // Successfully progressed in weight
            reason = `¡Progresión exitosa! Subiste ${lastWeight - prevWeight}kg. Intenta otra subida o más reps.`
            confidence = 'high'
          }
        }

        recs.push({
          exercise_id: exId,
          exercise_name: exerciseName,
          category,
          last_weight: lastWeight,
          last_reps: lastReps,
          last_sets: lastSets,
          suggested_weight: suggestedWeight,
          suggested_reps: suggestedReps,
          suggestion_type: suggestionType,
          reason,
          confidence,
        })
      })

      // Sort by confidence
      recs.sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2 }
        return order[a.confidence] - order[b.confidence]
      })

      setRecommendations(recs)
      setLastAnalysis(new Date())
    } finally {
      setLoading(false)
    }
  }

  const getSuggestionIcon = (type: ExerciseRecommendation['suggestion_type']) => {
    switch (type) {
      case 'increase_weight': return '⬆️'
      case 'increase_reps': return '➕'
      case 'maintain': return '🔄'
      case 'deload': return '⬇️'
    }
  }

  const getSuggestionLabel = (type: ExerciseRecommendation['suggestion_type']) => {
    switch (type) {
      case 'increase_weight': return 'Subir peso'
      case 'increase_reps': return 'Subir reps'
      case 'maintain': return 'Mantener'
      case 'deload': return 'Descargar'
    }
  }

  const inputStyle = {
    background: 'var(--ink)',
    color: 'var(--text)',
    border: '1px solid var(--border2)',
    borderRadius: '4px',
    padding: '10px 12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    outline: 'none',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header */}
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={analyzeProgress} disabled={loading}
        style={{ width: '100%', padding: '16px', background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '13px', opacity: loading ? 0.5 : 1 }}>
        {loading ? '⚙️ Analizando progreso...' : '📈 Analizar Sobrecarga Progresiva'}
      </motion.button>

      {lastAnalysis && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)' }}>Último análisis: {lastAnalysis.toLocaleString('es-ES')}</p>}

      {/* Info callout */}
      <div className="callout" style={{ borderLeftColor: 'var(--purple)' }}>
        <span style={{ fontSize: '14px' }}>📚</span>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text)', lineHeight: 1.6 }}>
          <strong>Basado en investigación:</strong> Chaves et al (2024) y Plotkin et al (2022) demostraron que tanto la progresión de peso como de reps producen ganancias similares en fuerza e hipertrofia. Para hipertrofia, tienes flexibilidad; para fuerza, subir peso es esencial.
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="kpi-label">RECOMENDACIONES PARA TU PRÓXIMA SESIÓN</div>
          {recommendations.map((rec, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--ink-panel)', border: '1px solid var(--border)', borderRadius: '6px', borderLeft: `3px solid ${rec.confidence === 'high' ? 'var(--green)' : rec.confidence === 'medium' ? 'var(--orange)' : 'var(--red)'}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{getSuggestionIcon(rec.suggestion_type)}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{rec.exercise_name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '3px' }}>{rec.category}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Último: {rec.last_weight}kg × {rec.last_reps} reps ({rec.last_sets} sets)
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)' }}>
                  💡 {rec.reason}
                </div>
              </div>
              <div style={{ textAlign: 'right', minWidth: '120px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                  {getSuggestionLabel(rec.suggestion_type)}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--green)' }}>
                  {rec.suggested_weight}kg × {rec.suggested_reps}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {recommendations.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px' }}>
          <span style={{ fontSize: '3rem' }}>📈</span>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
            Registra más entrenamientos para obtener recomendaciones de sobrecarga progresiva
          </p>
        </div>
      )}
    </div>
  )
}
