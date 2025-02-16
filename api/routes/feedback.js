import pkg from 'microrouter';
const { get, post, put } = pkg;
import { json, send } from 'micro';
import axios from 'axios';
import FeedbackConfig from '../models/feedbackConfig.js';
import { adminAuth } from '../middleware/auth.js';

// Error handler wrapper
const handleErrors = (fn) => async (req, res) => {
  try {
    const result = await fn(req, res);
    return send(res, 200, result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return send(res, statusCode, { error: error.message });
  }
};

// Route handlers
const getConfig = async (req, res) => {
  try {
    let config = await FeedbackConfig.findOne();

    if (!config) {
      config = await FeedbackConfig.create({
        allowedDays: [6],
        allowedHours: { start: 15, end: 17 },
      });
    }

    return config;
  } catch (error) {
    throw new Error('Gagal mengambil konfigurasi');
  }
};

const updateConfig = async (req, res) => {
  try {
    await adminAuth(req);
    const body = await json(req);
    const { allowedDays, allowedHours } = body;

    let config = await FeedbackConfig.findOne();
    if (!config) {
      config = new FeedbackConfig();
    }

    if (allowedDays) config.allowedDays = allowedDays;
    if (allowedHours) config.allowedHours = allowedHours;

    await config.save();
    return config;
  } catch (error) {
    throw new Error(error.message);
  }
};

const submitFeedback = async (req, res) => {
  try {
    const body = await json(req);
    const googleScriptURL = process.env.GOOGLE_SCRIPT_URL;

    if (!googleScriptURL) {
      throw new Error('GOOGLE_SCRIPT_URL is not defined');
    }

    const response = await axios.post(googleScriptURL, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

// Define routes
const feedbackRouter = [
  get('/api/config', handleErrors(getConfig)),
  put('/api/config', handleErrors(updateConfig)),
  post('/api/submit', handleErrors(submitFeedback)),
];

export default feedbackRouter;
