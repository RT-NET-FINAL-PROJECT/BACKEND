const ImageKit = require("imagekit");
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if ( file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ fileFilter: fileFilter });

module.exports = upload;