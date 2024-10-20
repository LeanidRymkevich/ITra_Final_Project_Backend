import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import db from './db/db';

import { ENDPOINTS } from './types/enums';

import { LOCALES_ROOT_FOLDER } from './constants/constants';
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

  await db.sync();
  server.listen(port, (): void => {
    console.log(`Server running on the port ${port}`);
  });
};

export default app;
