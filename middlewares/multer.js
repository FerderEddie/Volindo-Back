// Importing the multer package
const multer = require("multer");

// File filter function to restrict uploaded file types
const fileFilter = (req, file, cb) => {
  // Allowing only specific file types (jpeg, png, gif, mp4, avi) to be uploaded
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/avi"
  ) {
    cb(null, true); // If file type is valid, proceed with upload
  } else {
    cb(null, false); // If file type is invalid, reject the upload
  }
};

// Setting up multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Separating storage destination based on file type (image or video), here both stored in the same folder
    if (file.mimetype.startsWith("image/")) {
      cb(null, "public/uploads/temp");
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, "public/uploads/temp");
    }
  },
  filename: (req, file, cb) => {
    // Configuring the naming convention for uploaded files to include a timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with the defined file filter and storage configuration
const upload = multer({
  fileFilter,
  storage,
});

// Exporting the multer upload as a middleware function allowing up to 10 files to be uploaded in a single request
module.exports.uploadWithMulter = upload.array("files", 10);
