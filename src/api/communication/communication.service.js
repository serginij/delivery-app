const { STATUS } = require('../../core/utils/constants');
const {
  getHistory,
  find,
  sendMessage,
  findOrCreateChat,
} = require('../../core/modules/chat/chat.module');
const { eventEmitter } = require('../../core/utils');

const findChat = async (req, res) => {
  const { receiverId } = req.body;
  const { _id } = req.user;

  const chat = await findOrCreateChat([receiverId, _id]);

  res.status(200).json({ status: STATUS.OK, data: chat });
};

let sentMessages = {};

const onSocketConnection = (socket) => {
  try {
    let roomName = socket.handshake.query.roomName;
    const userId = socket.request.session.passport.user;

    console.log(roomName, userId);
    socket.join(roomName);

    eventEmitter.on('sendMessage', ({ chat, message }) => {
      if (chat?.users?.includes(userId) && !sentMessages[message._id]) {
        sentMessages[message._id] = true;

        socket.to(roomName).emit('newMessage', message);
        socket.emit('newMessage', message);
      }
    });

    socket.on('getHistory', async (id) => {
      const chat = await find([id, userId]);

      if (chat) {
        const history = await getHistory(chat._id);
        socket.emit('chatHistory', history || []);
      }
    });

    socket.on('sendMessage', async (message) => {
      const data = JSON.parse(message);

      await sendMessage({ ...data, author: userId });
    });

    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { findChat, onSocketConnection };
