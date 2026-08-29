'use client'

import { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface CoachRecommendationsProps {
  userId: string
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export default function CoachRecommendations({ userId }: CoachRecommendationsProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getContext = async () => {
    const { data: profile } = await supabase.from('user_profiles').select('*').eq('id', userId).single()
    const { data: workouts } = await supabase.from('workouts').select('*, workout_sets(*)').eq('user_id', userId).order('date', { ascending: false }).limit(10)
    const { data: meals } = await supabase.from('meals').select('*').eq('user_id', userId).gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    const { data: { session } } = await supabase.auth.getSession()
    return { workouts: workouts || [], meals: meals || [], profile: profile || {}, token: session?.access_token || '' }
  }

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput('')
    setError('')

    const userMsg: ChatMessage = { role: 'user', content: msg }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const ctx = await getContext()
      const history = messages.map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.token}` },
        body: JSON.stringify({ ...ctx, message: msg, history }),
      })

      if (!res.ok) throw new Error('Error')
      const data = await res.json()

      if (data.recommendations) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.recommendations.join('\n') }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Sin respuesta' }])
      }
      setInitialized(true)
    } catch {
      setError('Error al responder. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const suggestions = [
    '¿Cómo va mi nutrición?',
    '¿Estoy entrenando suficiente?',
    'Dame un plan de comidas',
    '¿Necesito descansar?',
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '500px' }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.length === 0 && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '16px', padding: '32px' }}>
            <div style={{ fontSize: '2rem' }}>🏋️</div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', color: 'var(--text)', textAlign: 'center', fontWeight: 700 }}>
              Tu coach IA personal
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '360px', lineHeight: 1.6 }}>
              Analiza tus entrenamientos, comidas y perfil para darte recomendaciones basadas en ciencia.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
              {suggestions.map((s, i) => (
                <button key={i} className="fx"
                  onClick={() => sendMessage(s)}
                  style={{ padding: '10px 16px', background: 'rgba(111,160,255,0.1)', border: '1px solid rgba(111,160,255,0.3)', color: 'var(--blue-light)', borderRadius: '6px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              background: msg.role === 'user' ? 'var(--blue)' : 'rgba(255,255,255,0.06)',
              color: msg.role === 'user' ? '#0b0b12' : 'var(--text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              border: msg.role === 'assistant' ? '1px solid var(--border2)' : 'none',
              animation: 'rise .3s ease backwards',
            }}>
            {msg.content}
          </div>
        ))}

        {loading && (
          <div
            style={{ alignSelf: 'flex-start', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border2)', animation: 'fadeIn .3s ease backwards' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0, 1, 2].map(i => (
                <div key={i}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)', animation: 'bob .6s ease-in-out infinite backwards', animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div style={{ padding: '8px 12px', background: 'rgba(248,113,113,0.1)', border: '1px solid var(--red)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--red)', marginBottom: '8px' }}>
          {error}
        </div>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', borderTop: '1px solid var(--border2)', paddingTop: '12px' }}>
        <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Pregúntale a tu coach..."
          rows={1}
          style={{
            flex: 1, padding: '12px 14px', background: 'var(--ink)', color: 'var(--text)',
            border: '1px solid var(--border2)', borderRadius: '8px', fontFamily: 'var(--font-mono)',
            fontSize: '15px', outline: 'none', resize: 'none', minHeight: '48px', maxHeight: '120px',
          }} />
        <button className="fx" onClick={() => sendMessage()} disabled={loading || !input.trim()}
          style={{
            padding: '12px 16px', background: 'var(--blue)', color: '#0b0b12', border: 'none',
            borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)',
            fontSize: '16px', opacity: loading || !input.trim() ? 0.4 : 1, flexShrink: 0,
          }}>
          →
        </button>
      </div>
    </div>
  )
}
