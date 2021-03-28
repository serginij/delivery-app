const express = require('express');

const { signin, passportAuthMiddleware } = require('./auth.service');

const router = express.Router();

router.post('/signin', passportAuthMiddleware, signin);

module.exports = router;
