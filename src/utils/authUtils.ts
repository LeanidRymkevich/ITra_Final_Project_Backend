import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sign, verify } from 'jsonwebtoken';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { hashSync, compare } from 'bcryptjs';

import { ERROR_MSGs, USER_STATUS } from '../types/enums';

import User from '../db/models/User';
import { AuthError } from '../errors/AuthError';
import { respWithError } from './respUtils';

const createToken = (id: string) => {
  return sign({ id }, process.env.JWT_SECRET!);
};

const hashPassword = (password: string): string => {
  const saltLength = 14;
  return hashSync(password, saltLength);
};

const handleDBValidationErrors = (resp: Response, error: unknown): void => {
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
};

const handleCreateUserErrors = (resp: Response, error: unknown): void => {
  handleDBValidationErrors(resp, error);

  if (error instanceof AuthError) {
    respWithError(resp, error.code, error.message);
    return;
  }

  throw error;
};

const checkUserStatus = (user: User | null): void => {
  if (!user)
    throw new AuthError(ERROR_MSGs.NO_SUCH_USER, StatusCodes.NOT_FOUND);
  if (user.status === USER_STATUS.BLOCKED)
    throw new AuthError(ERROR_MSGs.USER_IS_BLOCKED, StatusCodes.UNAUTHORIZED);
};

const signInChecks = (user: User | null, password: string): void => {
  checkUserStatus(user);
  if (!compare(password, user!.password))
    throw new AuthError(ERROR_MSGs.WRONG_PASSWORD, StatusCodes.UNAUTHORIZED);
};

const handleSignInErrors = (resp: Response, error: unknown): void => {
  if (error instanceof AuthError) {
    respWithError(resp, error.code, error.message);
    return;
  }

  throw error;
};

const handleTokenValidationErrors = (resp: Response, error: unknown): void => {
  if (error instanceof AuthError) {
    respWithError(resp, error.code, error.message);
    return;
  }

  throw error;
};

const verifyToken = (token: string): string => {
  try {
    const { id } = verify(token, process.env.JWT_SECRET!) as { id: string };
    return id;
  } catch {
    throw new AuthError(ERROR_MSGs.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);
  }
};

export {
  createToken,
  hashPassword,
  handleCreateUserErrors,
  signInChecks,
  handleSignInErrors,
  checkUserStatus,
  handleTokenValidationErrors,
  verifyToken,
  handleDBValidationErrors,
};
