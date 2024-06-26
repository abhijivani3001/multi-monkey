import { NextFunction, Request, Response } from 'express';

export default <TFunction extends (...args: any[]) => Promise<any>>(
  fn: TFunction
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
