import { NextFunction, Request, Response } from 'express';
import { AppError } from './appError';

export default <TFunction extends (...args: any[]) => Promise<any>>(
  fn: TFunction
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: 'fail',
          message: 'Internal Server Error 💥',
        });
      }
    }
  };
};
