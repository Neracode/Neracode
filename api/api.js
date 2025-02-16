import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { router } from 'microrouter';
import cors from 'micro-cors';
import feedbackRouter from './routes/feedback.js';

// Get the parent directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parentDir = dirname(__dirname);

// Load .env from parent directory
dotenv.config({ path: join(parentDir, '.env') });

// Configure CORS
const corsMiddleware = cors({
  origin: '*',
  allowMethods: ['*'],
  allowHeaders: ['*'],
});

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Combine all routes
const handler = router(...feedbackRouter);

// Export the handler with CORS
export default corsMiddleware(handler);
