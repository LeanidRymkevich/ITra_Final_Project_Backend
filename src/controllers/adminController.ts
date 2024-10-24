import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../db/models/User';

import { handleCustomErrorOnly, respWithData } from '../utils/respUtils';
import {
  delPasswordField,
  getGetAllQueryParams,
} from '../utils/dataTransformUtils';

import { ID_ENDPOINTS_PARAM } from '../constants/constants';
import CustomError from '../errors/CustomError';
import { ERROR_MSGs } from '../types/enums';

const getAllUsers = async (req: Request, resp: Response): Promise<void> => {
  const { limit, offset, order, orderBy } = getGetAllQueryParams(req);

  const total = await User.count();
  const users: User[] = await User.findAll({
    limit,
    offset,
    order: [[orderBy, order]],
  });
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
    respWithData(resp, StatusCodes.OK, { id });
  } catch (error) {
    handleCustomErrorOnly(resp, error);
  }
};

export { getAllUsers, updateUser, deleteUser };
