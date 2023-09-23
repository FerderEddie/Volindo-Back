// Importing the necessary modules
const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

module.exports = {
    ImageMiddleware: async (req, res, next) => {
      if (!req.files || req.files.length === 0) {
        return next(); // Skip if no files are present
      }
  
      try {
        const promises = req.files.map(async (file) => {  // Mapping over all files in the request and processing them asynchronously
          const fileType = file.mimetype.split("/")[1]; // Getting the file type from the MIME type
          let outputPath = `public/uploads/images/${file.filename}`;// Defining the output path for the processed file
  
          if (fileType === "gif") {
             // If the file is a GIF, move it directly without processing
            await fs.rename(file.path, outputPath);
          } else {
            const qualityOptions = { quality: 100 };// Setting the options for image quality
  
            if (fileType === "jpeg" || fileType === "jpg") { // Handling JPEG and JPG file types
              await sharp(file.path)
                  .resize({ width: 1700 }) // Resizing the image
                  .jpeg(qualityOptions) // Setting the quality options for JPEG
                  .toFile(outputPath); // Saving the processed file

            } else if (fileType === "png") {// Handling PNG file type
              await sharp(file.path)
              .resize({ width: 1700 }) // Resizing the image
              .png(qualityOptions) // Setting the quality options for PNG
              .toFile(outputPath); // Saving the processed file
            } else {
              throw new Error("Unsupported file format"); // Throwing an error if the file type is not supported
            }
  
            // Delete the original file from the temp folder
            await fs.unlink(file.path);
          }
        });
  
        await Promise.all(promises); // Process all files concurrently
        next();
      } catch (error) {
        console.error("Error in ImageMiddleware:", error);
        next(error);
      }
    },
};
