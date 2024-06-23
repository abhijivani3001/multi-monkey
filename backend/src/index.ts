import dotenv from 'dotenv';
import connectDB from './config/dbConfig';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB(); // db connection

const server = app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT} 🚀`);
});

process.on('unhandledRejection', (err: any) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
