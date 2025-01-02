
const jwt = require('jsonwebtoken');
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const SuperAdmin = require("../model/superAdminSchema");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if(!token){
        return new errorHandler("Please login to continue", 401);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if(decodedToken.role === "superAdmin"){
        const superAdmin = await SuperAdmin.findById(decodedToken.id);
        if(!superAdmin){
            return new errorHandler("Invalid token", 401);
        }
        req.user = superAdmin;
        next();

    }
    else{
        return new errorHandler("Please login again to access the resource", 401);
    
    }
})


exports.isAuthorizedRole = (...roles) => {
    // console.log(roles);
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new errorHandler(`Role: ${req.user.role} is not authorized to access this resource`, 403)
            );
        }
        next();
    }
}
