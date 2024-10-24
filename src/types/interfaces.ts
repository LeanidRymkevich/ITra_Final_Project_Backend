import { USER_ROLES, USER_STATUS } from './enums';

interface UserModel {
  id: number;
  username: string;
  email: string;
  status: USER_STATUS;
  role: USER_ROLES;
}

interface GetAllUsersQueryParams {
  limit: number;
  offset: number;
  order: 'ASC' | 'DESC';
  orderBy: keyof UserModel;
}

export { UserModel, GetAllUsersQueryParams };
