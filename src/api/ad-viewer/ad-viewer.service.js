const { find, findById } = require('../../core/modules/ad/ad.module');
const { STATUS } = require('../../core/utils/constants');

const getAds = async (req, res, next) => {
  const userId = req.userId || '';
  const shortText = req.shortText || '';
  const description = req.description || '';
  const tags = req.tags || [];
  try {
    const data = await find({ userId, shortText, description, tags });

    res.status(200).json({ status: STATUS.OK, data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAdById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await findById(id);

    if (!data) {
      return res
        .status(404)
        .json({ status: STATUS.ERROR, message: 'Ad not found' });
    }

    res.status(200).json({ status: STATUS.OK, data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAds,
  getAdById,
};
