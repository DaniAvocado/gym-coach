'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { fetchAllExercises } from '@/lib/exercises'
import WorkoutTimer from './WorkoutTimer'
import SetDetail from './SetDetail'
import { getExerciseSvgUrl } from '@/lib/exercise-utils'
import { translateName } from '@/lib/translate'

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

const CATEGORY_LABELS: Record<string, string> = {
  chest: 'Pecho',
  back: 'Espalda',
  legs: 'Piernas',
  shoulders: 'Hombros',
  arms: 'Brazos',
  core: 'Core',
}

export default function WorkoutTracker({ userId }: WorkoutTrackerProps) {
  const [exercises, setExercises] = useState<any[]>([])
  const [selectedExercise, setSelectedExercise] = useState<any>(null)
  const [numSets, setNumSets] = useState('3')
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutItem[]>([])
  const [loading, setLoading] = useState(false)
  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [visibleCount, setVisibleCount] = useState(100)

  useEffect(() => { fetchExercises() }, [])

  const fetchExercises = async () => {
    const data = await fetchAllExercises()
    setExercises(data || [])
  }

  const categories = useMemo(() => {
    return Array.from(new Set(exercises.map(e => e.category))).sort()
  }, [exercises])

  const filtered = useMemo(() => {
    return exercises.filter(ex => {
      const matchesSearch = !searchTerm ||
        translateName(ex.name).toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || ex.category === categoryFilter
      return matchesSearch && matchesCategory
    }).sort((a, b) => translateName(a.name).localeCompare(translateName(b.name)))
  }, [exercises, searchTerm, categoryFilter])

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
    setCurrentWorkout([...currentWorkout, {
      exercise_id: selectedExercise.id,
      exercise_name: selectedExercise.name,
      category: selectedExercise.category,
      exercise: selectedExercise,
      sets: exerciseSets,
    }])
    setSelectedExercise(null)
    setExerciseSets([])
    setNumSets('3')
    setSearchTerm('')
    setCategoryFilter('')
    setVisibleCount(100)
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

  const btnStyle = (active: boolean) => ({
    fontFamily: 'var(--font-mono)' as const,
    fontSize: '13px',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer' as const,
    border: active ? '1px solid var(--blue)' : '1px solid var(--border)',
    background: active ? 'rgba(91,141,239,0.15)' : 'transparent',
    color: active ? 'var(--blue-light)' : 'var(--text-muted)',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <WorkoutTimer />

      {/* Selector */}
      <div className="panel" style={{ borderLeft: '3px solid var(--blue)' }}>
        <div className="kpi-label" style={{ marginBottom: '12px', fontSize: '0.7rem', letterSpacing: '0.06em' }}>AGREGAR EJERCICIO</div>

        {/* Selected exercise display */}
        {selectedExercise && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'rgba(111,160,255,0.08)', border: '1px solid var(--blue)', borderRadius: '6px', marginBottom: '12px' }}>
            {(() => { const svg = getExerciseSvgUrl(selectedExercise.name); return svg ? <img src={svg} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }} /> : null })()}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>{translateName(selectedExercise.name)}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)' }}>{CATEGORY_LABELS[selectedExercise.category] || selectedExercise.category}</div>
            </div>
            <button onClick={() => setSelectedExercise(null)} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>✕</button>
          </div>
        )}

        {/* Search + category filters */}
        {!selectedExercise && (
          <>
            <input type="text" placeholder="Buscar ejercicio por nombre..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ ...inputStyle, width: '100%', marginBottom: '8px' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
              <button onClick={() => setCategoryFilter('')} style={btnStyle(categoryFilter === '')}>Todos</button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategoryFilter(categoryFilter === cat ? '' : cat)} style={btnStyle(categoryFilter === cat)}>
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '260px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '12px' }}>
              {filtered.slice(0, visibleCount).map(ex => (
                <div key={ex.id} onClick={() => setSelectedExercise(ex)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
                  {(() => { const svg = getExerciseSvgUrl(ex.name); return svg ? <img src={svg} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }} /> : null })()}
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{translateName(ex.name)}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-faint)', flexShrink: 0 }}>{CATEGORY_LABELS[ex.category] || ex.category}</span>
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)', textAlign: 'center' }}>
                  Sin resultados para &quot;{searchTerm}&quot;
                </div>
              )}
            </div>
            {visibleCount < filtered.length && (
              <button onClick={() => setVisibleCount(v => v + 100)} style={{ ...btnStyle(false), width: '100%', marginBottom: '12px' }}>
                Cargar más ({filtered.length - visibleCount} restantes)
              </button>
            )}
          </>
        )}

        {/* Sets config */}
        {selectedExercise && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input type="number" value={numSets} onChange={(e) => setNumSets(e.target.value)} min="1" max="10" placeholder="# Series" style={inputStyle} />
            <button className="fx" onClick={initializeSets} style={{ padding: '10px 20px', background: 'var(--blue)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              Crear
            </button>
          </div>
        )}

        {exerciseSets.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {exerciseSets.map((set, idx) => (
              <SetDetail key={idx} setNumber={set.setNumber} initialWeight={set.weight} initialReps={set.reps}
                onUpdate={(w, r) => updateSet(idx, w, r)} onRemove={() => removeSet(idx)} />
            ))}
          </div>
        )}

        <button className="fx" onClick={addExerciseToWorkout}
          disabled={!selectedExercise || exerciseSets.length === 0}
          style={{ width: '100%', padding: '12px', background: 'var(--blue)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: (!selectedExercise || exerciseSets.length === 0) ? 0.4 : 1 }}>
          + Añadir a Entrenamiento
        </button>
      </div>

      {/* Workout summary */}
      {currentWorkout.length > 0 && (
        <div className="panel" style={{ borderLeft: '3px solid var(--purple)' }}>
          <div className="kpi-label" style={{ marginBottom: '12px', fontSize: '0.7rem' }}>ENTRENAMIENTO ACTUAL ({currentWorkout.length} ejercicios)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {currentWorkout.map((item, idx) => (
              <div key={idx}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(111,160,255,0.06)', borderRadius: '4px', borderLeft: '3px solid var(--blue)', animation: 'slideIn .3s ease backwards' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  {(() => { const svg = getExerciseSvgUrl(item.exercise_name); return svg ? <img src={svg} alt="" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }} /> : null })()}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{translateName(item.exercise_name)}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.sets.map((s: ExerciseSet) => `${s.setNumber}: ${s.weight}kg × ${s.reps}`).join(' | ')}
                    </div>
                  </div>
                </div>
                <button onClick={() => setCurrentWorkout(currentWorkout.filter((_, i) => i !== idx))} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>✕</button>
              </div>
            ))}
          </div>

          <button className="fx" onClick={saveWorkout} disabled={loading}
            style={{ width: '100%', padding: '14px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Guardando...' : 'Guardar Entrenamiento'}
          </button>
        </div>
      )}
    </div>
  )
}