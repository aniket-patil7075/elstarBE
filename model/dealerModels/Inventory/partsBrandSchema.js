const mongoose = require('mongoose');

const partsBrandSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, "Brand Name is required"],
        trim: true,
        maxlength: [100, "Brand Name must be less than 100 characters."]
    }
},
{ timestamps: true })

module.exports = mongoose.model('PartBrands', partsBrandSchema);
