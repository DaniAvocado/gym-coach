-- Actualizar tabla user_profiles con datos biométricos
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS weight_kg DECIMAL(5,2);
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS height_cm INTEGER;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS goal TEXT; -- 'hypertrophy', 'strength', 'endurance', 'weight_loss'
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS experience_level TEXT; -- 'beginner', 'intermediate', 'advanced'
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
