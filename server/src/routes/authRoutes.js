const express = require('express');
const { requireAuth } = require('../middlewares/auth');
const {
  initiateGoogleLogin,
  handleGoogleCallback,
  getCurrentUser,
  logout,
  healthCheck,
  testConfig
} = require('../controllers/authController');

const router = express.Router();

// Health check endpoint
router.get('/', healthCheck);

// Test configuration endpoint
router.get('/test-config', testConfig);

// Authentication routes
router.get('/login', initiateGoogleLogin);
router.get('/callback', handleGoogleCallback);

// Protected routes (require authentication)
// router.get('/me', requireAuth, getCurrentUser);
router.post('/logout', logout);

module.exports = router;
