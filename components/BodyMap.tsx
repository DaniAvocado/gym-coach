'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface BodyMapProps {
  userId: string
}

export default function BodyMap({ userId }: BodyMapProps) {
  const [muscleData, setMuscleData] = useState<Record<string, number>>({})
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Mapeo de mÃºsculos a categorÃ­as de ejercicios
  const muscleCategories: Record<string, string[]> = {
    pecho: ['Pecho'],
    espalda: ['Espalda'],
    piernas: ['Pierna'],
    hombros: ['Hombro'],
    brazos: ['Brazos'],
    core: ['Core'],
  }

  useEffect(() => {
    fetchMuscleData()
  }, [userId])

  const fetchMuscleData = async () => {
    setLoading(true)
    try {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const { data: workouts } = await supabase
        .from('workouts')
        .select('*, workout_sets(*, exercises(*))')
        .eq('user_id', userId)
        .gte('date', sevenDaysAgo.toISOString())

      // Contar ejercicios por grupo muscular
      const counts: Record<string, number> = {
        pecho: 0,
        espalda: 0,
        piernas: 0,
        hombros: 0,
        brazos: 0,
        core: 0,
      }

      workouts?.forEach(workout => {
        workout.workout_sets?.forEach((set: any) => {
          const category = set.exercises?.category
          if (!category) return

          Object.entries(muscleCategories).forEach(([muscle, categories]) => {
            if (categories.includes(category)) {
              counts[muscle]++
            }
          })
        })
      })

      setMuscleData(counts)
    } finally {
      setLoading(false)
    }
  }

  const getIntensityColor = (count: number) => {
    if (count === 0) return { gradient: 'from-gray-300 to-gray-400', label: 'Sin entrenar' }
    if (count <= 2) return { gradient: 'from-yellow-300 to-yellow-500', label: 'Poco' }
    if (count <= 5) return { gradient: 'from-orange-400 to-orange-600', label: 'Moderado' }
    if (count <= 10) return { gradient: 'from-red-500 to-red-700', label: 'Intenso' }
    return { gradient: 'from-red-600 to-red-800', label: 'Muy intenso' }
  }

  const MuscleButton = ({ muscle, label }: { muscle: string; label: string }) => {
    const count = muscleData[muscle] || 0
    const colors = getIntensityColor(count)
    const isSelected = selectedMuscle === muscle

    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedMuscle(isSelected ? null : muscle)}
        className={`p-4 rounded-lg font-bold transition transform ${
          isSelected ? 'ring-4 ring-blue-400 shadow-xl' : 'shadow-lg'
        } bg-gradient-to-br ${colors.gradient} text-white`}
      >
        <p className="text-lg">{label}</p>
        <p className="text-3xl font-bold mt-2">{count}</p>
        <p className="text-xs opacity-90 mt-1">{colors.label}</p>
      </motion.button>
    )
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Cargando mapa muscular...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-2">ðŸ¦¾ Mapa Muscular</h2>
        <p className="opacity-90">Grupos musculares entrenados en los Ãºltimos 7 dÃ­as</p>
      </div>

      {/* Cuerpo visual - Vista frontal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
      >
        <h3 className="font-bold text-xl mb-6 text-gray-800">ðŸ‘¤ DistribuciÃ³n de Ejercicios</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <MuscleButton muscle="pecho" label="ðŸ«€ Pecho" />
          <MuscleButton muscle="espalda" label="ðŸ”™ Espalda" />
          <MuscleButton muscle="piernas" label="ðŸ¦µ Piernas" />
          <MuscleButton muscle="hombros" label="ðŸ’ª Hombros" />
          <MuscleButton muscle="brazos" label="ðŸ’¯ Brazos" />
          <MuscleButton muscle="core" label="ðŸ”¥ Core" />
        </div>
      </motion.div>

      {/* Detalles del mÃºsculo seleccionado */}
      {selectedMuscle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500"
        >
          <h3 className="font-bold text-lg mb-3 text-gray-800">
            {selectedMuscle === 'pecho' && 'ðŸ«€ Pecho'}
            {selectedMuscle === 'espalda' && 'ðŸ”™ Espalda'}
            {selectedMuscle === 'piernas' && 'ðŸ¦µ Piernas'}
            {selectedMuscle === 'hombros' && 'ðŸ’ª Hombros'}
            {selectedMuscle === 'brazos' && 'ðŸ’¯ Brazos'}
            {selectedMuscle === 'core' && 'ðŸ”¥ Core'}
          </h3>

          <p className="text-gray-700 mb-3">
            <span className="font-bold text-2xl">{muscleData[selectedMuscle] || 0}</span> sets completados esta semana
          </p>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              {muscleData[selectedMuscle] === 0 && "âŒ Sin entrenar esta semana. Considera aÃ±adirlo a tu rutina."}
              {muscleData[selectedMuscle]! > 0 && muscleData[selectedMuscle]! <= 2 && "âš ï¸ Poco entrenado. PodrÃ­as aumentar el volumen."}
              {muscleData[selectedMuscle]! > 2 && muscleData[selectedMuscle]! <= 5 && "âœ… Entrenamiento moderado. Buen balance."}
              {muscleData[selectedMuscle]! > 5 && muscleData[selectedMuscle]! <= 10 && "ðŸ’ª Entrenamiento intenso. AsegÃºrate de recuperarte."}
              {muscleData[selectedMuscle]! > 10 && "ðŸ”¥ Muy intenso. Considera descanso para este grupo."}
            </p>
          </div>
        </motion.div>
      )}

      {/* Leyenda */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <h3 className="font-bold text-lg mb-3 text-gray-800">ðŸ“Š Leyenda de Intensidad</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded"></div>
            <span className="text-sm text-gray-700">Sin entrenar (0 sets)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700">Poco (1-2 sets)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded"></div>
            <span className="text-sm text-gray-700">Moderado (3-5 sets)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded"></div>
            <span className="text-sm text-gray-700">Intenso (6-10 sets)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded"></div>
            <span className="text-sm text-gray-700">Muy intenso (11+ sets)</span>
          </div>
        </div>
      </motion.div>

      {/* Recomendaciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500"
      >
        <h3 className="font-bold text-lg mb-3 text-gray-800">ðŸ’¡ Recomendaciones</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>â€¢ Intenta balancear el entrenamiento entre todos los grupos musculares</li>
          <li>â€¢ Un programa completo incluye: pecho, espalda, piernas, hombros y brazos</li>
          <li>â€¢ Descansa 48 horas antes de entrenar el mismo grupo muscular intensamente</li>
          <li>â€¢ Haz click en cada grupo para ver detalles de entrenamiento</li>
        </ul>
      </motion.div>

      {/* BotÃ³n de actualizar */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={fetchMuscleData}
        className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg"
      >
        ðŸ”„ Actualizar Mapa Muscular
      </motion.button>
    </div>
  )
}
