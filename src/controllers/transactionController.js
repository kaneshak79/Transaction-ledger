
// // import { createTransaction } from '../services/transactionService.js';

// import {
//   createTransaction,
//   getTransactionHistory,
// } from '../services/transactionService.js';

// export async function handleCreateTransaction(req, res) {
//   try {
//     const { accountId, type, amount, referenceId } = req.body;

//     if (!accountId || typeof accountId !== 'string') {
//       return res.status(400).json({
//         success: false,
//         message: 'Valid accountId is required',
//       });
//     }

//     if (!['credit', 'debit'].includes(type)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Type must be credit or debit',
//       });
//     }

//     if (
//       amount === undefined ||
//       amount === null ||
//       !Number.isFinite(Number(amount)) ||
//       Number(amount) <= 0 ||
//       !/^\d+(\.\d{1,2})?$/.test(String(amount))
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Amount must be a positive number with up to 2 decimal places',
//       });
//     }

//     if (
//       typeof referenceId !== 'string' ||
//       !referenceId.trim() ||
//       referenceId.trim().length > 100
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Reference ID is required and must be 100 characters or fewer',
//       });
//     }

//     const result = await createTransaction(
//       accountId,
//       type,
//       Number(amount),
//       referenceId.trim()
//     );

//     return res.status(201).json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     console.error('Create transaction failed:', error.message);

//     return res.status(error.status || 500).json({
//       success: false,
//       message: error.status ? error.message : 'Failed to create transaction',
//     });
//   }
// }


// // new added code


// export async function handleGetTransactionHistory(req, res) {
//   try {
//     const { accountId } = req.params;
//     const { type } = req.query;

//     const page = Number(req.query.page ?? 1);
//     const limit = Number(req.query.limit ?? 10);

//     if (type && !['credit', 'debit'].includes(type)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Type must be credit or debit',
//       });
//     }

//     if (
//       !Number.isInteger(page) || page < 1 ||
//       !Number.isInteger(limit) || limit < 1 || limit > 100
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Page must be positive and limit must be between 1 and 100',
//       });
//     }

//     const data = await getTransactionHistory(accountId, {
//       type,
//       page,
//       limit,
//     });

//     return res.status(200).json({
//       success: true,
//       data,
//     });
//   } catch (error) {
//     console.error('Transaction history failed:', error.message);

//     return res.status(error.status || 500).json({
//       success: false,
//       message: error.status ? error.message : 'Failed to retrieve transaction history',
//     });
//   }
// }



// import {
//   createTransaction,
//   getTransactionHistory,
// } from '../services/transactionService.js';

// import {
//   createTransaction,
//   getTransactionHistory,
//   transferFunds,
// } from '../services/transactionService.js';

// // Validate UUID format for account IDs
// function isValidAccountId(id) {
//   return (
//     typeof id === 'string' &&
//     /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
//   );
// }

// // Create a credit or debit transaction
// export async function handleCreateTransaction(req, res) {
//   try {
//     // const { accountId, type, amount, referenceId } = req.body;
//     const { accountId, type, amount, description, referenceId } = req.body;

//     if (!isValidAccountId(accountId)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid account ID format',
//       });
//     }

//     if (!['credit', 'debit'].includes(type)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Type must be credit or debit',
//       });
//     }

//     if (
//       amount === undefined ||
//       amount === null ||
//       !Number.isFinite(Number(amount)) ||
//       Number(amount) <= 0 ||
//       !/^\d+(\.\d{1,2})?$/.test(String(amount))
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Amount must be a positive number with up to 2 decimal places',
//       });
//     }

//     if (
//       typeof referenceId !== 'string' ||
//       !referenceId.trim() ||
//       referenceId.trim().length > 100
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Reference ID is required and must be 100 characters or fewer',
//       });
//     }

//     const result = await createTransaction(
//       accountId,
//       type,
//       Number(amount),
//       referenceId.trim()
//     );

//     return res.status(201).json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     console.error('Create transaction failed:', error.message);

//     return res.status(error.status || 500).json({
//       success: false,
//       message: error.status
//         ? error.message
//         : 'Failed to create transaction',
//     });
//   }
// }

// // Retrieve paginated transaction history
// export async function handleGetTransactionHistory(req, res) {
//   try {
//     const { accountId } = req.params;
//     const { type } = req.query;

//     if (!isValidAccountId(accountId)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid account ID format',
//       });
//     }

//     const page = Number(req.query.page ?? 1);
//     const limit = Number(req.query.limit ?? 10);

//     if (type && !['credit', 'debit'].includes(type)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Type must be credit or debit',
//       });
//     }

//     if (
//       !Number.isInteger(page) ||
//       page < 1 ||
//       !Number.isInteger(limit) ||
//       limit < 1 ||
//       limit > 100
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Page must be positive and limit must be between 1 and 100',
//       });
//     }

//     const data = await getTransactionHistory(accountId, {
//       type,
//       page,
//       limit,
//     });

