import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../db/models/User';

import { ERROR_MSGs, USER_ROLES } from '../types/enums';
import { CURRENT_USER_BODY_PROP } from '../constants/constants';

import { respWithError } from '../utils/respUtils';

const adminRightsValidator = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const user: User = req.body[CURRENT_USER_BODY_PROP];

  if (user.role === USER_ROLES.ADMIN) {
    next();
    return;
  }
  respWithError(resp, StatusCodes.UNAUTHORIZED, ERROR_MSGs.NOT_ENOUGH_RIGHTS);
};

export default adminRightsValidator;
