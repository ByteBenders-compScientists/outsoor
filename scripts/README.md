# Database Migration Scripts

## Issue
The application is failing with the error: `NeonDbError: relation "api_tokens" does not exist`

This happens because the required database tables haven't been created yet.

## Solution

### Option 1: Run the migration script directly in your database
1. Copy the contents of `fix_api_tokens_table.sql`
2. Run it directly in your Neon database console or any SQL client connected to your database
3. This will create the missing `api_tokens` and `user_integrations` tables

### Option 2: Use the migration runner (requires Node.js)
1. Make sure you have Node.js installed
2. Set your `DATABASE_URL` environment variable
3. Run: `npm run migrate` or `pnpm run migrate`

### Option 3: Manual table creation
If you prefer to create tables manually, here are the key tables you need:

#### Users table (should already exist)
```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### API Tokens table (missing - this is what's causing the error)
```sql
CREATE TABLE IF NOT EXISTS api_tokens (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL DEFAULT 'Default API token',
  token_hash VARCHAR(255) NOT NULL UNIQUE,
  token_prefix VARCHAR(16) NOT NULL,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);
```

#### User Integrations table (also referenced in the code)
```sql
CREATE TABLE IF NOT EXISTS user_integrations (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  integration_type VARCHAR(100) NOT NULL,
  integration_name VARCHAR(255) NOT NULL,
  external_account_id VARCHAR(255),
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Important Notes
- The `users` table uses UUID type for the `id` field
- The `api_tokens` and `user_integrations` tables reference the `users.id` field
- Make sure to create the tables in the correct order (users first, then the others)
- The `fix_api_tokens_table.sql` script handles all the necessary table creation and indexing
