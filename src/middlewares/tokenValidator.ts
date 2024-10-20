import { verify } from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

import User from '../db/models/User';

import { ERROR_MSGs } from '../types/enums';
import { StatusCodes } from 'http-status-codes';

import { AuthError } from '../errors/AuthError';
import {
  checkUserStatus,
  handleTokenValidationErrors,
} from '../utils/authUtils';

const tokenValidator = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;

  try {
    if (!authorization)
      throw new AuthError(ERROR_MSGs.NO_TOKEN, StatusCodes.UNAUTHORIZED);

    // authorization pattern 'Bearer [token string without brackets]'
    const token = authorization.split(' ')[1]!;
    const { id } = verify(token, process.env.JWT_SECRET!) as { id: string };
    const user: User | null = await User.findOne({ where: { id } });

    checkUserStatus(user);
    req.body.user_id = user!.id;
    return next();
  } catch (error) {
    handleTokenValidationErrors(resp, error);
  }
};

export default tokenValidator;