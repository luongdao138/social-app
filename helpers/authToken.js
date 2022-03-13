const jwt = require('jsonwebtoken');

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};

module.exports = { createAccessToken, createRefreshToken };
