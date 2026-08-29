'use client'

interface PointsDisplayProps {
  points: any
}

export default function PointsDisplay({ points }: PointsDisplayProps) {
  const cards = [
    { label: 'Puntos Totales', value: points?.total_points || 0, border: 'var(--blue)' },
    { label: 'Racha de Consistencia', value: points?.streak_days || 0, subtitle: 'días seguidos', border: 'var(--orange)' },
    { label: 'Última Actividad', value: points?.last_activity ? new Date(points.last_activity).toLocaleDateString('es-ES') : 'Sin registros', border: 'var(--green)' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', width: '100%' }}>
      {cards.map((card, idx) => (
        <div
          key={idx}
          style={{ borderTop: `2px solid ${card.border}`, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', padding: '16px 18px', overflow: 'hidden', animation: 'rise .3s ease backwards', animationDelay: `${idx * 0.08}s` }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="kpi-label">{card.label}</div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  lineHeight: 1,
                  marginTop: '4px',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  animation: 'popIn .4s ease backwards',
                  animationDelay: `${idx * 0.08 + 0.15}s`,
                }}
              >
                {card.value}
              </div>
              {card.subtitle && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '3px' }}>
                  {card.subtitle}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
