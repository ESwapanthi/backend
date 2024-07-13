const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/usercontroller');
const { protect } = require('../middleware/authmiddleware');

// User Profile Route
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
