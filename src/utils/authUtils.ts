import { StatusCodes } from 'http-status-codes';
import { sign, verify } from 'jsonwebtoken';
import { hashSync, compare } from 'bcryptjs';

import { ERROR_MSGs, USER_STATUS } from '../types/enums';

import User from '../db/models/User';
import CustomError from '../errors/CustomError';

const createToken = (id: string) => {
  return sign({ id }, process.env.JWT_SECRET!);
};

const hashPassword = (password: string): string => {
  const saltLength = 14;
  return hashSync(password, saltLength);
};

const checkUserStatus = (user: User | null): void => {
  if (!user)
    throw new CustomError(ERROR_MSGs.NO_SUCH_USER, StatusCodes.UNAUTHORIZED);
  if (user.status === USER_STATUS.BLOCKED)
    throw new CustomError(ERROR_MSGs.USER_IS_BLOCKED, StatusCodes.UNAUTHORIZED);
};

const signInChecks = async (
  user: User | null,
  password: string
): Promise<void> => {
  checkUserStatus(user);
  if (!(await compare(password, user!.password)))
    throw new CustomError(ERROR_MSGs.WRONG_PASSWORD, StatusCodes.UNAUTHORIZED);
};

const verifyToken = (token: string): string => {
  try {
    const { id } = verify(token, process.env.JWT_SECRET!) as { id: string };
    return id;
  } catch {
    throw new CustomError(ERROR_MSGs.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);
  }
};

export {
  createToken,
  hashPassword,
  signInChecks,
  checkUserStatus,
  verifyToken,
};
