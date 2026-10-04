'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { animate, createTimeline } from 'animejs'
import AnimatedBackground from '@/components/AnimatedBackground'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [mode, setMode] = useState<'auth' | 'forgot' | 'reset'>('auth')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const mounted = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('reset')) setMode('reset')
  }, [])

  useEffect(() => {
    if (reducedMotion()) return
    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
      .add('.auth-card', { opacity: [0, 1], translateY: [26, 0], duration: 650 })
      .add('.auth-title', { opacity: [0, 1], translateY: [12, 0], duration: 500 }, 0.2)
      .add('.auth-form', { opacity: [0, 1], translateY: [14, 0], duration: 550 }, 0.35)
    tl.play()
  }, [])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const el = formRef.current
    if (!el || reducedMotion()) return
    animate(el, { opacity: [0, 1], translateY: [10, 0], duration: 350, ease: 'outCubic' })
  }, [mode, isSignUp])

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
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[var(--ink)] px-4 py-10 font-[var(--font-mono)]">
      <AnimatedBackground />

      <Card className="auth-card relative z-10 w-full max-w-[420px] border-white/15 bg-white/[0.07] shadow-[0_16px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl ring-white/10">
        <CardContent className="!p-8 sm:!p-10">
          <div className="auth-title flex flex-col items-center gap-3 text-center">
            <Badge
              variant="outline"
              className="h-9 rounded-xl border-white/15 bg-white/[0.06] px-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl"
            >
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                Tu entrenador personal
              </span>
            </Badge>
            <h1 className="text-3xl font-bold tracking-[-0.02em] text-[var(--text)]">
              Gym <span className="italic text-[var(--pink)]">Coach</span>
            </h1>
            <CardDescription className="text-[13px] text-[var(--text-muted)]">
              {mode === 'auth'
                ? (isSignUp ? 'Crea tu cuenta y empieza hoy' : 'Accede a tu plan de entrenamiento')
                : mode === 'forgot'
                  ? 'Recupera el acceso a tu cuenta'
                  : 'Define una nueva contraseña'}
            </CardDescription>
          </div>

          <form
            ref={formRef}
            onSubmit={mode === 'auth' ? handleAuth : mode === 'forgot' ? handleForgot : handleReset}
            className="auth-form mt-8 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={mode !== 'reset'}
                disabled={mode === 'reset'}
                className="!h-11 !rounded-lg border-white/15 bg-[var(--ink)]/60 !px-3.5 !text-sm placeholder:text-[var(--text-faint)]/60"
              />
            </div>

            {mode === 'auth' && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="!h-11 !rounded-lg border-white/15 bg-[var(--ink)]/60 !px-3.5 !text-sm placeholder:text-[var(--text-faint)]/60"
                />
              </div>
            )}

            {mode === 'reset' && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="new-password" className="text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">
                    Nueva contraseña
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="!h-11 !rounded-lg border-white/15 bg-[var(--ink)]/60 !px-3.5 !text-sm placeholder:text-[var(--text-faint)]/60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirm-password" className="text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">
                    Confirmar contraseña
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Repite la contraseña"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="!h-11 !rounded-lg border-white/15 bg-[var(--ink)]/60 !px-3.5 !text-sm placeholder:text-[var(--text-faint)]/60"
                  />
                </div>
              </>
            )}

            {error && (
              <p className="rounded-lg border border-[var(--red)]/30 bg-[var(--red)]/10 px-3 py-2 text-xs text-[var(--red)]">
                {error}
              </p>
            )}

            {message && (
              <p className="rounded-lg border border-[var(--green)]/30 bg-[var(--green)]/10 px-3 py-2 text-xs text-[var(--green)]">
                {message}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="!h-11 w-full bg-gradient-to-r from-[var(--pink)] to-[var(--blue)] font-bold text-[#0b0b12] shadow-[0_8px_28px_rgba(255,107,157,0.3)] hover:opacity-90"
            >
              {loading
                ? 'Cargando...'
                : mode === 'auth'
                  ? (isSignUp ? 'Registrarse' : 'Iniciar Sesión')
                  : mode === 'forgot'
                    ? 'Enviar link de recuperación'
                    : 'Guardar nueva contraseña'}
            </Button>
          </form>

          {mode === 'auth' && !isSignUp && (
            <p className="mt-5 text-center font-[var(--font-mono)] text-xs">
              <button
                onClick={() => setMode('forgot')}
                className="text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p className="mt-5 text-center font-[var(--font-mono)] text-xs">
              <button
                onClick={() => setMode('auth')}
                className="text-[var(--blue)] transition-colors hover:underline"
              >
                Volver al inicio de sesión
              </button>
            </p>
          )}

          {mode === 'auth' && (
            <p className="mt-6 border-t border-white/10 pt-5 text-center font-[var(--font-mono)] text-xs text-[var(--text-muted)]">
              {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 font-bold text-[var(--blue)] transition-colors hover:underline"
              >
                {isSignUp ? 'Inicia sesión' : 'Regístrate'}
              </button>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}