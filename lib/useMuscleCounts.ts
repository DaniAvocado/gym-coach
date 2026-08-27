'use client'

import { useState, useEffect } from 'react'
import { supabase } from './supabase'

const MUSCLE_CATEGORIES: Record<string, string[]> = {
  pecho: ['Pecho'],
  espalda: ['Espalda'],
  piernas: ['Pierna'],
  hombros: ['Hombro'],
  brazos: ['Brazos'],
  core: ['Core'],
}

export function useMuscleCounts(userId: string, refreshMs?: number) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const { data: workouts } = await supabase
        .from('workouts')
        .select('*, workout_sets(*, exercises(*))')
        .eq('user_id', userId)
        .gte('date', sevenDaysAgo.toISOString())

      if (cancelled) return
      const result: Record<string, number> = { pecho: 0, espalda: 0, piernas: 0, hombros: 0, brazos: 0, core: 0 }
      workouts?.forEach(workout => {
        workout.workout_sets?.forEach((set: any) => {
          const category = set.exercises?.category
          if (!category) return
          Object.entries(MUSCLE_CATEGORIES).forEach(([muscle, categories]) => {
            if (categories.includes(category)) result[muscle]++
          })
        })
      })
      setCounts(result)
      setLoading(false)
    }

    fetchData()
    if (refreshMs) {
      const interval = setInterval(fetchData, refreshMs)
      return () => { cancelled = true; clearInterval(interval) }
    }
    return () => { cancelled = true }
  }, [userId, refreshMs])

  return { counts, loading }
}
