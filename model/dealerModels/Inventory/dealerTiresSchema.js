const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const dealerTiresSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, "Brand is required"],
        trim: true,
        maxlength: [30, "Brand must be less than 30 characters."],
    },
    model: {
        type: Number,
        trim: true,
    },
    size: {
        type: String,
        trim: true,
        maxlength: [20, "Size must be less than 20 characters."],
    },
    note: {
        type: String,
        trim: true,
        maxlength: [200, "Note must be less than 200 characters."],
    },
    url: {
        type: String,
        trim: true,
        maxlength: [50, "URL must be less than 50 characters."],
    },
    inventoryAndPrice: {
        part: {
            type: String,
            trim: true,
            maxlength: [10, "Part # must be less than 10 characters."],
        },
        tireSku: {
            type: String,
            trim: true,
            maxlength: [10, "SKU must be less than 10 characters."],
        },
        bin: {
            type: String,
            trim: true,
            maxlength: [30, "Bin must be less than 30 characters."],
        },
        quantity: {
            type: Number,
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 0,
        },
        pricingMatrix: {
            type: String,
            trim: true,
        },
        cost: {
            type: Number,
            default: 0,
        },
        retail: {
            type: Number,
            default: 0,
        },
        markup: {
            type: Number,
            default: 0,
        },
        margin: {
            type: Number,
            default: 0,
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
    },
    techSpecs: {
        category: {
            type: String,
            trim: true,
            maxlength: [50, "Category must be less than 50 characters."],
        },
        construction: {
            type: String,
            trim: true,
            maxlength: [50, "Construction must be less than 50 characters."],
        },
        loadIndex: {
            type: Number,
        },
        loadRange: {
            type: String,
            trim: true,
            maxlength: [10, "Load Range must be less than 10 characters."],
        },
        outerDiameter: {
            type: Number,
        },
        maxTirePressure: {
            type: Number,
        },
        runFlat: {
            type: Boolean,
            default: false,
        },
        sidewallAspect: {
            type: String,
            trim: true,
            maxlength: [10, "Sidewall Aspect must be less than 10 characters."],
        },
        sectionWidth: {
            type: Number,
        },
        serviceType: {
            type: String,
            trim: true,
            maxlength: [20, "Service Type must be less than 20 characters."],
        },
        speedRating: {
            type: String,
            trim: true,
            maxlength: [5, "Speed Rating must be less than 5 characters."],
        },
        treadDepth: {
            type: Number,
        },
        wheelDiameter: {
            type: Number,
        },
        treadwear: {
            type: Number,
        },
        traction: {
            type: String,
            trim: true,
            maxlength: [10, "Traction must be less than 10 characters."],
        },
        temperature: {
            type: String,
            trim: true,
            maxlength: [10, "Temperature must be less than 10 characters."],
        },
        
    },
    deleteFlag: {  
        type: Number,
        enum: [0, 1],  
        default: 0
    },
}, { timestamps: true });

module.exports = mongoose.model('DealerTires', dealerTiresSchema);
