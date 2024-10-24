import { Request } from 'express';

import User from '../db/models/User';

import { GetAllUsersQueryParams, UserModel } from '../types/interfaces';
import { SortingOrder } from '../types/types';
import {
  DEFAULT_SORTING_ORDER,
  DEFAULT_USER_SORTING_FIELD,
} from '../constants/constants';

const delPasswordField = (
  user: User
): Pick<User, 'id' | 'username' | 'email' | 'role' | 'status'> => {
  const { id, username, email, role, status } = user;
  return { id, username, email, role, status };
};

const getNumberOrZero = (param: string | string[] | undefined): number => {
  const numberRepresentation = Number(param);
  return isNaN(numberRepresentation) ? 0 : numberRepresentation;
};

const getOrder = (param: string | undefined): SortingOrder => {
  if (typeof param !== 'string') return DEFAULT_SORTING_ORDER;

  const orders: SortingOrder[] = ['ASC', 'DESC'];
  return orders.includes(param as SortingOrder)
    ? (param as SortingOrder)
    : DEFAULT_SORTING_ORDER;
};

const getUserOrderBy = (param: string | undefined): keyof UserModel => {
  if (typeof param !== 'string') return DEFAULT_USER_SORTING_FIELD;

  const keys: (keyof UserModel)[] = ['username', 'email', 'role', 'status'];
  return keys.includes(param as keyof UserModel)
    ? (param as keyof UserModel)
    : DEFAULT_USER_SORTING_FIELD;
};

const getGetAllQueryParams = (req: Request): GetAllUsersQueryParams => {
  let { limit, offset, order, orderBy } = req.query;
  return {
    limit: getNumberOrZero(limit as string),
    offset: getNumberOrZero(offset as string),
    order: getOrder(order as string),
    orderBy: getUserOrderBy(orderBy as string),
  };
};

export { delPasswordField, getGetAllQueryParams };
