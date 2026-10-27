
// import { createAccount } from '../services/accountService.js';

// export async function handleCreateAccount(req, res) {
   
//   try {
//     const { name } = req.body;

//     if (typeof name !== 'string' || !name.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: 'Account name is required',
//       });
//     }

//     if (name.trim().length > 100) {
//       return res.status(400).json({
//         success: false,
//         message: 'Account name must be 100 characters or fewer',
//       });
//     }

//     const account = await createAccount(name.trim());

//     return res.status(201).json({
//       success: true,
//       data: account,
//     });
//   } catch (error) {
//     console.error('Create account failed:', error.message);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to create account',
//     });
//   }
// }


// //new extra code added

// export async function handleGetAccount(req, res) {
//   try {
//     const { getAccountById } = await import('../services/accountService.js');
//     const account = await getAccountById(req.params.id);

//     if (!account) {
//       return res.status(404).json({
//         success: false,
//         message: 'Account not found',
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: account,
//     });
//   } catch (error) {
//     console.error('Get account failed:', error.message);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve account',
//     });
//   }
// }




import {
  createAccount,
  getAccountById,
} from '../services/accountService.js';

// Validate UUID format for account IDs
function isValidAccountId(id) {
  return (
    typeof id === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  );
}

// Create a new account
export async function handleCreateAccount(req, res) {
  try {
    const { name } = req.body;

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Account name is required',
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Account name must be 100 characters or fewer',
      });
    }

    const account = await createAccount(name.trim());

    return res.status(201).json({
      success: true,
      data: account,
    });
  } catch (error) {
    console.error('Create account failed:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to create account',
    });
  }
}

// Retrieve an account and its current balance
export async function handleGetAccount(req, res) {
  try {
    const { id } = req.params;

    if (!isValidAccountId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account ID format',
      });
    }

    const account = await getAccountById(id);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    console.error('Get account failed:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve account',
    });
  }
}
