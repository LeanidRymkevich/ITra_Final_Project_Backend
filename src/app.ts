import express from 'express';
import cors from 'cors';

import { ENDPOINTS } from './types/enums';

import { LOCALES_ROOT_FOLDER } from './constants/constants';

const app = async (port: string): Promise<void> => {
  const server = express();

  server.use(cors());

  server.use(ENDPOINTS.LOCALES, express.static(LOCALES_ROOT_FOLDER));

  server.listen(port, (): void => {
    console.log(`Server running on the port ${port}`);
  });
};

export default app;
