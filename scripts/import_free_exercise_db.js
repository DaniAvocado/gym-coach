// One-off: backfill muscles/equipment/images from yuhonas/free-exercise-db and insert missing exercises.
// Reads SUPABASE_SERVICE_ROLE_KEY + SUPABASE URL from .env.local
const fs = require('fs')
const path = require('path')

async function main() {
  const env = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8')
  const getEnv = k => (env.split('\n').find(l => l.startsWith(k + '=')) || '').split('=').slice(1).join('=').trim()
  const URL = getEnv('NEXT_PUBLIC_SUPABASE_URL')
  const KEY = getEnv('SUPABASE_SERVICE_ROLE_KEY')
  const free = JSON.parse(fs.readFileSync(process.env.TEMP + '/freedb.json', 'utf8'))

  const norm = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/s$/, '')

  const MUSCLE_CAT = {
    quadriceps: 'Pierna', hamstrings: 'Pierna', glutes: 'Pierna', calves: 'Pierna',
    abductors: 'Pierna', adductors: 'Pierna',
    chest: 'Pecho', back: 'Espalda', lats: 'Espalda', 'middle back': 'Espalda',
    'lower back': 'Espalda', traps: 'Espalda', neck: 'Espalda',
    shoulders: 'Hombro', biceps: 'Brazos', triceps: 'Brazos', forearms: 'Brazos',
    abdominals: 'Core', obliques: 'Core',
  }
  const catOf = ex => {
    const p = ((ex.primaryMuscles && ex.primaryMuscles[0]) || '').toLowerCase()
    return MUSCLE_CAT[p] || (ex.category === 'cardio' ? 'Cardio' : 'Core')
  }

  async function api(p, opts = {}) {
    const r = await fetch(URL + p, {
      ...opts,
      headers: {
        apikey: KEY, Authorization: 'Bearer ' + KEY,
        'Content-Type': 'application/json', ...(opts.headers || {}),
      },
    })
    if (!r.ok) throw new Error(p + ' -> ' + r.status + ' ' + await r.text())
    const ct = r.headers.get('content-type') || ''
    return ct.includes('json') ? r.json() : null
  }

  let existing = []
  for (let off = 0; ; off += 1000) {
    const rows = await api(`/rest/v1/exercises?select=id,name,gif_url,image_url&limit=1000&offset=${off}`)
    existing = existing.concat(rows)
    if (rows.length < 1000) break
  }
  console.log('existing:', existing.length)
  const byNorm = new Map()
  existing.forEach(e => { const k = norm(e.name); if (!byNorm.has(k)) byNorm.set(k, e) })

  const imgBase = 'https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises'
  const toUpdate = []
  const toInsert = []

  for (const ex of free) {
    const match = byNorm.get(norm(ex.name))
    const img = ex.images && ex.images[0] ? `${imgBase}/${ex.images[0]}` : null
    const primary = (ex.primaryMuscles || [])[0] || null
    if (match) {
      const patch = {}
      if (ex.equipment) patch.equipment = ex.equipment
      if (primary) patch.target_muscle = primary
      if (ex.secondaryMuscles?.length) patch.secondary_muscles = ex.secondaryMuscles
      if (!match.image_url && img) patch.image_url = img
      toUpdate.push({ id: match.id, patch })
    } else {
      toInsert.push({
        name: ex.name, category: catOf(ex), description: null,
        muscle_group: primary, equipment: ex.equipment, target_muscle: primary,
        secondary_muscles: ex.secondaryMuscles || [], instructions_es: null,
        instruction_steps_es: [], gif_url: null, image_url: img,
        dataset_id: 'free-exercise-db:' + ex.id,
      })
    }
  }
  console.log('to update:', toUpdate.length, '| to insert:', toInsert.length)

  let known = 0
  for (const u of toUpdate) {
    await api(`/rest/v1/exercises?id=eq.${u.id}`, { method: 'PATCH', body: JSON.stringify(u.patch), headers: { Prefer: 'return=minimal' } })
    known++
    if (known % 100 === 0) console.log('updated', known)
  }
  console.log('updates applied:', known)

  for (let i = 0; i < toInsert.length; i += 100) {
    const batch = toInsert.slice(i, i + 100)
    await api('/rest/v1/exercises', { method: 'POST', body: JSON.stringify(batch), headers: { Prefer: 'return=minimal' } })
    console.log('inserted', i + batch.length)
  }
  console.log('DONE')
}

main().catch(e => { console.error('FAILED:', e); process.exit(1) })