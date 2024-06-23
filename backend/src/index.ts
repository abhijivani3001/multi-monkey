import dotenv from 'dotenv';
import connectDB from './config/dbConfig';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB(); // db connection

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT} 🚀`);
});
