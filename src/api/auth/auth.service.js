const passport = require('passport');

const { STATUS } = require('../../core/utils/constants');

const passportAuthMiddleware = async (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error) {
      req.customError = { error, status: STATUS.ERROR };
    }

    if (!user) {
      req.customError = {
        error: 'Invalid email or password',
        status: STATUS.ERROR,
      };
    }

    next();
  })(req, res, next);
};

const signin = async (req, res) => {
  const customError = req?.customError;

  if (customError) {
    return res.status(401).json(customError);
  }

  const user = req?.user;

  res.status(200).json({ status: STATUS.OK, data: user });
};

module.exports = {
  signin,
  passportAuthMiddleware,
};
