const notFoundMiddleware = require('./notFound');
const authMiddleware = require('./auth');
const fileMiddleware = require('./file');

module.exports = {
  notFoundMiddleware,
  authMiddleware,
  fileMiddleware,
};
