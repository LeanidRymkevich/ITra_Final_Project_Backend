import { Router } from 'express';

import adminRightsValidator from '../middlewares/adminRightsValidator';
import tokenValidator from '../middlewares/tokenValidator';

import { ENDPOINTS } from '../types/enums';

import {
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/adminController';

const adminRouter: Router = Router();

// middlewares
adminRouter.use(tokenValidator);
adminRouter.use(adminRightsValidator);

//methods
adminRouter.get(ENDPOINTS.ROOT, getAllUsers);
adminRouter.patch(ENDPOINTS.ROOT, updateUser);
adminRouter.delete(ENDPOINTS.ROOT, deleteUser);

export default adminRouter;
