import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../db/models/User';
import CustomError from '../errors/CustomError';

import { ERROR_MSGs } from '../types/enums';

import { createToken, hashPassword, signInChecks } from '../utils/authUtils';
import {
  handleSignInErrors,
  respWithData,
  handleSignUpErrors,
} from '../utils/respUtils';
import { delPasswordField } from '../utils/dataTransformUtils';

const sendCheckTokenResp = (_req: Request, resp: Response): void => {
  respWithData(resp, StatusCodes.OK, {});
};

const signUp = async (req: Request, resp: Response): Promise<void> => {
  const { email, password, username } = req.body;

  try {
    if (!password)
      throw new CustomError(ERROR_MSGs.NO_PASSWORD, StatusCodes.BAD_REQUEST);

    const { id, role, status } = await User.create({
      email,
      username,
      password: hashPassword(password),
    });
    const token = createToken(`${id}`);
    const data = { id, username, email, status, role };

    respWithData(resp, StatusCodes.CREATED, data, token);
  } catch (error) {
    handleSignUpErrors(resp, error);
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

    await signInChecks(user, password);
    const data = delPasswordField(user!);
    const token = createToken(`${data.id}`);

    respWithData(resp, StatusCodes.OK, data, token);
  } catch (error) {
    handleSignInErrors(resp, error);
  }
};

export { signUp, signIn, sendCheckTokenResp };
