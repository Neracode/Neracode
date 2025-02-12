export const feedbackConfig = {
  allowedDays: [3], // Default: Only Saturday (0 = Sunday, 6 = Saturday)
  allowedHours: {
    start: 15, // 15:00
    end: 17,   // 17:00
  }
};

// In-memory storage for config (in production, use a database)
export const currentConfig = { ...feedbackConfig };
