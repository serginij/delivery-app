const { Message, Chat } = require('./chat.model');

const find = async (users) => {
  const chat = await Chat.find({ users: { $all: users } })
    .select('-__v')
    .lean();

  return chat || null;
};

const sendMessage = async (data) => {
  const { text, ...users } = data;

  let chat = await Chat.find({ users: { $all: users } })
    .select('-__v')
    .lean();

  if (!chat?._id) {
    chat = new Chat({ users });
    await chat.save();
  }

  const { author } = data;

  const message = new Message({ author, text });
  await message.save();

  //TODO: check if new message & chat instances has correct format

  console.log(chat, message);

  await Chat.findByIdAndUpdate(chat._id, { messages: { $push: message } });

  return message;
};

const subscribe = (cb) => {
  const chatEventEmitter = Chat.watch();

  chatEventEmitter.on('change', (change) => {
    console.log(JSON.stringify(change));
    cb(JSON.stringify(change));
  });
};

const getHistory = async (chatId) => {
  const messages = await Chat.findById(chatId).select('messages').lean();

  console.log('chat.module getHistory', messages);

  return messages;
};

module.exports = { find, sendMessage, subscribe, getHistory };
