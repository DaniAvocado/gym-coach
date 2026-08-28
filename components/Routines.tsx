'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { getExerciseSvgUrl } from '@/lib/exercise-utils'

interface RoutinesProps {
  userId: string
}

const TEMPLATES: { id: string; name: string; description: string; icon: string; exercises: { name: string; sets: number; reps: number }[] }[] = [
  {
    id: 'push', name: 'Empuje (Push)', icon: '═', description: 'Pecho · Hombros · Tríceps',
    exercises: [
      { name: 'Press de banca plano', sets: 4, reps: 8 },
      { name: 'Press militar (hombro)', sets: 3, reps: 10 },
      { name: 'Aperturas con mancuernas', sets: 3, reps: 12 },
      { name: 'Flexiones de pecho', sets: 3, reps: 15 },
      { name: 'Press francés', sets: 3, reps: 10 },
      { name: 'Extensión de tríceps en polea', sets: 3, reps: 12 },
    ],
  },
  {
    id: 'pull', name: 'Tirón (Pull)', icon: '∥', description: 'Espalda · Bíceps',
    exercises: [
      { name: 'Dominadas (Pull-ups)', sets: 4, reps: 8 },
      { name: 'Remo con barra', sets: 4, reps: 10 },
      { name: 'Jalón al pecho', sets: 3, reps: 12 },
      { name: 'Remo en polea baja', sets: 3, reps: 12 },
      { name: 'Curl de bíceps con barra', sets: 3, reps: 10 },
      { name: 'Curl de bíceps con mancuernas', sets: 3, reps: 12 },
    ],
  },
  {
    id: 'legs', name: 'Pierna', icon: '▽', description: 'Cuádriceps · Isquios · Glúteos',
    exercises: [
      { name: 'Sentadilla (Squat)', sets: 4, reps: 10 },
      { name: 'Peso muerto (Deadlift)', sets: 4, reps: 8 },
      { name: 'Prensa de piernas', sets: 3, reps: 12 },
      { name: 'Extensión de piernas', sets: 3, reps: 12 },
      { name: 'Curl de pierna sentado', sets: 3, reps: 12 },
      { name: 'Elevación de talones (Calf raise)', sets: 4, reps: 15 },
    ],
  },
  {
    id: 'fullbody', name: 'Cuerpo Completo', icon: '□', description: 'Todo el cuerpo · 2-3x/semana',
    exercises: [
      { name: 'Sentadilla (Squat)', sets: 3, reps: 10 },
      { name: 'Press de banca plano', sets: 3, reps: 10 },
      { name: 'Remo con barra', sets: 3, reps: 10 },
      { name: 'Press militar (hombro)', sets: 3, reps: 10 },
      { name: 'Curl de bíceps con barra', sets: 2, reps: 12 },
      { name: 'Plancha abdominal', sets: 3, reps: 30 },
    ],
  },
]

export default function Routines({ userId }: RoutinesProps) {
  const [routines, setRoutines] = useState<any[]>([])
  const [exercises, setExercises] = useState<any[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [routineName, setRoutineName] = useState('')
  const [routineDescription, setRoutineDescription] = useState('')
  const [selectedExercises, setSelectedExercises] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchRoutines(); fetchExercises() }, [])

  const fetchRoutines = async () => {
    const { data } = await supabase.from('routines').select('*, routine_exercises(*, exercises(*))').eq('user_id', userId)
    setRoutines(data || [])
  }

  const fetchExercises = async () => {
    const { data } = await supabase.from('exercises').select('*').order('category')
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

  const matchExercise = (name: string) => {
    const q = name.toLowerCase().trim()
    return exercises.find(e => e.name.toLowerCase().trim() === q)
      || exercises.find(e => e.name.toLowerCase().includes(q))
      || exercises.find(e => q.includes(e.name.toLowerCase()))
  }

  const useTemplate = async (template: typeof TEMPLATES[number]) => {
    const resolved = template.exercises
      .map(ex => ({ ...ex, exercise: matchExercise(ex.name) }))
      .filter(x => x.exercise)
    if (resolved.length === 0) { alert('No se encontraron ejercicios en el catálogo'); return }
    setLoading(true)
    const { data: routine } = await supabase.from('routines').insert({
      user_id: userId, name: template.name, description: template.description,
    }).select()
    if (routine?.[0]) {
      await supabase.from('routine_exercises').insert(resolved.map((r, idx) => ({
        routine_id: routine[0].id, exercise_id: r.exercise.id, sets: r.sets, reps: r.reps, rest_seconds: 90, order_index: idx,
      })))
      alert(`Rutina "${template.name}" creada`)
      fetchRoutines()
    }
    setLoading(false)
  }

  const inputStyle = { background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '14px', outline: 'none', width: '100%' }

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
            <select onChange={e => { addExercise(e.target.value); e.target.value = '' }} style={inputStyle}>
              <option value="">+ Añadir ejercicio...</option>
              {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name} ({ex.category})</option>)}
            </select>

            {selectedExercises.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedExercises.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'rgba(111,160,255,0.06)', borderRadius: '4px', borderLeft: '3px solid var(--blue)' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px', color: 'var(--text)' }}>{item.exercise.name}</div>
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

      {/* Pre-built templates */}
      <div className="panel" style={{ borderLeft: '3px solid var(--pink)' }}>
        <div className="kpi-label" style={{ marginBottom: '12px' }}>PLANTILLAS PRE-DISEÑADAS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px' }}>
          {TEMPLATES.map(t => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '6px', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '16px', color: 'var(--pink)' }}>{t.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)' }}>{t.description}</div>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                {t.exercises.length} ejercicios
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => useTemplate(t)} disabled={loading}
                style={{ width: '100%', padding: '8px', background: 'rgba(255,107,157,0.15)', color: 'var(--pink-light)', border: '1px solid var(--pink)', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: loading ? 0.5 : 1 }}>
                Usar plantilla
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

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
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {(() => { const svg = getExerciseSvgUrl(re.exercises?.name || ''); return svg ? <img src={svg} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }} /> : null })()}
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)' }}>{re.exercises?.name}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{re.sets}×{re.reps} · {re.rest_seconds}s</span>
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
    </div>
  )
}
