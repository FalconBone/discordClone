const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).send('User not found');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');

  const accessToken = generateAccessToken({ username: user.username });
  const refreshToken = generateRefreshToken({ username: user.username });

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
  res.json({ accessToken });
};

const token = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).send('Refresh token required');

  const user = await User.findOne({ where: { refreshToken } });
  if (!user) return res.status(403).send('Invalid refresh token');

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Invalid refresh token');

    const accessToken = generateAccessToken({ username: decoded.username });
    res.json({ accessToken });
  });
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const user = await User.findOne({ where: { refreshToken } });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie('refreshToken');
  res.sendStatus(204);
};

module.exports = {
    logout,
    token,
    login
}