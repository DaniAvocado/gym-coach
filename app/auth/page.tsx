'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [mode, setMode] = useState<'auth' | 'forgot' | 'reset'>('auth')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('reset')) setMode('reset')
  }, [])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        if (data.user) {
          await supabase.from('user_profiles').insert({
            id: data.user.id,
            username: email.split('@')[0],
          })
          await supabase.from('user_points').insert({
            user_id: data.user.id,
            total_points: 0,
          })
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { setError('Ingresa tu email'); return }
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?reset=1`,
      })
      if (error) throw error
      setMessage('Te enviamos un link para restablecer tu contraseña. Revisa tu email.')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return }
    if (password !== confirmPassword) { setError('Las contraseñas no coinciden'); return }
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setMessage('Contraseña actualizada. Inicia sesión con tu nueva contraseña.')
      setMode('auth')
      setPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)', fontFamily: 'var(--font-mono)', overflow: 'hidden' }}>
      <AnimatedBackground />
      <div style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 8px 32px rgba(0,0,0,0.35)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text)', marginBottom: '4px' }}>
            Gym <span style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Coach</span>
          </h1>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.1em' }}>
            TU ENTRENADOR PERSONAL
          </p>
        </div>

        <form onSubmit={mode === 'auth' ? handleAuth : mode === 'forgot' ? handleForgot : handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              background: 'var(--ink)',
              color: 'var(--text)',
              fontFamily: 'monospace',
              fontSize: '13px',
              outline: 'none',
            }}
            required={mode !== 'reset'}
            disabled={mode === 'reset'}
          />
          {mode === 'auth' && (
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                background: 'var(--ink)',
                color: 'var(--text)',
                fontFamily: 'monospace',
                fontSize: '13px',
                outline: 'none',
              }}
              required
            />
          )}
          {mode === 'reset' && (
            <>
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--ink)', color: 'var(--text)', fontFamily: 'monospace', fontSize: '13px', outline: 'none' }}
                required
              />
              <input
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--ink)', color: 'var(--text)', fontFamily: 'monospace', fontSize: '13px', outline: 'none' }}
                required
              />
            </>
          )}

          {error && (
            <p style={{ color: 'var(--red)', fontSize: '12px', fontFamily: 'monospace' }}>
              {error}
            </p>
          )}

          {message && (
            <p style={{ color: 'var(--green)', fontSize: '12px', fontFamily: 'monospace' }}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: 'var(--blue)',
              color: '#0b0b12',
              border: 'none',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? 'Cargando...' : mode === 'auth' ? (isSignUp ? 'Registrarse' : 'Iniciar Sesión') : mode === 'forgot' ? 'Enviar link de recuperación' : 'Guardar nueva contraseña'}
          </button>
        </form>

        {mode === 'auth' && !isSignUp && (
          <p style={{ textAlign: 'center', marginTop: '0.75rem', fontFamily: 'monospace', fontSize: '12px' }}>
            <button onClick={() => setMode('forgot')} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: '12px' }}>
              ¿Olvidaste tu contraseña?
            </button>
          </p>
        )}

        {mode === 'forgot' && (
          <p style={{ textAlign: 'center', marginTop: '0.75rem', fontFamily: 'monospace', fontSize: '12px' }}>
            <button onClick={() => setMode('auth')} style={{ color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: '12px' }}>
              Volver al inicio de sesión
            </button>
          </p>
        )}

        {mode === 'auth' && (
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)' }}>
            {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                color: 'var(--blue)',
                fontWeight: 700,
                marginLeft: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              {isSignUp ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
