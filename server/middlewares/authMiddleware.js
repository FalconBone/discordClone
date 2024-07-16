const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Access token required');

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Access token required');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid access token');
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;