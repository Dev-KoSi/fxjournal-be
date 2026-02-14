const express = require("express");
const authMiddleware = require('../middleware/auth-middleware');
const imageMiddleware = require("../middleware/image-middleware");
const {postLog, updateLog} = require('../controllers/post-log')

const router = express.Router();

router.post('/post/:id', authMiddleware, imageMiddleware, postLog);

router.put('/update/:id', authMiddleware, updateLog);

module.exports = router;