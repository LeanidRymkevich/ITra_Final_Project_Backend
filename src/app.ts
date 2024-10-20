import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import db from './db/db';

import { ENDPOINTS } from './types/enums';
import {
  LOCALES_ROOT_FOLDER,
  SERVER_RUNNING_MSG,
  DB_CONNECTION_FAILURE_MSG,
} from './constants/constants';

import authRouter from './routes/auth';
import errorHandler from './middlewares/errorHandler';

const app = async (port: string): Promise<void> => {
  const server = express();

  // middlewares
  server.use(express.json());
  server.use(cors());

  // endpoints
  server.use(ENDPOINTS.AUTH, authRouter);
  server.use(ENDPOINTS.LOCALES, express.static(LOCALES_ROOT_FOLDER));

  // error in routes handling
  server.use(errorHandler);

  try {
    await db.sync();
    server.listen(port, (): void => {
      console.log(`${SERVER_RUNNING_MSG} ${port}`);
    });
  } catch (error) {
    console.log(DB_CONNECTION_FAILURE_MSG, error);
  }
};

export default app;
