const mongoose = require('mongoose');

const dealersCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Category Name is required"],
        trim: true,
        maxlength: [100, "Category Name must be less than 100 characters."]
    }
})

module.exports = mongoose.model('Category', dealersCategorySchema);
