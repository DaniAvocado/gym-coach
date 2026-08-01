'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import WorkoutTracker from '@/components/WorkoutTracker'
import MealTracker from '@/components/MealTracker'
import PointsDisplay from '@/components/PointsDisplay'
import CoachRecommendations from '@/components/CoachRecommendations'
import Routines from '@/components/Routines'
import RecoveryZone from '@/components/RecoveryZone'
import DashboardOverview from '@/components/DashboardOverview'
import BodyMapVisual from '@/components/BodyMapVisual'
import UserProfile from '@/components/UserProfile'
import ProgressiveOverload from '@/components/ProgressiveOverload'
import AnimatedBackground from '@/components/AnimatedBackground'
import SpotifyWidget from '@/components/SpotifyWidget'

const navItems = [
  { id: 'overview', abbr: 'RE', label: 'Resumen', sub: 'Tu progreso' },
  { id: 'profile', abbr: 'PE', label: 'Mi Perfil', sub: 'Datos personales' },
  { id: 'workout', abbr: 'TR', label: 'Entrenamientos', sub: 'Registra tu rutina' },
  { id: 'routines', abbr: 'RU', label: 'Rutinas', sub: 'Plan de entrenamiento' },
  { id: 'recovery', abbr: 'RC', label: 'RecuperaciÃ³n', sub: 'Estado muscular' },
  { id: 'body', abbr: 'BM', label: 'Mapa Corporal', sub: 'VisualizaciÃ³n' },
  { id: 'meals', abbr: 'CM', label: 'NutriciÃ³n', sub: 'Tracker de comidas' },
  { id: 'overload', abbr: 'SO', label: 'Sobrecarga', sub: 'ProgresiÃ³n' },
  { id: 'coach', abbr: 'IA', label: 'Coach IA', sub: 'Recomendaciones' },
]

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [points, setPoints] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const router = useRouter()

  useEffect(() => { setSidebarOpen(window.innerWidth > 768) }, [])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth'); return }
      setUser(session.user)
      const { data } = await supabase.from('user_points').select('*').eq('user_id', session.user.id).single()
      setPoints(data)
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--ink)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
        CARGANDO...
      </div>
    )
  }

  const currentNav = navItems.find(n => n.id === activeTab)

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview userId={user.id} />
      case 'profile': return <UserProfile userId={user.id} />
      case 'workout': return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <SpotifyWidget userId={user.id} />
          <WorkoutTracker userId={user.id} />
        </div>
      )
      case 'routines': return <Routines userId={user.id} />
      case 'recovery': return <RecoveryZone userId={user.id} />
      case 'body': return <BodyMapVisual userId={user.id} />
      case 'meals': return <MealTracker userId={user.id} />
      case 'overload': return <ProgressiveOverload userId={user.id} />
      case 'coach': return <CoachRecommendations userId={user.id} />
      default: return null
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--ink)', width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      <AnimatedBackground />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', minHeight: '100vh' }}>
      {/* Mobile top bar */}
      <div style={{
        display: 'none',
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 200,
        background: 'var(--ink-sidebar)',
        borderBottom: '1px solid var(--border)',
        padding: '10px 16px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }} className="sidebar-mobile-toggle" id="mobile-topbar">
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px' }}>
          <span style={{ fontStyle: 'italic', color: 'var(--pink)' }}>Gym</span>
        </span>
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)}
          style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer', fontSize: '14px' }}>
          {mobileNavOpen ? 'âœ•' : 'â˜°'}
        </button>
      </div>

      {/* Mobile nav dropdown - vertical */}
      {mobileNavOpen && (
        <div style={{
          position: 'fixed',
          top: '44px', left: 0, right: 0, bottom: 0,
          zIndex: 199,
          background: 'var(--ink-sidebar)',
          overflowY: 'auto',
          padding: '8px 0',
          display: 'flex',
          flexDirection: 'column',
        }} className="sidebar-mobile-toggle">
          {navItems.map(item => {
            return (
              <div key={item.id} onClick={() => { setActiveTab(item.id); setMobileNavOpen(false) }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  cursor: 'pointer',
                  borderLeft: activeTab === item.id ? '3px solid var(--blue)' : '3px solid transparent',
                  background: activeTab === item.id ? 'rgba(111,160,255,0.08)' : 'transparent',
                  borderBottom: '1px solid var(--border)',
                }}>
                <span style={{ fontSize: '1.3rem', width: '28px', textAlign: 'center' }}>{item.abbr}</span>
                <div>
                  <div style={{ fontFamily: 'monospace', fontWeight: activeTab === item.id ? 700 : 400, fontSize: '14px', color: activeTab === item.id ? 'var(--text)' : 'var(--text-muted)' }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-faint)' }}>
                    {item.sub}
                  </div>
                </div>
              </div>
            )
          })}
          <div onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', cursor: 'pointer', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
            <span style={{ fontSize: '1.3rem', width: '28px', textAlign: 'center' }}>â†’</span>
            <span style={{ fontFamily: 'monospace', fontSize: '13px', color: 'var(--red)' }}>Cerrar sesiÃ³n</span>
          </div>
        </div>
      )}

      {/* Sidebar desktop */}
      <aside className="sidebar-desktop" style={{
        width: sidebarOpen ? 220 : 60,
        flexShrink: 0,
        background: 'var(--ink-sidebar)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        transition: 'width 0.2s ease',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {sidebarOpen && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '15px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Gym <span style={{ fontStyle: 'italic', color: 'var(--pink)' }}>Coach</span>
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--text-faint)', textTransform: 'uppercase', marginTop: '3px' }}>
                v1.0
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--text-faint)',
              width: '26px',
              height: '26px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontFamily: 'monospace',
              borderRadius: '4px',
            }}
          >
            {sidebarOpen ? 'â€¹' : 'â€º'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto', overflowX: 'hidden' }}>
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            >
              <span style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: activeTab === item.id ? 'var(--blue)' : 'var(--text-faint)',
                flexShrink: 0,
                width: '20px',
                textAlign: 'center',
              }}>
                {item.abbr}
              </span>
              {sidebarOpen && (
                <div style={{ marginLeft: '10px' }}>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    fontWeight: activeTab === item.id ? 700 : 400,
                    color: activeTab === item.id ? 'var(--text)' : 'var(--text-muted)',
                    letterSpacing: '0.03em',
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    color: 'var(--text-faint)',
                    letterSpacing: '0.06em',
                  }}>
                    {item.sub}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User info + logout */}
        <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '6px' }}>
          {sidebarOpen && (
            <>
              <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-muted)' }}>
                @{user.email?.split('@')[0]}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Usuario
              </div>
            </>
          )}
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.06em',
              background: 'none',
              border: '1px solid var(--border2)',
              color: 'var(--text-muted)',
              padding: '7px 0',
              cursor: 'pointer',
              marginTop: '4px',
            }}
          >
            {sidebarOpen ? 'Cerrar sesiÃ³n' : 'â»'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main" style={{ flex: 1, overflow: 'auto', minWidth: 0, width: '100%' }}>
        {/* Header */}
        <header className="hide-mobile" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          background: 'var(--ink-panel)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1 }}>
              <span style={{ fontStyle: 'italic', color: 'var(--pink)' }}>Gym</span> Coach
            </span>
            <span style={{ color: 'var(--border2)', fontSize: '0.9rem' }}>Â·</span>
            <div>
              <div style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text)', lineHeight: 1.2 }}>
                Tu Dashboard Personal
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '1px' }}>
                Entrenamiento Â· NutriciÃ³n Â· Progreso
              </div>
            </div>
          </div>

          {/* Points + live indicator */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {points && (
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: 'var(--blue)',
                background: 'rgba(111,160,255,0.08)',
                padding: '3px 10px',
                borderRadius: '2px',
                border: '1px solid rgba(111,160,255,0.25)',
                letterSpacing: '0.1em',
                fontWeight: 700,
              }}>
                {points.total_points || 0} pts
              </span>
            )}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              color: 'var(--green)',
              background: 'rgba(124,240,192,0.08)',
              padding: '3px 10px',
              borderRadius: '2px',
              border: '1px solid rgba(124,240,192,0.25)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }}></span>
              Activo
            </span>
          </div>
        </header>

        {/* Section Header */}
        <div style={{ padding: '0.75rem 1rem 0 1rem' }} className="hide-mobile">
          <div className="section-header">
            <span className="section-num">{currentNav?.abbr}</span>
            <span className="section-title">{currentNav?.label}</span>
            <span className="section-sub">{currentNav?.sub}</span>
          </div>
        </div>

        {/* Content */}
        <main style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '100%' }}>
          <PointsDisplay points={points} />
          <div className="panel" style={{ width: '100%' }}>
            {renderContent()}
          </div>
        </main>
      </main>
      </div>
    </div>
  )
}
