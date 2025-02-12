import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Admin token schema or table
const adminTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash the token before saving
adminTokenSchema.pre('save', async function(next) {
  if (!this.isModified('token')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.token = await bcrypt.hash(this.token, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare token
adminTokenSchema.methods.compareToken = async function(candidateToken) {
  return bcrypt.compare(candidateToken, this.token);
};

const AdminToken = mongoose.model('AdminToken', adminTokenSchema);

export default AdminToken;
