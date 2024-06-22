import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB(); // db connection

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT} 🚀`);
});
