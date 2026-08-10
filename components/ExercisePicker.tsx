'use client'

import { useExerciseFilter } from '@/lib/useExerciseFilter'
import { translateName } from '@/lib/translate'

interface ExercisePickerProps {
  exercises: any[]
  onSelect: (exercise: any) => void
  maxHeight?: number
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
  width: '100%',
}

export default function ExercisePicker({ exercises, onSelect, maxHeight = 200 }: ExercisePickerProps) {
  const { searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, categories, filtered } = useExerciseFilter(exercises)

  const filterButton = (active: boolean) => ({
    fontFamily: 'var(--font-mono)', fontSize: '13px', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer',
    border: active ? '1px solid var(--blue)' : '1px solid var(--border)',
    background: active ? 'rgba(91,141,239,0.15)' : 'transparent',
    color: active ? 'var(--blue-light)' : 'var(--text-muted)',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <input type="text" placeholder="Buscar ejercicio..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={inputStyle} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        <button onClick={() => setCategoryFilter('')} style={filterButton(categoryFilter === '')}>Todos</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategoryFilter(categoryFilter === cat ? '' : cat)} style={filterButton(categoryFilter === cat)}>{cat}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '4px', padding: '4px', background: 'var(--ink)' }}>
        {filtered.map(ex => (
          <div key={ex.id} onClick={() => { onSelect(ex); setSearchTerm(''); setCategoryFilter('') }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', cursor: 'pointer', borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)', transition: 'background 0.15s ease' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(111,160,255,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ fontWeight: 700, color: 'var(--blue-light)' }}>+</span>
            <span>{translateName(ex.name)}</span>
            <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text-faint)' }}>{ex.category}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)', textAlign: 'center' }}>
            {searchTerm || categoryFilter ? `Sin resultados para "${searchTerm}"` : 'Escribe o selecciona una categoría para buscar'}
          </div>
        )}
      </div>
    </div>
  )
}
