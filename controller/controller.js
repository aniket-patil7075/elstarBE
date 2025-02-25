const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/sendToken');
const SuperAdmin = require('../model/superAdminSchema');
const Dealer = require('../model/dealerSchema')
const errorHandler = require('../utils/errorHandler');
const nodemailer = require("nodemailer");

exports.getHomepage = async (req, res, next) => {
    res.status(200).json({
        messgae: "Welcome to Homepgae"
    })
}

exports.logOut = catchAsyncError(async (req, res, next) => {
    res.clearCookie('token')
    res.status(200).send({
        message: "Logged Out Successfully !"
    })
})

exports.userSignIn = catchAsyncError(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new errorHandler("Please provide username and password", 400));
    }

    // Try to find the user in the SuperAdmin collection first
    let user = await SuperAdmin.findOne({ username }).select('+password');
    let role = 'superAdmin';

    // If the user is not found in SuperAdmin, check in the Dealer collection
    if (!user) {
        user = await Dealer.findOne({ username }).select('+password');
        role = 'dealer'; // Change role if user is found in Dealer collection
    }

    // If no user is found in either collection, return error
    if (!user) {
        return next(new errorHandler("Invalid username or password", 400));
    }

    // Check if the provided password matches the stored hashed password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return next(new errorHandler("Invalid username or password", 400));
    }

    // Generate the token and send it in the response
    sendToken(user, 200, res, role); // Pass role to sendToken
});


const sendEmail = (mailObject) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'syedadnanali8778@gmail.com',
            pass: 'ipsp opij qhks yvvp'
        }
    })

    var mailOptions = {
        from: "syedadnanali8778@gmail.com",
        to: `${mailObject.email}`,
        subject: `${mailObject.subject}`,
        html: `${mailObject.text}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent:' + info.response)
        }
    })
}




exports.sendEmailToUser = catchAsyncError(async (req, res, next) => {
    const { reciepent, subject, message } = req.body;

    const responseType = {}
    if (!reciepent) {
        return new errorHandler("Email is required to send mail", 404);
    }
    if (reciepent) {
        responseType.statusCode = 200;
        responseType.status = "success";
        responseType.message = "Email sent successfully";
        res.status(200).send(responseType)
    } else {
        responseType.statusCode = 400;
        responseType.status = "error";
        responseType.message = "Oops! There is an error while sending email.";
        res.status(400).send(responseType)
    }
    const mailOptions ={
        email: reciepent,
        subject: subject,
        text: message,
        message: "Email sent successfully"
    }
    console.log(mailOptions);
    sendEmail(mailOptions);
})

