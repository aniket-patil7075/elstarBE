const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const dealerCustomersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      maxlength: [70, "First Name must be less than 50 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Part Name is required"],
      trim: true,
      maxlength: [70, "Part Name must be less than 50 characters long"],
    },
    phoneNumber: [
      {
        type: {
          type: String,
          trim: true,
        },
        number: {
          type: Number,
          trim: true,
          validate: {
            validator: (value) => {
              return value.toString().length === 10;
            },
          },
        },
      },
    ],
    email: [
      {
        type: String,
        trim: true,
        maxLength: [50, "Email must be less than 30 character"],
        minLength: [10, "Email must be less than 10 character"],
      },
    ],
    preferredContactMethod: {
      type: String,
      enum: ["SMS", "Email", "Both"],
      // required: [true, "Preferred contact method is required"]
    },
    tags: {
      type: String,
      trim: true,
      maxlength: [20, "Email must be less than 20 characters long"],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [200, "Note must be less than 200 characters long"],
    },
    referralSource: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReferralSource",
      },
    ],
    company: {
      type: String,
      trim: true,
      maxLength: [20, "Company must be less than 20 characters long"],
    },
    fleet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fleet",
      },
    ],
    vehicle: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DealerVehicle",
      },
    ],
    paymentTerms: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
    customerAddress: {
      country: {
        type: String,
        trim: true,
      },
      address1: {
        type: String,
        trim: true,
        maxLength: [100, "Address must be less than 100 character long"],
      },
      address2: {
        type: String,
        trim: true,
        maxLength: [100, "Address must be less than 100 character long"],
      },
      city: {
        type: String,
        trim: true,
        maxLength: [100, "City must be less than 100 character long"],
      },
      state: {
        type: String,
        trim: true,
        maxLength: [100, "State must be less than 100 character long"],
      },
      zipCode: {
        type: String,
        trim: true,
        maxLength: [7, "Zip Code must be less than 7 character long"],
      },
    },
    remainingAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DealerCustomer", dealerCustomersSchema);
