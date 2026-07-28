import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { workouts, meals, points } = await req.json()

    // Preparar datos para Claude
    const workoutSummary = workouts?.slice(0, 5).map((w: any) => ({
      date: w.date,
      exercises: w.workout_sets?.length || 0,
      total_weight: w.workout_sets?.reduce((sum: number, s: any) => sum + (s.weight || 0), 0) || 0,
    }))

    const mealSummary = meals ? {
      total_meals: meals.length,
      avg_calories: Math.round(meals.reduce((sum: number, m: any) => sum + (m.calories || 0), 0) / meals.length),
      total_protein: meals.reduce((sum: number, m: any) => sum + (m.protein || 0), 0).toFixed(1),
    } : null

    const prompt = `Eres un entrenador personal experto. Analiza estos datos del usuario y proporciona recomendaciones específicas y motivantes:

ENTRENAMIENTOS RECIENTES:
${JSON.stringify(workoutSummary, null, 2)}

NUTRICIÓN (últimos 7 días):
${JSON.stringify(mealSummary, null, 2)}

PROGRESO GENERAL:
- Puntos totales: ${points?.total_points || 0}
- Racha de consistencia: ${points?.streak_days || 0} días
- Última actividad: ${points?.last_activity || 'Sin registros'}

Por favor proporciona:
1. ¿Qué peso debería intentar sumar próximamente?
2. ¿Cuál es mi progresión actual?
3. ¿Qué cambios haría en mi nutrición?
4. ¿Qué debería mejorar en mis entrenamientos?
5. Un mensaje motivacional personalizado

Sé específico y práctico. Mantén un tono motivante pero honesto.`

    // Llamar a Claude (simulado - necesitarás configurar la API)
    // Aquí iría la llamada real a la API de Claude vía Anthropic
    
    const recommendations = `
📊 ANÁLISIS DE TU PROGRESO

1️⃣ INCREMENTO DE PESO RECOMENDADO:
Basándome en tu actividad reciente, puedes intentar incrementar 2.5-5kg en los ejercicios compuestos (sentadilla, press banca). Hazlo progresivamente en 2-3 sesiones.

2️⃣ TU PROGRESIÓN ACTUAL:
✅ Estás siendo consistente (${points?.streak_days || 0} días seguidos)
✅ Completando entrenamientos regulares
💪 Buena dedicación al programa

3️⃣ RECOMENDACIONES NUTRICIONALES:
- Aumenta proteína a 2-2.5g por kg de peso corporal
- Mantén un déficit de 300-500 kcal si buscas perder grasa
- Come cada 3-4 horas para mantener energía en los entrenamientos

4️⃣ MEJORAS EN ENTRENAMIENTOS:
- Intenta incrementar volumen en 1-2 series por ejercicio
- Reduce tiempo de descanso entre series en ejercicios auxiliares (60-90 seg)
- Periodiza tu entrenamiento: 4 semanas de progresión, 1 semana de descanso

5️⃣ MENSAJE MOTIVACIONAL:
¡Lo estás haciendo excelente! La consistencia es la clave del éxito. Cada entrenamiento te acerca a tus metas. Sigue así y verás resultados increíbles en 8-12 semanas. 💪
`

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Error in coach API:', error)
    return NextResponse.json(
      { error: 'Error al analizar progreso' },
      { status: 500 }
    )
  }
}
