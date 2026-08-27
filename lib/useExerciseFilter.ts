'use client'

import { useState, useMemo } from 'react'
import { translateName } from './translate'

export function useExerciseFilter(exercises: any[], limit = 30) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const categories = useMemo(() => Array.from(new Set(exercises.map(e => e.category))).sort(), [exercises])

  const filtered = useMemo(() => exercises
    .filter(ex => {
      const matchesTerm = !searchTerm || translateName(ex.name).toLowerCase().includes(searchTerm.toLowerCase()) || ex.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || ex.category === categoryFilter
      return matchesTerm && matchesCategory
    })
    .slice(0, limit), [exercises, searchTerm, categoryFilter, limit])

  return { searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, categories, filtered }
}
