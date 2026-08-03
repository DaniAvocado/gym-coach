'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { translateName } from '@/lib/translate'
import ExerciseDetailModal from './ExerciseDetailModal'

interface RoutinesProps {
  userId: string
}

export default function Routines({ userId }: RoutinesProps) {
  const [routines, setRoutines] = useState<any[]>([])
  const [exercises, setExercises] = useState<any[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [routineName, setRoutineName] = useState('')
  const [routineDescription, setRoutineDescription] = useState('')
  const [selectedExercises, setSelectedExercises] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [detailExercise, setDetailExercise] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => { fetchRoutines(); fetchExercises() }, [])

  const fetchRoutines = async () => {
    const { data } = await supabase.from('routines').select('*, routine_exercises(*, exercises(*))').eq('user_id', userId)
    setRoutines(data || [])
  }

  const fetchExercises = async () => {
    const { data } = await supabase.from('exercises').select('*').order('name').limit(2000)
    setExercises(data || [])
  }

  const addExercise = (exerciseId: string) => {
    const exercise = exercises.find(e => e.id === exerciseId)
    if (!exercise) return
    setSelectedExercises([...selectedExercises, { exercise_id: exerciseId, exercise, sets: 3, reps: 10, rest_seconds: 90 }])
  }

  const createRoutine = async () => {
    if (!routineName || selectedExercises.length === 0) { alert('Completa el nombre y añade ejercicios'); return }
    setLoading(true)
    const { data: routine } = await supabase.from('routines').insert({ user_id: userId, name: routineName, description: routineDescription }).select()
    if (routine?.[0]) {
      await supabase.from('routine_exercises').insert(selectedExercises.map((ex, idx) => ({
        routine_id: routine[0].id, exercise_id: ex.exercise_id, sets: ex.sets, reps: ex.reps, rest_seconds: ex.rest_seconds, order_index: idx,
      })))
      alert('Rutina creada')
      setShowCreateForm(false)
      setRoutineName('')
      setRoutineDescription('')
      setSelectedExercises([])
      fetchRoutines()
    }
    setLoading(false)
  }

  const deleteRoutine = async (id: string) => {
    await supabase.from('routines').delete().eq('id', id)
    fetchRoutines()
  }

  const inputStyle = { background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '14px', outline: 'none', width: '100%' }

  const categories = Array.from(new Set(exercises.map(e => e.category))).sort()

  const filteredExercises = exercises
    .filter(ex => {
      const matchesTerm = !searchTerm || translateName(ex.name).toLowerCase().includes(searchTerm.toLowerCase()) || ex.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || ex.category === categoryFilter
      return matchesTerm && matchesCategory
    })
    .slice(0, 30)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Action */}
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={() => setShowCreateForm(!showCreateForm)}
        style={{ padding: '12px', background: showCreateForm ? 'transparent' : 'var(--blue)', color: showCreateForm ? 'var(--blue)' : '#0b0b12', border: `1px solid ${showCreateForm ? 'var(--blue)' : 'transparent'}`, borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
        {showCreateForm ? '✕ Cancelar' : '+ Nueva Rutina'}
      </motion.button>

      {/* Create form */}
      {showCreateForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="panel" style={{ borderLeft: '3px solid var(--blue)' }}>
          <div className="kpi-label" style={{ marginBottom: '12px' }}>NUEVA RUTINA</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" placeholder="Nombre de la rutina" value={routineName} onChange={e => setRoutineName(e.target.value)} style={inputStyle} />
            <textarea placeholder="Descripción (opcional)" value={routineDescription} onChange={e => setRoutineDescription(e.target.value)} rows={2} style={inputStyle} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" placeholder="Buscar ejercicio en español..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={inputStyle} />
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '240px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '4px', padding: '4px', background: 'var(--ink)' }}>
                {filteredExercises.map(ex => (
                  <div key={ex.id} onClick={() => { addExercise(ex.id); setSearchTerm(''); setCategoryFilter('') }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', cursor: 'pointer', borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)', transition: 'background 0.15s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(111,160,255,0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
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
            </div>

            {selectedExercises.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedExercises.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'rgba(111,160,255,0.06)', borderRadius: '4px', borderLeft: '3px solid var(--blue)' }}>
                    <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => setDetailExercise(item.exercise)}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>{translateName(item.exercise.name)}</div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                        <input type="number" value={item.sets} onChange={e => { const u = [...selectedExercises]; u[idx].sets = parseInt(e.target.value); setSelectedExercises(u) }} style={{ ...inputStyle, width: '60px', fontSize: '13px', padding: '6px 8px' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-faint)', alignSelf: 'center' }}>×</span>
                        <input type="number" value={item.reps} onChange={e => { const u = [...selectedExercises]; u[idx].reps = parseInt(e.target.value); setSelectedExercises(u) }} style={{ ...inputStyle, width: '60px', fontSize: '13px', padding: '6px 8px' }} />
                        <input type="number" value={item.rest_seconds} onChange={e => { const u = [...selectedExercises]; u[idx].rest_seconds = parseInt(e.target.value); setSelectedExercises(u) }} style={{ ...inputStyle, width: '80px', fontSize: '13px', padding: '6px 8px' }} placeholder="desc(s)" />
                      </div>
                    </div>
                    <button onClick={() => setSelectedExercises(selectedExercises.filter((_, i) => i !== idx))} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '4px' }}>✕</button>
                  </div>
                ))}
              </div>
            )}

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={createRoutine} disabled={loading}
              style={{ width: '100%', padding: '12px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: loading ? 0.5 : 1 }}>
              {loading ? 'Creando...' : 'Guardar Rutina'}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Routine list */}
      {routines.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '10px' }}>
          {routines.map((routine, idx) => (
            <motion.div key={routine.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', padding: '16px', borderLeft: '3px solid var(--purple)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>{routine.name}</div>
                  {routine.description && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{routine.description}</div>}
                </div>
                <button onClick={() => deleteRoutine(routine.id)} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '2px' }}>✕</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {routine.routine_exercises?.map((re: any, i: number) => (
                  <div key={i} onClick={() => setDetailExercise(re.exercises)} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.15s ease' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(111,160,255,0.08)')} onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text)' }}>{translateName(re.exercises?.name)}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>{re.sets}×{re.reps} · {re.rest_seconds}s</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        !showCreateForm && (
          <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>No tienes rutinas creadas. Haz clic en "Nueva Rutina".</p>
          </div>
        )
      )}

      {/* Modal detalle ejercicio */}
      <ExerciseDetailModal exercise={detailExercise} onClose={() => setDetailExercise(null)} />
    </div>
  )
}
