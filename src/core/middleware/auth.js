const { STATUS } = require('../utils/constants');

module.exports = (req, res, next) => {
  if (
    (!req.isAuthenticated || !req.isAuthenticated()) &&
    !['/auth', '/registration'].includes(req.path)
  ) {
    // req.session.returnTo = req.originalUrl || req.url;

    return res
      .status(401)
      .json({ message: 'unauthorized', status: STATUS.ERROR });
  }

  next();
};
