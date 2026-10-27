
// import { Router } from 'express';
// import { handleCreateAccount } from '../controllers/accountController.js';

// const router = Router();

// router.post('/', handleCreateAccount);

// export default router;




import { Router } from 'express';
import {
  handleCreateAccount,
  handleGetAccount,
} from '../controllers/accountController.js';

const router = Router();

router.post('/', handleCreateAccount);
router.get('/:id', handleGetAccount);

export default router;
