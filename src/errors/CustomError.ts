import { StatusCodes } from 'http-status-codes';

export default class CustomError extends Error {
  public readonly code: StatusCodes;
  constructor(msg: string, code: StatusCodes) {
    super(msg);
    this.code = code;
  }
}