//     return res.status(200).json({
//       success: true,
//       data,
//     });
//   } catch (error) {
//     console.error('Transaction history failed:', error.message);

//     return res.status(error.status || 500).json({
//       success: false,
//       message: error.status
//         ? error.message
//         : 'Failed to retrieve transaction history',
//     });
//   }
// }


// //new added code


// export async function handleTransferFunds(req, res) {
//   try {
//     const { fromAccountId, toAccountId, amount, referenceId } = req.body;

//     if (!isValidAccountId(fromAccountId) || !isValidAccountId(toAccountId)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Valid source and destination account IDs are required',
//       });
//     }

//     if (
//       amount === undefined ||
//       amount === null ||
//       !Number.isFinite(Number(amount)) ||
//       Number(amount) <= 0 ||
//       !/^\d+(\.\d{1,2})?$/.test(String(amount))
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Amount must be a positive number with up to 2 decimal places',
//       });
//     }

//     if (
//       typeof referenceId !== 'string' ||
//       !referenceId.trim() ||
//       referenceId.trim().length > 90
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Reference ID is required and must be 90 characters or fewer',
//       });
//     }

//     const result = await transferFunds(
//       fromAccountId,
//       toAccountId,
//       Number(amount),
//       referenceId.trim()
//     );

//     return res.status(200).json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     console.error('Transfer failed:', error.message);

//     return res.status(error.status || 500).json({
//       success: false,
//       message: error.status ? error.message : 'Failed to transfer funds',
//     });
//   }
// }



import {
  createTransaction,
  getTransactionHistory,
  transferFunds,
} from '../services/transactionService.js';

// Validate UUID format for account IDs
function isValidAccountId(id) {
  return (
    typeof id === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  );
}

// Validate positive amounts with up to 2 decimal places
function isValidAmount(amount) {
  return (
    amount !== undefined &&
    amount !== null &&
    (typeof amount === 'number' || typeof amount === 'string') &&
    String(amount).trim() !== '' &&
    Number.isFinite(Number(amount)) &&
    Number(amount) > 0 &&
    /^\d+(\.\d{1,2})?$/.test(String(amount))
  );
}

// Create a credit or debit transaction
export async function handleCreateTransaction(req, res) {
  try {
    const { accountId, type, amount, description, referenceId } = req.body;

    if (!isValidAccountId(accountId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account ID format',
      });
    }

    if (!['credit', 'debit'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be credit or debit',
      });
    }

    if (!isValidAmount(amount)) {
      return res.status(400).json({
        success: false,
        message:
          'Amount must be a positive number with up to 2 decimal places',
      });
    }

    if (typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Description is required',
      });
    }

    if (description.trim().length > 255) {
      return res.status(400).json({
        success: false,
        message: 'Description must be 255 characters or fewer',
      });
    }

    if (
      typeof referenceId !== 'string' ||
      !referenceId.trim() ||
      referenceId.trim().length > 100
    ) {
      return res.status(400).json({
        success: false,
        message: 'Reference ID is required and must be 100 characters or fewer',
      });
    }

    const result = await createTransaction(
      accountId,
      type,
      Number(amount),
      referenceId.trim(),
      description.trim()
    );

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Create transaction failed:', error.message);

    return res.status(error.status || 500).json({
      success: false,
      message: error.status
        ? error.message
        : 'Failed to create transaction',
    });
  }
}

// Retrieve paginated transaction history
export async function handleGetTransactionHistory(req, res) {
  try {
    const { accountId } = req.params;
    const { type } = req.query;

    if (!isValidAccountId(accountId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account ID format',
      });
    }

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    if (type && !['credit', 'debit'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be credit or debit',
      });
    }

    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: 'Page must be positive and limit must be between 1 and 100',
      });
    }

    const data = await getTransactionHistory(accountId, {
      type,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Transaction history failed:', error.message);

    return res.status(error.status || 500).json({
      success: false,
      message: error.status
        ? error.message
        : 'Failed to retrieve transaction history',
    });
  }
}

// Transfer funds between two accounts
export async function handleTransferFunds(req, res) {
  try {
    const { fromAccountId, toAccountId, amount, referenceId } = req.body;

    if (!isValidAccountId(fromAccountId) || !isValidAccountId(toAccountId)) {
      return res.status(400).json({
        success: false,
        message: 'Valid source and destination account IDs are required',
      });
    }

    if (!isValidAmount(amount)) {
      return res.status(400).json({
        success: false,
        message:
          'Amount must be a positive number with up to 2 decimal places',
      });
    }

    if (
      typeof referenceId !== 'string' ||
      !referenceId.trim() ||
      referenceId.trim().length > 90
    ) {
      return res.status(400).json({
        success: false,
        message: 'Reference ID is required and must be 90 characters or fewer',
      });
    }

    const result = await transferFunds(
      fromAccountId,
      toAccountId,
      Number(amount),
      referenceId.trim()
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Transfer failed:', error.message);

    return res.status(error.status || 500).json({
      success: false,
      message: error.status ? error.message : 'Failed to transfer funds',
    });
  }
}
