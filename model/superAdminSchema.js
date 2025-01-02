const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const superAdminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
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
        minlength: [8, "Password must be at least 8 characters long"],
        maxlength: [50, "Password must be less than 50 characters long"]
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        trim: true,
        default: "superAdmin"
    },
    dealers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dealer'
    }],
},
{ timestamps: true });
    




superAdminSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    console.log("updated", this.password);
    next();
});


superAdminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
}

superAdminSchema.methods.comparePassword = async function (superAdminPassword) {
    return await bcrypt.compare(superAdminPassword, this.password);
}

module.exports = mongoose.model('SuperAdmin', superAdminSchema);