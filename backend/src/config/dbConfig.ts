import mongoose from 'mongoose';
import getEnvVar from '../utils/getEnvVar';

const connectDB = async (): Promise<void> => {
  try {
    const mongoUrl =
      getEnvVar('MONGO_URL').replace(
        /<PASSWORD>/,
        getEnvVar('MONGO_PASSWORD')
      ) ?? '';

    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected successfully...');
  } catch (error: any) {
    console.error('MongoDB connection error:', error?.message);
  }
};

export default connectDB;
