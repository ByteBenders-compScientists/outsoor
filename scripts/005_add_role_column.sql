-- Add role column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';

-- Create index on role for better performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
