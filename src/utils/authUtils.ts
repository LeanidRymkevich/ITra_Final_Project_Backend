import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { hashSync, compare } from 'bcryptjs';

import { ERROR_MSGs, USER_STATUS } from '../types/enums';

import User from '../db/models/User';
import { respWithError } from './respUtils';
import { AuthError } from '../errors/AuthError';

const createToken = (id: string) => {
  return sign({ id }, process.env.JWT_SECRET as string);
};

const hashPassword = (password: string): string => {
  const saltLength = 14;
  return hashSync(password, saltLength);
};

const handleCreateUserErrors = (resp: Response, error: unknown): void => {
  if (error instanceof UniqueConstraintError) {
    respWithError(
      resp,
      StatusCodes.BAD_REQUEST,
      ERROR_MSGs.EMAIL_ALREADY_IN_USE
    );
    return;
  }

  if (error instanceof ValidationError) {
    respWithError(resp, StatusCodes.BAD_REQUEST, error.message);
    return;
  }
  throw error;
};

const signInChecks = (user: User | null, password: string): void => {
  if (!user)
    throw new AuthError(ERROR_MSGs.NO_SUCH_USER, StatusCodes.NOT_FOUND);
  if (!compare(password, user.password))
    throw new AuthError(ERROR_MSGs.WRONG_PASSWORD, StatusCodes.UNAUTHORIZED);
  if (user.status === USER_STATUS.BLOCKED)
    throw new AuthError(ERROR_MSGs.USER_IS_BLOCKED, StatusCodes.UNAUTHORIZED);
};

const handleSignInErrors = (resp: Response, error: unknown): void => {
  if (error instanceof AuthError) {
    respWithError(resp, error.code, error.message);
    return;
  }

  throw error;
};

export {
  createToken,
  hashPassword,
  handleCreateUserErrors,
  signInChecks,
  handleSignInErrors,
};
