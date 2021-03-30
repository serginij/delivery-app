const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true },
  sentAt: { type: Date, required: true, default: Date.now() },
  text: { type: String, required: true },
  readAt: { type: Date, default: '' },
});

const chatSchema = new Schema(
  {
    users: { type: [String], required: true },
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true },
);

module.exports = {
  Chat: model('chat', chatSchema),
  Message: model('message', messageSchema),
};
