// Importing Router class and necessary middleware and controllers
const router = require("express").Router();

const {
  addAdvertisement,
  getAllAdvertisements,
  deleteAdvertisementById,
} = require("../controllers/advertisementsController");

const {
  advertisementValidation,
} = require("../middlewares/advertisementValidation");

// Routes definition
router.post("/addAdvertisement", advertisementValidation, addAdvertisement); // Adding an advertisement with validation
router.get("/get", getAllAdvertisements); // Getting all advertisements
router.delete("/delete/:id", deleteAdvertisementById); // Deleting an advertisement by ID

// Exporting the router
module.exports = router;
