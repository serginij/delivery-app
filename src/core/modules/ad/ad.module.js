const { Ad } = require('./ad.model');

const create = async (data) => {
  const ad = new Ad(data);
  await ad.save();

  return ad;
};

const find = async (params) => {
  const { shortText, description, userId, tags } = params;

  const userIdParam = userId ? { userId } : {};

  const ads = await Ad.find({
    ...userIdParam,
    shortText: new RegExp(shortText),
    description: new RegExp(description),
    tags: { $all: tags },
  })
    .select('-__v')
    .lean();

  return ads;
};

const findById = async (id) => {
  const ad = await Ad.findById(id).select('-__v').lean();

  return ad;
};

const remove = async (id) => {
  try {
    if (typeof id !== 'string') return false;

    await Ad.findByIdAndUpdate(id, { isDeleted: true });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { create, remove, find, findById };
