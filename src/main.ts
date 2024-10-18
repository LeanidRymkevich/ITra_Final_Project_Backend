import 'dotenv/config';

import app from './app';

import { DEFAULT_PORT } from './constants/constants';

const PORT = process.env.PORT || DEFAULT_PORT;

app(PORT);
