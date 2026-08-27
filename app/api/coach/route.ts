import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { calculateTDEE } from '@/lib/nutrition'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const rateLimit = new Map<string, { count: number; resetAt: number }>()
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 30) return false
  entry.count++
  return true
}

interface Profile {
  weight_kg?: number
  height_cm?: number
  age?: number
  gender?: string
  activity_level?: string
  metabolic_rate?: string
  goal?: string
  experience_level?: string
}

function validateInput(body: any) {
  if (!body || typeof body !== 'object') return { ok: false as const, error: 'Body inválido' }
  const { workouts, meals, profile, message, history } = body
  if (workouts && !Array.isArray(workouts)) return { ok: false as const, error: 'workouts debe ser array' }
  if (meals && !Array.isArray(meals)) return { ok: false as const, error: 'meals debe ser array' }
  if (profile && typeof profile !== 'object') return { ok: false as const, error: 'profile debe ser object' }
  if (message && typeof message !== 'string') return { ok: false as const, error: 'message debe ser string' }
  if (history && !Array.isArray(history)) return { ok: false as const, error: 'history debe ser array' }
  return { ok: true as const, workouts: workouts || [], meals: meals || [], profile: profile || {}, message: message || '', history: history || [] }
}

function computeStats(workouts: any[], meals: any[], profile: Profile) {
  const w = profile.weight_kg || 75
  const h = profile.height_cm || 175
  const a = profile.age || 25
  const g = profile.gender || 'male'
  const act = profile.activity_level || 'moderate'
  const meta = profile.metabolic_rate || 'normal'
  const goal = profile.goal || 'hypertrophy'
  const exp = profile.experience_level || 'beginner'

  const tdee = calculateTDEE(w, h, a, g, act, meta)
  const calTarget = goal === 'hypertrophy' ? tdee + 300 : goal === 'strength' ? tdee + 200 : goal === 'weight_loss' ? tdee - 400 : tdee
  const proteinTarget = Math.round(w * (goal === 'weight_loss' ? 2.4 : goal === 'hypertrophy' ? 2.2 : 2.0))
  const fatTarget = Math.round(w * (goal === 'endurance' ? 1.0 : goal === 'strength' ? 0.9 : goal === 'weight_loss' ? 0.7 : 0.8))
  const carbsTarget = Math.round((calTarget - (proteinTarget * 4 + fatTarget * 9)) / 4)

  const totalSets = workouts.reduce((sum: number, wk: any) => sum + (wk.workout_sets?.length || 0), 0)
  const totalCalories = meals.reduce((sum: number, m: any) => sum + (m.calories || 0), 0)
  const avgCals = meals.length ? Math.round(totalCalories / 7) : 0
  const totalProtein = meals.reduce((sum: number, m: any) => sum + (m.protein || 0), 0)
  const avgProtein = meals.length ? Math.round(totalProtein / 7) : 0
  const sessions = workouts.length

  const exerciseBreakdown: Record<string, { sets: number; weight: number; reps: number }> = {}
  workouts.forEach((wk: any) => {
    wk.workout_sets?.forEach((s: any) => {
      const name = s.exercises?.name || s.exercise_id
      if (!exerciseBreakdown[name]) exerciseBreakdown[name] = { sets: 0, weight: 0, reps: 0 }
      exerciseBreakdown[name].sets++
      exerciseBreakdown[name].weight += s.weight || 0
      exerciseBreakdown[name].reps += s.reps || 0
    })
  })

  const topExercises = Object.entries(exerciseBreakdown)
    .sort((a, b) => b[1].sets - a[1].sets)
    .slice(0, 10)
    .map(([name, data]) => ({
      name,
      total_sets: data.sets,
      avg_weight: data.weight > 0 ? Math.round(data.weight / data.sets * 10) / 10 : 0,
      avg_reps: Math.round(data.reps / data.sets),
    }))

  return { w, goal, exp, tdee, calTarget, proteinTarget, fatTarget, carbsTarget, totalSets, avgCals, avgProtein, sessions, topExercises }
}

function statsToContext(stats: ReturnType<typeof computeStats>): string {
  return `CONTEXTO DEL USUARIO:
- Objetivo: ${stats.goal}
- Experiencia: ${stats.exp}
- TDEE: ${stats.tdee} kcal/día
- Meta calórica: ${stats.calTarget} kcal
- Meta macros: P${stats.proteinTarget}g / G${stats.fatTarget}g / C${stats.carbsTarget}g
- Sesiones esta semana: ${stats.sessions}
- Sets totales: ${stats.totalSets}
- Promedio kcal/día: ${stats.avgCals || 'sin datos'}
- Promedio proteína/día: ${stats.avgProtein || 'sin datos'}g
- Top ejercicios: ${stats.topExercises.map(e => `${e.name} (${e.total_sets} sets, ~${e.avg_weight}kg × ${e.avg_reps} reps)`).join(', ') || 'sin datos'}`
}

