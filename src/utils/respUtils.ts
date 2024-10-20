import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const respWithError = (
  resp: Response,
  code: StatusCodes,
  errorMsg: string
): void => {
  resp.status(code).json({ error: errorMsg });
};

const respWithData = (
  resp: Response,
  code: StatusCodes,
  data: unknown,
  token?: string
): void => {
  const payload: Record<string, unknown> = { data };
  if (token) payload.token = token;

  resp.status(code).json(payload);
};

export { respWithError, respWithData };
