'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface MealTrackerProps {
  userId: string
}

const activityMultipliers: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 }
const metaAdjustments: Record<string, number> = { slow: 0.9, normal: 1.0, fast: 1.1 }

export default function MealTracker({ userId }: MealTrackerProps) {
  const [mealType, setMealType] = useState('breakfast')
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fats, setFats] = useState('')
  const [loading, setLoading] = useState(false)
  const [todayMeals, setTodayMeals] = useState<any[]>([])
  const [macroGoals, setMacroGoals] = useState<{ calories: number; protein: number; fat: number; carbs: number } | null>(null)

  const mealTypes: Record<string, { label: string; icon: string; border: string }> = {
    breakfast: { label: 'Desayuno', icon: '🍳', border: 'var(--orange)' },
    lunch: { label: 'Almuerzo', icon: '🍗', border: 'var(--green)' },
    dinner: { label: 'Cena', icon: '🍖', border: 'var(--purple)' },
    snack: { label: 'Snack', icon: '🥜', border: 'var(--pastel-pink)' },
  }

  useEffect(() => {
    fetchTodayMeals()
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: profile } = await supabase.from('user_profiles').select('*').eq('id', userId).single()
    if (profile?.weight_kg && profile?.height_cm && profile?.age) {
      const w = profile.weight_kg
      const h = profile.height_cm
      const a = profile.age
      const gender = profile.gender || 'male'
      const activityLevel = profile.activity_level || 'moderate'
      const metabolicRate = profile.metabolic_rate || 'normal'
      const goal = profile.goal || 'hypertrophy'

      const bmr = 10 * w + 6.25 * h - 5 * a + (gender === 'male' ? 5 : -161)
      const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.55) * (metaAdjustments[metabolicRate] || 1.0))

      let calTarget = tdee, proteinMult = 2.0, fatMult = 0.8
      switch (goal) {
        case 'hypertrophy': calTarget = tdee + 300; proteinMult = 2.2; fatMult = 0.8; break
        case 'strength': calTarget = tdee + 200; proteinMult = 2.0; fatMult = 0.9; break
        case 'weight_loss': calTarget = tdee - 400; proteinMult = 2.4; fatMult = 0.7; break
        default: calTarget = tdee; proteinMult = 2.0; fatMult = 0.8
      }
      const proteinTarget = Math.round(w * proteinMult)
      const fatTarget = Math.round(w * fatMult)
      const carbsTarget = Math.round((calTarget - (proteinTarget * 4 + fatTarget * 9)) / 4)
      setMacroGoals({ calories: calTarget, protein: proteinTarget, carbs: carbsTarget, fat: fatTarget })
    }
  }

  const fetchTodayMeals = async () => {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase.from('meals').select('*').eq('date', today).order('created_at', { ascending: false })
    setTodayMeals(data || [])
  }

  const saveMeal = async () => {
    if (!foodName || !calories) { alert('Completa al menos Alimento y Calorías'); return }
    setLoading(true)
    const today = new Date().toISOString().split('T')[0]
    await supabase.from('meals').insert({
      user_id: userId, date: today, meal_type: mealType, food_name: foodName,
      calories: parseInt(calories), protein: protein ? parseFloat(protein) : 0,
      carbs: carbs ? parseFloat(carbs) : 0, fats: fats ? parseFloat(fats) : 0,
    })
    setFoodName(''); setCalories(''); setProtein(''); setCarbs(''); setFats('')
    fetchTodayMeals()
    setLoading(false)
  }

  const deleteMeal = async (id: string) => { await supabase.from('meals').delete().eq('id', id); fetchTodayMeals() }

  const totals = todayMeals.reduce((acc, m) => ({
    calories: acc.calories + (m.calories || 0),
    protein: acc.protein + (m.protein || 0),
    carbs: acc.carbs + (m.carbs || 0),
    fats: acc.fats + (m.fats || 0),
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 })

  const getProgressBar = (current: number, goal: number, color: string) => {
    const pct = goal > 0 ? Math.min((current / goal) * 100, 100) : 0
    return (
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '2px', transition: 'width 0.3s' }} />
      </div>
    )
  }

  const inputStyle = { background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Macro progress bars */}
      <div className="panel" style={{ borderLeft: '3px solid var(--blue)' }}>
        <div className="kpi-label" style={{ marginBottom: '8px' }}>PROGRESO DIARIO</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
          {[
            { label: 'Calorías', current: totals.calories, goal: macroGoals?.calories || 2500, color: 'var(--red)', unit: 'kcal' },
            { label: 'Proteína', current: totals.protein, goal: macroGoals?.protein || 150, color: 'var(--blue)', unit: 'g' },
            { label: 'Carbos', current: totals.carbs, goal: macroGoals?.carbs || 300, color: 'var(--orange)', unit: 'g' },
            { label: 'Grasas', current: totals.fats, goal: macroGoals?.fat || 60, color: 'var(--pastel-pink)', unit: 'g' },
          ].map((card, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '2px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{card.label}</span>
                <span style={{ color: 'var(--text)', fontWeight: 700 }}>
                  {Math.round(card.current)} <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>/ {card.goal}</span>
                </span>
              </div>
              {getProgressBar(card.current, card.goal, card.color)}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)', marginTop: '2px', textAlign: 'right' }}>
                {Math.round((card.current / (card.goal || 1)) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="panel" style={{ borderLeft: '3px solid var(--green)' }}>
        <div className="kpi-label" style={{ marginBottom: '12px' }}>REGISTRAR COMIDA</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '16px' }}>
          <select value={mealType} onChange={e => setMealType(e.target.value)} style={{ ...inputStyle, width: '100%' }}>
            {Object.entries(mealTypes).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
          </select>
          <input type="text" placeholder="Nombre del alimento" value={foodName} onChange={e => setFoodName(e.target.value)} style={{ ...inputStyle, width: '100%' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <input type="number" placeholder="Calorías" value={calories} onChange={e => setCalories(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Proteína (g)" value={protein} onChange={e => setProtein(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Carbos (g)" value={carbs} onChange={e => setCarbs(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Grasas (g)" value={fats} onChange={e => setFats(e.target.value)} style={inputStyle} />
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={saveMeal} disabled={loading}
          style={{ width: '100%', padding: '12px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '12px', opacity: loading ? 0.5 : 1 }}>
          {loading ? '⏳ Guardando...' : '✅ Registrar Comida'}
        </motion.button>
      </div>

      {/* Today's meals */}
      {todayMeals.length > 0 && (
        <div className="panel" style={{ borderLeft: '3px solid var(--purple)' }}>
          <div className="kpi-label" style={{ marginBottom: '12px' }}>COMIDAS DE HOY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {todayMeals.map((meal, idx) => {
              const info = mealTypes[meal.meal_type]
              return (
                <motion.div key={meal.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(91,141,239,0.06)', borderRadius: '4px', borderLeft: `3px solid ${info?.border || 'var(--border)'}` }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{info?.icon} {meal.food_name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {meal.calories} kcal · P:{meal.protein}g · C:{meal.carbs}g · G:{meal.fats}g
                    </div>
                  </div>
                  <button onClick={() => deleteMeal(meal.id)} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
