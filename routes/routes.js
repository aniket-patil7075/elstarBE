const router = require('express').Router();

// Import your necessary controller functions
const { logOut, getHomepage, userSignIn, sendEmails } = require('../controller/controller.js');
const { 
    superAdminSignUp, 
    superAdminCreateDealer, 
    superAdminSignIn, 
    getAllDealers,
    updateDealer // Add the updateDealer function
} = require('../controller/superAdminController.js');
const { isAuthenticatedUser, isAuthorizedRole } = require('../middleware/auth.js');

/**
 * @desc   Opens the homepage
 * @route  GET /api/
 * @access Public
 */
router.route('/').get(getHomepage);

/**
 * @desc   Super Admin Sign Up
 * @route  POST /api/super-admin/sign-up
 * @access Public
 */
router.route('/super-admin/sign-up').post(superAdminSignUp);

/**
 * @desc   Super Admin Sign In
 * @route  POST /api/user/sign-in
 * @access Public
 */
router.route('/user/sign-in').post(userSignIn);

/**
 * @desc   Dealer Sign Up
 * @route  POST /api/super-admin/create-dealer
 * @access Public
 */
router.route('/super-admin/create-dealer')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(superAdminCreateDealer);

/**
 * @desc   Get All Dealer
 * @route  GET /api/super-admin/get-all-dealers
 * @access Public
 */
router.route('/super-admin/get-all-dealers')
    // You can enable the authentication & authorization middleware for this
    // .get(isAuthenticatedUser, isAuthorizedRole("superAdmin"), getAllDealers);
    .get(getAllDealers);

/**
 * @desc   Update Dealer
 * @route  PUT /api/super-admin/update-dealer/:id
 * @access Private (Super Admin)
 */
router.route('/super-admin/update-dealer/:id')
    // .put(isAuthenticatedUser, isAuthorizedRole("superAdmin"), updateDealer); // This route is now added
    .put( updateDealer); // This route is now added

/**
 * @desc   Log Out
 * @route  GET /api/sign-out
 * @access Public
 */
router.route('/sign-out').get(logOut);


// /**
//  * @desc   Log Out
//  * @route  GET /api/sign-out
//  * @access Public
//  */
// router.route('/send-email').post(sendEmails);


module.exports = router;
