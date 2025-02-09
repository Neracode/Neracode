import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import process from 'process';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/api', async (req, res) => {
  try {
    const googleScriptURL = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptURL) {
      throw new Error(
        'GOOGLE_SCRIPT_URL is not defined in the environment variables'
      );
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
