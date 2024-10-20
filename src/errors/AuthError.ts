import { StatusCodes } from 'http-status-codes';

export class AuthError extends Error {
  public readonly code: StatusCodes;
  constructor(msg: string, code: StatusCodes) {
    super(msg);
    this.code = code;
  }
}
