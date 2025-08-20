const express = require('express');
const { requireAuth } = require('../middlewares/auth');
// const { getUserProfile, updateUserProfile } = require('../controllers/userController');

const router = express.Router();

// All user routes require authentication
router.use(requireAuth);

// User profile routes (placeholder for future implementation)
// router.get('/profile', getUserProfile);
// router.put('/profile', updateUserProfile);

// Placeholder route
router.get('/profile', (req, res) => {
  res.json({ 
    message: 'User profile endpoint - to be implemented',
    user: req.user 
  });
});

module.exports = router;
