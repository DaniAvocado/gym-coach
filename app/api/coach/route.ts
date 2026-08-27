import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { calculateTDEE } from '@/lib/nutrition'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { workouts, meals, profile } = await req.json()

    const w = profile?.weight_kg || 75
    const h = profile?.height_cm || 175
    const a = profile?.age || 25
    const g = profile?.gender || 'male'
    const act = profile?.activity_level || 'moderate'
    const meta = profile?.metabolic_rate || 'normal'
    const goal = profile?.goal || 'hypertrophy'
    const exp = profile?.experience_level || 'beginner'

    const tdee = calculateTDEE(w, h, a, g, act, meta)
    const calTarget = goal === 'hypertrophy' ? tdee + 300 : goal === 'strength' ? tdee + 200 : goal === 'weight_loss' ? tdee - 400 : tdee
    const proteinTarget = Math.round(w * (goal === 'weight_loss' ? 2.4 : goal === 'hypertrophy' ? 2.2 : 2.0))
    const fatTarget = Math.round(w * (goal === 'endurance' ? 1.0 : goal === 'strength' ? 0.9 : goal === 'weight_loss' ? 0.7 : 0.8))
    const carbsTarget = Math.round((calTarget - (proteinTarget * 4 + fatTarget * 9)) / 4)

    const totalSets = workouts?.reduce((sum: number, w: any) => sum + (w.workout_sets?.length || 0), 0) || 0
    const totalCalories = meals?.reduce((sum: number, m: any) => sum + (m.calories || 0), 0) || 0
    const avgCals = meals?.length ? Math.round(totalCalories / 7) : 0
    const totalProtein = meals?.reduce((sum: number, m: any) => sum + (m.protein || 0), 0) || 0
    const avgProtein = meals?.length ? Math.round(totalProtein / 7) : 0

    // Generate coach recommendations using the science-based approach
    const recs: string[] = []

    // 1. Calorie assessment
    if (avgCals > 0) {
      const diff = avgCals - calTarget
      if (Math.abs(diff) < 200) recs.push(`[OK] **Nutrición en punto** — Tu ingesta promedio (${avgCals} kcal) está alineada con tu objetivo de ${calTarget} kcal.`)
      else if (diff > 0 && (goal === 'weight_loss' || goal === 'definition'))
        recs.push(`[!] **Superávit no deseado** — Estás consumiendo ${diff} kcal sobre tu objetivo. Reduce ~${Math.abs(diff)} kcal/día o aumenta el NEAT.`)
      else if (diff < 0 && (goal === 'hypertrophy' || goal === 'strength'))
        recs.push(`[!] **Déficit involuntario** — Estás ${Math.abs(diff)} kcal bajo tu objetivo de ${calTarget} kcal. Añade una comida extra o aumenta porciones.`)
      else recs.push(`[D] **Ingesta actual:** ${avgCals} kcal/día. Objetivo: ~${calTarget} kcal.`)
    }

    // 2. Protein assessment
    if (avgProtein > 0) {
      const pct = Math.round((avgProtein / proteinTarget) * 100)
      if (pct >= 90) recs.push(`[OK] **Proteína en rango** — Consumes ~${avgProtein}g/día (${pct}% de tu meta de ${proteinTarget}g).`)
      else recs.push(`[!] **Aumenta proteína** — Consumes ${avgProtein}g/día, necesitas ~${proteinTarget}g. Añade ${Math.round((proteinTarget - avgProtein) / 3)} porciones de 20g proteína.`)
    } else {
      recs.push(`[i] **Proteína objetivo:** ${proteinTarget}g/día (${(proteinTarget / w).toFixed(1)} g/kg). Buenas fuentes: pollo, huevos, pescado, legumbres.`)
    }

    // 3. Workout assessment
    const sessions = workouts?.length || 0
    if (sessions >= 5) recs.push(`[OK] **Frecuencia:** ${sessions} sesiones/semana. Excelente para ${goal === 'hypertrophy' ? 'hipertrofia' : goal === 'strength' ? 'fuerza' : 'tu objetivo'}.`)
    else if (sessions >= 3) recs.push(`[^] **Frecuencia:** ${sessions} sesiones. Bien, pero apunta a 5-6 para maximizar resultados.`)
    else recs.push(`[!] **Frecuencia baja:** ${sessions} sesiones. Mínimo recomendado: 4-5/semana para progreso consistente.`)

    // Volume
    if (totalSets >= 40) recs.push(`[OK] **Volumen:** ${totalSets} sets/semana. Rango óptimo para hipertrofia (10-20 sets/grupo).`)
    else if (totalSets >= 20) recs.push(`[D] **Volumen:** ${totalSets} sets/semana. Intenta llegar a 40+ para maximizar crecimiento.`)
    else recs.push(`[G] **Volumen bajo:** ${totalSets} sets. Apunta a 10-20 sets por grupo muscular grande.`)

    // 4. Experience-based recommendations
    if (exp === 'beginner') recs.push(`[>] **Eres principiante** — La sobrecarga progresiva lineal funciona mejor: sube 2.5kg o 1 rep por sesión. No necesitas programas complejos aún.`)
    else if (exp === 'intermediate') recs.push(`[>] **Nivel intermedio** — Usa periodización: 3-4 semanas de progresión seguidas de 1 semana de descarga al 60-70%.`)

    // 5. Progressive overload guidance
    recs.push(`[^] **Sobrecarga progresiva** — Intenta subir 2.5kg en ejercicios compuestos cuando completes todas las reps del rango objetivo. Para aislamiento, prioriza reps antes que peso.`)

    // 6. Overtraining warning
    if (totalSets > 60) recs.push(`[!] **Volumen muy alto** — Más de 60 sets/semana puede llevar a sobreentrenamiento. Considera una semana de descarga.`)

    // 7. RIR/RPE guidance
    recs.push(`[>] **RIR (Reps in Reserve)** — Deja 1-2 reps en reserve en la mayoría de series. Solo llega a fallo en la última serie del último ejercicio.`)

    // 8. Meal timing
    recs.push(`[T] **Distribución de comidas** — Distribuye tus ${Math.round(calTarget)} kcal en 4-5 comidas. 25% desayuno, 35% almuerzo, 30% cena, 10% snacks post-entreno.`)

    // 9. Sleep & recovery
    recs.push(`[Z] **Recuperación** — 7-9h de sueño. El crecimiento muscular ocurre fuera del gym, no dentro.`)

    // 10 Hydration
    recs.push(`[W] **Hidratación** — ${Math.round(w * 0.04)}L de agua al día (${w}kg × 40ml).`)

    return NextResponse.json({ recommendations: recs })
  } catch (error) {
    return NextResponse.json({ error: 'Error al analizar progreso' }, { status: 500 })
  }
}
