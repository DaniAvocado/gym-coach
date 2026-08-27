export const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
}

export const META_ADJUSTMENTS: Record<string, number> = {
  slow: 0.9, normal: 1.0, fast: 1.1,
}

const GOAL_MACROS: Record<string, { cal: number; protein: number; fat: number }> = {
  hypertrophy: { cal: 300, protein: 2.2, fat: 0.8 },
  strength: { cal: 200, protein: 2.0, fat: 0.9 },
  endurance: { cal: 100, protein: 1.8, fat: 1.0 },
  weight_loss: { cal: -400, protein: 2.4, fat: 0.7 },
}

export function calculateBMR(w: number, h: number, a: number, g: string) {
  return 10 * w + 6.25 * h - 5 * a + (g === 'male' ? 5 : -161)
}

export function calculateTDEE(w: number, h: number, a: number, g: string, act: string, meta: string) {
  return Math.round(calculateBMR(w, h, a, g) * (ACTIVITY_MULTIPLIERS[act] || 1.55) * (META_ADJUSTMENTS[meta] || 1.0))
}

export function calculateMacros(w: number, h: number, a: number, g: string, act: string, meta: string, goal: string) {
  const tdee = calculateTDEE(w, h, a, g, act, meta)
  const cfg = GOAL_MACROS[goal] || { cal: 0, protein: 2.0, fat: 0.8 }
  const calories = tdee + cfg.cal
  const protein = Math.round(w * cfg.protein)
  const fat = Math.round(w * cfg.fat)
  const carbs = Math.round((calories - (protein * 4 + fat * 9)) / 4)
  return { tdee, calories, protein, carbs, fat }
}
