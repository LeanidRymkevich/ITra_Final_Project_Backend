import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UniqueConstraintError, ValidationError } from 'sequelize';

import CustomError from '../errors/CustomError';

import { ERROR_MSGs } from '../types/enums';

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

const handleCustomError = (resp: Response, error: CustomError): void => {
  respWithError(resp, error.code, error.message);
};

const handleUniqueConstraintError = (resp: Response): void => {
  respWithError(resp, StatusCodes.BAD_REQUEST, ERROR_MSGs.EMAIL_ALREADY_IN_USE);
};

const handleValidationError = (
  resp: Response,
  error: ValidationError
): void => {
  respWithError(resp, StatusCodes.BAD_REQUEST, error.message);
};

const handleSignInErrors = (resp: Response, error: unknown): void => {
  if (error instanceof CustomError) {
    respWithError(resp, error.code, error.message);
  } else {
    throw error;
  }
};

const handleSignUpErrors = (resp: Response, error: unknown): void => {
  if (error instanceof UniqueConstraintError) {
    handleUniqueConstraintError(resp);
  } else if (error instanceof ValidationError) {
    handleValidationError(resp, error);
  } else if (error instanceof CustomError) {
    respWithError(resp, error.code, error.message);
  } else {
    throw error;
  }
};

const handleTokenValidationErrors = (resp: Response, error: unknown): void => {
  if (error instanceof CustomError) {
    handleCustomError(resp, error);
  } else {
    throw error;
  }
};

export {
  respWithError,
  respWithData,
  handleSignInErrors,
  handleSignUpErrors,
  handleTokenValidationErrors,
};
