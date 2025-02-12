import express from 'express';
import axios from 'axios';
import AdminToken from '../models/adminToken.js';
import FeedbackConfig from '../models/feedbackConfig.js';
import process from 'process';

const router = express.Router();

// Middleware to verify admin token
const adminAuth = async (req, res, next) => {
  try {
    const adminToken = req.headers['x-admin-token'];
    if (!adminToken) {
      return res.status(401).json({ error: 'Token admin diperlukan' });
    }

    const storedToken = await AdminToken.findOne();
    if (!storedToken) {
      return res.status(401).json({ error: 'Token admin tidak ditemukan' });
    }

    const isValid = await storedToken.compareToken(adminToken);
    if (!isValid) {
      return res.status(401).json({ error: 'Token admin tidak valid' });
    }

    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat verifikasi token' });
  }
};

// Get current configuration
router.get('/config', async (req, res) => {
  try {
    let config = await FeedbackConfig.findOne();
    
    // If no config exists, create default config
    if (!config) {
      config = await FeedbackConfig.create({
        allowedDays: [6], // Saturday
        allowedHours: { start: 15, end: 17 }
      });
    }
    
    res.json(config);
  } catch (error) {
    console.error('Error fetching config:', error);
    res.status(500).json({ error: 'Gagal mengambil konfigurasi' });
  }
});

// Update configuration (admin only)
router.put('/config', adminAuth, async (req, res) => {
  try {
    const { allowedDays, allowedHours } = req.body;
    
    let config = await FeedbackConfig.findOne();
    
    // If no config exists, create new one
    if (!config) {
      config = new FeedbackConfig();
    }
    
    // Update fields if provided
    if (allowedDays) config.allowedDays = allowedDays;
    if (allowedHours) config.allowedHours = allowedHours;
    
    // Save and return updated config
    await config.save();
    res.json(config);
  } catch (error) {
    console.error('Error updating config:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Gagal memperbarui konfigurasi' });
  }
});

// Submit feedback
router.post('/submit', async (req, res) => {
  try {
    const googleScriptURL = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptURL) {
      throw new Error('GOOGLE_SCRIPT_URL is not defined in the environment variables');
    }

    console.log('Received payload:', req.body);

    const response = await axios.post(googleScriptURL, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;
