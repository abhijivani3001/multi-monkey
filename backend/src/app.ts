import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';
import scoreRouter from './routes/scoreRouter';
import { AppError } from './utils/appError';
import globalErrorHandler from './controllers/errorController';

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

app.get('/error', (_req, _res, next) => {
  next(new AppError('Something went wrong!', 400));
});

app.use('/api/users', userRouter);

app.use('/api/scores', scoreRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// it should be the last middleware to handle errors in the express app
app.use(globalErrorHandler);

export default app;
