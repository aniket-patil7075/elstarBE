
const jwt = require("jsonwebtoken");

// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     console.log(jsonPayload);
//     return JSON.parse(jsonPayload);
// };

const sendToken = (user, statusCode, res) => {
    // Generate the JWT token
    const token = user.generateAuthToken();

    // Set cookie options
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Prevent access to the cookie via JavaScript
        secure: process.env.NODE_ENV === 'production', // Ensure it's only sent over HTTPS in production
        sameSite: 'Lax' // Helps mitigate CSRF attacks
    };

    // Extract role from user object (or token if needed)
    const role = user.role;

    // Send response with cookie and JSON data
    res.status(statusCode)
        .cookie('token', token, cookieOptions) // Set the cookie in the response
        .json({
            status: statusCode,
            role, // Send the user's role (you can extract from token or user)
            token, // Send the token back for use in the frontend
            user   // Include any necessary user information in the response
        });
};


module.exports = sendToken;