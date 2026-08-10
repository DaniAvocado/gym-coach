-- Protección de la base de datos: activar RLS en todas las tablas.
-- Ejecutar en Supabase Dashboard -> SQL Editor.
-- Cada usuario solo puede leer/escribir SUS propios datos (auth.uid()).

-- ============ user_profiles (la clave primaria ES el user id) ============
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_own_select" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_own_insert" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_own_update" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_own_delete" ON public.user_profiles FOR DELETE USING (auth.uid() = id);

-- ============ Tablas con user_id ============
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workouts_own_select" ON public.workouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "workouts_own_insert" ON public.workouts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "workouts_own_update" ON public.workouts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "workouts_own_delete" ON public.workouts FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "meals_own_select" ON public.meals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "meals_own_insert" ON public.meals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "meals_own_update" ON public.meals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "meals_own_delete" ON public.meals FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "points_own_select" ON public.user_points FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "points_own_insert" ON public.user_points FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "points_own_update" ON public.user_points FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "points_own_delete" ON public.user_points FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.points_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "points_log_own_select" ON public.points_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "points_log_own_insert" ON public.points_log FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "points_log_own_update" ON public.points_log FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "points_log_own_delete" ON public.points_log FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "routines_own_select" ON public.routines FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "routines_own_insert" ON public.routines FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "routines_own_update" ON public.routines FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "routines_own_delete" ON public.routines FOR DELETE USING (auth.uid() = user_id);

-- ============ workout_sets (sin user_id: hereda del workout) ============
ALTER TABLE public.workout_sets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sets_own_select" ON public.workout_sets FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.workouts w WHERE w.id = workout_id AND w.user_id = auth.uid()));
CREATE POLICY "sets_own_insert" ON public.workout_sets FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.workouts w WHERE w.id = workout_id AND w.user_id = auth.uid()));
CREATE POLICY "sets_own_update" ON public.workout_sets FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.workouts w WHERE w.id = workout_id AND w.user_id = auth.uid()));
CREATE POLICY "sets_own_delete" ON public.workout_sets FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.workouts w WHERE w.id = workout_id AND w.user_id = auth.uid()));

-- ============ routine_exercises (sin user_id: hereda de la rutina) ============
ALTER TABLE public.routine_exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "routine_ex_own_select" ON public.routine_exercises FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.routines r WHERE r.id = routine_id AND r.user_id = auth.uid()));
CREATE POLICY "routine_ex_own_insert" ON public.routine_exercises FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.routines r WHERE r.id = routine_id AND r.user_id = auth.uid()));
CREATE POLICY "routine_ex_own_update" ON public.routine_exercises FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.routines r WHERE r.id = routine_id AND r.user_id = auth.uid()));
CREATE POLICY "routine_ex_own_delete" ON public.routine_exercises FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.routines r WHERE r.id = routine_id AND r.user_id = auth.uid()));

-- ============ exercises (catálogo público: solo lectura) ============
-- Cualquiera puede LEER, nadie puede insertar/editar/borrar con la anon key.
-- El script de importación debe usar la service_role_key (ver scripts/import_exercises.js).
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "exercises_read" ON public.exercises FOR SELECT USING (true);
