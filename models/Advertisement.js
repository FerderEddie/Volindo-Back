const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const advertisementSchema = new Schema(
  {
    advertisementName: {
      type: String,
      required: true,
      trim: true,
    },
    budgetAmount: {
      type: Number,
      required: true,
      min: 50,
      max: 1000,
    },
    budgetAndDaysValue: {
      type: String,
      required: true,
    },
    daysValue: {
      type: String,
      default: 0,
      min: 1,
      required: true,
    },
    finalStartDate: {
      type: String,
      required: true,
    },
    finalFinishDate: {
      type: String,
      required: true,
    },
    numberOfClicks: {
      type: String,
      required: true,
    },
    numberOfLeads: {
      type: String,
      required: true,
    },
    numberOfViews: {
      type: String,
      required: true,
    },
    previewTextValue: {
      type: String,
      default: "",
    },
    socialValue: {
      type: String,
      default: "",
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    transactionFee: {
      type: String,
      required: true,
    },
    typeValue: {
      type: String,
      default: "",
      required: true,
    },
    email: {
      type: String,
      required: true,
      default: "",
      trim: true,
    },
    uploadedFiles: [
      {
        id: {
          type: String,
        },
        file: {
          type: String,
        },
        name: {
          type: String,
        },
        size: {
          type: Number,
        },
        type: {
          type: String,
        },
        thumbnail: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("advertisements", advertisementSchema);
