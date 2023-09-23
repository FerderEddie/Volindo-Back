// Importing the necessary modules
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const fs = require("fs");
const File = require("../models/File");

ffmpeg.setFfmpegPath(ffmpegPath);

module.exports = {
  videoProcessingMiddleware: async (req, res, next) => {
    try {
      if (!req.files || req.files.length === 0) {
        return next(); // skip if no files uploaded
      }

      // Process each uploaded video
      const processingPromises = req.files.map(async (uploadedFile) => {
        if (uploadedFile.mimetype.startsWith("video/")) {
          const finalVideoFolder = path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "videos"
          );
          const mp4Filename = `${path.basename(
            uploadedFile.filename,
            path.extname(uploadedFile.filename)
          )}.mp4`;
          const mp4Path = path.join(finalVideoFolder, mp4Filename);

          // Transcode the video to MP4 format
          await new Promise((resolve, reject) => {
            ffmpeg(uploadedFile.path)
              .toFormat("mp4")
              .on("end", resolve)
              .on("error", (err) => {
                console.error("Error during ffmpeg transcoding:", err);
                reject(new Error("Error during video transcoding"));
              })
              .save(mp4Path);
          });

          // Extract thumbnail in the original size
          const thumbnailPath = `/uploads/videos/thumbnails/${mp4Filename}.jpg`;
          await new Promise((resolve, reject) => {
            ffmpeg(mp4Path)
              .on("end", resolve)
              .on("error", (err) => {
                console.error("Error during thumbnail extraction:", err);
                reject(new Error("Error during thumbnail extraction"));
              })
              .screenshots({
                timestamps: ["00:00:02"],
                filename: `${mp4Filename}.jpg`,
                folder: path.join(
                  __dirname,
                  "..",
                  "public",
                  "uploads",
                  "videos",
                  "thumbnails"
                ),
              });
          });

          // Delete the original temp video file
          fs.unlinkSync(uploadedFile.path);

          // Update the thumbnail in the database
          await File.findByIdAndUpdate(uploadedFile._id, {
            thumbnail: thumbnailPath,
          });

          // Add thumbnail path to file object (or any other info you wish)
          uploadedFile.thumbnail = thumbnailPath;
        }
      });

      await Promise.all(processingPromises);
      next();
    } catch (error) {
      console.error("Error processing videos:", error);
      res.status(500).send("Error processing the videos.");
    }
  },
};
