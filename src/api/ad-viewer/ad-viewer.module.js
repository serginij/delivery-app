const express = require('express');

const { getAds, getAdById } = require('./ad-viewer.service');

const router = express.Router();

router.get('/', getAds);

router.get('/:id', getAdById);

module.exports = router;
