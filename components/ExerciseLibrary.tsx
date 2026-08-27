'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchExercises, getAssetUrl, exercises } from '@bryllim/workout-guide'
import type { Exercise, ExerciseType } from '@bryllim/workout-guide'

const EQUIPMENT = [...new Set(exercises.map(e => e.equipment))].sort()
const MUSCLES = [...new Set(exercises.map(e => e.primaryMuscle))].sort()
const TYPES: { value: ExerciseType; label: string }[] = [
  { value: 'weight_reps', label: 'Peso × Reps' },
  { value: 'bodyweight_reps', label: 'Peso corporal' },
  { value: 'duration', label: 'Duración' },
  { value: 'distance_duration', label: 'Distancia' },
  { value: 'assisted_bodyweight', label: 'Asistido' },
]

export default function ExerciseLibrary() {
  const [query, setQuery] = useState('')
  const [equipment, setEquipment] = useState('')
  const [muscle, setMuscle] = useState('')
  const [type, setType] = useState('')
  const [selected, setSelected] = useState<Exercise | null>(null)
  const [frameIdx, setFrameIdx] = useState<1 | 2 | 3>(1)

  const results = useMemo(() => {
    return searchExercises(query, {
      ...(equipment && { equipment }),
      ...(muscle && { primaryMuscle: muscle }),
      ...(type && { exerciseType: type as ExerciseType }),
    })
  }, [query, equipment, muscle, type])

  const inputStyle = {
    background: 'var(--ink)',
    color: 'var(--text)',
    border: '1px solid var(--border2)',
    borderRadius: '4px',
    padding: '10px 12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    outline: 'none',
    width: '100%',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Search */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '10px' }}>
        <input
          type="text"
          placeholder="Buscar ejercicio..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={inputStyle}
        />
        <select value={muscle} onChange={e => setMuscle(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="">Todos los músculos</option>
          {MUSCLES.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={equipment} onChange={e => setEquipment(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="">Todo el equipamiento</option>
          {EQUIPMENT.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="">Todos los tipos</option>
          {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)' }}>
        {results.length} ejercicios encontrados
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
        {results.map(ex => (
          <motion.div
            key={ex.id}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setSelected(ex); setFrameIdx(1) }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '12px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'border-color 0.15s',
            }}
          >
            <img
              src={getAssetUrl(ex.slug, 1) || ''}
              alt={ex.name}
              style={{ width: '100%', height: '120px', objectFit: 'contain', marginBottom: '8px' }}
            />
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px', color: 'var(--text)', lineHeight: 1.2 }}>
              {ex.name}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {ex.primaryMuscle} · {ex.equipment}
            </div>
          </motion.div>
        ))}
      </div>

      {results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
            No se encontraron ejercicios con esos filtros.
          </p>
        </div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--ink-panel)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
                maxWidth: '480px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
              }}
            >
              {/* Frame selector */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {([1, 2, 3] as const).map(i => (
                  <button
                    key={i}
                    onClick={() => setFrameIdx(i)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: frameIdx === i ? 'var(--blue)' : 'rgba(255,255,255,0.05)',
                      color: frameIdx === i ? '#0b0b12' : 'var(--text-muted)',
                      border: `1px solid ${frameIdx === i ? 'var(--blue)' : 'var(--border)'}`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}
                  >
                    Frame {i}
                  </button>
                ))}
              </div>

              <img
                src={getAssetUrl(selected.slug, frameIdx) || ''}
                alt={`${selected.name} - frame ${frameIdx}`}
                style={{ width: '100%', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '16px' }}
              />

              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>
                {selected.name}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--blue)', background: 'rgba(91,141,239,0.12)', padding: '4px 8px', borderRadius: '4px' }}>
                  {selected.primaryMuscle}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--purple)', background: 'rgba(167,139,250,0.12)', padding: '4px 8px', borderRadius: '4px' }}>
                  {selected.equipment}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--green)', background: 'rgba(74,222,128,0.12)', padding: '4px 8px', borderRadius: '4px' }}>
                  {TYPES.find(t => t.value === selected.exerciseType)?.label || selected.exerciseType}
                </span>
                {selected.isStretch && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', background: 'rgba(255,169,77,0.12)', padding: '4px 8px', borderRadius: '4px' }}>
                    Estiramiento
                  </span>
                )}
              </div>

              {selected.secondaryMuscles.length > 0 && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-faint)' }}>Secundarios: </span>
                  {selected.secondaryMuscles.join(', ')}
                </div>
              )}

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)', marginTop: '12px', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
                {selected.attribution.creator} · {selected.attribution.license}
              </div>

              <button
                onClick={() => setSelected(null)}
                style={{
                  width: '100%', marginTop: '16px', padding: '10px',
                  background: 'rgba(255,255,255,0.06)', color: 'var(--text)',
                  border: '1px solid var(--border)', borderRadius: '4px',
                  cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
                }}
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
