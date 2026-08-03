-- Migración v4: ampliar tabla exercises para el dataset de 1324 ejercicios
-- (hasaneyldrm/exercises-dataset)

ALTER TABLE public.exercises
  ADD COLUMN IF NOT EXISTS equipment TEXT,
  ADD COLUMN IF NOT EXISTS target_muscle TEXT,
  ADD COLUMN IF NOT EXISTS secondary_muscles JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS instructions_es TEXT,
  ADD COLUMN IF NOT EXISTS instruction_steps_es JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS gif_url TEXT,
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS dataset_id TEXT;

CREATE INDEX IF NOT EXISTS idx_exercises_category ON public.exercises(category);
CREATE INDEX IF NOT EXISTS idx_exercises_dataset_id ON public.exercises(dataset_id);
