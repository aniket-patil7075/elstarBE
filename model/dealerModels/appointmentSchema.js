const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DealerCustomer', 
        required: [true, "Customer is required"]
    },
    start: {
        type: Date,
        required: [true, "Start time is required"]
    },
    end: {
        type: Date,
        required: [true, "End time is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, "Title must be less than 100 characters"]
    },
    note: {
        type: String,
        trim: true,
        maxlength: [200, "Note must be less than 200 characters"]
    },
    eventColor: {
        type: String,
        enum: ['blue', 'green', 'red', 'yellow', 'purple', 'orange'], 
        required: [true, "Event color is required"]
    },
    sendConfirmation: {
        type: Boolean,
        default: false
    },
    sendReminder: {
        type: Boolean,
        default: false
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DealerVehicle', 
        required: [true, "Vehicle is required"]
    },
    status: {
        type : String,
        trim: true,
        default: "shifted"
    }
}, {
    timestamps: true 
    
});

module.exports = mongoose.model('Appointment', appointmentSchema);
