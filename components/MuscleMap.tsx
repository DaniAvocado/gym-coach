'use client'

import type { MuscleKey } from '@/lib/muscle-map'
import { MUSCLE_LABELS, resolveMuscleKeys } from '@/lib/muscle-map'

interface Region { key: MuscleKey; d: string }

const FRONT: Region[] = [
  { key: 'traps', d: 'M82 58 H118 L130 84 H70 Z' },
  { key: 'shoulders', d: 'M70 84 C60 84 50 92 50 106 C50 120 62 128 70 128 C75 116 76 96 70 84 Z M130 84 C140 84 150 92 150 106 C150 120 138 128 130 128 C125 116 124 96 130 84 Z' },
  { key: 'chest', d: 'M88 92 C78 104 80 124 90 128 L100 124 V96 Z M112 92 C122 104 120 124 110 128 L100 124 V96 Z' },
  { key: 'biceps', d: 'M52 112 C44 112 40 120 40 136 C40 150 46 156 54 156 C58 146 58 122 52 112 Z M148 112 C156 112 160 120 160 136 C160 150 154 156 146 156 C142 146 142 122 148 112 Z' },
  { key: 'forearms', d: 'M42 162 C34 162 32 176 34 194 C36 210 44 216 52 214 C54 200 54 172 42 162 Z M158 162 C166 162 168 176 166 194 C164 210 156 216 148 214 C146 200 146 172 158 162 Z' },
  { key: 'abs', d: 'M78 132 L122 132 L118 176 L82 176 Z' },
  { key: 'quads', d: 'M80 184 C68 190 62 204 62 224 C62 240 74 246 86 247 C90 234 88 196 80 184 Z M120 184 C132 190 138 204 138 224 C138 240 126 246 114 247 C110 234 112 196 120 184 Z' },
  { key: 'calves', d: 'M66 256 C58 262 56 278 58 296 C60 306 68 310 76 308 C78 296 76 264 66 256 Z M134 256 C142 262 144 278 142 296 C140 306 132 310 124 308 C122 296 124 264 134 256 Z' },
]

const BACK: Region[] = [
  { key: 'traps', d: 'M82 58 H118 L130 84 H70 Z' },
  { key: 'rearDelts', d: 'M66 84 C54 88 48 100 52 114 C56 124 64 128 72 126 C74 112 72 94 66 84 Z M134 84 C146 88 152 100 148 114 C144 124 136 128 128 126 C126 112 128 94 134 84 Z' },
  { key: 'triceps', d: 'M54 116 C46 120 44 134 48 150 C52 160 58 162 64 158 C64 144 62 124 54 116 Z M146 116 C154 120 156 134 152 150 C148 160 142 162 136 158 C136 144 138 124 146 116 Z' },
  { key: 'lats', d: 'M78 86 C64 104 62 124 70 140 L84 166 L92 140 C86 118 84 100 78 86 Z M122 86 C136 104 138 124 130 140 L116 166 L108 140 C114 118 116 100 122 86 Z' },
  { key: 'lowerBack', d: 'M78 156 L122 156 L118 186 L82 186 Z' },
  { key: 'glutes', d: 'M70 190 C62 200 64 216 74 226 C86 230 114 230 126 226 C136 216 138 200 130 190 C116 200 84 200 70 190 Z' },
  { key: 'hamstrings', d: 'M80 236 C70 240 64 252 64 268 C64 282 74 288 84 288 C88 276 88 248 80 236 Z M120 236 C130 240 136 252 136 268 C136 282 126 288 116 288 C112 276 112 248 120 236 Z' },
  { key: 'calves', d: 'M66 256 C58 262 56 278 58 296 C60 306 68 310 76 308 C78 296 76 264 66 256 Z M134 256 C142 262 144 278 142 296 C140 306 132 310 124 308 C122 296 124 264 134 256 Z' },
]

function Figure({ regions, active, primary }: {
  regions: Region[]
  active: Set<MuscleKey>
  primary: MuscleKey | null
}) {
  return (
    <svg viewBox="0 0 200 320" width="100%" style={{ maxWidth: 220, display: 'block' }}>
      {regions.map(r => {
        const isActive = active.has(r.key)
        const isPrimary = primary === r.key
        return (
          <path
            key={r.key}
            d={r.d}
            fill={isActive ? (isPrimary ? 'var(--blue)' : 'rgba(91,141,239,0.45)') : 'rgba(255,255,255,0.03)'}
            stroke={isActive ? (isPrimary ? 'var(--blue-light)' : 'rgba(111,160,255,0.6)') : 'var(--border2)'}
            strokeWidth={2}
            strokeLinejoin="round"
            style={isPrimary ? { animation: 'pulse 2s ease-in-out infinite', filter: 'drop-shadow(0 0 6px var(--blue))' } : undefined}
          />
        )
      })}
    </svg>
  )
}

export default function MuscleMap({ primary, secondary }: { primary: string; secondary: string[] }) {
  const { primaryKey, secondaryKeys, allKeys } = resolveMuscleKeys(primary, secondary)
  const active = new Set(allKeys)
  const labels = allKeys.map(k => MUSCLE_LABELS[k])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', justifyContent: 'center' }}>
      <Figure regions={FRONT} active={active} primary={primaryKey} />
      <Figure regions={BACK} active={active} primary={primaryKey} />
      <div style={{ alignSelf: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Músculos trabajados</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
          {labels.map(l => (
            <span key={l} className="muscle-chip" style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', border: '1px solid var(--border2)', color: 'var(--text)', background: 'rgba(91,141,239,0.08)' }}>{l}</span>
          ))}
          {labels.length === 0 && <span style={{ color: 'var(--text-faint)' }}>—</span>}
        </div>
      </div>
    </div>
  )
}