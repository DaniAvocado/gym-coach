'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { translateName } from '@/lib/translate'
import { fetchAllExercises } from '@/lib/exercises'
import ExerciseDetailModal from './ExerciseDetailModal'
import WorkoutTimer from './WorkoutTimer'
import SetDetail from './SetDetail'

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
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [detailExercise, setDetailExercise] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => { fetchExercises() }, [])

  const fetchExercises = async () => {
    setExercises(await fetchAllExercises())
  }

  const categories = Array.from(new Set(exercises.map(e => e.category))).sort()

  const filteredExercises = exercises
    .filter(ex => {
      const matchesTerm = !searchTerm || translateName(ex.name).toLowerCase().includes(searchTerm.toLowerCase()) || ex.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || ex.category === categoryFilter
      return matchesTerm && matchesCategory
    })
    .slice(0, 30)

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

  const updateAddedSet = (itemIdx: number, setIdx: number, weight: number, reps: number) => {
    const updated = [...currentWorkout]
    updated[itemIdx].sets[setIdx] = { ...updated[itemIdx].sets[setIdx], weight, reps }
    setCurrentWorkout(updated)
  }

  const removeAddedSet = (itemIdx: number, setIdx: number) => {
    const updated = [...currentWorkout]
    updated[itemIdx].sets = updated[itemIdx].sets.filter((_, i) => i !== setIdx)
    setCurrentWorkout(updated)
  }

  const addSetToExercise = (itemIdx: number) => {
    const updated = [...currentWorkout]
    updated[itemIdx].sets.push({ setNumber: updated[itemIdx].sets.length + 1, weight: 20, reps: 10 })
    setCurrentWorkout(updated)
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
        setEditingIndex(null)
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
          <input type="text" placeholder="Buscar ejercicio..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={inputStyle} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            <button onClick={() => setCategoryFilter('')} style={{
              fontFamily: 'var(--font-mono)', fontSize: '13px', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer',
              border: categoryFilter === '' ? '1px solid var(--blue)' : '1px solid var(--border)',
              background: categoryFilter === '' ? 'rgba(91,141,239,0.15)' : 'transparent',
              color: categoryFilter === '' ? 'var(--blue-light)' : 'var(--text-muted)',
            }}>Todos</button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(categoryFilter === cat ? '' : cat)} style={{
                fontFamily: 'var(--font-mono)', fontSize: '13px', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer',
                border: categoryFilter === cat ? '1px solid var(--blue)' : '1px solid var(--border)',
                background: categoryFilter === cat ? 'rgba(91,141,239,0.15)' : 'transparent',
                color: categoryFilter === cat ? 'var(--blue-light)' : 'var(--text-muted)',
              }}>{cat}</button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '4px', padding: '4px', background: 'var(--ink)' }}>
            {filteredExercises.map(ex => (
              <div key={ex.id} onClick={() => { setSelectedExercise(ex.id); setSearchTerm(''); setCategoryFilter('') }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', cursor: 'pointer', borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: selectedExercise === ex.id ? 'var(--text)' : 'var(--text-muted)', background: selectedExercise === ex.id ? 'rgba(111,160,255,0.12)' : 'transparent', transition: 'background 0.15s ease' }}
                onMouseEnter={e => (e.currentTarget.style.background = selectedExercise === ex.id ? 'rgba(111,160,255,0.12)' : 'rgba(111,160,255,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = selectedExercise === ex.id ? 'rgba(111,160,255,0.12)' : 'transparent')}>
                <span style={{ fontWeight: 700, color: 'var(--blue-light)' }}>+</span>
                <span>{translateName(ex.name)}</span>
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text-faint)' }}>{ex.category}</span>
              </div>
            ))}
            {filteredExercises.length === 0 && (
              <div style={{ padding: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)', textAlign: 'center' }}>
                {searchTerm || categoryFilter ? `Sin resultados para "${searchTerm}"` : 'Escribe o selecciona una categoría para buscar'}
              </div>
            )}
          </div>
          {selectedExercise && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input type="number" value={numSets} onChange={(e) => setNumSets(e.target.value)} min="1" max="10" placeholder="# Series" style={inputStyle} />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={initializeSets} style={{ padding: '10px 20px', background: 'var(--blue)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                Crear series
              </motion.button>
            </div>
          )}
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
                style={{ padding: '12px', background: 'rgba(111,160,255,0.06)', borderRadius: '4px', borderLeft: '3px solid var(--blue)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: editingIndex === idx ? '10px' : 0 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>{translateName(item.exercise_name)}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.sets.map((s: ExerciseSet) => `${s.setNumber}: ${s.weight}kg × ${s.reps}`).join(' | ')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button onClick={() => setDetailExercise(item.exercise)} title="Ver cómo ejecutarlo"
                      style={{ color: 'var(--blue-light)', background: 'rgba(91,141,239,0.12)', border: '1px solid rgba(91,141,239,0.3)', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>ⓘ</button>
                    <button onClick={() => setEditingIndex(editingIndex === idx ? null : idx)} title={editingIndex === idx ? 'Cerrar edición' : 'Modificar'}
                      style={{ color: editingIndex === idx ? 'var(--yellow)' : 'var(--text-muted)', background: 'none', border: editingIndex === idx ? '1px solid var(--yellow)' : '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', padding: '4px 10px', fontFamily: 'var(--font-mono)' }}>
                      {editingIndex === idx ? 'OK' : '✎'}
                    </button>
                    <button onClick={() => { setCurrentWorkout(currentWorkout.filter((_, i) => i !== idx)); setEditingIndex(null) }} title="Quitar"
                      style={{ color: 'var(--red)', background: 'none', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                  </div>
                </div>

                {editingIndex === idx && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {item.sets.map((s: ExerciseSet, sIdx: number) => (
                      <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)', width: '16px', textAlign: 'center' }}>{s.setNumber}</span>
                        <input type="number" value={s.weight} onChange={e => updateAddedSet(idx, sIdx, parseFloat(e.target.value), s.reps)}
                          style={{ ...inputStyle, width: '80px', padding: '6px 8px', fontSize: '13px' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)' }}>kg ×</span>
                        <input type="number" value={s.reps} onChange={e => updateAddedSet(idx, sIdx, s.weight, parseInt(e.target.value))}
                          style={{ ...inputStyle, width: '60px', padding: '6px 8px', fontSize: '13px' }} />
                        <button onClick={() => removeAddedSet(idx, sIdx)} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', padding: '2px' }}>✕</button>
                      </div>
                    ))}
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => addSetToExercise(idx)}
                      style={{ padding: '6px 10px', background: 'transparent', color: 'var(--blue-light)', border: '1px dashed var(--blue)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px', alignSelf: 'flex-start' }}>
                      + Añadir serie
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={saveWorkout} disabled={loading}
            style={{ width: '100%', padding: '14px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Guardando...' : 'Guardar Entrenamiento'}
          </motion.button>
        </div>
      )}

      <ExerciseDetailModal exercise={detailExercise} onClose={() => setDetailExercise(null)} />
    </div>
  )
}
