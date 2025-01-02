const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const dealerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        unique: true,
        trim: true,
        minlength: [3, "Fullname must be at least 3 characters long"],
        maxlength: [50, "Fullname must be less than 50 characters long"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [50, "Username must be less than 50 characters long"],
        validate: {
            validator: function (value) {
                // This regex checks for any spaces in the string
                return !/\s/.test(value);
            },
            message: "Username should not contain any spaces"
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Email is invalid"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        select: false,
        minlength: [8, "Password must be at least 8 characters long"],
        maxlength: [50, "Password must be less than 50 characters long"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        validate: {
            validator: (value) => {
                return value.length === 10;
            }
        }
    },
    isPasswordReset: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        trim: true,
        default: "dealer"
    },
    assignedToSuperAdmin: {
        type: String,
    },
},
    { timestamps: true })




dealerSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    console.log("updated", this.password);
    next();
});


dealerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
}

dealerSchema.methods.comparePassword = async function (superAdminPassword) {
    return await bcrypt.compare(superAdminPassword, this.password);
}

module.exports = mongoose.model('Dealer', dealerSchema);