import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../db/models/User';

import { handleCustomErrorOnly, respWithData } from '../utils/respUtils';
import { delPasswordField } from '../utils/dataTransformUtils';

import { ID_ENDPOINTS_PARAM } from '../constants/constants';
import CustomError from '../errors/CustomError';
import { ERROR_MSGs } from '../types/enums';

const getAllUsers = async (_req: Request, resp: Response): Promise<void> => {
  const users: User[] = await User.findAll();
  respWithData(
    resp,
    StatusCodes.OK,
    users.map((user) => delPasswordField(user))
  );
};

const updateUser = async (req: Request, resp: Response): Promise<void> => {
  const id = req.params[ID_ENDPOINTS_PARAM];
  const { user, ...data } = req.body;

  try {
    const result = await User.update(data, {
      where: {
        id,
      },
    });
    if (!result[0])
      throw new CustomError(
        ERROR_MSGs.NO_USER_WITH_SUCH_ID,
        StatusCodes.NOT_FOUND
      );
    respWithData(resp, StatusCodes.OK, data);
  } catch (error) {
    handleCustomErrorOnly(resp, error);
  }
};

const deleteUser = async (_req: Request, _resp: Response): Promise<void> => {};

export { getAllUsers, updateUser, deleteUser };
