'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface DashboardOverviewProps {
  userId: string
}

export default function DashboardOverview({ userId }: DashboardOverviewProps) {
  const [stats, setStats] = useState<any>(null)
  const [weekData, setWeekData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchStats() }, [userId])

  const fetchStats = async () => {
    setLoading(true)
    try {
      const { data: points } = await supabase.from('user_points').select('*').eq('user_id', userId).single()

      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const { data: workouts } = await supabase.from('workouts').select('*, workout_sets(*)').eq('user_id', userId).gte('date', sevenDaysAgo.toISOString()).order('date', { ascending: true })
      const { data: meals } = await supabase.from('meals').select('*').eq('user_id', userId).gte('date', sevenDaysAgo.toISOString().split('T')[0])

      const totalWorkouts = workouts?.length || 0
      const totalSets = workouts?.reduce((sum: number, w: any) => sum + (w.workout_sets?.length || 0), 0) || 0
      const totalCalories = meals?.reduce((sum: number, m: any) => sum + (m.calories || 0), 0) || 0
      const avgCaloriesPerDay = meals?.length ? Math.round(totalCalories / 7) : 0

      const weekBreakdown = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        const dateStr = date.toISOString().split('T')[0]
        const dayWorkouts = workouts?.filter(w => w.date.split('T')[0] === dateStr) || []
        return {
          day: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'][date.getDay()],
          workouts: dayWorkouts.length,
          sets: dayWorkouts.reduce((sum: number, w: any) => sum + (w.workout_sets?.length || 0), 0),
        }
      })

      setStats({ points: points?.total_points || 0, streak: points?.streak_days || 0, totalWorkouts, totalSets, totalCalories, avgCaloriesPerDay })
      setWeekData(weekBreakdown)
    } finally { setLoading(false) }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)' }}>Cargando estadísticas...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Stats KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
        {[
          { label: 'Entrenamientos (7d)', value: stats?.totalWorkouts || 0, border: 'var(--blue)' },
          { label: 'Sets Completados', value: stats?.totalSets || 0, border: 'var(--purple)' },
          { label: 'Calorías (7d)', value: stats?.totalCalories || 0, sub: `${stats?.avgCaloriesPerDay}/día`, border: 'var(--orange)' },
          { label: 'Puntos Totales', value: stats?.points || 0, border: 'var(--green)' },
        ].map((card, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
            style={{ borderTop: `2px solid ${card.border}`, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', padding: '14px 18px' }}>
            <div className="kpi-label">{card.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginTop: '4px' }}>
              {card.value}
            </div>
            {card.sub && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '3px' }}>{card.sub}</div>}
          </motion.div>
        ))}
      </div>

      {/* Week Activity - scrollable on mobile */}
      <div className="panel" style={{ overflowX: 'auto' }}>
        <div className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', minWidth: '500px' }}>
          <span>Actividad de esta Semana</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)' }}>7 días</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', minWidth: '500px' }}>
          {weekData.map((day, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }}
              style={{
                padding: '12px 8px',
                borderRadius: '6px',
                textAlign: 'center',
                transition: 'all 0.15s',
                background: day.workouts > 0 ? 'rgba(111,160,255,0.15)' : 'rgba(255,255,255,0.03)',
                border: day.workouts > 0 ? '1px solid var(--blue)' : '1px solid var(--border)',
              }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)' }}>{day.day}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginTop: '4px' }}>{day.workouts}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)' }}>{day.sets} sets</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="callout" style={{ borderLeftColor: 'var(--green)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text)', lineHeight: 1.6 }}>
          {stats?.totalWorkouts >= 5
            ? `¡Excelente consistencia! Has entrenado ${stats.totalWorkouts} veces esta semana`
            : 'Intenta entrenar al menos 4-5 veces por semana para mejores resultados'}
        </div>
      </div>
    </div>
  )
}
