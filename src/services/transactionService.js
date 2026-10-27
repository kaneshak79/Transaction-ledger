
// // import { pool } from '../config/db.js';

// // export async function createTransaction(accountId, type, amount, referenceId) {
// //   const client = await pool.connect();

// //   try {
// //     await client.query('BEGIN');

// //     // Lock the account row to prevent concurrent balance updates.
// //     const accountResult = await client.query(
// //       'SELECT id, balance FROM accounts WHERE id = $1 FOR UPDATE',
// //       [accountId]
// //     );

// //     if (accountResult.rowCount === 0) {
// //       const error = new Error('Account not found');
// //       error.status = 404;
// //       throw error;
// //     }

// //     const account = accountResult.rows[0];

// //     // Check duplicate reference IDs within this account.
// //     const duplicate = await client.query(
// //       `SELECT id FROM transactions
// //        WHERE account_id = $1 AND reference_id = $2`,
// //       [accountId, referenceId]
// //     );

// //     if (duplicate.rowCount > 0) {
// //       const error = new Error('Reference ID already exists for this account');
// //       error.status = 409;
// //       throw error;
// //     }

// //     const currentBalance = Number(account.balance);

// //     if (type === 'debit' && currentBalance < amount) {
// //       const error = new Error('Insufficient balance');
// //       error.status = 400;
// //       throw error;
// //     }

// //     const balanceChange = type === 'credit' ? amount : -amount;

// //     const updatedAccount = await client.query(
// //       `UPDATE accounts
// //        SET balance = balance + $1
// //        WHERE id = $2
// //        RETURNING id, name, balance`,
// //       [balanceChange, accountId]
// //     );

// //     const transactionResult = await client.query(
// //       `INSERT INTO transactions (account_id, reference_id, type, amount)
// //        VALUES ($1, $2, $3, $4)
// //        RETURNING id, account_id, reference_id, type, amount, created_at`,
// //       [accountId, referenceId, type, amount]
// //     );

// //     await client.query('COMMIT');

// //     return {
// //       account: updatedAccount.rows[0],
// //       transaction: transactionResult.rows[0],
// //     };
// //   } catch (error) {
// //     await client.query('ROLLBACK');
// //     throw error;
// //   } finally {
// //     client.release();
// //   }
// // }


// // // new added extra line


// // export async function getTransactionHistory(
// //   accountId,
// //   { type, page = 1, limit = 10 }
// // ) {
// //   const offset = (page - 1) * limit;
// //   const client = await pool.connect();

// //   try {
// //     const accountResult = await client.query(
// //       'SELECT id FROM accounts WHERE id = $1',
// //       [accountId]
// //     );

// //     if (accountResult.rowCount === 0) {
// //       const error = new Error('Account not found');
// //       error.status = 404;
// //       throw error;
// //     }

// //     const values = [accountId];
// //     let filter = 'WHERE account_id = $1';

// //     if (type) {
// //       values.push(type);
// //       filter += ` AND type = $${values.length}`;
// //     }

// //     const countResult = await client.query(
// //       `SELECT COUNT(*) FROM transactions ${filter}`,
// //       values
// //     );

// //     values.push(limit, offset);

// //     const result = await client.query(
// //       `SELECT id, account_id, reference_id, type, amount, created_at
// //        FROM transactions
// //        ${filter}
// //        ORDER BY created_at DESC, id DESC
// //        LIMIT $${values.length - 1}
// //        OFFSET $${values.length}`,
// //       values
// //     );

// //     return {
// //       transactions: result.rows,
// //       pagination: {
// //         page,
// //         limit,
// //         total: Number(countResult.rows[0].count),
// //         totalPages: Math.ceil(Number(countResult.rows[0].count) / limit),
// //       },
// //     };
// //   } finally {
// //     client.release();
// //   }
// // }




// import { pool } from '../config/db.js';

// export async function createTransaction(accountId, type, amount, referenceId) {
//   const client = await pool.connect();

//   try {
//     await client.query('BEGIN');

//     const accountResult = await client.query(
//       'SELECT id, balance FROM accounts WHERE id = $1 FOR UPDATE',
//       [accountId]
//     );

