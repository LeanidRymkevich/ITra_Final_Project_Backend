import { UserModel } from '../types/interfaces';
import { SortingOrder } from '../types/types';

const DEFAULT_PORT = '3001';
const LOCALES_ROOT_FOLDER = 'src/locales';

const SERVER_RUNNING_MSG = 'Server running on the port';
const DB_CONNECTION_FAILURE_MSG = 'Failed to connect to db';

const ID_ENDPOINTS_PARAM = 'id';
const CURRENT_USER_BODY_PROP = 'current_user';

const DEFAULT_SORTING_ORDER: SortingOrder = 'ASC';
const DEFAULT_USER_SORTING_FIELD: keyof UserModel = 'username';

export {
  LOCALES_ROOT_FOLDER,
  DEFAULT_PORT,
  SERVER_RUNNING_MSG,
  DB_CONNECTION_FAILURE_MSG,
  ID_ENDPOINTS_PARAM,
  CURRENT_USER_BODY_PROP,
  DEFAULT_SORTING_ORDER,
  DEFAULT_USER_SORTING_FIELD,
};
