ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS gender TEXT; -- 'male' or 'female'
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS activity_level TEXT; -- 'sedentary', 'light', 'moderate', 'active', 'very_active'
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS metabolic_rate TEXT; -- 'slow', 'normal', 'fast'
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS body_fat_percentage DECIMAL(4,1); -- optional
