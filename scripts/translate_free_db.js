// One-off: translate free-exercise-db names missing from names_es.ts using the Coach LLM (Groq).
// Appends the new entries to lib/names_es.ts.
const fs = require('fs')
const path = require('path')

async function main() {
  const env = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8')
  const getEnv = k => (env.split('\n').find(l => l.startsWith(k + '=')) || '').split('=').slice(1).join('=').trim()
  const BASE = getEnv('COACH_LLM_BASE_URL').replace(/\/$/, '')
  const KEY_E = getEnv('COACH_LLM_API_KEY')
  const MODEL = process.env.MODEL || 'openai/gpt-oss-120b'

  const namesTs = fs.readFileSync(path.join(__dirname, '..', 'lib', 'names_es.ts'), 'utf8')
  const free = JSON.parse(fs.readFileSync(process.env.TEMP + '/freedb.json', 'utf8'))

  const parseKey = l => { const m = l.match(/^\s*"([^"]+)"\s*:\s*"((?:[^"\\]|\\.)*)"/); return m ? [m[1], m[2]] : null }
  const have = new Set(namesTs.split('\n').map(parseKey).filter(Boolean).map(([k]) => k))
  const todo = [...new Set(free.map(e => e.name.toLowerCase()))].filter(n => !have.has(n))
  console.log('to translate:', todo.length)

  async function translateBatch(names) {
    const r = await fetch(`${BASE}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + KEY_E },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 4096,
        messages: [{
          role: 'system',
          content: `Traduce al español (latino, fitness/gimnasio) los siguientes nombres de ejercicios. Responde SOLO con JSON: un objeto donde cada clave es el nombre original y el valor la traducción. NO agregues nada más. Traducciones naturales y cortas, sin paréntesis explicativos.`,
        }, { role: 'user', content: JSON.stringify(names) }],
      }),
    })
    if (!r.ok) throw new Error('LLM ' + r.status + ' ' + await r.text())
    const j = await r.json()
    return JSON.parse(j.choices[0].message.content)
  }

  const out = {}
  for (let i = 0; i < todo.length; i += 120) {
    const batch = todo.slice(i, i + 120)
    console.log('batch', i / 120 + 1, 'of', Math.ceil(todo.length / 120))
    Object.assign(out, await translateBatch(batch))
    await new Promise(r => setTimeout(r, 1000))
  }
  console.log('translated entries:', Object.keys(out).length)

  const lines = Object.entries(out).map(([k, v]) => `  "${k}": "${v}",`)
  fs.appendFileSync(path.join(__dirname, '..', 'lib', 'names_es.ts'), '\n' + lines.join('\n') + '\n')
  console.log('appended to names_es.ts')
}

main().catch(e => { console.error('FAILED:', e.message); process.exit(1) })