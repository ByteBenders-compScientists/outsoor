const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = "postgres://neondb_owner:npg_FtPJmA5HfvG4@ep-flat-heart-adb1grtq-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function debugDatabase() {
  try {
    console.log('🔍 Debugging database connection...');
    const sql = neon(DATABASE_URL);
    
    // Check connection details
    const connectionInfo = await sql`
      SELECT 
        current_database() as db_name,
        current_user as current_user,
        current_schema as current_schema,
        session_user as session_user,
        inet_server_addr() as server_addr,
        inet_server_port() as server_port
    `;
    console.log('Connection info:', connectionInfo[0]);
    
    // Check if we're in a transaction
    const transactionStatus = await sql`SELECT txid_current() as tx_id`;
    console.log('Transaction ID:', transactionStatus[0]);
    
    // List all schemas
    const schemas = await sql`
      SELECT schema_name 
      FROM information_schema.schemata 
      ORDER BY schema_name
    `;
    console.log('Available schemas:', schemas);
    
    // List all tables in public schema
    const publicTables = await sql`
      SELECT table_name, table_type
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    console.log('Public schema tables:', publicTables);
    
    // Try to create a table with explicit schema
    console.log('\n🔧 Creating table with explicit schema...');
    try {
      await sql.unsafe(`
        CREATE TABLE IF NOT EXISTS public.test_debug (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100)
        )
      `);
      console.log('✅ Table created with explicit schema');
      
      // Check if it exists
      const checkTable = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'test_debug'
      `;
      console.log('Table check result:', checkTable);
      
      // Try to insert data
      await sql`INSERT INTO public.test_debug (name) VALUES ('test')`;
      console.log('✅ Insert successful');
      
      // Query the data
      const data = await sql`SELECT * FROM public.test_debug`;
      console.log('Data in table:', data);
      
      // Clean up
      await sql.unsafe(`DROP TABLE IF EXISTS public.test_debug`);
      console.log('✅ Table cleaned up');
      
    } catch (error) {
      console.error('❌ Failed to create table with explicit schema:', error);
    }
    
  } catch (error) {
    console.error('❌ Database debug failed:', error);
  }
}

debugDatabase();
