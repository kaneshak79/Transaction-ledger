
// import { pool } from '../config/db.js';

// export async function createAccount(name) {
//   const result = await pool.query(
//     `INSERT INTO accounts (name)
//      VALUES ($1)
//      RETURNING id, name, balance, created_at`,
//     [name]
//   );

//   return result.rows[0];
// }




import { pool } from '../config/db.js';

export async function createAccount(name) {
  const result = await pool.query(
    `INSERT INTO accounts (name)
     VALUES ($1)
     RETURNING id, name, balance, created_at`,
    [name]
  );

  return result.rows[0];
}

export async function getAccountById(accountId) {
  const result = await pool.query(
    `SELECT id, name, balance, created_at
     FROM accounts
     WHERE id = $1`,
    [accountId]
  );

  return result.rows[0] || null;
}
