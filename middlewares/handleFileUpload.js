// Importing middleware functions for processing video and image files
const { videoProcessingMiddleware } = require("./videoMiddleware");
const { ImageMiddleware } = require('./sharpMiddleware')

module.exports = {
  handleFileUpload: async (req, res, next) => {
    try {
      let fileType;

      // Checking if files are uploaded and determining the file type (image or video) from the MIME type
      if (req.files && req.files.length > 0) {
        fileType = req.files[0].mimetype.split("/")[0];
      } else {
        throw new Error("No files uploaded");
      }

      // Handle image files
      if (fileType === "image") {
            // Process the image
            ImageMiddleware(req, res, (err) => {
              if (err) {
                // If there's an error during image processing, handle it
                throw new Error("Error processing the image");
              } else {
                // If the image processing was successful, proceed to the next middleware
                next();
              }
            });
      }
      // Handle video files
      else if (fileType === "video") {
        // Process the video
        videoProcessingMiddleware(req, res, (err) => {
          if (err) {
            // If there's an error during video processing, handle it
            throw new Error("Error processing the video");
          } else {
            // If the video processing was successful, proceed to the next middleware
            next();
          }
        });
      }
      // Throw an error for unsupported file types
      else {
        throw new Error("Unsupported file type");
      }
    } catch (err) {
      next(err);
    }
  },
};
