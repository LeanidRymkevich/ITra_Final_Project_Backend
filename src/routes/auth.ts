import { Router } from 'express';
import { AUTH_ENDPOINTS } from '../types/enums';
import User from '../db/models/User';
import { StatusCodes } from 'http-status-codes';
import { UniqueConstraintError, ValidationError } from 'sequelize';

const authRouter: Router = Router();

authRouter.post(AUTH_ENDPOINTS.SIGN_IN, async (_req, _resp): Promise<void> => {
  return Promise.reject(new Error('Error during sign_in'));
});

authRouter.post(AUTH_ENDPOINTS.SIGN_UP, async (req, resp): Promise<void> => {
  try {
    const user = await User.create(req.body);
    resp.status(StatusCodes.OK).json({ data: user });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      resp
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'A user with such an email already exists' });
      return;
    }

    if (error instanceof ValidationError) {
      resp.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
      return;
    }
    throw error;
  }
});

export default authRouter;
