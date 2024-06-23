import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoUrl =
      process.env.MONGO_URL?.replace(
        /<PASSWORD>/,
        process.env.MONGO_PASSWORD ?? ''
      ) ?? '';

    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected successfully...');
  } catch (error: any) {
    console.error('MongoDB connection error:', error?.message);
  }
};

export default connectDB;
