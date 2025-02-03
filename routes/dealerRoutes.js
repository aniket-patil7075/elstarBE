const { sendEmailToUser } = require('../controller/controller');
const { dealerAddNewPart, dealerAddNewCustomer, dealerGetAllParts, dealerGetAllCustomers, dealerAddNewBrand, dealerGetAllcategory, dealerAddNewVendor, dealerGetAllVendors, dealerAddNewCategory, dealerGetAllCategories, dealerGetAllBrands, dealerAddNewVehicle, dealerGetAllvehicles, dealerGetAllVehicles, dealerAddNewEstimate, dealerAddNewFees, dealerGetAllFees, createBlankEstimate, dealerGetAllPartsByPage, dealerGetAllVehiclesByPage, dealerGetAllCustomersByPage, dealerAddNewTire, dealerGetAllTires, dealerGetAllTiresByPage, updateEstimate, dealerGetAllEstimates, getEstimateById, getAllEstimatesByPage, updateOrderStatus, updateEstimateDates, authorizeEstimateServices, recordEstimatePayment, deletePart, deleteTire, deleteFee, addNewAppointment, dealerGetAllAppointment, updateAppointment, stripePayment, getStripePayment } = require('../controller/dealerController');
const router = require('./routes');

const prefix = '/elstar-local';

const dealerRoutes = require('express').Router();

/**
 * @desc   Dealer Add New Part 
 * @route  POST /dealer/add-new-part
 * @access Public
 */
router.route('/dealer/add-new-part')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerAddNewPart);


/**
* @desc   Get All Parts
* @route  POST /dealer/get-all-parts
* @access Public
*/
router.route('/dealer/get-all-parts')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .get(dealerGetAllParts);


/**
* @desc   Get All Parts
* @route  POST /dealer/get-all-parts
* @access Public
*/
router.route('/dealer/get-all-parts-pagination')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerGetAllPartsByPage);

/**
* @desc   Dealer Get All Tires by page
* @route  POST /dealer/get-all-tires-pagination
* @access Public
*/
router.route('/dealer/get-all-parts-pagination')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerGetAllPartsByPage);

/**
 * @desc   Dealer Add New Tire 
 * @route  POST /dealer/
 * @access Public
 */
router.route('/dealer/add-new-tire')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerAddNewTire);

/**
* @desc   Get All Tires
* @route  POST /dealer/get-all-tires
* @access Public
*/
router.route('/dealer/get-all-tires')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .get(dealerGetAllTires);

/**
* @desc   Dealer Get All Tires by page
* @route  POST /dealer/get-all-tires-pagination
* @access Public
*/
router.route('/dealer/get-all-tires-pagination')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerGetAllTiresByPage);

/**
* @desc   Dealer Add New Customer
* @route  POST /dealer/add-new-customer
* @access Public
*/
router.route('/dealer/add-new-customer')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerAddNewCustomer);


/**
* @desc   Dealer Get All Customers
* @route  POST /dealer/get-all-customers
* @access Public
*/
router.route('/dealer/get-all-customers-pagination')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerGetAllCustomersByPage);

/**
* @desc   Dealer Get All Customers
* @route  POST /dealer/get-all-customers
* @access Public
*/
router.route('/dealer/get-all-customers')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .get(dealerGetAllCustomers);
/**
* @desc   Dealer Add new Vehicle
* @route  POST /dealer/add-new-vehicle
* @access Public
*/

router.route('/dealer/add-new-vehicle')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerAddNewVehicle);


/**
* @desc   Dealer Get All Vehicles
* @route  POST /dealer/get-all-vehicles
* @access Public
*/
router.route('/dealer/get-all-vehicles-pagination')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerGetAllVehiclesByPage);



/**
* @desc   Dealer Get All Vehicles
* @route  POST /dealer/get-all-vehicles
* @access Public
*/
router.route('/dealer/get-all-vehicles')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .get(dealerGetAllVehicles);



/**
* @desc   Dealer Add new brand
* @route  POST /dealer/add-new-brand
* @access Public
*/
router.route('/dealer/add-new-brand')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerAddNewBrand);


