?'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface CoachRecommendationsProps {
  userId: string
}

export default function CoachRecommendations({ userId }: CoachRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null)
  const [error, setError] = useState('')

  const analyzeProgress = async () => {
    setLoading(true)
    setError('')
    try {
      const { data: profile } = await supabase.from('user_profiles').select('*').eq('id', userId).single()
      const { data: workouts } = await supabase.from('workouts').select('*, workout_sets(*)').eq('user_id', userId).order('date', { ascending: false }).limit(10)
      const { data: meals } = await supabase.from('meals').select('*').eq('user_id', userId).gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      const { data: points } = await supabase.from('user_points').select('*').eq('user_id', userId).single()

      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workouts, meals, points, profile }),
      })

      if (!res.ok) throw new Error('Error al analizar')
      const data = await res.json()
      setRecommendations(data.recommendations || [])
      setLastAnalysis(new Date())
    } catch (err) {
      setError('Error al analizar. Registra más datos primero.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={analyzeProgress} disabled={loading}
        style={{ width: '100%', padding: '16px', background: 'var(--blue)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '13px', opacity: loading ? 0.5 : 1 }}>
        {loading ? 'Analizando con IA...' : 'Analizar mi Progreso'}
      </motion.button>

      {lastAnalysis && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)', textAlign: 'center' }}>
          Último análisis: {lastAnalysis.toLocaleString('es-ES')}
        </p>
      )}

      {error && (
        <div style={{ padding: '12px', background: 'rgba(248,113,113,0.1)', border: '1px solid var(--red)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--red)' }}>
          {error}
        </div>
      )}

      {recommendations.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recommendations.map((rec, idx) => {
            const isPositive = rec.startsWith('[OK]')
            const isWarning = rec.startsWith('[!]')
            const isInfo = rec.startsWith('[D]') || rec.startsWith('[i]') || rec.startsWith('[^]') || rec.startsWith('[G]')
            const isAction = rec.startsWith('[>]') || rec.startsWith('[T]') || rec.startsWith('[Z]') || rec.startsWith('[W]')
            const icon = rec.startsWith('[') ? rec.slice(0, rec.indexOf(']') + 1) : '•'
            const text = rec.replace(/^\[[^\]]+\]\s*/, '')
            const color = isPositive ? 'var(--green)' : isWarning ? 'var(--orange)' : isInfo ? 'var(--blue)' : isAction ? 'var(--purple)' : 'var(--text)'

            return (
              <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }}
                style={{ display: 'flex', gap: '10px', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${color}33`, borderRadius: '6px', borderLeft: `3px solid ${color}` }}>
                <span style={{ flexShrink: 0, fontSize: '1rem' }}>{icon}</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text)', lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700, color }}>{text.split('—')[0]}</span>
                  {text.includes('—') && <span>—{text.split('—')[1]}</span>}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {recommendations.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
            Haz clic en "Analizar mi Progreso" para obtener un plan personalizado basado en ciencia
          </p>
        </div>
      )}
    </div>
  )
}
