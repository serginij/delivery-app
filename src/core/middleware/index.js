const notFoundMiddleware = require('./notFound');
const authMiddleware = require('./auth');
const fileMiddleware = require('./file');
const sessionMiddleware = require('./session');
const serverErrorMiddleware = require('./serverError');

module.exports = {
  notFoundMiddleware,
  authMiddleware,
  fileMiddleware,
  sessionMiddleware,
  serverErrorMiddleware,
};
