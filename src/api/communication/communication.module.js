const express = require('express');
const socketIO = require('socket.io');

const { sessionMiddleware } = require('../../core/middleware');
const { httpServer } = require('../../core/utils');
const { findChat, onSocketConnection } = require('./communication.service');

const router = express.Router();
const io = socketIO(httpServer);

router.post('/findChat', findChat);

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
}).on('connection', onSocketConnection);

module.exports = router;
