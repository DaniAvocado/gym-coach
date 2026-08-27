import { EXERCISE_NAMES_ES } from './names_es'

const EQUIPMENT_MAP: Record<string, string> = {
  'body weight': 'peso corporal',
  dumbbell: 'mancuernas',
  cable: 'polea',
  barbell: 'barra',
  'leverage machine': 'máquina',
  band: 'banda elástica',
  'smith machine': 'máquina Smith',
  kettlebell: 'kettlebell',
  weighted: 'con peso',
  'stability ball': 'balón suizo',
  'ez barbell': 'barra EZ',
  'medicine ball': 'balón medicinal',
  rope: 'soga',
  machine: 'máquina',
  other: 'otro',
}

const MUSCLE_MAP: Record<string, string> = {
  abs: 'abdominales',
  abdominals: 'abdominales',
  'rectus abdominis': 'recto abdominal',
  obliques: 'oblicuos',
  biceps: 'bíceps',
  'biceps brachii': 'bíceps braquial',
  triceps: 'tríceps',
  'triceps brachii': 'tríceps braquial',
  shoulders: 'hombros',
  delts: 'deltoides',
  deltoids: 'deltoides',
  deltoid: 'deltoides',
  'anterior deltoid': 'deltoides anterior',
  'lateral deltoid': 'deltoides lateral',
  'medial deltoid': 'deltoides medio',
  'posterior deltoid': 'deltoides posterior',
  chest: 'pecho',
  pecs: 'pectorales',
  pectorals: 'pectorales',
  'pectoralis major': 'pectoral mayor',
  'pectoralis minor': 'pectoral menor',
  back: 'espalda',
  lats: 'dorsales',
  'latissimus dorsi': 'dorsal ancho',
  traps: 'trapecios',
  trapezius: 'trapecios',
  rhomboids: 'romboides',
  'erector spinae': 'erectores espinales',
  serratus: 'serrato',
  'lower back': 'lumbar',
  'hip flexors': 'flexores de cadera',
  forearms: 'antebrazos',
  brachialis: 'braquial',
  calves: 'pantorrillas',
  gastrocnemius: 'gastrocnemio',
  soleus: 'sóleo',
  'tibialis anterior': 'tibial anterior',
  quads: 'cuádriceps',
  quadriceps: 'cuádriceps',
  hamstrings: 'isquiotibiales',
  glutes: 'glúteos',
  gluteals: 'glúteos',
  'gluteus maximus': 'glúteo mayor',
  hips: 'caderas',
  adductors: 'aductores',
  abductors: 'abductores',
  neck: 'cuello',
  'levator scapulae': 'elevador de escápula',
  core: 'core',
  infraspinatus: 'infraespinoso',
  supraspinatus: 'supraespinoso',
  'teres major': 'redondo mayor',
  'teres minor': 'redondo menor',
  wrist: 'muñeca',
  ankle: 'tobillo',
}

export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(w => (/^\d/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
}

export function translateName(name: string): string {
  if (!name) return name
  const es = EXERCISE_NAMES_ES[name.toLowerCase()]
  return es || titleCase(name)
}

export function translateMuscle(m: string): string {
  if (!m) return m
  const key = m.trim().toLowerCase()
  return MUSCLE_MAP[key] || MUSCLE_MAP[key.replace(/s$/, '')] || m
}

export function translateEquipment(eq: string): string {
  if (!eq) return eq
  return EQUIPMENT_MAP[eq.trim().toLowerCase()] || eq
}
