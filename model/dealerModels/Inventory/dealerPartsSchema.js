const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const dealerPartsSchema = new mongoose.Schema({
    partName: {
        type: String,
        required: [true, "Part Name is required"],
        trim: true,
        maxlength: [70, "Part Name must be less than 50 characters."],
    },
    partSerialNo: {
        type: String,
        trim: true,
        maxlength: [20, "Part Serial Number must be less than 50 characters."],
    },
    partSku: {
        type: String,
        trim: true,
        maxlength: [20, "Part SKU must be less than 50 characters."],
    },
    note: {
        type: String,
        trim: true,
        maxlength: [200, "Part note must be less than 200 characters."],
    },
    quantity: {
        type: Number,
        trim: true,
        default: 0,
        maxlength: [10, "Part note must be less than 200 characters."],
    },
    minQuantity: {
        type: Number,
        trim: true,
        default: 0,
        maxlength: [10, "Part note must be less than 200 characters."],
    },
    maxQuantity: {
        type: Number,
        trim: true,
        default: 0,
        maxlength: [10, "Part note must be less than 200 characters."],
    },
    bin: {
        type: String,
        trim: true,
        maxlength: [30, "Bin must be less than 30 characters."],
    },
    cost: {
        type: Number,
        trim: true,
        default: 0,
        maxlength: [10, "Cost must be less than 200 characters."],
    },
    retail: {
        type: Number,
        trim: true,
        default: 0,
        maxlength: [10, "Retail must be less than 10 characters."],
    },
    markUp: {
        type: String,
        trim: true,
        maxlength: [10, "Mark up must be less than 10 characters."],
    },
    margin: {
        type: String,
        trim: true,
        maxlength: [10, "Part note must be less than 200 characters."],
    },
    taxable: {
        type: Boolean,
        default: true,
    },
    displaySerialOnEstimateAndInvoice: {
        type: Boolean,
        default: true,
    },
    displayPriceAndQuantityOnEstimateAndInvoice: {
        type: Boolean,
        default: true,
    },
    displayNoteOnEstimateAndInvoice: {
        type: Boolean,
        default: true,
    },
    partUrl: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                // This regex checks for a valid URL structure (e.g., https://example.com)
                return /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(value);
            },
            message: "Please provide a valid URL, for example, https://example.com"
        },
        maxlength: [200, "Part note must be less than 200 characters."],
    },
    // pricingMatrix: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category'
    // },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DealersVendor'
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PartBrands'
    },
    deleteFlag: {  
        type: Number,
        enum: [0, 1],  
        default: 0
    },
},
{ timestamps: true })

module.exports = mongoose.model('DealerParts', dealerPartsSchema);
