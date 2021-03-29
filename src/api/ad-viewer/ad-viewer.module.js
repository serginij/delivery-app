const express = require('express');

const { getAds, getAdByid } = require('./ad-viewer.service');

const router = express.Router();

router.get('/', getAds);

router.get('/:id', getAdByid);

module.exports = router;
