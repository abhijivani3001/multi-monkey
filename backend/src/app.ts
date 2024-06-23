import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/hello', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: 'hello world',
  });
});

app.use('/api/users', userRouter);

export default app;
