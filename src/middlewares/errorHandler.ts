import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message,
  });
};

export default errorHandler;
