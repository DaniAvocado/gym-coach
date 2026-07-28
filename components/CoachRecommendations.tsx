'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface CoachRecommendationsProps {
  userId: string
}

export default function CoachRecommendations({ userId }: CoachRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null)

  const analyzeProgress = async () => {
    setLoading(true)
    try {
      const { data: profile } = await supabase.from('user_profiles').select('*').eq('id', userId).single()
      const { data: workouts } = await supabase.from('workouts').select('*, workout_sets(*)').eq('user_id', userId).order('date', { ascending: false }).limit(10)
      const { data: meals } = await supabase.from('meals').select('*').eq('user_id', userId).gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      const { data: points } = await supabase.from('user_points').select('*').eq('user_id', userId).single()

      const totalSets = workouts?.reduce((sum: number, w: any) => sum + (w.workout_sets?.length || 0), 0) || 0
      const totalCalories = meals?.reduce((sum: number, m: any) => sum + (m.calories || 0), 0) || 0
      const avgCals = meals?.length ? Math.round(totalCalories / 7) : 0

      // Calculate recommended macros based on profile
      let calGoal = 2500, proteinGoal = 150, macroNote = ''
      if (profile?.weight_kg && profile?.height_cm && profile?.age) {
        const w = profile.weight_kg
        const h = profile.height_cm
        const a = profile.age
        const g = profile.gender || 'male'
        const act = profile.activity_level || 'moderate'
        const meta = profile.metabolic_rate || 'normal'
        const goal = profile.goal || 'hypertrophy'
        const actMul = ({ sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 } as Record<string, number>)[act] || 1.55
        const metaAdj = ({ slow: 0.9, normal: 1.0, fast: 1.1 } as Record<string, number>)[meta] || 1.0
        const bmr = 10 * w + 6.25 * h - 5 * a + (g === 'male' ? 5 : -161)
        let tdee = Math.round(bmr * actMul * metaAdj)
        const protMul = ({ weight_loss: 2.4, hypertrophy: 2.2, strength: 2.0, endurance: 2.0 } as Record<string, number>)[goal] || 2.0
        calGoal = ({ hypertrophy: tdee + 300, strength: tdee + 200, weight_loss: tdee - 400 } as Record<string, number>)[goal] || tdee
        proteinGoal = Math.round(w * protMul)
        macroNote = `Tu metabolismo ${meta === 'fast' ? 'rápido' : meta === 'slow' ? 'lento' : 'normal'} y actividad ${act} ajustan tu gasto diario a ~${tdee} kcal.`
      }

      const positiveItems = []
      const warningItems = []

      // Workout frequency
      if ((workouts?.length || 0) >= 5) positiveItems.push({ title: 'Consistencia', desc: `${workouts?.length} entrenamientos esta semana`, icon: '🔥', color: 'var(--green)' })
      else warningItems.push({ title: 'Frecuencia', desc: `Solo ${workouts?.length || 0} entrenamientos. Intenta al menos 4-5.`, icon: '📅', color: 'var(--orange)' })

      // Volume
      if (totalSets >= 40) positiveItems.push({ title: 'Volumen', desc: `${totalSets} sets en la semana. Buen trabajo.`, icon: '💪', color: 'var(--green)' })
      else warningItems.push({ title: 'Volumen', desc: `${totalSets} sets. Intenta llegar a 40+.`, icon: '🎯', color: 'var(--orange)' })

      // Calories vs goal
      if (avgCals >= calGoal - 200 && avgCals <= calGoal + 200) positiveItems.push({ title: 'Nutrición', desc: `Promedio de ${avgCals} kcal/día. En objetivo.`, icon: '🥗', color: 'var(--green)' })
      else if (avgCals > 0) warningItems.push({ title: 'Calorías', desc: `${avgCals} kcal/día promedio. Objetivo: ~${calGoal} kcal. Ajusta tu ingesta.`, icon: '🍽️', color: 'var(--orange)' })

      // Streak
      if ((points?.streak_days || 0) >= 7) positiveItems.push({ title: 'Racha', desc: `${points?.streak_days} días seguidos`, icon: '🚀', color: 'var(--blue)' })

      setRecommendations({ positiveItems, warningItems, macroNote, calGoal, proteinGoal, workoutsCount: workouts?.length || 0, totalSets, avgCals })
      setLastAnalysis(new Date())
    } finally { setLoading(false) }
  }

  const renderCard = (item: { title: string; desc: string; icon: string; color: string }, idx: number) => (
    <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
      whileHover={{ scale: 1.02 }}
      style={{ padding: '16px', background: 'var(--ink-panel)', border: `1px solid ${item.color}`, borderRadius: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)', padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>+10 pts</span>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px', color: 'var(--text)', marginTop: '8px' }}>{item.title}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{item.desc}</div>
    </motion.div>
  )

  const positiveItems = recommendations?.positiveItems || []
  const warningItems = recommendations?.warningItems || []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={analyzeProgress} disabled={loading}
        style={{ width: '100%', padding: '16px', background: 'var(--blue)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '13px', opacity: loading ? 0.5 : 1 }}>
        {loading ? '⚙️ Analizando...' : '🔍 Analizar mi Progreso'}
      </motion.button>

      {lastAnalysis && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)' }}>Último análisis: {lastAnalysis.toLocaleString('es-ES')}</p>}

      {recommendations && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Macro note */}
          {recommendations.macroNote && (
            <div className="callout" style={{ borderLeftColor: 'var(--purple)' }}>
              <span style={{ fontSize: '14px' }}>📊</span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text)', lineHeight: 1.5 }}>
                {recommendations.macroNote}
              </div>
            </div>
          )}

          {positiveItems.length > 0 && (
            <div>
              <div className="kpi-label" style={{ marginBottom: '8px' }}>LO QUE HACES BIEN</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {positiveItems.map((item: any, idx: number) => renderCard(item, idx))}
              </div>
            </div>
          )}
          {warningItems.length > 0 && (
            <div>
              <div className="kpi-label" style={{ marginBottom: '8px', color: 'var(--orange)' }}>ÁREAS DE MEJORA</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {warningItems.map((item: any, idx: number) => renderCard(item, positiveItems.length + idx))}
              </div>
            </div>
          )}

          <div className="callout">
            <span style={{ fontSize: '14px' }}>🎯</span>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.5 }}>
                {positiveItems.length >= warningItems.length
                  ? '¡Vas bien! La consistencia es la clave. Cada entrenamiento cuenta.'
                  : 'Identifica las áreas de mejora y trabaja en ellas. El progreso es gradual.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {!recommendations && (
        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px' }}>
          <span style={{ fontSize: '3rem' }}>🤖</span>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
            Haz clic en "Analizar mi Progreso" para obtener recomendaciones personalizadas
          </p>
        </div>
      )}
    </div>
  )
}
