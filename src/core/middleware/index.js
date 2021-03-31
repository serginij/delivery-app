const notFoundMiddleware = require('./notFound');
const authMiddleware = require('./auth');
const fileMiddleware = require('./file');
const sessionMiddleware = require('./session');

module.exports = {
  notFoundMiddleware,
  authMiddleware,
  fileMiddleware,
  sessionMiddleware,
};
