import "dotenv/config";

import app from "./app";

const DEFAULT_PORT = "3001";
const PORT = process.env.PORT || DEFAULT_PORT;

app(PORT);
