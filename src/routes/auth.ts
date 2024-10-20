import { Router } from 'express';

import {
  signUp,
  signIn,
  sendCheckTokenResp,
} from '../controllers/authController';
import tokenValidator from '../middlewares/tokenValidator';

import { AUTH_ENDPOINTS, ENDPOINTS } from '../types/enums';

const authRouter: Router = Router();

// the endpoint for sending an initial request to check stored on a client authorization token
authRouter.post(ENDPOINTS.ROOT, tokenValidator, sendCheckTokenResp);
authRouter.post(AUTH_ENDPOINTS.SIGN_IN, signIn);
authRouter.post(AUTH_ENDPOINTS.SIGN_UP, signUp);

export default authRouter;
