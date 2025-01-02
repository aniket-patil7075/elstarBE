const SuperAdmin = require('../model/superAdminSchema');
const Dealer = require('../model/dealerSchema');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/sendToken');
const dealerSchema = require('../model/dealerSchema');
const ErrorHandler = require('../utils/errorHandler');



exports.superAdminSignUp = catchAsyncError(async (req, res, next) => {
    const {
        fullname,
        username,
        email,
        password
    } = req.body;

    const superAdmin = await SuperAdmin.findOne({ username });
    const dealer = await dealerSchema.findOne({ username });

    if (!superAdmin && !dealer) {
        const superAdminSignUp = await SuperAdmin.create({
            fullname,
            username,
            email,
            password
        })
    
        sendToken(superAdminSignUp, 201, res)
    } else {
        return next(new ErrorHandler("Username is already taken", 400));
    }

})



exports.superAdminCreateDealer = catchAsyncError(async (req, res, next) => {
    const {
        fullname,
        username,
        email,
        password,
        phoneNumber
    } = req.body;

    let createdDealer


    const superAdmin = await SuperAdmin.findOne({ username });
    const dealer = await dealerSchema.findOne({ username });
    if (!superAdmin && !dealer) {
        createdDealer = await Dealer.create({
            fullname,
            username,
            email,
            password,
            phoneNumber,
            // assignedToSuperAdmin: req.user._id,
        })
    } else {
        return next(new ErrorHandler("Username is already taken", 400));
    }

    res.status(201).send({
        createdDealer,
    })
})


exports.getAllDealers = catchAsyncError(async (req, res, next) => {
    let allDealers = await Dealer.find({})

    res.status(200).json({
        status: 'success',
        allDealers
    })
})

// Controller function to update dealer details
exports.updateDealer = catchAsyncError (async (req, res, next) => {
    try {
        const dealerId = req.params.id;
        const updatedData = req.body;
        // Find dealer by ID and update it
        const updatedDealer = await Dealer.findByIdAndUpdate(dealerId, updatedData, { new: true });
        console.log('Updating dealer with data:', updatedData);
        if (!updatedDealer) {
            return next(new ErrorHandler("dealer not found bro",400));
        }
        let allDealers = await Dealer.find({})
        // return the updated dealer 
        res.status(200).json({
            success: true,
            message: 'Dealer updated successfully',
            data: {
                updatedDealer,
                allDealers,
            }
        });
    } catch (error) {
        console.error('Error updating dealer:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




