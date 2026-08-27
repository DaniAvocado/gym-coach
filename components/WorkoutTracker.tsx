'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import WorkoutTimer from './WorkoutTimer'
import SetDetail from './SetDetail'
import { getExerciseSvgUrl } from '@/lib/exercise-utils'

interface WorkoutTrackerProps {
  userId: string
}

interface ExerciseSet {
  setNumber: number
  weight: number
  reps: number
}

interface WorkoutItem {
  exercise_id: string
  exercise_name: string
  category: string
  exercise: any
  sets: ExerciseSet[]
}

export default function WorkoutTracker({ userId }: WorkoutTrackerProps) {
  const [exercises, setExercises] = useState<any[]>([])
  const [selectedExercise, setSelectedExercise] = useState('')
  const [numSets, setNumSets] = useState('3')
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutItem[]>([])
  const [loading, setLoading] = useState(false)
  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>([])

  useEffect(() => { fetchExercises() }, [])

  const fetchExercises = async () => {
    const { data } = await supabase.from('exercises').select('*').order('category')
    setExercises(data || [])
  }

  const initializeSets = () => {
    const sets = Array.from({ length: parseInt(numSets) || 3 }, (_, i) => ({
      setNumber: i + 1, weight: 20, reps: 10,
    }))
    setExerciseSets(sets)
  }

  const updateSet = (index: number, weight: number, reps: number) => {
    const updated = [...exerciseSets]
    updated[index] = { ...updated[index], weight, reps }
    setExerciseSets(updated)
  }

  const removeSet = (index: number) => {
    setExerciseSets(exerciseSets.filter((_, i) => i !== index))
  }

  const addExerciseToWorkout = () => {
    if (!selectedExercise || exerciseSets.length === 0) return
    const exercise = exercises.find(e => e.id === selectedExercise)
    if (!exercise) return
    setCurrentWorkout([...currentWorkout, {
      exercise_id: selectedExercise,
      exercise_name: exercise?.name,
      category: exercise?.category,
      exercise,
      sets: exerciseSets,
    }])
    setSelectedExercise('')
    setExerciseSets([])
    setNumSets('3')
  }

  const saveWorkout = async () => {
    if (currentWorkout.length === 0) return
    setLoading(true)
    try {
      const { data: workout } = await supabase.from('workouts').insert({ user_id: userId }).select()
      const workoutId = workout?.[0].id
      if (workoutId) {
        const setsToInsert: any[] = []
        currentWorkout.forEach(item => {
          item.sets.forEach((set: ExerciseSet) => {
            setsToInsert.push({
              workout_id: workoutId, exercise_id: item.exercise_id,
              weight: set.weight, reps: set.reps, sets: 1,
            })
          })
        })
        await supabase.from('workout_sets').insert(setsToInsert)
        const points = currentWorkout.length * 10
        const { data: userPoints } = await supabase.from('user_points').select('total_points').eq('user_id', userId).single()
        await supabase.from('user_points').update({
          total_points: (userPoints?.total_points || 0) + points,
          last_activity: new Date().toISOString().split('T')[0],
        }).eq('user_id', userId)
        alert('Entrenamiento guardado! +' + points + ' puntos')
        setCurrentWorkout([])
      }
    } finally { setLoading(false) }
  }

  const inputStyle = {
    background: 'var(--ink)',
    color: 'var(--text)',
    border: '1px solid var(--border2)',
    borderRadius: '4px',
    padding: '10px 12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    outline: 'none',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <WorkoutTimer />

      {/* Selector */}
      <div className="panel" style={{ borderLeft: '3px solid var(--blue)' }}>
        <div className="kpi-label" style={{ marginBottom: '12px', fontSize: '0.7rem', letterSpacing: '0.06em' }}>AGREGAR EJERCICIO</div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <select value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="">Selecciona ejercicio...</option>
            {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name} ({ex.category})</option>)}
          </select>
          {selectedExercise && (() => {
            const ex = exercises.find(e => e.id === selectedExercise)
            const svg = ex ? getExerciseSvgUrl(ex.name) : null
            return svg ? <img src={svg} alt="" style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '4px', background: 'rgba(255,255,255,0.03)' }} /> : null
          })()}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" value={numSets} onChange={(e) => setNumSets(e.target.value)} min="1" max="10" placeholder="# Series" style={inputStyle} />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={initializeSets} style={{ padding: '10px 20px', background: 'var(--blue)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              Crear
            </motion.button>
          </div>
        </div>

        {exerciseSets.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {exerciseSets.map((set, idx) => (
              <SetDetail key={idx} setNumber={set.setNumber} initialWeight={set.weight} initialReps={set.reps}
                onUpdate={(w, r) => updateSet(idx, w, r)} onRemove={() => removeSet(idx)} />
            ))}
          </div>
        )}

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={addExerciseToWorkout}
          disabled={!selectedExercise || exerciseSets.length === 0}
          style={{ width: '100%', padding: '12px', background: 'var(--blue)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: (!selectedExercise || exerciseSets.length === 0) ? 0.4 : 1 }}>
          + Añadir a Entrenamiento
        </motion.button>
      </div>

      {/* Workout summary */}
      {currentWorkout.length > 0 && (
        <div className="panel" style={{ borderLeft: '3px solid var(--purple)' }}>
          <div className="kpi-label" style={{ marginBottom: '12px', fontSize: '0.7rem' }}>ENTRENAMIENTO ACTUAL ({currentWorkout.length} ejercicios)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {currentWorkout.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(111,160,255,0.06)', borderRadius: '4px', borderLeft: '3px solid var(--blue)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {(() => { const svg = getExerciseSvgUrl(item.exercise_name); return svg ? <img src={svg} alt="" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }} /> : null })()}
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{item.exercise_name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.sets.map((s: ExerciseSet) => `${s.setNumber}: ${s.weight}kg × ${s.reps}`).join(' | ')}
                    </div>
                  </div>
                </div>
                <button onClick={() => setCurrentWorkout(currentWorkout.filter((_, i) => i !== idx))} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>✕</button>
              </motion.div>
            ))}
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={saveWorkout} disabled={loading}
            style={{ width: '100%', padding: '14px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Guardando...' : 'Guardar Entrenamiento'}
          </motion.button>
        </div>
      )}
    </div>
  )
}