//     if (accountResult.rowCount === 0) {
//       const error = new Error('Account not found');
//       error.status = 404;
//       throw error;
//     }

//     const account = accountResult.rows[0];

//     const duplicate = await client.query(
//       `SELECT id FROM transactions
//        WHERE account_id = $1 AND reference_id = $2`,
//       [accountId, referenceId]
//     );

//     if (duplicate.rowCount > 0) {
//       const error = new Error('Reference ID already exists for this account');
//       error.status = 409;
//       throw error;
//     }

//     const currentBalance = Number(account.balance);

//     if (type === 'debit' && currentBalance < amount) {
//       const error = new Error('Insufficient balance');
//       error.status = 400;
//       throw error;
//     }

//     const balanceChange = type === 'credit' ? amount : -amount;

//     const updatedAccount = await client.query(
//       `UPDATE accounts
//        SET balance = balance + $1
//        WHERE id = $2
//        RETURNING id, name, balance`,
//       [balanceChange, accountId]
//     );

//     const transactionResult = await client.query(
//       `INSERT INTO transactions (account_id, reference_id, type, amount)
//        VALUES ($1, $2, $3, $4)
//        RETURNING id, account_id, reference_id, type, amount, created_at`,
//       [accountId, referenceId, type, amount]
//     );

//     await client.query('COMMIT');

//     return {
//       account: updatedAccount.rows[0],
//       transaction: transactionResult.rows[0],
//     };
//   } catch (error) {
//     await client.query('ROLLBACK');
//     throw error;
//   } finally {
//     client.release();
//   }
// }

// export async function getTransactionHistory(
//   accountId,
//   { type, page = 1, limit = 10 }
// ) {
//   const offset = (page - 1) * limit;
//   const client = await pool.connect();

//   try {
//     const accountResult = await client.query(
//       'SELECT id FROM accounts WHERE id = $1',
//       [accountId]
//     );

//     if (accountResult.rowCount === 0) {
//       const error = new Error('Account not found');
//       error.status = 404;
//       throw error;
//     }

//     const values = [accountId];
//     let filter = 'WHERE account_id = $1';

//     if (type) {
//       values.push(type);
//       filter += ` AND type = $${values.length}`;
//     }

//     const countResult = await client.query(
//       `SELECT COUNT(*) FROM transactions ${filter}`,
//       values
//     );

//     values.push(limit, offset);

//     const result = await client.query(
//       `SELECT id, account_id, reference_id, type, amount, created_at
//        FROM transactions
//        ${filter}
//        ORDER BY created_at DESC, id DESC
//        LIMIT $${values.length - 1}
//        OFFSET $${values.length}`,
//       values
//     );

//     return {
//       transactions: result.rows,
//       pagination: {
//         page,
//         limit,
//         total: Number(countResult.rows[0].count),
//         totalPages: Math.ceil(Number(countResult.rows[0].count) / limit),
//       },
//     };
//   } finally {
//     client.release();
//   }
// }

// // Bonus: atomically transfer funds between two accounts
// export async function transferFunds(
//   fromAccountId,
//   toAccountId,
//   amount,
//   referenceId
// ) {
//   if (fromAccountId === toAccountId) {
//     const error = new Error('Source and destination accounts must be different');
//     error.status = 400;
//     throw error;
//   }

//   const client = await pool.connect();

//   try {
//     await client.query('BEGIN');

//     // Lock both accounts in consistent ID order to reduce deadlock risk.
//     const accountIds = [fromAccountId, toAccountId].sort();

//     const accountsResult = await client.query(
//       `SELECT id, name, balance
//        FROM accounts
//        WHERE id = ANY($1::uuid[])
//        ORDER BY id
//        FOR UPDATE`,
//       [accountIds]
//     );

//     if (accountsResult.rowCount !== 2) {
//       const error = new Error('Source or destination account not found');
//       error.status = 404;
//       throw error;
//     }

//     const accountsById = new Map(
//       accountsResult.rows.map((account) => [account.id, account])
//     );

//     const source = accountsById.get(fromAccountId);

//     if (Number(source.balance) < amount) {
//       const error = new Error('Insufficient balance');
//       error.status = 400;
//       throw error;
//     }