function fallbackRecommendations(stats: ReturnType<typeof computeStats>): string[] {
  const { calTarget, avgCals, avgProtein, proteinTarget, sessions, totalSets, goal, exp, w } = stats
  const recs: string[] = []

  if (avgCals > 0) {
    const diff = avgCals - calTarget
    if (Math.abs(diff) < 200) recs.push(`[OK] **Nutrición en punto** — Tu ingesta promedio (${avgCals} kcal) está alineada con tu objetivo de ${calTarget} kcal.`)
    else if (diff > 0 && (goal === 'weight_loss' || goal === 'definition'))
      recs.push(`[!] **Superávit no deseado** — Estás consumiendo ${diff} kcal sobre tu objetivo. Reduce ~${Math.abs(diff)} kcal/día o aumenta el NEAT.`)
    else if (diff < 0 && (goal === 'hypertrophy' || goal === 'strength'))
      recs.push(`[!] **Déficit involuntario** — Estás ${Math.abs(diff)} kcal bajo tu objetivo de ${calTarget} kcal. Añade una comida extra o aumenta porciones.`)
    else recs.push(`[D] **Ingesta actual:** ${avgCals} kcal/día. Objetivo: ~${calTarget} kcal.`)
  }

  if (avgProtein > 0) {
    const pct = Math.round((avgProtein / proteinTarget) * 100)
    if (pct >= 90) recs.push(`[OK] **Proteína en rango** — Consumes ~${avgProtein}g/día (${pct}% de tu meta de ${proteinTarget}g).`)
    else recs.push(`[!] **Aumenta proteína** — Consumes ${avgProtein}g/día, necesitas ~${proteinTarget}g.`)
  } else {
    recs.push(`[i] **Proteína objetivo:** ${proteinTarget}g/día (${(proteinTarget / w).toFixed(1)} g/kg).`)
  }

  if (sessions >= 5) recs.push(`[OK] **Frecuencia:** ${sessions} sesiones/semana. Excelente.`)
  else if (sessions >= 3) recs.push(`[^] **Frecuencia:** ${sessions} sesiones. Bien, pero apunta a 5-6.`)
  else recs.push(`[!] **Frecuencia baja:** ${sessions} sesiones. Mínimo: 4-5/semana.`)

  if (totalSets >= 40) recs.push(`[OK] **Volumen:** ${totalSets} sets/semana. Rango óptimo.`)
  else if (totalSets >= 20) recs.push(`[D] **Volumen:** ${totalSets} sets/semana. Intenta llegar a 40+.`)
  else recs.push(`[G] **Volumen bajo:** ${totalSets} sets. Apunta a 10-20 por grupo.`)

  if (exp === 'beginner') recs.push(`[>] **Principiante** — Sobrecarga progresiva lineal: sube 2.5kg o 1 rep por sesión.`)
  else if (exp === 'intermediate') recs.push(`[>] **Intermedio** — Periodización: 3-4 semanas progresión + 1 descarga al 60-70%.`)

  recs.push(`[>] **Sobrecarga** — Sube 2.5kg en compuestos cuando completes todas las reps.`)
  if (totalSets > 60) recs.push(`[!] **Volumen muy alto** — Más de 60 sets/semana puede causar sobreentrenamiento.`)
  recs.push(`[>] **RIR** — Deja 1-2 reps en reserve. Fallo solo en última serie del último ejercicio.`)
  recs.push(`[T] **Distribución** — ${calTarget} kcal en 4-5 comidas.`)
  recs.push(`[Z] **Sueño** — 7-9h. Crecimiento muscular ocurre fuera del gym.`)
  recs.push(`[W] **Agua** — ${Math.round(w * 0.04)}L/día (${w}kg × 40ml).`)

  return recs
}

async function llmChat(stats: ReturnType<typeof computeStats>, message: string, history: { role: string; content: string }[]): Promise<string | null> {
  const baseUrl = process.env.COACH_LLM_BASE_URL
  const apiKey = process.env.COACH_LLM_API_KEY
  if (!baseUrl || !apiKey) return null

  const systemMsg = `Eres un coach de fitness y nutrición certificado, directo y práctico. Hablas en español.
Usas evidencia científica. Respondes corto (2-4 oraciones máximo salvo que te pidan más.
El usuario tiene estos datos:
${statsToContext(stats)}

Si te preguntan algo que no puedes responder con los datos, di que no tienes esa información.
NO inventes datos que no estén en el contexto.
NO des recomendaciones médicas.`

  const messages = [
    { role: 'system', content: systemMsg },
    ...history.slice(-10),
    { role: 'user', content: message },
  ]

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages,
        max_tokens: 2048,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(30_000),
    })

    if (!res.ok) return null
    const data = await res.json()
    return data.choices?.[0]?.message?.content || null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Demasiadas peticiones. Espera 1 min.' }, { status: 429 })
    }

    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
    if (error || !user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const body = await req.json()
    const validated = validateInput(body)
    if (!validated.ok) return NextResponse.json({ error: validated.error }, { status: 400 })

    const { workouts, meals, profile, message, history } = validated
    const stats = computeStats(workouts, meals, profile)

    // No message = initial analysis
    if (!message) {
      const llmRecs = await llmChat(stats, 'Analiza mi progreso y dame recomendaciones personalizadas.', [])
      if (llmRecs) {
        return NextResponse.json({ reply: llmRecs, source: 'llm' })
      }
      return NextResponse.json({ recommendations: fallbackRecommendations(stats), source: 'fallback' })
    }

    // Chat message
    const reply = await llmChat(stats, message, history)
    if (reply) {
      return NextResponse.json({ reply, source: 'llm' })
    }
    return NextResponse.json({ reply: 'No pude procesar tu pregunta. Intenta de nuevo.', source: 'fallback' })
  } catch (error) {
    return NextResponse.json({ error: 'Error al analizar progreso' }, { status: 500 })
  }
}
