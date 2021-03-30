const express = require('express');

const { signup } = require('./registration.service');

const router = express.Router();

router.post('/signup', signup);

module.exports = router;
