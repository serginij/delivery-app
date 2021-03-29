const { User } = require('./user.model');

const create = async (data) => {
  const user = new User(data);
  await user.save();

  return user;
};

const findByEmail = async (email) => {
  if (typeof email !== 'string') return null;

  const user = await User.findOne({ email }).select('-__v').lean();
  if (!user) return null;

  return user;
};

const findById = async (id) => {
  if (typeof id !== 'string') return null;

  const user = await User.findById(id).select('-__v').lean();
  if (!user) return null;

  return user;
};

module.exports = { create, findByEmail, findById };
