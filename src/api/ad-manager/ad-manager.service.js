const { remove, create, findById } = require('../../core/modules/ad/ad.module');
const { STATUS } = require('../../core/utils/constants');

const createAd = async (req, res) => {
  try {
    const { files, body, user } = req;
    const { images } = files;
    const { shortText, description, tags } = body;

    const ad = await create({
      images: images.map((image) => image.path),
      shortText,
      description,
      userId: user._id,
      tags,
    });

    res.status(200).json({ status: STATUS.OK, data: ad });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: STATUS.ERROR, error });
  }
};

const deleteAd = async (req, res) => {
  const { id, user } = req;
  try {
    const ad = findById(id);

    if (ad.userId !== user._id) {
      return res.status(403).json({ status: STATUS.ERROR, data: 'No access' });
    }

    const isOk = await remove(id);

    res.status(200).json({ status: STATUS.OK, data: isOk });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: STATUS.ERROR, error });
  }
};

module.exports = {
  createAd,
  deleteAd,
};
