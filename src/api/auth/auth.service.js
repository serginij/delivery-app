const passport = require('passport');

const { STATUS } = require('../../core/utils/constants');

const signin = async (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    req.logIn(user, () => {
      let customError = null;

      if (error) {
        customError = { error, status: STATUS.ERROR };
      }

      if (!user) {
        customError = {
          error: 'Invalid email or password',
          status: STATUS.ERROR,
        };
      }

      if (customError) {
        return res.status(401).json(customError);
      }

      res.status(200).json({ status: STATUS.OK, data: user });
    });
  })(req, res, next);
};

module.exports = {
  signin,
};
