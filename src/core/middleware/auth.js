const { STATUS } = require('../utils/constants');

module.exports = (req, res, next) => {
  if (
    (!req.isAuthenticated || !req.isAuthenticated()) &&
    !['/api/auth/signin', '/api/registration/signup'].includes(req.path)
  ) {
    return res
      .status(401)
      .json({ message: 'unauthorized', status: STATUS.ERROR });
  }

  next();
};
