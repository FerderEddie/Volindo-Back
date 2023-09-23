module.exports = {
  advertisementValidation: async (req, res, next) => {
    try {
      // Destructuring fields from the request body
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
        socialValue,
        totalPrice,
        transactionFee,
        typeValue,
        email
      } = req.body;

      // Regular expression for validating the email format
      const emailRegex = /^\S+@\S+\.\S+$/;

      // Various validation checks for the different fields in the request body
      if (!advertisementName) {
        throw new Error("advertisement name is required");
      }
      if (!socialValue) {
        throw new Error("social network type is required");
      }
      if (!typeValue) {
        throw new Error("advertisement type is required");
      }
      if (budgetAmount == null || budgetAmount < 50 || budgetAmount > 1000) {
        throw new Error(
          "budget amount is required and must be between 50$ and 1000$"
        );
      }
      if (budgetAndDaysValue == null) {
        throw new Error("budget and days value is required");
      }
      if (!daysValue || daysValue < 1) {
        throw new Error("advertisement date is required and must be at least one day");
      }
      if (!finalFinishDate) {
        throw new Error("finish date is required");
      }
      if (!finalStartDate) {
        throw new Error("start date is required");
      }
      if (!numberOfClicks) {
        throw new Error("number of clicks is required");
      }
      if (!numberOfLeads) {
        throw new Error("number of leads is required");
      }
      if (!numberOfViews) {
        throw new Error("number of views is required");
      }
      if (totalPrice == null || totalPrice <= "0") {
        throw new Error("total price is required");
      }
      if (transactionFee == null || transactionFee <= "0") {
        throw new Error("transaction fee is required");
      }
      if (!email || !emailRegex.test(email)) {
        throw new Error("please enter a valid email address");
      }
      
      

      // Validating the date formats and the logical order of the start and finish dates
      const startDate = new Date(finalStartDate);
      const finishDate = new Date(finalFinishDate);
      if (isNaN(startDate) || isNaN(finishDate)) {
        throw new Error("Invalid date format");
      }

      // Check if the finish date is later than the start date
      if (finishDate <= startDate) {
        throw new Error("Finish Date must be later than the Start Date");
      }

      next();

    } catch (error) {
      return res.status(500).json({
        message: "error in adding advertisement validation",
        error: error.message,
      });
    }
  },
};
