const express = require('express');

const { signin, passportAuthMiddleware } = require('./ad-viewer.service');

const router = express.Router();

router.post('/signin', passportAuthMiddleware, signin);

module.exports = router;
