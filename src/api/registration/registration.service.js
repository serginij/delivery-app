const { encryptPassword } = require('../../core/utils');
const { create } = require('../../core/modules/user/user.module');
const { STATUS } = require('../../core/utils/constants');

const signup = async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const encryptedPassword = await encryptPassword(password);

    const user = await create({ ...userData, passwordHash: encryptedPassword });

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
