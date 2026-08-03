'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { translateName } from '@/lib/translate'
import ExerciseDetailModal from './ExerciseDetailModal'

export default function ExerciseCatalog() {
  const [exercises, setExercises] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [detailExercise, setDetailExercise] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchExercises() }, [])

  const fetchExercises = async () => {
    const { data } = await supabase.from('exercises').select('*').order('name')
    setExercises(data || [])
    setLoading(false)
  }

  const categories = Array.from(new Set(exercises.map(e => e.category))).sort()

  const filtered = exercises.filter(ex => {
    const matchesTerm = !searchTerm || translateName(ex.name).toLowerCase().includes(searchTerm.toLowerCase()) || ex.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || ex.category === categoryFilter
    return matchesTerm && matchesCategory
  })

  const inputStyle = { background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '14px', outline: 'none', width: '100%' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="panel" style={{ borderLeft: '3px solid var(--purple)' }}>
        <div className="kpi-label" style={{ marginBottom: '12px', fontSize: '0.7rem', letterSpacing: '0.06em' }}>CATÁLOGO DE EJERCICIOS ({exercises.length})</div>
        <input type="text" placeholder="Buscar ejercicio..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={inputStyle} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
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
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-faint)' }}>Cargando ejercicios...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px' }}>
          {filtered.map((ex, idx) => (
            <motion.div key={ex.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.03, 0.5) }}
              onClick={() => setDetailExercise(ex)} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '6px', transition: 'all 0.15s ease' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(111,160,255,0.08)'; e.currentTarget.style.borderColor = 'var(--blue)' }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
                {ex.gif_url && (
                  <img src={ex.gif_url} alt={translateName(ex.name)} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0, background: '#0b0b12' }} />
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{translateName(ex.name)}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)', marginTop: '2px' }}>
                    {ex.category}{ex.equipment ? ` · ${ex.equipment}` : ''}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-faint)' }}>
              Sin resultados para "{searchTerm}"
            </div>
          )}
        </div>
      )}

      <ExerciseDetailModal exercise={detailExercise} onClose={() => setDetailExercise(null)} />
    </div>
  )
}
