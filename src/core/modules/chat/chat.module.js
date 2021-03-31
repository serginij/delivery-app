const { Message, Chat } = require('./chat.model');

const find = async (users) => {
  const chat = await Chat.find({ users: { $all: users } })
    .select('-__v')
    .lean();

  return chat || null;
};

const findById = async (chatId) => {
  return await Chat.findById(chatId).select('-__v').lean();
};

const sendMessage = async (data) => {
  const { text, author, receiver } = data;
  const users = [author, receiver];

  let chat = await Chat.find({ users: { $all: users } })
    .select('-__v')
    .lean();

  if (!chat?._id) {
    console.log('chat not found');
    chat = new Chat({ users });
    await chat.save();
  }

  console.log('chat', chat);

  const message = new Message({ author, text });
  await message.save();

  await Chat.findByIdAndUpdate(chat._id, {
    $push: { messages: message._id },
  });

  return message;
};

const subscribe = (cb) => {
  const chatEventEmitter = Chat.watch();

  chatEventEmitter.on('change', async (change) => {
    const messages = change?.updateDescription?.updatedFields?.messages;
    if (change.operationType === 'update' && messages?.length) {
      const chatId = change.documentKey._id;
      const messageId = messages.pop();

      const message = await Message.findById(messageId).select('-__v').lean();
      const chat = await findById(chatId);

      if (message && chat) {
        cb(JSON.stringify({ chat, message }));
      }
      // const { messages, chat } = getHistory(chatId, true);

      //  cb(JSON.stringify({ chat, messages }));
    }
  });
};

const getHistory = async (chatId) => {
  const chat = await Chat.findById(chatId).select('-__v').lean();

  const messages = await Message.find({ _id: { $in: chat?.messages || [] } });
  console.log('chat.module getHistory', chatId, messages);

  return messages;
};

module.exports = { find, sendMessage, subscribe, getHistory };
