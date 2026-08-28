import { searchExercises, getAssetUrl } from '@bryllim/workout-guide'

export function getExerciseSvgUrl(exerciseName: string): string | null {
  const results = searchExercises(exerciseName)
  if (results.length > 0) return getAssetUrl(results[0].slug, 1)
  return null
}

export function getExerciseMuscles(exerciseName: string): { primary: string; secondary: string[] } | null {
  const results = searchExercises(exerciseName)
  if (results.length === 0) return null
  return { primary: results[0].primaryMuscle, secondary: results[0].secondaryMuscles }
}
