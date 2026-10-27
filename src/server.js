
import 'dotenv/config';
import app from './app.js';
import { pool } from './config/db.js';

const PORT = process.env.PORT || 3000;

try {
  await pool.query('SELECT 1');
  console.log('Database connected successfully');

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Startup failed:', error.message);
  process.exit(1);
}
