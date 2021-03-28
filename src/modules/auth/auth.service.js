const passport = require('passport');

const { STATUS } = require('../../core/utils/constants');

const passportAuthMiddleware = () => passport.authenticate('local');

const signin = async (req, res) => {
  try {
    const { user } = req;

    res.status(200).json({ status: STATUS.OK, data: user });
  } catch (error) {
    console.log(error);
    // TODO: add 400 error response
    res.status(500).json({ error, status: STATUS.ERROR });
  }
};

module.exports = {
  signin,
  passportAuthMiddleware,
};
