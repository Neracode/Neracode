import mongoose from 'mongoose';

const feedbackConfigSchema = new mongoose.Schema({
  allowedDays: {
    type: [Number],
    required: true,
    validate: {
      validator: function(days) {
        return days.every(day => day >= 0 && day <= 6);
      },
      message: 'Hari harus berupa angka antara 0 dan 6'
    }
  },
  allowedHours: {
    start: {
      type: Number,
      required: true,
      min: [0, 'Jam mulai minimal 0'],
      max: [23, 'Jam mulai maksimal 23']
    },
    end: {
      type: Number,
      required: true,
      min: [0, 'Jam selesai minimal 0'],
      max: [23, 'Jam selesai maksimal 23']
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure end time is after start time
feedbackConfigSchema.pre('save', function(next) {
  if (this.allowedHours.end <= this.allowedHours.start) {
    next(new Error('Jam selesai harus lebih besar dari jam mulai'));
  }
  next();
});

const FeedbackConfig = mongoose.model('FeedbackConfig', feedbackConfigSchema);

export default FeedbackConfig;
