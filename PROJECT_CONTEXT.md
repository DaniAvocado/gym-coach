# PROYECTO: Gym Coach — Contexto Completo para IA

> Este documento es la memoria persistente del proyecto. Cualquier agente IA
> debe leer este archivo ANTES de trabajar en el código. Evita releer historial
> de conversaciones antiguas.

## 1. QUE ES
App web de entrenamiento personal (Next.js + Supabase) con trackers de:
- Entrenamientos (series, pesos, reps, sobrecarga progresiva)
- Nutricion (comidas, macros, metas personalizadas)
- Recuperacion muscular (mapa corporal con estado de descanso)
- Coach IA (recomendaciones basadas en ciencia)
- Rutinas personalizadas
- Spotify widget para playlist de entreno

## 2. STACK
- Ruta local: C:\Users\DANIEL\OneDrive - mail.uniatlantico.edu.co\Documentos\PROYECTOS\gym-coach
- Frontend: Next.js 16 (App Router) + React 19 + Tailwind 4
- Estilos: glassmorphism (blur + rgba) con paleta ROSA/AZUL/MORADO
- Tipografia: Barlow Condensed (fitness) segun ui-ux-pro-max
- Backend/DB: Supabase (Postgres + Auth)
- Fondo animado: canvas con particulas reactivas al cursor
- Animaciones: framer-motion (decorativo)
- Deploy: Vercel (gym-coach-acme-de5d.vercel.app)
- Repo: https://github.com/DaniAvocado/gym-coach
- n8n: localhost:5678 (API key en env N8N_API_KEY); workflows exportados en workflows/*.json

## 3. ESTRUCTURA DE COMPONENTES
- app/page.tsx -> landing page glassmorphism
- app/auth/page.tsx -> login/signup
- app/dashboard/page.tsx -> renderiza Dashboard
- components/Dashboard.tsx -> layout principal (sidebar + mobile nav)
- components/DashboardOverview.tsx -> KPIs semanales
- components/WorkoutTracker.tsx -> registro de ejercicios/series
- components/WorkoutTimer.tsx -> cronometro de sesion
- components/SetDetail.tsx -> edicion de cada serie
- components/MealTracker.tsx -> comidas + macros + quick-add
- components/RecoveryZone.tsx -> estado de recuperacion por musculo
- components/BodyMapVisual.tsx -> mapa muscular visual
- components/UserProfile.tsx -> perfil + calculos Mifflin-St Jeor
- components/ProgressiveOverload.tsx -> sugerencias de peso/reps
- components/CoachRecommendations.tsx -> coach IA
- components/Routines.tsx -> CRUD rutinas
- components/SpotifyWidget.tsx -> reproductor Spotify embebido
- components/AnimatedBackground.tsx -> particulas interactivas
- components/PointsDisplay.tsx -> tarjetas KPI de puntos
- app/api/coach/route.ts -> endpoint de analisis del coach

## 4. BASE DE DATOS (Supabase)
Tablas: user_profiles (peso, altura, edad, sexo, actividad, metabolismo, spotify_playlist),
exercises, workouts, workout_sets, meals, user_points, points_log, routines, routine_exercises.
RLS: activado por dueño (auth.uid()) en todas las tablas; exercises solo lectura. Schema en lib/schema.sql, políticas en lib/rls.sql.

## 5. FORMULAS CLAVE
- BMR: Mifflin-St Jeor (10*p + 6.25*h - 5*a + s)
- TDEE: BMR * actividad (1.2-1.9) * metabolismo (0.9-1.1)
- Objetivos: hipertrofia +300kcal, fuerza +200, perdida -400
- Proteina: 1.6-2.4 g/kg segun objetivo
- Sobrecarga progresiva: >=12 reps subir peso 2.5kg(pierna)/1.25kg; 8-11 reps subir 1 rep; <8 mantener

## 6. HISTORIAL DE CAMBIOS (resumen)
- Landing page glassmorphism con blobs de luz
- Paleta rosa/azul/morado con tonalidades
- Fondo animado con particulas que siguen el cursor
- Coach IA con recomendaciones cientificas (RIR, volumen, macros)
- Widget Spotify personalizable
- Comidas rapidas predefinidas agrupadas por tipo
- Sobrecarga progresiva automatica
- Zona de recuperacion con auto-refresh
- Responsive movil con nav vertical e iconos
- CHANGELOG.md con commits detallados

## 7. NOTAS IMPORTANTES
- n8n corre en localhost:5678 (MCP configurado)
- Nodulos n8n disponibles: scheduleTrigger, manualTrigger, code, readWriteFile
- NODULOS NO DISPONIBLES: localFileTrigger, executeCommand
- Los archivos deben guardarse en UTF-8 (PowerShell 5.1 corrompe acentos si se usa Get-Content/WriteAllText)
- AGENTS.md instruye leer este archivo antes de trabajar








[2026-08-09 19:35] 19f7496: fix: completar traducciones de ejercicios al español y activar RLS en Supabase

- Traducir 87 ejercicios vacios, 39 parciales (solo equipo) y 7 con solo parentesis
- lib/rls.sql: politicas RLS por dueno (auth.uid()) en todas las tablas; exercises solo lectura
- scripts/import_exercises.js: usar SUPABASE_SERVICE_ROLE_KEY por env (sin anon key hardcodeada)
- PROJECT_CONTEXT.md: actualizar estado de RLS

[2026-08-09 19:57] 6d2dd66: refactor: reducir duplicacion y reforzar seguridad

- Eliminar BodyMap.tsx muerto, migraciones SQL v2-v4/seed/profile y SVGs de plantilla
- Extraer useMuscleCounts hook compartido (BodyMapVisual + RecoveryZone)
- Eliminar tabla points_log (insert sin lectura) y NAME_WORD_MAP vacio
- Quitar campo icon muerto en PointsDisplay
- Seguridad: validar JWT en /api/coach, headers de seguridad en next.config.ts

[2026-08-09 20:16] 3cfa9c1: fix: hacer schema.sql idempotente (IF NOT EXISTS) para re-ejecutar sin errores

[2026-08-09 20:25] 2b8a53f: refactor: extraer ExercisePicker, hook de filtro y lib de nutricion

- lib/nutrition.ts: BMR/TDEE/macros compartidos (antes duplicado en 3 archivos)
- components/ExercisePicker.tsx + lib/useExerciseFilter.ts: buscador de ejercicios unificado
- Quitar campo icon vacio en 14 KPI cards y points muerto en /api/coach
- Deduplicar quickFoods (batido/yogur repetidos)
