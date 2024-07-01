import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

interface CastError extends Error {
  path: string;
  value: string;
}

interface DuplicateFieldsError extends Error {
  message: string;
}

interface ValidationError extends Error {
  errors: { [key: string]: { message: string } };
}

interface JWTError extends Error {}

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  code?: number;
  message: string;
  errors?: { [key: string]: { message: string } };
  path?: string;
  value?: string;
  name: string;
}

const handleCastErrorDB = (err: CastError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: DuplicateFieldsError) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)?.[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err: CustomError, req: Request, res: Response) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }

  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
};

const sendErrorProd = (err: CustomError, req: Request, res: Response) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      success: false,
      message: 'Something went very wrong!',
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: `Something went wrong! ${err.message}`,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(err.statusCode || 500).json({
    success: false,
    message: 'Something went wrong! Please try again later.',
  });
};

export default (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError')
      error = handleCastErrorDB(error as CastError);
    if (error.code === 11000)
      error = handleDuplicateFieldsDB(error as DuplicateFieldsError);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error as ValidationError);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
