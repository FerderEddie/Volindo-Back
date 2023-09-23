// Import necessary modules and middleware
const Advertisement = require("../models/Advertisement");
const { mailerMiddleware } = require("../middlewares/mailer");


module.exports = {
  // Endpoint to add a new advertisement
  addAdvertisement: async (req, res) => {
    try {
      // Destructure the properties from the request body
      const {
        advertisementName,
        budgetAmount,
        budgetAndDaysValue,
        daysValue,
        finalStartDate,
        finalFinishDate,
        numberOfClicks,
        numberOfLeads,
        numberOfViews,
        previewTextValue,
        socialValue,
        totalPrice,
        transactionFee,
        typeValue,
        uploadedFiles,
        email,
      } = req.body;

      // Create a new Advertisement instance with the provided values
      const newAdvertisement = new Advertisement({
        advertisementName,
        budgetAmount,
        budgetAndDaysValue,
        daysValue,
        finalStartDate,
        finalFinishDate,
        numberOfClicks,
        numberOfLeads,
        numberOfViews,
        previewTextValue: previewTextValue || "",
        socialValue,
        totalPrice,
        transactionFee,
        typeValue,
        uploadedFiles: uploadedFiles || [],
        email,
      });

      // Save the new advertisement to the database
      await newAdvertisement.save();

      // Get the ID of the newly created advertisement
      req.body.advertisementId = newAdvertisement._id;

      mailerMiddleware(req, res, () => {
        res.status(200).json({
          success: true,
          message: "Advertisement created successfully !",
          newAdvertisement,
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: "error to add advertisement request",
        error: error.message,
      });
    }
  },

  // Endpoint to retrieve all advertisements
  getAllAdvertisements: async (req, res) => {
    try {
      // Fetch all advertisements from the database
      const advertisements = await Advertisement.find();

      // If no advertisements are found, throw an error
      if (!advertisements) {
        throw new Error("no advertisements");
      }

      return res.status(200).json({
        success: true,
        message: "success to get all advertisements request",
        advertisements,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error to get all advertisements request",
        error: error.message,
      });
    }
  },

  // Endpoint to delete an advertisement by its ID
  deleteAdvertisementById: async (req, res) => {
    try {
      // Find and delete the advertisement with the specified ID from the database
      const advertisement = await Advertisement.findByIdAndDelete(
        req.params.id
      );

      // If no advertisement is found, throw an error
      if (!advertisement) {
        throw new Error("no advertisement by this id");
      }

      return res.status(200).json({
        success: true,
        message: "success to delete advertisement by id request",
        advertisement,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error to delete advertisement request",
        error: error.message,
      });
    }
  },
};
