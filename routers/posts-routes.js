const express = require("express");
const authMiddleware = require('../middleware/auth-middleware');
const imageMiddleware = require("../middleware/image-middleware");
const {postLog, updateLog} = require('../controllers/post-log')

const router = express.Router();

router.post('/post/log/:id', authMiddleware, imageMiddleware, postLog);

router.put('/update/caption/:id', authMiddleware, updateLog);

module.exports = router;