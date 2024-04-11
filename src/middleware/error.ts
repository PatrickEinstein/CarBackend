import { NextFunction, Request, Response } from "express";

class CustomError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

const createError = (status: number, message: string) => {
  return new CustomError(status, message);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    error: err.message,
  });
};

export { createError, errorHandler };