const { Message, Chat } = require('./chat.model');
const { eventEmitter } = require('../../utils');

const find = async (users) => {
  const chat = await Chat.findOne({ users: { $all: users } })
    .select('-__v')
    .lean();

  return chat || null;
};

const findOrCreateChat = async (users) => {
  let chat = await find(users);

  if (!chat?._id) {
    chat = new Chat({ users });
    await chat.save();
  }

  return chat;
};

const sendMessage = async (data) => {
  const { text, author, receiver } = data;
  const users = [author, receiver];

  let chat = await findOrCreateChat(users);

  const message = new Message({ author, text });
  await message.save();

  await Chat.findByIdAndUpdate(chat._id, {
    $push: { messages: message._id },
  });

  eventEmitter.emit('sendMessage', { chat, message });

  return message;
};

const getHistory = async (chatId) => {
  const chat = await Chat.findById(chatId).select('-__v').lean();

  const messages = await Message.find({ _id: { $in: chat?.messages || [] } });

  return messages;
};

module.exports = { find, sendMessage, getHistory, findOrCreateChat };
