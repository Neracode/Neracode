export const adminAuth = (req, res, next) => {
  const adminToken = req.headers['x-admin-token'];
  
  if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Akses ditolak. Token admin tidak valid.' });
  }
  
  next();
};
