const { Ad } = require('./ad.model');

const create = async (data) => {
  const ad = new Ad(data);
  await ad.save();

  return await Ad.findById(ad._id).select('-__v -isDeleted').lean();
};

const find = async (params) => {
  const { shortText, description, userId, tags } = params;

  const userIdParam = userId ? { userId } : {};
  const tagsParam = tags.length ? { tags: { $all: tags } } : {};

  const ads = await Ad.find({
    ...userIdParam,
    ...tagsParam,
    shortText: { $regex: shortText },
    description: { $regex: description },
    isDeleted: false,
  })
    .select('-__v -isDeleted')
    .lean();

  return ads;
};

const findById = async (id) => {
  const ad = await Ad.findById(id).select('-__v -isDeleted').lean();

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
