const { find, findByid } = require('../../core/modules/ad/ad.module');
const { STATUS } = require('../../core/utils/constants');

const getAds = async (req, res) => {
  const userId = req.userId || '';
  const shortText = req.shortText || '';
  const description = req.description || '';
  const tags = req.tags || [];
  try {
    const data = await find({ userId, shortText, description, tags });

    res.status(200).json({ status: STATUS.OK, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: STATUS.ERROR, error });
  }
};

const getAdById = async (req, res) => {
  const { id } = req;
  try {
    const data = await findByid(id);

    res.status(200).json({ status: STATUS.OK, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: STATUS.ERROR, error });
  }
};

module.exports = {
  getAds,
  getAdById,
};
