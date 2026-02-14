const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const { updateUsername, updateBio, deleteUser } = require('../controllers/profile');

const router = express.Router();

router.put('/update/username/:id', authMiddleware, updateUsername);

router.put('/update/bio/:id', authMiddleware, updateBio);

router.delete('/del/user/:id', authMiddleware, deleteUser);

module.exports = router;