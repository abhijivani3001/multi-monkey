import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';
import { AppError } from './utils/appError';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/hello', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'Success',
    data: 'hello world',
  });
});

app.use('/api/users', userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;
