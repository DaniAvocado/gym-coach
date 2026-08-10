// Script de importación del dataset de ejercicios a Supabase
// Uso: node scripts/import_exercises.js <ruta_al_json>
// Fuente: https://github.com/hasaneyldrm/exercises-dataset
// IMPORTANTE: requiere la service_role_key (pasa RLS). NO hardcodearla ni subirla a git.

const fs = require('fs')

const SUPABASE_URL = 'https://sspcpfbracrcbsxcijhn.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_KEY) {
  console.error('Falta la env SUPABASE_SERVICE_ROLE_KEY. Obtenla en Supabase Dashboard -> Settings -> API.')
  process.exit(1)
}

const CATEGORY_MAP = {
  chest: 'Pecho',
  back: 'Espalda',
  shoulders: 'Hombro',
  'upper arms': 'Brazos',
  'lower arms': 'Brazos',
  'upper legs': 'Pierna',
  'lower legs': 'Pierna',
  waist: 'Core',
  neck: 'Core',
  cardio: 'Cardio',
}

const RAW = 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/'

function mapExercise(e) {
  const stepsEs = (e.instruction_steps && e.instruction_steps.es) || []
  return {
    name: e.name,
    category: CATEGORY_MAP[e.category] || e.category,
    description: e.instructions.es || e.instructions.en || null,
    muscle_group: e.target || null,
    equipment: e.equipment || null,
    target_muscle: e.target || null,
    secondary_muscles: e.secondary_muscles || [],
    instructions_es: e.instructions.es || null,
    instruction_steps_es: stepsEs,
    gif_url: e.gif_url ? RAW + e.gif_url : null,
    image_url: e.image ? RAW + e.image : null,
    dataset_id: e.id,
  }
}

async function insertBatch(rows) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/exercises`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(rows),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 500)}`)
  }
}

async function main() {
  const file = process.argv[2]
  if (!file) { console.error('Uso: node import_exercises.js <ruta_al_json>'); process.exit(1) }

  const exercises = JSON.parse(fs.readFileSync(file, 'utf8'))
  console.log(`Total ejercicios en dataset: ${exercises.length}`)

  const mapped = exercises.map(mapExercise)

  const BATCH = 100
  let inserted = 0
  for (let i = 0; i < mapped.length; i += BATCH) {
    const chunk = mapped.slice(i, i + BATCH)
    await insertBatch(chunk)
    inserted += chunk.length
    console.log(`Insertados ${inserted}/${mapped.length}`)
  }
  console.log('Importación completada.')
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1) })
