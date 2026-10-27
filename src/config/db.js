
import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function testDatabaseConnection() {
  const result = await pool.query('SELECT NOW() AS current_time');
  console.log('Database connected successfully:', result.rows[0].current_time);
}
