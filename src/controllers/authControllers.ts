import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../db/models/User';
import {
  createToken,
  hashPassword,
  handleCreateUserErrors,
  signInChecks,
  handleSignInErrors,
} from '../utils/authUtils';
import { respWithData } from '../utils/respUtils';
import { AuthError } from '../errors/AuthError';
import { ERROR_MSGs } from '../types/enums';

const sendCheckTokenResp = (_req: Request, resp: Response): void => {
  respWithData(resp, StatusCodes.OK, {});
};

const signUp = async (req: Request, resp: Response): Promise<void> => {
  const { email, password, username } = req.body;

  try {
    if (!password)
      throw new AuthError(ERROR_MSGs.NO_PASSWORD, StatusCodes.BAD_REQUEST);

    const { id, role, status } = await User.create({
      email,
      username,
      password: hashPassword(password),
    });
    const token = createToken(`${id}`);
    const data = { id, username, email, status, role };

    respWithData(resp, StatusCodes.CREATED, data, token);
  } catch (error) {
    handleCreateUserErrors(resp, error);
  }
};

const signIn = async (req: Request, resp: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user: User | null = await User.findOne({
      where: {
        email,
      },
    });

    signInChecks(user, password);
    const { id, username, role, status } = user!;
    const data = { id, username, email, status, role };
    const token = createToken(`${id}`);

    respWithData(resp, StatusCodes.OK, data, token);
  } catch (error) {
    handleSignInErrors(resp, error);
  }
};

export { signUp, signIn, sendCheckTokenResp };
