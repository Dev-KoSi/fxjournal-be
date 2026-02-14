const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const { updateUsername } = require('../controllers/profile');

const router = express.Router();

router.put('/update/username/:id', authMiddleware, updateUsername);

module.exports = router;