const express = require("express");
const authMiddleware = require('../middleware/auth-middleware');
const imageMiddleware = require("../middleware/image-middleware");
const postLog = require('../controllers/post-log')

const router = express.Router();

router.post('/post/:id', authMiddleware, imageMiddleware, postLog);

module.exports = router;