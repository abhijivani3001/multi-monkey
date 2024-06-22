import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL.replace(
      '<PASSWORD>',
      process.env.MONGO_PASSWORD
    );
    await mongoose.connect(mongoUrl);
    console.log('MongodDB connected successfully...');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectDB;
