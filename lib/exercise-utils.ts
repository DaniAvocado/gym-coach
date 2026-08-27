import { searchExercises, getAssetUrl } from '@bryllim/workout-guide'

const slugMap: Record<string, string> = {
  'Sentadilla (Squat)': 'squat',
  'Prensa de piernas': 'leg-press',
  'Extensión de piernas': 'leg-extension',
  'Peso muerto (Deadlift)': 'deadlift',
  'Curl de pierna sentado': 'seated-leg-curl',
  'Elevación de talones (Calf raise)': 'calf-raise',
  'Press de banca plano': 'bench-press',
  'Press de banca inclinado': 'incline-bench-press',
  'Aperturas con mancuernas': 'dumbbell-fly',
  'Flexiones de pecho': 'push-up',
  'Dominadas (Pull-ups)': 'pull-up',
  'Jalón al pecho': 'lat-pulldown',
  'Remo con barra': 'barbell-row',
  'Remo en polea baja': 'seated-cable-row',
  'Press militar (hombro)': 'overhead-press',
  'Elevaciones laterales': 'lateral-raise',
  'Pájaro (Elevación posterior)': 'rear-delt-fly',
  'Curl de bíceps con barra': 'barbell-curl',
  'Curl de bíceps con mancuernas': 'dumbbell-curl',
  'Press francés': 'skull-crusher',
  'Extensión de tríceps en polea': 'tricep-pushdown',
  'Plancha abdominal': 'plank',
  'Crunch abdominal': 'crunch',
  'Elevación de piernas': 'leg-raise',
}

export function getExerciseSvgUrl(exerciseName: string): string | null {
  const slug = slugMap[exerciseName]
  if (slug) return getAssetUrl(slug, 1)

  const results = searchExercises(exerciseName)
  if (results.length > 0) return getAssetUrl(results[0].slug, 1)
  return null
}

export function getExerciseGifOrSvg(exercise: { name: string; gif_url?: string }): string | null {
  if (exercise.gif_url) return exercise.gif_url
  return getExerciseSvgUrl(exercise.name)
}
