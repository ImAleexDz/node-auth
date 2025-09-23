// Middleware to validate user update data
module.exports = (req, res, next) => {
  const { email, username, phone } = req.body;
  if (!email && !username && !phone) {
    return res.status(400).json({ message: 'At least one field (email, username, phone) must be provided.' });
  }
  next();
};
