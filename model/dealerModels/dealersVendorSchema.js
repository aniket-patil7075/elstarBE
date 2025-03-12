const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const dealersVendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: [true, "Vendor Name is required"],
        trim: true,
        maxlength: [70, "Vendor Name must be less than 50 characters."],
    },
    vendorUrl: {
        type: String,
        trim: true,
        maxlength: [50, "Vendor URL must be less than 50 characters."],
    },
    vendorAccountNumber: {
        type: String,
        trim: true,
        maxlength: [20, "Vendor Account Numbert must be less than 50 characters."],
    },
    vendorCountry: {
        type: String,
        trim: true,
        maxlength: [200, "Vendor country must be less than 200 characters."],
    },
    vendorAddress1: {
        type: String,
        trim: true,
        maxlength: [200, "Vendor address 1 must be less than 200 characters."],
    },
    vendorAddress2: {
        type: String,
        trim: true,
        maxlength: [200, "Vendor address 2 must be less than 200 characters."],
    },
    vendorCity: {
        type: String,
        trim: true,
        maxlength: [200, "Vendor note must be less than 200 characters."],
    },
    vendorState: {
        type: String,
        trim: true,
        maxlength: [30, "Vendor state must be less than 30 characters."],
    },
    vendorZipCode: {
        type: Number,
        trim: true,
        maxlength: [200, "Vendor zip code must be less than 200 characters."],
    },
    vendorContactPerson: {
        firstName: {
            type: String,
            trim: true,
            maxlength: [20, "First Name must be less than 10 characters."],
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: [20, "First Name must be less than 10 characters."],
        },
        contactType: {
            type: String,
            trim: true,
            maxlength: [20, "First Name must be less than 10 characters."],
        },
        contactNumber: {
            type: Number,
            trim: true,
            maxlength: [10, "Contact number must be less than 10 characters."],
        },
        email: {
            type: String,
            trim: true,
            maxlength: [50, "Email must be less than 50 characters."],
        }
    },
    deleteFlag: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
})

module.exports = mongoose.model('DealersVendor', dealersVendorSchema);
