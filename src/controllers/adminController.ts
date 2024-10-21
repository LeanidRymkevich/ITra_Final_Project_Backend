import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../db/models/User';

import { respWithData } from '../utils/respUtils';
import { delPasswordField } from '../utils/dataTransformUtils';

const getAllUsers = async (_req: Request, resp: Response): Promise<void> => {
  const users: User[] = await User.findAll();
  respWithData(
    resp,
    StatusCodes.OK,
    users.map((user) => delPasswordField(user))
  );
};

const updateUser = async (req: Request, resp: Response): Promise<void> => {
  const { user, ...data } = req.body;

  try {
    const result = await User.update(data, {
      where: {
        id: data.id,
      },
    });
    respWithData(resp, StatusCodes.OK, result);
  } catch (error) {
    // handleDBValidationErrors(resp, error);
  }
};

const deleteUser = async (_req: Request, _resp: Response): Promise<void> => {};

export { getAllUsers, updateUser, deleteUser };
