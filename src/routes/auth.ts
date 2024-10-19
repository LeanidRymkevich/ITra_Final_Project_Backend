import { Router } from 'express';
import { AUTH_ENDPOINTS } from '../types/enums';
import User from '../db/models/User';

const authRouter: Router = Router();

authRouter.post(AUTH_ENDPOINTS.SIGN_IN, async (_req, resp): Promise<void> => {
  resp.json({ data: {} });
});

authRouter.post(AUTH_ENDPOINTS.SIGN_IN, async (req, resp): Promise<void> => {
  const user = User.create(req.body);
  resp.json({ data: user });
});

export default authRouter;
