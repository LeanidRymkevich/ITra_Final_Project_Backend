import { Router } from 'express';

import adminRightsValidator from '../middlewares/adminRightsValidator';
import tokenValidator from '../middlewares/tokenValidator';

import { ENDPOINTS } from '../types/enums';
import { ID_ENDPOINTS_PARAM } from '../constants/constants';

import {
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/adminController';

const ENDPOINT_PARAM = `/:${ID_ENDPOINTS_PARAM}`;

const adminRouter: Router = Router();

// middlewares
adminRouter.use(tokenValidator);
adminRouter.use(adminRightsValidator);

//methods
adminRouter.get(ENDPOINTS.ROOT, getAllUsers);
adminRouter.patch(ENDPOINT_PARAM, updateUser);
adminRouter.delete(ENDPOINT_PARAM, deleteUser);

export default adminRouter;
