const { Ad } = require('./ad.model');

const create = async (data) => {
  try {
    const ad = new Ad(data);
    await ad.save();

    return ad;
  } catch (err) {
    return err;
  }
};

const find = async (params) => {
  try {
    const { shortText, description, userId, tags } = params;

    const ads = await Ad.find({
      userId,
      shortText: new RegExp(shortText),
      description: new RegExp(description),
      tags: { $all: tags },
    })
      .select('-__v')
      .lean();

    return ads;
  } catch (err) {
    return err;
  }
};

const findByid = async (id) => {
  try {
    const ad = await Ad.findById(id).select('-__v').lean();

    return ad;
  } catch (err) {
    return err;
  }
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

module.exports = { create, remove, find, findByid };
