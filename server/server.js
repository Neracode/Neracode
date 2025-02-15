import { send, json } from 'micro';
import cors from 'micro-cors';
import axios from 'axios';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

// Resolve __dirname and load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Setup CORS to allow requests from your development and production URLs
const corsHandler = cors({
  origin: '*',
  allowMethods: ['POST']
});

// Define the handler function
const handler = async (req, res) => {
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return send(res, 200);
  }
  
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, `Method ${req.method} Not Allowed`);
  }
  
  try {
    // Parse JSON payload from the request
    const body = await json(req);
    const googleScriptURL = process.env.GOOGLE_SCRIPT_URL;
    
    if (!googleScriptURL) {
      throw new Error('GOOGLE_SCRIPT_URL is not defined in the environment variables');
    }
    
    console.log('Received payload:', body);
    
    // Forward the request to your Google Script URL
    const response = await axios.post(googleScriptURL, body, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    // Return the response data as JSON
    return send(res, 200, response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    return send(res, 500, { error: 'Failed to fetch data' });
  }
};

// Export the function wrapped with the CORS handler
export default corsHandler(handler);
