const { User } = require('./user.model');

const create = async (data) => {
  try {
    const user = new User(data);
    await user.save();

    return user;
  } catch (err) {
    return err;
  }
};

const findByEmail = async (email) => {
  try {
    if (typeof email !== 'string') return null;

    const user = await User.findOne({ email }).select('-__v').lean();

    if (!user) return null;

    return user;
  } catch (err) {
    return err;
  }
};

module.exports = { create, findByEmail };
