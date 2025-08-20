const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Create a JWT token for user session
 * @param {Object} userData - User data to encode in token
 * @returns {string} JWT token
 */
const createToken = (userData) => {
  const payload = {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    picture: userData.picture,
  };

  return jwt.sign(payload, config.JWT_SECRET, { 
    expiresIn: config.JWT_EXPIRES_IN,
    algorithm: 'HS256' // Explicitly specify the algorithm
  });
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET, {
    algorithms: ['HS256'] // Explicitly specify the algorithm
  });
};

/**
 * Decode a JWT token without verification (for debugging)
 * @param {string} token - JWT token to decode
 * @returns {Object} Decoded token payload
 */
const decodeToken = (token) => {
  return jwt.decode(token, { complete: true });
};

module.exports = {
  createToken,
  verifyToken,
  decodeToken
};
