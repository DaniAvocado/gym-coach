'use client'

import { motion } from 'framer-motion'

interface PointsDisplayProps {
  points: any
}

export default function PointsDisplay({ points }: PointsDisplayProps) {
  const cards = [
    { label: 'Puntos Totales', value: points?.total_points || 0, icon: '', border: 'var(--blue)' },
    { label: 'Racha de Consistencia', value: points?.streak_days || 0, subtitle: 'dÃ­as seguidos', icon: '', border: 'var(--orange)' },
    { label: 'Ãšltima Actividad', value: points?.last_activity ? new Date(points.last_activity).toLocaleDateString('es-ES') : 'Sin registros', icon: '', border: 'var(--green)' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', width: '100%' }}>
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08, duration: 0.3 }}
          style={{ borderTop: `2px solid ${card.border}`, background: 'var(--ink-panel)', border: '1px solid var(--border)', borderRadius: '6px', padding: '16px 18px', overflow: 'hidden' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="kpi-label">{card.label}</div>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.08 + 0.15, type: 'spring', stiffness: 200 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  lineHeight: 1,
                  marginTop: '4px',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                }}
              >
                {card.value}
              </motion.div>
              {card.subtitle && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '3px' }}>
                  {card.subtitle}
                </div>
              )}
            </div>
            <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
