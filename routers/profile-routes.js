const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const {deleteUser, updateProfile } = require('../controllers/profile');

const router = express.Router();

router.put('/update/profile/:id', authMiddleware, updateProfile);

router.delete('/del/user/:id', authMiddleware, deleteUser);

module.exports = router;