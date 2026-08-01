'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface SpotifyWidgetProps {
  userId: string
}

function extractPlaylistId(input: string): string | null {
  const trimmed = input.trim()
  // https://open.spotify.com/playlist/ID?si=...
  const urlMatch = trimmed.match(/spotify\.com\/playlist\/([a-zA-Z0-9]+)/)
  if (urlMatch) return urlMatch[1]
  // spotify:playlist:ID
  const uriMatch = trimmed.match(/spotify:playlist:([a-zA-Z0-9]+)/)
  if (uriMatch) return uriMatch[1]
  // raw ID
  if (/^[a-zA-Z0-9]{20,}$/.test(trimmed)) return trimmed
  return null
}

const defaultPlaylistId = '37i9dQZF1DX76Wlfdnj7AP' // Gym & Workout

export default function SpotifyWidget({ userId }: SpotifyWidgetProps) {
  const [playlistId, setPlaylistId] = useState<string>(defaultPlaylistId)
  const [editing, setEditing] = useState(false)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('user_profiles').select('spotify_playlist').eq('id', userId).single()
      const id = data?.spotify_playlist ? extractPlaylistId(data.spotify_playlist) : null
      if (id) setPlaylistId(id)
    }
    load()
  }, [userId])

  const save = async () => {
    const id = extractPlaylistId(url)
    if (!id) { setError('Pega un link de playlist de Spotify vÃ¡lido'); return }
    setPlaylistId(id)
    setError('')
    await supabase.from('user_profiles').update({ spotify_playlist: url }).eq('id', userId)
    setEditing(false)
    setUrl('')
  }

  return (
    <div className="panel" style={{ borderLeft: '3px solid var(--green)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
          <div className="kpi-label">PLAYLIST DE ENTRENO</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>Spotify</div>
        </div>
        <button onClick={() => setEditing(!editing)}
          style={{ padding: '6px 12px', background: editing ? 'transparent' : 'var(--green)', color: editing ? 'var(--green)' : '#0b0b12', border: `1px solid ${editing ? 'var(--green)' : 'transparent'}`, borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>
          {editing ? 'Cancelar' : 'Cambiar playlist'}
        </button>
      </div>

      {editing && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Pega el link de tu playlist de Spotify"
            style={{ flex: 1, background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none' }} />
          <button onClick={save} style={{ padding: '10px 16px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>Guardar</button>
        </div>
      )}
      {error && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--red)', marginBottom: '8px' }}>{error}</div>}

      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '6px' }}>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistId}`}
          width="100%"
          height="100%"
          style={{ position: 'absolute', left: 0, top: 0, border: 0 }}
          allow="encrypted-media; clipboard-write; picture-in-picture"
          title="Spotify Playlist"
        />
      </div>
    </div>
  )
}
