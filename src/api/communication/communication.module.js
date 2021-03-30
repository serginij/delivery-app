const express = require('express');
const socketIO = require('socket.io');
const {
  getHistory,
  find,
  sendMessage,
  subscribe,
} = require('../../core/modules/chat/chat.module');

const { httpServer } = require('../../core/utils');

const router = express.Router();
const io = socketIO(httpServer);

// TODO: extract functions into service
io.on('connection', (socket) => {
  const { id } = socket;

  const user = socket.request?.user;

  console.log(id, user);

  const processChatMessages = (data) => {
    socket.emit('newMessage', data);
  };

  subscribe(processChatMessages);

  socket.on('getHistory', async (id) => {
    const chat = await find([id, user._id]);

    const history = await getHistory(chat._id);

    socket.emit('chatHistory', history || []);
  });

  socket.on('sendMessage', async (data) => {
    // const { receiver, text } = data;

    console.log('sendMessage', data);

    await sendMessage({ ...data, author: user._id });
  });

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

module.exports = router;
