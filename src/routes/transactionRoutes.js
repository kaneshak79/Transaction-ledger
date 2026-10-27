
// // import { Router } from 'express';
// // import { handleCreateTransaction } from '../controllers/transactionController.js';

// // const router = Router();

// // router.post('/', handleCreateTransaction);

// // export default router;



// import { Router } from 'express';
// import {
//   handleCreateTransaction,
//   handleGetTransactionHistory,
// } from '../controllers/transactionController.js';

// const router = Router();

// router.post('/', handleCreateTransaction);
// router.get('/accounts/:accountId/history', handleGetTransactionHistory);

// export default router;




import { Router } from 'express';

import {
  handleCreateTransaction,
  handleGetTransactionHistory,
  handleTransferFunds,
} from '../controllers/transactionController.js';

const router = Router();

router.post('/', handleCreateTransaction);

router.post('/transfer', handleTransferFunds);

router.get('/accounts/:accountId/history', handleGetTransactionHistory);

export default router;
