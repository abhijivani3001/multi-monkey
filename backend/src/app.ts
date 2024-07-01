import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';
import { AppError } from './utils/appError';
import { PlainResponse } from './interfaces/response/plain.response';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/hello', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello World!',
  });
});

app.get('/error', (req, res, next) => {
  next(new AppError('Something went wrong', 400));
});

app.use('/api/users', userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// it should be the last middleware to handle errors in the express app
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'An unknown error occurred';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  const response: PlainResponse = {
    success: false,
    message,
  };

  res.status(statusCode).json(response);
});

export default app;
