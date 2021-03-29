const multer = require('multer');
const { v4: uuid } = require('uuid');

const getPath = (fieldname) => {
  switch (fieldname) {
    default:
      return 'public/images';
  }
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, getPath(file.fieldname));
  },
  filename(req, file, cb) {
    cb(null, `${uuid()}.${file.originalname.split('.').pop()}`);
  },
});

const imageMimes = ['image/png', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  let allowedTypes = [];

  switch (file.fieldname) {
    default:
      allowedTypes = [...imageMimes];
      break;
  }

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
