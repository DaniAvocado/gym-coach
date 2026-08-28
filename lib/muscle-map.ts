export type MuscleKey =
  | 'traps' | 'shoulders' | 'chest' | 'biceps' | 'forearms' | 'abs'
  | 'quads' | 'calves' | 'rearDelts' | 'triceps' | 'lats' | 'lowerBack'
  | 'glutes' | 'hamstrings'

export const MUSCLE_LABELS: Record<MuscleKey, string> = {
  traps: 'Trapecios',
  shoulders: 'Hombros',
  chest: 'Pectorales',
  biceps: 'Bíceps',
  forearms: 'Antebrazos',
  abs: 'Abdominales',
  quads: 'Cuádriceps',
  calves: 'Pantorrillas',
  rearDelts: 'Hombros posteriores',
  triceps: 'Tríceps',
  lats: 'Dorsales',
  lowerBack: 'Zona lumbar',
  glutes: 'Glúteos',
  hamstrings: 'Isquiotibiales',
}

const NAME_TO_KEY: Record<string, MuscleKey> = {
  'chest': 'chest', 'pectorals': 'chest', 'upper chest': 'chest',
  'shoulders': 'shoulders', 'delts': 'shoulders', 'deltoids': 'shoulders',
  'rear delts': 'rearDelts', 'rear deltoids': 'rearDelts',
  'biceps': 'biceps', 'forearms': 'forearms', 'triceps': 'triceps',
  'abs': 'abs', 'abdominals': 'abs', 'core': 'abs', 'obliques': 'abs', 'serratus anterior': 'abs',
  'quads': 'quads', 'quadriceps': 'quads',
  'hamstrings': 'hamstrings',
  'glutes': 'glutes', 'gluteus': 'glutes',
  'calves': 'calves',
  'lower back': 'lowerBack',
  'lats': 'lats', 'latissimus dorsi': 'lats',
  'upper back': 'lats', 'back': 'lats', 'middle back': 'lats',
  'traps': 'traps', 'trapezius': 'traps', 'neck': 'traps', 'levator scapulae': 'traps',
  'abductors': 'glutes', 'adductors': 'glutes',
}

export function resolveMuscleKeys(primary: string, secondary: string[]): {
  primaryKey: MuscleKey | null
  secondaryKeys: MuscleKey[]
  allKeys: MuscleKey[]
} {
  if (primary.toLowerCase() === 'full body') {
    return { primaryKey: null, secondaryKeys: [], allKeys: Object.keys(MUSCLE_LABELS) as MuscleKey[] }
  }
  const primaryKey = NAME_TO_KEY[primary.trim().toLowerCase()] ?? null
  const secondaryKeys = Array.from(new Set(
    secondary.map(s => NAME_TO_KEY[s.trim().toLowerCase()]).filter((k): k is MuscleKey => !!k)
  ))
  const allKeys = primaryKey ? [primaryKey, ...secondaryKeys] : secondaryKeys
  return { primaryKey, secondaryKeys, allKeys }
}