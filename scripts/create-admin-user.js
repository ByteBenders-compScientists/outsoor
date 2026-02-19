const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');

// Load environment variables from .env file manually
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim();
          process.env[key] = value;
        }
      }
    }
  }
}

// Load environment variables
loadEnvFile();

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL environment variable is not set');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function createAdminUser() {
  const email = 'upgrade@upgrade.com';
  const password = 'upgrade@upgrade.com';
  const name = 'Admin User';

  try {
    console.log(`Checking for user: ${email}`);
    
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (existingUser.length > 0) {
      console.log('User exists, updating role to admin...');
      await sql`
        UPDATE users 
        SET role = 'admin'
        WHERE email = ${email}
      `;
      console.log('User role updated successfully.');
    } else {
      console.log('User does not exist, creating admin user...');
      const hashedPassword = await bcrypt.hash(password, 12);
      
      await sql`
        INSERT INTO users (email, password_hash, name, role)
        VALUES (${email}, ${hashedPassword}, ${name}, 'admin')
      `;
      console.log('Admin user created successfully.');
    }

  } catch (error) {
    console.error('Error creating/updating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
