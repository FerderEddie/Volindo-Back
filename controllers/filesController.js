const File = require("../models/File");
const path = require("path");
const fs = require("fs");

module.exports = {
  addFiles: async (req, res) => {
    try {
      const savedFiles = await Promise.all(
        req.files.map((file) => {
          let fileURL;

          // Determine file URL based on mimetype
          if (file.mimetype.startsWith("image/")) {
            fileURL = "http://localhost:4000/uploads/images/" + file.filename;
            console.log(fileURL);
          } else if (file.mimetype.startsWith("video/")) {
            fileURL = "http://localhost:4000/uploads/videos/" + file.filename;
            console.log(fileURL);
          } else {
            // You can either reject other file types or define a default path
            throw new Error("Unsupported file type");
          }

          // Create new file data and save to database
          const newFileData = {
            file: fileURL,
            name: req.body.name,
            size: req.body.size,
            type: req.body.type,
            thumbnail: file.thumbnail || "",
          };

          const newFile = new File(newFileData);
          return newFile.save();
        })
      );

      return res.status(200).json({
        success: true,
        message: "success to add file request",
        savedFiles,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error to add file request",
        error: error.message,
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const files = await File.find();

      // If no files found, throw error
      if (!files) {
        throw new Error("files not found");
      }

      return res.status(200).json({
        success: true,
        message: "success to get all files request",
        files,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error to get all files request",
        error: error.message,
      });
    }
  },

  deleteById: async (req, res) => {
    try {
      const file = await File.findById(req.params.id);

      // If file not found, send 404 response
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      // Extract file name and delete respective files from filesystem and database
      const url = new URL(file.file);
      const fileName = path.basename(url.pathname);

      // Delete image file
      if (file.type.startsWith("image/")) {
        const imagePath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          "images",
          fileName
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Delete video file and thumbnail
      else if (file.type.startsWith("video/")) {
        const videoBaseName = path.basename(fileName, path.extname(fileName)); // Get base name without extension
        const mp4FileName = `${videoBaseName}.mp4`;

        const videoPath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          "videos",
          mp4FileName
        );
        const thumbnailPath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          "videos",
          "thumbnails",
          `${mp4FileName}.jpg`
        );

        // Delete the video
        if (fs.existsSync(videoPath)) {
          fs.unlinkSync(videoPath);
        }

        // Delete the video thumbnail
        if (fs.existsSync(thumbnailPath)) {
          fs.unlinkSync(thumbnailPath);
        }
      }

      // Delete database record
      await File.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "File deleted",
        file,
      });
    } catch (error) {
      console.error("Error deleting file:", error.message);
      return res.status(500).json({
        message: "Error deleting file",
        error: error.message,
      });
    }
  },

  deleteUploadedFilesHandler: async (req, res) => {
    try {
      // Get file ids from request body
      const { ids } = req.body;

      if (!ids || ids.length === 0) {
        throw new Error("No file ids provided");
      }

      // Find and delete files with the provided ids
      const files = await File.find({ _id: { $in: ids } });

      if (files.length === 0) {
        throw new Error("No files found with provided ids");
      }

      // Delete files from filesystem
      files.forEach((file) => {
        const url = new URL(file.file);
        const fileName = path.basename(url.pathname);

        let filePath;
        let thumbnailPath;

        if (file.type.startsWith("image/")) {
          filePath = path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "images",
            fileName
          );
        } else if (file.type.startsWith("video/")) {
          const videoBaseName = path.basename(fileName, path.extname(fileName));
          const mp4FileName = `${videoBaseName}.mp4`;

          filePath = path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "videos",
            mp4FileName
          );
          thumbnailPath = path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "videos",
            "thumbnails",
            `${mp4FileName}.jpg`
          );
        }

        if (filePath && fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`File at ${filePath} deleted successfully`);
        }

        if (thumbnailPath && fs.existsSync(thumbnailPath)) {
          fs.unlinkSync(thumbnailPath);
          console.log(`Thumbnail at ${thumbnailPath} deleted successfully`);
        }
      });

      await File.deleteMany({ _id: { $in: ids } });

      return res.status(200).json({
        success: true,
        message: "Successfully deleted uploaded files",
        files,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting uploaded files",
        error: error.message,
      });
    }
  },
};
