'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { translateName } from '@/lib/translate'
import { fetchAllExercises } from '@/lib/exercises'
import { searchExercises as wgSearch, exercises as wgExercises, getAssetUrl } from '@bryllim/workout-guide'
import ExerciseDetailModal from './ExerciseDetailModal'

interface UnifiedExercise {
  id: string
  name: string
  category: string
  gif_url?: string
  image_url?: string
  equipment?: string
  target_muscle?: string
  secondary_muscles?: string[]
  instruction_steps_es?: string[]
  description?: string
  _source: 'supabase' | 'workout-guide'
  _svgSlug?: string
}

export default function ExerciseCatalog() {
  const [dbExercises, setDbExercises] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState<'all' | 'supabase' | 'workout-guide'>('all')
  const [detailExercise, setDetailExercise] = useState<UnifiedExercise | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchExercises() }, [])

  const fetchExercises = async () => {
    const db = await fetchAllExercises()
    setDbExercises(db)
    setLoading(false)
  }

  const allExercises = useMemo(() => {
    const supabase: UnifiedExercise[] = dbExercises.map(ex => ({
      ...ex,
      _source: 'supabase' as const,
    }))

    const wg: UnifiedExercise[] = wgExercises.map(ex => ({
      id: `wg-${ex.slug}`,
      name: ex.name,
      category: ex.primaryMuscle,
      equipment: ex.equipment,
      target_muscle: ex.primaryMuscle,
      secondary_muscles: ex.secondaryMuscles,
      _source: 'workout-guide' as const,
      _svgSlug: ex.slug,
    }))

    return [...supabase, ...wg]
  }, [dbExercises])

  const categories = useMemo(() => Array.from(new Set(allExercises.map(e => e.category))).sort(), [allExercises])

  const filtered = useMemo(() => {
    return allExercises.filter(ex => {
      const matchesSearch = !searchTerm ||
        translateName(ex.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.equipment?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || ex.category === categoryFilter
      const matchesSource = sourceFilter === 'all' || ex._source === sourceFilter
      return matchesSearch && matchesCategory && matchesSource
    })
  }, [allExercises, searchTerm, categoryFilter, sourceFilter])

  const supabaseCount = allExercises.filter(e => e._source === 'supabase').length
  const wgCount = allExercises.filter(e => e._source === 'workout-guide').length

  const inputStyle = { background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '14px', outline: 'none', width: '100%' }

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="panel" style={{ borderLeft: '3px solid var(--purple)' }}>
        <div className="kpi-label" style={{ marginBottom: '12px', fontSize: '0.7rem', letterSpacing: '0.06em' }}>
          CATÁLOGO DE EJERCICIOS ({filtered.length} de {allExercises.length})
        </div>

        <input type="text" placeholder="Buscar ejercicio..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={inputStyle} />

        {/* Source filter */}
        <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
          <button onClick={() => setSourceFilter('all')} style={btnStyle(sourceFilter === 'all')}>Todos ({allExercises.length})</button>
          <button onClick={() => setSourceFilter('supabase')} style={btnStyle(sourceFilter === 'supabase')}>Del catálogo ({supabaseCount})</button>
          <button onClick={() => setSourceFilter('workout-guide')} style={btnStyle(sourceFilter === 'workout-guide')}>Con SVG ({wgCount})</button>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
          <button onClick={() => setCategoryFilter('')} style={btnStyle(categoryFilter === '')}>Todos</button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategoryFilter(categoryFilter === cat ? '' : cat)} style={btnStyle(categoryFilter === cat)}>
              {cat}
            </button>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '6px', transition: 'all 0.15s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(111,160,255,0.08)'; e.currentTarget.style.borderColor = 'var(--blue)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'var(--border)' }}>

                {/* Thumbnail: GIF, static image, or SVG frame 1 */}
                {ex._source === 'supabase' && ex.gif_url ? (
                  <img src={ex.gif_url} alt={translateName(ex.name)} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0, background: '#0b0b12' }} />
                ) : ex._source === 'supabase' && ex.image_url ? (
                  <img src={ex.image_url} alt={translateName(ex.name)} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0, background: '#0b0b12' }} />
                ) : ex._svgSlug ? (
                  <img src={getAssetUrl(ex._svgSlug, 1) || ''} alt={translateName(ex.name)} style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0, background: 'rgba(255,255,255,0.03)' }} />
                ) : null}

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {translateName(ex.name)}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)', marginTop: '2px' }}>
                    {ex.category}{ex.equipment ? ` · ${ex.equipment}` : ''}
                  </div>
                </div>

                {/* Source badge */}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '2px 6px', borderRadius: '3px', flexShrink: 0,
                  background: ex._source === 'supabase' ? 'rgba(255,107,157,0.12)' : 'rgba(74,222,128,0.12)',
                  color: ex._source === 'supabase' ? 'var(--pink-light)' : 'var(--green)',
                  border: `1px solid ${ex._source === 'supabase' ? 'rgba(255,107,157,0.3)' : 'rgba(74,222,128,0.3)'}`,
                }}>
                  {ex._source === 'supabase' ? (ex.gif_url ? 'GIF' : 'FOTO') : 'SVG'}
                </span>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-faint)' }}>
              Sin resultados para &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      )}

      <ExerciseDetailModal exercise={detailExercise} onClose={() => setDetailExercise(null)} />
    </div>
  )
}
