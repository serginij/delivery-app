const { encryptPassword } = require('../../core/utils');
const { User } = require('../../core/modules/user/user.model');
const { STATUS } = require('../../core/utils/constants');

const signup = async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const encryptedPassword = await encryptPassword(password);

    const user = new User({ ...userData, password: encryptedPassword });
    await user.save();

    res.status(200).json({ status: STATUS.OK, data: user });
  } catch (error) {
    console.log(error);
    // TODO: add 400 error response
    res.status(500).json({ error, status: STATUS.ERROR });
  }
};

module.exports = {
  signup,
};
