import { Router } from 'express';
import { AUTH_ENDPOINTS, ENDPOINTS } from '../types/enums';
import { signUp, signIn } from '../controllers/authControllers';

const authRouter: Router = Router();

// the endpoint for sending an initial request to check stored on a client authorization token
authRouter.post(ENDPOINTS.ROOT, async (_req, resp): Promise<void> => {
  resp.json({ data: {} });
});
authRouter.post(AUTH_ENDPOINTS.SIGN_IN, signIn);
authRouter.post(AUTH_ENDPOINTS.SIGN_UP, signUp);

export default authRouter;
