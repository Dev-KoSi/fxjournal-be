const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const { updateUsername, updateBio } = require('../controllers/profile');

const router = express.Router();

router.put('/update/username/:id', authMiddleware, updateUsername);

router.put('/update/bio/:id', authMiddleware, updateBio);

module.exports = router;