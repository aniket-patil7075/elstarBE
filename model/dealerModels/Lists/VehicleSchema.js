const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const dealerVehiclesSchema = new mongoose.Schema({
    image: {
        type: String,
        trim: true
    },
    year: {
        type: Number,
        required: [true, "Year is required"],
        trim: true,
        maxlength: [10, "Year must be less than 10 characters long"],
    },
    make: {
        type: String,
        required: [true, "Make is required"],
        trim: true,
        maxlength: [30, "Make must be less than 30 characters long"],
    },
    customerId: {
        type: String,
        // required: [true, "customerId is required"],
        trim: true,
        maxlength: [30, "customerId must be less than 30 characters long"],
    },
    model: {
        type: String,
        required: [true, "Model is required"],
        trim: true,
        maxlength: [30, "Model must be less than 30 characters long"],
    },
    subModel: {
        type: String,
        trim: true,
        maxlength: [30, "Sub Model must be less than 30 characters long"],
    },
    transmission: {
        type: String,
        trim: true,
        maxlength: [50, "Transmission must be less than 50 characters long"],
    },
    engineSize: {
        type: String,
        trim: true,
        maxlength: [20, "Engine Size must be less than 20 characters long"],
    },
    driveTrain: {
        type: String,
        trim: true,
        maxlength: [50, "Drive Train must be less than 50 characters long"],
    },
    type: {
        type: String,
        trim: true,
        maxlength: [50, "Type must be less than 50 characters long"],
    },
    mileage: {
        type: String,
        trim: true,
    },
    // mileage: {
    //     value: {
    //         type: Number,
    //         required: function() {
    //             return !this.mileage.noVehicleOdometer;
    //         }
    //     },
    //     distance: {
    //         type: String,
    //         enum: ['mi', 'km'],
    //         default: 'mi'
    //     },
    //     noVehicleOdometer: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    licencePlate: [{
        regionCode: {
            type: String,
            trim: true,
        },
        plateNumber: {
            type: String,
            trim: true,
            // validate: {
            //     validator: (value) => {
            //         return value.length === 10; // Assuming 10-character validation is needed
            //     },
            //     message: "License plate number must be exactly 10 characters long"
            // }
        }

    }],
    unit: {
        type: String,
        trim: true,
        maxLength: [20, "Unit must be less than 20 character"],

    },
    vin: {
        type: String,
        trim: true,
        maxLength: [30, "VIN must be less than 30 character"],

    },
    color: {
        type: String,
        trim: true,
        maxLength: [20, "Color must be less than 20 character"],

    },
    productionDate: {
        type: String,
        trim: true
    },
    note: {
        type: String,
        trim: true,
        maxlength: [200, "Note must be less than 200 characters long"],
    },
    tags: {
        type: String,
        trim: true,
        maxlength: [20, "Email must be less than 20 characters long"],
    },
    customers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DealerCustomer'
        },
    ]

})
// dealerVehiclesSchema.pre('save', function(next) {
//     if (this.mileage.noVehicleOdometer) {
//         this.mileage.value = null;
//     }
//     next();
// });

module.exports = mongoose.model('DealerVehicle', dealerVehiclesSchema);
