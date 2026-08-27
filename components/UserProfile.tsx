'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { calculateBMR, calculateMacros, ACTIVITY_MULTIPLIERS, META_ADJUSTMENTS } from '@/lib/nutrition'

interface UserProfileProps {
  userId: string
}

const activityLabels: Record<string, string> = {
  sedentary: 'Sedentario (poco o nada)',
  light: 'Ligero (1-3 días/sem)',
  moderate: 'Moderado (3-5 días/sem)',
  active: 'Activo (6-7 días/sem)',
  very_active: 'Muy activo (2x/día)',
}

const metaLabels: Record<string, string> = {
  slow: 'Lento (subo de peso fácil)',
  normal: 'Normal',
  fast: 'Rápido (como mucho y no subo)',
}

export default function UserProfile({ userId }: UserProfileProps) {
  const [profile, setProfile] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [activityLevel, setActivityLevel] = useState('moderate')
  const [metabolicRate, setMetabolicRate] = useState('normal')
  const [bodyFat, setBodyFat] = useState('')
  const [goal, setGoal] = useState('hypertrophy')
  const [experience, setExperience] = useState('beginner')

  useEffect(() => { fetchProfile() }, [userId])

  const fetchProfile = async () => {
    setLoading(true)
    const { data } = await supabase.from('user_profiles').select('*').eq('id', userId).single()
    if (data) {
      setProfile(data)
      setWeight(data.weight_kg?.toString() || '')
      setHeight(data.height_cm?.toString() || '')
      setAge(data.age?.toString() || '')
      setGender(data.gender || 'male')
      setActivityLevel(data.activity_level || 'moderate')
      setMetabolicRate(data.metabolic_rate || 'normal')
      setBodyFat(data.body_fat_percentage?.toString() || '')
      setGoal(data.goal || 'hypertrophy')
      setExperience(data.experience_level || 'beginner')
    }
    setLoading(false)
  }

  const saveProfile = async () => {
    await supabase.from('user_profiles').update({
      weight_kg: parseFloat(weight), height_cm: parseInt(height), age: parseInt(age),
      gender, activity_level: activityLevel, metabolic_rate: metabolicRate,
      body_fat_percentage: bodyFat ? parseFloat(bodyFat) : null,
      goal, experience_level: experience, updated_at: new Date().toISOString(),
    }).eq('id', userId)
    await fetchProfile()
    setEditing(false)
    alert('Perfil actualizado')
  }

  const calculateStats = () => {
    if (!weight || !height || !age) return null

    const w = parseFloat(weight)
    const h = parseInt(height)
    const a = parseInt(age)
    const hM = h / 100

    // IMC
    const imc = w / (hM * hM)

    const bmr = calculateBMR(w, h, a, gender)
    const { tdee, calories, protein, fat, carbs } = calculateMacros(w, h, a, gender, activityLevel, metabolicRate, goal)

    return { imc, bmr, tdee, calories, protein, fat, carbs }
  }

  const stats = calculateStats()
  const imcCategory = stats
    ? stats.imc < 18.5 ? { label: 'Bajo peso', color: 'var(--blue)' }
      : stats.imc < 25 ? { label: 'Peso normal', color: 'var(--green)' }
        : stats.imc < 30 ? { label: 'Sobrepeso', color: 'var(--orange)' }
          : { label: 'Obeso', color: 'var(--red)' }
    : null

  const inputStyle = { background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none', width: '100%' }
  const labelStyle: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)' }}>Cargando perfil...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={() => setEditing(!editing)}
        style={{ padding: '12px', background: editing ? 'transparent' : 'var(--blue)', color: editing ? 'var(--blue)' : '#0b0b12', border: `1px solid ${editing ? 'var(--blue)' : 'transparent'}`, borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
        {editing ? '✕ Cancelar' : 'Editar Perfil'}
      </motion.button>

      {editing ? (
        <div className="panel" style={{ borderLeft: '3px solid var(--blue)' }}>
          <div className="kpi-label" style={{ marginBottom: '12px' }}>EDITAR INFORMACIÓN</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div><label style={labelStyle}>Peso (kg)</label><input type="number" value={weight} onChange={e => setWeight(e.target.value)} step="0.5" placeholder="ej: 75" style={inputStyle} /></div>
            <div><label style={labelStyle}>Estatura (cm)</label><input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="ej: 175" style={inputStyle} /></div>
            <div><label style={labelStyle}>Edad</label><input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="ej: 25" style={inputStyle} /></div>
            <div><label style={labelStyle}>Sexo</label>
              <select value={gender} onChange={e => setGender(e.target.value)} style={inputStyle}>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select></div>
            <div><label style={labelStyle}>Nivel de actividad</label>
              <select value={activityLevel} onChange={e => setActivityLevel(e.target.value)} style={inputStyle}>
                {Object.entries(activityLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select></div>
            <div><label style={labelStyle}>Metabolismo</label>
              <select value={metabolicRate} onChange={e => setMetabolicRate(e.target.value)} style={inputStyle}>
                {Object.entries(metaLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select></div>
            <div><label style={labelStyle}>% Grasa corporal (opcional)</label><input type="number" value={bodyFat} onChange={e => setBodyFat(e.target.value)} step="0.1" style={inputStyle} /></div>
            <div><label style={labelStyle}>Experiencia</label>
              <select value={experience} onChange={e => setExperience(e.target.value)} style={inputStyle}>
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
              </select></div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Objetivo</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} style={inputStyle}>
              <option value="hypertrophy">Hipertrofia (ganar músculo)</option>
              <option value="strength">Fuerza</option>
              <option value="endurance">Resistencia</option>
              <option value="weight_loss">Pérdida de peso</option>
            </select>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={saveProfile}
            style={{ width: '100%', padding: '12px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
            Guardar Cambios
          </motion.button>
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
            {[
              { label: 'Peso', value: weight ? `${weight} kg` : '-', border: 'var(--blue)' },
              { label: 'Estatura', value: height ? `${height} cm` : '-', border: 'var(--purple)' },
              { label: 'Edad', value: age ? `${age} años` : '-', border: 'var(--pink-light)' },
              { label: 'Actividad', value: activityLabels[activityLevel]?.split(' ')[0] || '-', border: 'var(--green)' },
              { label: 'Metabolismo', value: metaLabels[metabolicRate]?.split(' ')[0] || '-', border: 'var(--orange)' },
              { label: 'Objetivo', value: goal === 'hypertrophy' ? 'Hipertrofia' : goal === 'strength' ? 'Fuerza' : goal === 'endurance' ? 'Resistencia' : 'Perdida', border: 'var(--green)' },
            ].map((card, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                style={{ borderTop: `2px solid ${card.border}`, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 12px' }}>
                <div className="kpi-label">{card.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginTop: '4px' }}>{card.value}</div>
              </motion.div>
            ))}
          </div>

          {stats && (
            <>
              {/* IMC + BMR + TDEE */}
              <div className="panel" style={{ borderLeft: `3px solid ${imcCategory?.color || 'var(--border)'}` }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <div className="kpi-label">IMC</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: imcCategory?.color || 'var(--text)', marginTop: '4px' }}>{stats.imc.toFixed(1)}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: imcCategory?.color }}>{imcCategory?.label}</div>
                  </div>
                  <div>
                    <div className="kpi-label">Tasa Metabólica Basal</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--blue)', marginTop: '4px' }}>{stats.bmr}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>kcal/día</div>
                  </div>
                  <div>
                    <div className="kpi-label">Gasto Diario (TDEE)</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--orange)', marginTop: '4px' }}>{stats.tdee}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>kcal/día</div>
                  </div>
                </div>
              </div>

              {/* Macros */}
              <div className="panel" style={{ borderLeft: '3px solid var(--green)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                  <div className="kpi-label" style={{ fontSize: '0.7rem' }}>MACROS OBJETIVO</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)' }}>{stats.calories} kcal/día</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '10px', textAlign: 'center' }}>
                    <div className="kpi-label">Proteína</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--blue)', marginTop: '4px' }}>{stats.protein}g</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)' }}>{Math.round(stats.protein * 4)} kcal</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '10px', textAlign: 'center' }}>
                    <div className="kpi-label">Carbos</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--orange)', marginTop: '4px' }}>{stats.carbs}g</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)' }}>{Math.round(stats.carbs * 4)} kcal</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '10px', textAlign: 'center' }}>
                    <div className="kpi-label">Grasas</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--pink-light)', marginTop: '4px' }}>{stats.fat}g</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)' }}>{Math.round(stats.fat * 9)} kcal</div>
                  </div>
                </div>
                <div style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)', lineHeight: 1.5 }}>
                  Mifflin-St Jeor · Actividad: {activityLabels[activityLevel]} · Metabolismo: {metaLabels[metabolicRate]}
                </div>
              </div>

              {/* Tips */}
              <div className="callout" style={{ borderLeftColor: 'var(--purple)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text)', lineHeight: 1.6 }}>
                  {goal === 'hypertrophy' && `Superávit de 300 kcal/día. Proteína: ${stats.protein}g/día (2.2g/kg). Entrena 5-6 veces/semana, 10-15 series por grupo.`}
                  {goal === 'strength' && `Superávit leve de 200 kcal/día. Entrena en rangos de 3-6 reps al 85-90% 1RM. Descansa 3-5 min entre series.`}
                  {goal === 'weight_loss' && `Déficit de 400 kcal/día. Proteína alta (${stats.protein}g/día) para preservar músculo. Añade cardio 3-4 veces/semana.`}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