/**
* @desc   Get All Brands
* @route  POST /dealer/get-all-brands
* @access Public
*/
router.route('/dealer/get-all-brands')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .get(dealerGetAllBrands);


/**
* @desc   Dealer Add new VENDOR
* @route  POST /dealer/add-new-vendor
* @access Public
*/
router.route('/dealer/add-new-vendor')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerAddNewVendor);


/**
* @desc   Get All Brands
* @route  POST /dealer/get-all-brands
* @access Public
*/
router.route('/dealer/get-all-vendors')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .get(dealerGetAllVendors);


/**
* @desc   Dealer Add new category
* @route  POST /dealer/add-new-category
* @access Public
*/
router.route('/dealer/add-new-category')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerAddNewCategory);


/**
* @desc   Get All category
* @route  POST /dealer/get-all-categories
* @access Public
*/
router.route('/dealer/get-all-categories')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .get(dealerGetAllCategories);


/**
* @desc   Dealer Add new category
* @route  POST /dealer/add-new-category
* @access Public
*/
router.route('/dealer/add-new-fee')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(dealerAddNewFees);


/**
* @desc   Get All category
* @route  POST /dealer/get-all-categories
* @access Public
*/
router.route('/dealer/get-all-fees')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .get(dealerGetAllFees);

/**
* @desc   Add New Estimate
* @route  POST /dealer/add-new-estimate
* @access Public
*/
router.route('/dealer/workflow/add-new-estimate')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(createBlankEstimate);


/**
* @desc   Add New Estimate
* @route  POST /dealer/workflow/add-new-estimate
* @access Public
*/
router.route('/dealer/workflow/update-estimate/:id')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .put(updateEstimate);


/**
* @desc   Add New Estimate
* @route  POST /dealer/workflow/add-new-estimate
* @access Public
*/
router.route('/dealer/workflow/get-estimate/:id')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .get(getEstimateById);

/**
* @desc   Add New Estimate
* @route  POST /dealer/add-new-estimate
* @access Public
*/
router.route('/dealer/workflow/all-estimates-by-page')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(getAllEstimatesByPage);


/**
* @desc   Add New Estimate
* @route  POST /dealer/add-new-estimate
* @access Public
*/
router.route('/dealer/workflow/all-estimates')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .get(dealerGetAllEstimates);

/**
* @desc   Add New Estimate
* @route  POST /dealer/add-new-estimate
* @access Public
*/
router.route('/dealer/workflow/send-estimate-mail')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(sendEmailToUser);

/**
* @desc   Save Signature Image
* @route  POST /dealer/save-signature-image
* @access Public
*/
router.route('/dealer/workflow/service-authorization')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(authorizeEstimateServices);



/**
* @desc   Add New Estimate
* @route  POST /dealer/workflow/add-new-estimate
* @access Public
*/
router.route('/dealer/workflow/update-order-status/:id')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .put(updateOrderStatus);



/**
* @desc   Add New Estimate
* @route  POST /dealer/workflow/add-new-estimate
* @access Public
*/
router.route('/dealer/workflow/update-estimate-dates/:id')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .put(updateEstimateDates);


/**
* @desc   Add New Estimate
* @route  POST /dealer/workflow/add-new-estimate
* @access Public
*/
router.route('/dealer/workflow/record-payment')
    // You can enable the authentication & authorization middleware for this
    // .post(isAuthenticatedUser, isAuthorizedRole("superAdmin"), superAdminCreateDealer);
    .post(recordEstimatePayment);


router.route('/dealer/delete-part/:id').post(deletePart);
router.route('/dealer/delete-tire/:id').post(deleteTire);
router.route('/dealer/delete-fee/:id').post(deleteFee);
router.route('/dealer/add-new-appointment').post(addNewAppointment)
router.route('/dealer/get-all-appointment').get(dealerGetAllAppointment)

router.route('/dealer/update-appointment/:id').put(updateAppointment)
router.route('/create-checkout-session').post(stripePayment)
router.route('/session-status').get(getStripePayment)

module.exports = dealerRoutes;