//     // Use distinct reference IDs for the debit and credit ledger entries.
//     const debitReference = `${referenceId}-DEBIT`;
//     const creditReference = `${referenceId}-CREDIT`;

//     const duplicateResult = await client.query(
//       `SELECT id
//        FROM transactions
//        WHERE (account_id = $1 AND reference_id = $3)
//           OR (account_id = $2 AND reference_id = $4)`,
//       [fromAccountId, toAccountId, debitReference, creditReference]
//     );

//     if (duplicateResult.rowCount > 0) {
//       const error = new Error('Transfer reference ID already exists');
//       error.status = 409;
//       throw error;
//     }

//     await client.query(
//       'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
//       [amount, fromAccountId]
//     );

//     await client.query(
//       'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
//       [amount, toAccountId]
//     );

//     const debitResult = await client.query(
//       `INSERT INTO transactions (account_id, reference_id, type, amount)
//        VALUES ($1, $2, 'debit', $3)
//        RETURNING id, account_id, reference_id, type, amount, created_at`,
//       [fromAccountId, debitReference, amount]
//     );

//     const creditResult = await client.query(
//       `INSERT INTO transactions (account_id, reference_id, type, amount)
//        VALUES ($1, $2, 'credit', $3)
//        RETURNING id, account_id, reference_id, type, amount, created_at`,
//       [toAccountId, creditReference, amount]
//     );

//     await client.query('COMMIT');

//     return {
//       fromAccountId,
//       toAccountId,
//       amount,
//       debitTransaction: debitResult.rows[0],
//       creditTransaction: creditResult.rows[0],
//     };
//   } catch (error) {
//     await client.query('ROLLBACK');
//     throw error;
//   } finally {
//     client.release();
//   }
// }




import { pool } from '../config/db.js';

