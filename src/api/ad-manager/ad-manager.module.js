const express = require('express');

const { fileMiddleware } = require('../../core/middleware');
const { createAd, deleteAd } = require('./ad-manager.service');

const router = express.Router();

router.post(
  '/',
  fileMiddleware.fields([{ name: 'images', maxCount: 5 }]),
  createAd,
);

router.delete('/:id', deleteAd);

module.exports = router;
