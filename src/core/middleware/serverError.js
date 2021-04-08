const { STATUS } = require('../utils/constants');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  return res.status(500).json({
    error: err.toString(),
    status: STATUS.ERROR,
  });
};
