const express = require('express');
const socketIO = require('socket.io');

const {
  getHistory,
  find,
  sendMessage,
  subscribe,
} = require('../../core/modules/chat/chat.module');
const { sessionMiddleware } = require('../../core/middleware');
const { httpServer } = require('../../core/utils');

const router = express.Router();
const io = socketIO(httpServer);

// TODO: extract functions into service

io.use((socket, next) => {
  // Wrap the express middleware
  sessionMiddleware(socket.request, {}, next);
}).on('connection', (socket) => {
  try {
    const { id } = socket;

    const userId = socket.request.session.passport.user;

    console.log(id, userId);

    const processChatMessages = (data) => {
      const { chat, message } = JSON.parse(data);
      console.log(data, chat?.users?.includes(userId));
      if (chat?.users?.includes(userId)) {
        // TODO: add roles
        socket.emit('newMessage', message);
      }
    };

    subscribe(processChatMessages);

    socket.on('getHistory', async (id) => {
      const chat = await find([id, userId]);

      console.log('getHistory socket chat', chat);
      if (chat.length === 1) {
        const history = await getHistory(chat[0]._id);
        socket.emit('chatHistory', history || []);
      }
    });

    socket.on('sendMessage', async (message) => {
      // const { receiver, text } = data;
      const data = JSON.parse(message);
      console.log('sendMessage', data);

      await sendMessage({ ...data, author: userId });
    });

    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`);
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
