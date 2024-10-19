import { Dialect, Options } from 'sequelize';

import { DevelopmentMode } from '../../types/types';

const configs: Record<DevelopmentMode, Options> = {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE as Dialect,
  },
  production: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE as Dialect,
  },
};

export default configs;
