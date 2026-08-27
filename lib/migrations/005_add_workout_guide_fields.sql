-- Add workout-guide fields to exercises table
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS exercise_type TEXT;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS equipment TEXT;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS primary_muscle TEXT;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS secondary_muscles TEXT[];
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS is_stretch BOOLEAN DEFAULT FALSE;
