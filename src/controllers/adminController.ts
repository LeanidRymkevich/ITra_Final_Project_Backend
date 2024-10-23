import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../db/models/User';

import { handleCustomErrorOnly, respWithData } from '../utils/respUtils';
import { delPasswordField } from '../utils/dataTransformUtils';

import { ID_ENDPOINTS_PARAM } from '../constants/constants';
import CustomError from '../errors/CustomError';
import { ERROR_MSGs } from '../types/enums';

const getAllUsers = async (req: Request, resp: Response): Promise<void> => {
  let { limit: reqLimit, offset: reqOffset } = req.query;
  const limit = reqLimit ? +reqLimit : 0;
  const offset = reqOffset ? +reqOffset : 0;

  const total = await User.count();
  const users: User[] = await User.findAll({ limit, offset });
  respWithData(resp, StatusCodes.OK, {
    users: users.map((user) => delPasswordField(user)),
    total,
  });
};

const updateUser = async (req: Request, resp: Response): Promise<void> => {
  const id = req.params[ID_ENDPOINTS_PARAM];
  const { current_user, ...data } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user)
      throw new CustomError(
        ERROR_MSGs.NO_USER_WITH_SUCH_ID,
        StatusCodes.NOT_FOUND
      );

    user.set({ ...data });
    await user.save();
    respWithData(resp, StatusCodes.OK, delPasswordField(user));
  } catch (error) {
    handleCustomErrorOnly(resp, error);
  }
};

const deleteUser = async (req: Request, resp: Response): Promise<void> => {
  const id = req.params[ID_ENDPOINTS_PARAM];

  try {
    const user = await User.findByPk(id);

    if (!user)
      throw new CustomError(
        ERROR_MSGs.NO_USER_WITH_SUCH_ID,
        StatusCodes.NOT_FOUND
      );

    await user.destroy();
    respWithData(resp, StatusCodes.NO_CONTENT, {});
  } catch (error) {
    handleCustomErrorOnly(resp, error);
  }
};

export { getAllUsers, updateUser, deleteUser };
