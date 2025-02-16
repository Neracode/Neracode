import mongoose from 'mongoose';
import AdminToken from '../models/adminToken.js';
import process from 'process';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Check if admin token exists, if not create initial one
    const adminTokenExists = await AdminToken.findOne();
    if (!adminTokenExists && process.env.INITIAL_ADMIN_TOKEN) {
      await AdminToken.create({ token: process.env.INITIAL_ADMIN_TOKEN });
      console.log('Initial admin token created');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
