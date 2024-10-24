import { Response, Request, NextFunction } from 'express';

import User from '../db/models/User';

import { ERROR_MSGs } from '../types/enums';
import { StatusCodes } from 'http-status-codes';
import { CURRENT_USER_BODY_PROP } from '../constants/constants';

import CustomError from '../errors/CustomError';

import { checkUserStatus, verifyToken } from '../utils/authUtils';
import { handleCustomErrorOnly } from '../utils/respUtils';

const tokenValidator = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;

  try {
    if (!authorization)
      throw new CustomError(ERROR_MSGs.NO_TOKEN, StatusCodes.UNAUTHORIZED);

    // authorization pattern 'Bearer [token string without brackets]'
    const token = authorization.split(' ')[1]!;
    const id = verifyToken(token);
    const user: User | null = await User.findByPk(id);

    checkUserStatus(user);
    req.body[CURRENT_USER_BODY_PROP] = user;
    return next();
  } catch (error) {
    handleCustomErrorOnly(resp, error);
  }
};

export default tokenValidator;
