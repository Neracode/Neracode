import AdminToken from '../models/adminToken.js';

export const adminAuth = async (req) => {
  const adminToken = req.headers['x-admin-token'];
  if (!adminToken) {
    throw new Error('Token admin diperlukan');
  }

  const storedToken = await AdminToken.findOne();
  if (!storedToken) {
    throw new Error('Token admin tidak ditemukan');
  }

  const isValid = await storedToken.compareToken(adminToken);
  if (!isValid) {
    throw new Error('Token admin tidak valid');
  }
};
