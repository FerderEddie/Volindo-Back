// Import Router and controllers
const router = require("express").Router();

const {
  addFiles,
  getAll,
  deleteById,
  deleteUploadedFilesHandler,
} = require("../controllers/filesController");

// Import middlewares
const { uploadWithMulter } = require("../middlewares/multer");
const { handleFileUpload } = require("../middlewares/handleFileUpload");

// Define routes
router.post("/addFiles", uploadWithMulter, handleFileUpload, addFiles); // Add files route
router.get("/get", getAll); // Get all files route
router.delete("/delete/:id", deleteById); // Delete file by ID route
router.delete("/deleteUploadedFiles", deleteUploadedFilesHandler); // delete all uploaded files

// Export router
module.exports = router;
