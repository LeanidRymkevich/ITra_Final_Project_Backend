import { Request, Response } from 'express';

import User from '../db/models/User';
import { respWithData } from '../utils/respUtils';
import { StatusCodes } from 'http-status-codes';
import { delPasswordField } from '../utils/dataTransformUtils';

const getAllUsers = async (_req: Request, resp: Response): Promise<void> => {
  const users: User[] = await User.findAll();
  respWithData(
    resp,
    StatusCodes.OK,
    users.map((user) => delPasswordField(user))
  );
};

export { getAllUsers };
