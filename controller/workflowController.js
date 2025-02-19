const ErrorHandler = require('../utils/errorHandler');

exports.dealerAddNewBrand = catchAsyncError(async (req, res, next) => {
    const {
        brandName
    } = req.body;


    const brand = await partsBrandSchema.create({
        label: brandName
    })
    console.log(brand);

    // Send back the response
    res.status(201).json({
        status: 'success',
        data: {
            brand
        }
    });

})
