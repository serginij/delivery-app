const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  contactPhone: { type: String, default: '' },
});

module.exports = { User: model('user', userSchema) };
