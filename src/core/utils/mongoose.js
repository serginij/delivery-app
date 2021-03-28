const mongoose = require('mongoose');

const DB_PASS = process.env.DB_PASS || 'qwerty';
const DB_NAME = process.env.DB_NAME || 'library';
const DB_USER = process.env.DB_USER || 'user';
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.hvmwr.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const connectToDb = () =>
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = { connectToDb };
