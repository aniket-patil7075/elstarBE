const mongoose = require('mongoose');

const dealerFeesSchema = new mongoose.Schema({
    feeName: {
        type: String,
        required: [true, "Fee Name is required"],
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    feeType: {
        type: String,
        required: [true, "Fee Type is required"],
        trim: true,
    },
    feeAmount: {
        type: Number,
        required: [true, "Amount is required"],
        trim: true,
    },
    deleteFlag: {  
        type: Number,
        enum: [0, 1],  
        default: 0
    },
})
module.exports = mongoose.model('Fees', dealerFeesSchema);
