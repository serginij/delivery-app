const express = require('express');

const { signin } = require('./auth.service');

const router = express.Router();

router.post('/signin', signin);

module.exports = router;
