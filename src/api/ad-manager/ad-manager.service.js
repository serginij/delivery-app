const { remove, create, findById } = require('../../core/modules/ad/ad.module');
const { STATUS } = require('../../core/utils/constants');

const createAd = async (req, res, next) => {
  try {
    const { files, body, user } = req;
    const { images } = files;
    const { shortText, description, tags } = body;

    if (!shortText)
      return res.status(400).json({
        status: STATUS.ERROR,
        data: null,
        message: 'Incorrect format',
      });

    const ad = await create({
      images: images?.map((image) => image.path),
      shortText,
      description,
      userId: user._id,
      tags,
    });

    res.status(200).json({ status: STATUS.OK, data: ad });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteAd = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const ad = await findById(id);

    if (ad.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ status: STATUS.ERROR, data: 'No access' });
    }

    const isOk = await remove(id);

    res.status(200).json({ status: STATUS.OK, data: isOk });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createAd,
  deleteAd,
};
