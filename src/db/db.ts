import { Sequelize } from 'sequelize-typescript';
import { Options } from 'sequelize';

import configs from './config/config';

import { DevelopmentMode } from '../types/types';

const mode: DevelopmentMode =
  (process.env.NODE_ENV as DevelopmentMode) || 'development';
const config: Options = configs[mode];
const db = new Sequelize(config);

// db.addModels([Admin]);

export default db;
