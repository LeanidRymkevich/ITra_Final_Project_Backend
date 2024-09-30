import express from "express";

const app = async (port: string): Promise<void> => {
  const server = express();

  server.use("/", (_req, res) => {
    res.send("Hello World");
  });

  server.listen(port, (): void => {
    console.log(`Server running on the port ${port}`);
  });
};

export default app;