// Create a credit or debit transaction
export async function createTransaction(
  accountId,
  type,
  amount,
  referenceId,
  description
) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Lock the account to prevent concurrent balance updates
    const accountResult = await client.query(
      'SELECT id, balance FROM accounts WHERE id = $1 FOR UPDATE',
      [accountId]
    );

    if (accountResult.rows.length === 0) {
      const error = new Error('Account not found');
      error.status = 404;
      throw error;
    }

    const account = accountResult.rows[0];

    // Check for duplicate reference within the same account
    const duplicateResult = await client.query(
      `SELECT id FROM transactions
       WHERE account_id = $1 AND reference_id = $2`,
      [accountId, referenceId]
    );

    if (duplicateResult.rows.length > 0) {
      const error = new Error(
        'Transaction with this reference ID already exists'
      );
      error.status = 409;
      throw error;
    }

    const currentBalance = Number(account.balance);

    if (type === 'debit' && currentBalance < amount) {
      const error = new Error('Insufficient balance');
      error.status = 400;
      throw error;
    }

    // Update the account balance
    const balanceChange = type === 'credit' ? amount : -amount;

    await client.query(
      `UPDATE accounts
       SET balance = balance + $1
       WHERE id = $2`,
      [balanceChange, accountId]
    );

    // Insert the immutable transaction record
    const transactionResult = await client.query(
      `INSERT INTO transactions
         (account_id, reference_id, type, amount, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, account_id, reference_id, type,
                 amount, description, created_at`,
      [accountId, referenceId, type, amount, description]
    );

    await client.query('COMMIT');

    return {
      transaction: transactionResult.rows[0],
      balance: Number(
        (
          currentBalance + balanceChange
        ).toFixed(2)
      ),
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Retrieve transaction history with optional type filter and pagination
export async function getTransactionHistory(
  accountId,
  { type, page = 1, limit = 10 }
) {
  // Check whether the account exists
  const accountResult = await pool.query(
    'SELECT id FROM accounts WHERE id = $1',
    [accountId]
  );

  if (accountResult.rows.length === 0) {
    const error = new Error('Account not found');
    error.status = 404;
    throw error;
  }

  const offset = (page - 1) * limit;

  let whereClause = 'WHERE account_id = $1';
  const queryParams = [accountId];

  if (type) {
    queryParams.push(type);
    whereClause += ` AND type = $${queryParams.length}`;
  }

  const countResult = await pool.query(
    `SELECT COUNT(*) AS total
     FROM transactions
     ${whereClause}`,
    queryParams
  );

  const totalRecords = Number(countResult.rows[0].total);
  const totalPages = Math.ceil(totalRecords / limit);

  queryParams.push(limit);
  const limitParam = queryParams.length;

  queryParams.push(offset);
  const offsetParam = queryParams.length;

  const transactionsResult = await pool.query(
    `SELECT id, account_id, reference_id, type,
            amount, description, created_at
     FROM transactions
     ${whereClause}
     ORDER BY created_at DESC, id DESC
     LIMIT $${limitParam} OFFSET $${offsetParam}`,
    queryParams
  );

  return {
    transactions: transactionsResult.rows,
    pagination: {
      currentPage: page,
      pageSize: limit,
      totalRecords,
      totalPages,
    },
  };
}

// Transfer funds between two accounts
export async function transferFunds(
  fromAccountId,
  toAccountId,
  amount,
  referenceId
) {
  if (fromAccountId.toLowerCase() === toAccountId.toLowerCase()) {
    const error = new Error(
      'Source and destination accounts must be different'
    );
    error.status = 400;
    throw error;
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Lock both accounts in a consistent order to reduce deadlocks
    const accountIds = [
      fromAccountId.toLowerCase(),
      toAccountId.toLowerCase(),
    ].sort();

    const accountsResult = await client.query(
      `SELECT id, balance
       FROM accounts
       WHERE id = ANY($1::uuid[])
       ORDER BY id
       FOR UPDATE`,
      [accountIds]
    );

    if (accountsResult.rows.length !== 2) {
      const error = new Error('Source or destination account not found');
      error.status = 404;
      throw error;
    }

    const accountsById = new Map(
      accountsResult.rows.map((account) => [
        account.id.toLowerCase(),
        account,
      ])
    );

    const source = accountsById.get(fromAccountId.toLowerCase());
    const destination = accountsById.get(toAccountId.toLowerCase());

    if (!source || !destination) {
      const error = new Error('Source or destination account not found');
      error.status = 404;
      throw error;
    }

    const sourceBalance = Number(source.balance);

    if (sourceBalance < amount) {
      const error = new Error('Insufficient balance');
      error.status = 400;
      throw error;
    }

    // Each transfer produces a debit and a credit ledger entry
    const debitReference = `${referenceId}-DEBIT`;
    const creditReference = `${referenceId}-CREDIT`;

    const duplicateResult = await client.query(
      `SELECT id
       FROM transactions
       WHERE (account_id = $1 AND reference_id = $3)
          OR (account_id = $2 AND reference_id = $4)`,
      [
        fromAccountId,
        toAccountId,
        debitReference,
        creditReference,
      ]
    );

    if (duplicateResult.rows.length > 0) {
      const error = new Error(
        'Transfer with this reference ID already exists'
      );
      error.status = 409;
      throw error;
    }

    await client.query(
      `UPDATE accounts
       SET balance = balance - $1
       WHERE id = $2`,
      [amount, fromAccountId]
    );

    await client.query(
      `UPDATE accounts
       SET balance = balance + $1
       WHERE id = $2`,
      [amount, toAccountId]
    );

    const debitResult = await client.query(
      `INSERT INTO transactions
         (account_id, reference_id, type, amount, description)
       VALUES ($1, $2, 'debit', $3, $4)
       RETURNING id, account_id, reference_id, type,
                 amount, description, created_at`,
      [
        fromAccountId,
        debitReference,
        amount,
        `Transfer to account ${toAccountId}`,
      ]
    );

    const creditResult = await client.query(
      `INSERT INTO transactions
         (account_id, reference_id, type, amount, description)
       VALUES ($1, $2, 'credit', $3, $4)
       RETURNING id, account_id, reference_id, type,
                 amount, description, created_at`,
      [
        toAccountId,
        creditReference,
        amount,
        `Transfer from account ${fromAccountId}`,
      ]
    );

    await client.query('COMMIT');

    return {
      fromAccountId,
      toAccountId,
      amount,
      debitTransaction: debitResult.rows[0],
      creditTransaction: creditResult.rows[0],
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
