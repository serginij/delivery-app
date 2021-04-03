const { STATUS } = require('../utils/constants');

module.exports = (req, res, next) => {
  if (
    (!req.isAuthenticated || !req.isAuthenticated()) &&
    !RegExp(/api\/auth|api\/registration|api\/ad-viewer|socket.html/).test(
      req.path,
    )
  ) {
    return res
      .status(401)
      .json({ message: 'unauthorized', status: STATUS.ERROR });
  }

  next();
};
