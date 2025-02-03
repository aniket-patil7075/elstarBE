const catchAsyncError = require("../middleware/catchAsyncError");
const dealersCategorySchema = require("../model/dealerModels/dealersCategorySchema");
const dealersVendorSchema = require("../model/dealerModels/dealersVendorSchema");
const dealerPartsSchema = require("../model/dealerModels/Inventory/dealerPartsSchema");
const dealerTiresSchema = require("../model/dealerModels/Inventory/dealerTiresSchema");
const partsBrandSchema = require("../model/dealerModels/Inventory/partsBrandSchema");
const DealerCustomerSchema = require("../model/dealerModels/Lists/CustomerSchema");
const DealerVehicleSchema = require("../model/dealerModels/Lists/VehicleSchema");
const dealerFeesSchema = require("../model/dealerModels/Lists/FeesSchema");
const ErrorHandler = require("../utils/errorHandler");
const estimateSchema = require("../model/dealerModels/Workflow/estimateSchema");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const VehicleSchema = require("../model/dealerModels/Lists/VehicleSchema");
const { default: mongoose } = require("mongoose");
const FeesSchema = require("../model/dealerModels/Lists/FeesSchema");
const appointmentSchema = require("../model/dealerModels/appointmentSchema");
const CustomerSchema = require("../model/dealerModels/Lists/CustomerSchema");
const stripe = require('stripe')('sk_test_51QcTfE2LkEUwrBDR8lgQu5QSkf6WksOqU4iYVjn8ZHw993njjib7YYkebhdQjwCEONYbhfv3m8IeMTuY2GRTU5Ho00w3KGiRA4');
// Configure Multer to save images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/vehicles");
    // Create folder if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

exports.dealerAddNewPart = catchAsyncError(async (req, res, next) => {
  const {
    partName,
    partSerialNo,
    partSku,
    note,
    quantity,
    minQuantity,
    maxQuantity,
    bin,
    cost,
    retail,
    markUp,
    margin,
    taxable,
    displaySerialOnEstimateAndInvoice,
    displayPriceAndQuantityOnEstimateAndInvoice,
    displayNoteOnEstimateAndInvoice,
    partUrl,
    pricingMatrix,
    category,
    brand,
    vendor,
  } = req.body;
  const part = await dealerPartsSchema.create({
    partName: partName,
    partSerialNo: partSerialNo,
    partSku: partSku,
    note: note,
    quantity: quantity,
    minQuantity: minQuantity,
    maxQuantity: maxQuantity,
    bin: bin,
    cost: cost,
    retail: retail,
    markUp: markUp,
    margin: margin,
    taxable: taxable,
    displaySerialOnEstimateAndInvoice: displaySerialOnEstimateAndInvoice,
    displayPriceAndQuantityOnEstimateAndInvoice:
      displayPriceAndQuantityOnEstimateAndInvoice,
    displayNoteOnEstimateAndInvoice: displayNoteOnEstimateAndInvoice,
    partUrl: partUrl,
    pricingMatrix: pricingMatrix,
    category: category !== "" ? category : null,
    brand: brand,
    vendor: vendor,
  });
  res.status(201).send({
    status: "success",
    part,
  });
});

exports.dealerAddNewTire = catchAsyncError(async (req, res, next) => {
  let { brand, model, size, note, url, inventoryAndPrice, techSpecs } =
    req.body;
  inventoryAndPrice = inventoryAndPrice ? inventoryAndPrice : {};
  techSpecs = techSpecs ? techSpecs : {};

  // Destructuring `inventoryAndPrice` fields
  const {
    part,
    tireSku,
    bin,
    quantity,
    min,
    max,
    pricingMatrix,
    cost,
    retail,
    markup,
    margin,
    taxable,
    displaySerialOnEstimateAndInvoice,
    displayPriceAndQuantityOnEstimateAndInvoice,
    displayNoteOnEstimateAndInvoice,
  } = inventoryAndPrice;

  // Destructuring `techSpecs` fields
  const {
    category,
    construction,
    loadIndex,
    loadRange,
    outerDiameter,
    maxTirePressure,
    runFlat,
    sidewallAspect,
    sectionWidth,
    serviceType,
    speedRating,
    treadDepth,
    wheelDiameter,
    treadwear,
    traction,
    temperature,
  } = techSpecs;

  console.log(techSpecs);

  const tire = await dealerTiresSchema.create({
    brand: brand,
    model: model,
    size: size,
    note: note,
    url: url,

    // Inventory & Pricing fields
    inventoryAndPrice: {
      part: part,
      tireSku: tireSku,
      bin: bin,
      quantity: quantity,
      min: min,
      max: max,
      pricingMatrix: pricingMatrix,
      cost: cost,
      retail: retail,
      markup: markup,
      margin: margin,
      taxable: taxable,
      displaySerialOnEstimateAndInvoice: displaySerialOnEstimateAndInvoice,
      displayPriceAndQuantityOnEstimateAndInvoice:
        displayPriceAndQuantityOnEstimateAndInvoice,
      displayNoteOnEstimateAndInvoice: displayNoteOnEstimateAndInvoice,
    },

    // Tech Specs fields
    techSpecs: {
      category: category,
      construction: construction,
      loadIndex: loadIndex,
      loadRange: loadRange,
      outerDiameter: outerDiameter,
      maxTirePressure: maxTirePressure,
      runFlat: runFlat,
      sidewallAspect: sidewallAspect,
      sectionWidth: sectionWidth,
      serviceType: serviceType,
      speedRating: speedRating,
      treadDepth: treadDepth,
      wheelDiameter: wheelDiameter,
      treadwear: treadwear,
      traction: traction,
      temperature: temperature,
    },
  });
  console.log(tire);

  // Sending response
  res.status(201).json({
    status: "success",
    message: "New tire added successfully",
    data: tire,
  });
});

exports.dealerAddNewCustomer = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    customerAddress,
    zipCode,
  } = req.body;

  console.log(req.body);

  // Create a new customer using the extracted data
  const customer = await DealerCustomerSchema.create({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
    customerAddress: customerAddress,
    zipCode: zipCode,
  });

  // Send back the response
  res.status(201).json({
    status: "success",
    data: {
      customer,
    },
  });
});

exports.dealerAddNewVehicle = catchAsyncError(async (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return next(new Error("Image upload failed!"));
    }

    const {
      year,
      make,
      customerId,
      model,
      subModel,
      transmission,
      engineSize,
      driveTrain,
      type,
      mileage,
      licencePlate, 
      unit,
      vin,
      color,
      productionDate,
      note,
      tags,
    } = req.body;

    // Handle image upload
    let imageName = null;
    if (req.file) {
      imageName = req.file.filename; // Only save the image name
    }

    const vehicle = await VehicleSchema.create({
      image: imageName,
      year,
      make,
      customerId,
      model,
      subModel,
      transmission,
      engineSize,
      driveTrain,
      type,
      mileage,
      licencePlate,
      unit,
      vin,
      color,
      productionDate,
      note,
      tags,
    });

    console.log("New Vehicle : ", vehicle)
    res.status(201).json({
      status: "success",
      data: vehicle,
    });
  });
});

exports.dealerGetAllPartsByPage = catchAsyncError(async (req, res, next) => {
  const { filterData, pageIndex, pageSize, sort } = req.body; // Assumes that filter data is in req.body

  const { category, vendor, brand } = filterData;

  // Build a filter object dynamically based on the presence of filter fields
  let filterCriteria = {};
  if (category && category.length > 0) {
    filterCriteria.category = { $in: category };
  }
  if (vendor && vendor.length > 0) {
    filterCriteria.vendor = { $in: vendor };
  }
  if (brand && brand.length > 0) {
    filterCriteria.brand = { $in: brand };
  }

  // Default pagination values
  const page = pageIndex || 1;
  const limit = pageSize || 10;
  const skip = (page - 1) * limit;
  let query = {};

  // Sort option
  const sortOptions = sort ? { [sort]: 1 } : {}; // Sorting in ascending order if provided

  // Fetch total count for pagination metadata
  const totalParts = await dealerPartsSchema.countDocuments(query);

  // Fetch paginated and sorted Parts
  const allParts = await dealerPartsSchema
    .find(filterCriteria)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  console.log(allParts);

  console.log(allParts);

  res.status(200).json({
    status: "success",
    page,
    totalPages: Math.ceil(totalParts / limit),
    allParts,
  });
});

exports.dealerGetAllParts = catchAsyncError(async (req, res, next) => {
  let allParts = await dealerPartsSchema
    .find()
    .populate("brand")
    .populate("category")
    .populate("vendor");

  res.status(200).json({
    status: "success",
    allParts,
  });
});

exports.dealerGetAllTiresByPage = catchAsyncError(async (req, res, next) => {
  const { filterData, pageIndex, pageSize, sort } = req.query;

  const page = parseInt(pageIndex) || 1;
  const limit = parseInt(pageSize) || 10;
  const skip = (page - 1) * limit;
  let query = {};

  if (
    filterData?.dateOption !== "allTime" &&
    filterData?.startDate &&
    filterData?.endDate
  ) {
    const startDate = new Date(filterData.startDate);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(filterData.endDate);
    endDate.setUTCHours(23, 59, 59, 999);

    query.createdAt = { $gte: startDate, $lte: endDate };
  }

  const sortOptions = sort ? { [sort]: 1 } : {};
  const totalTires = await dealerTiresSchema.countDocuments(query);
  const totalPages = Math.max(1, Math.ceil(totalTires / limit));

  const allTires = await dealerTiresSchema
    .find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: "success",
    page,
    totalPages,
    totalTires,
    allTires,
  });
});

exports.dealerGetAllTires = catchAsyncError(async (req, res, next) => {
  // Fetching all tires without any filters
  let allTires = await dealerTiresSchema
    .find()
    .populate("inventoryAndPrice")
    .populate("techSpecs");

  console.log(allTires);

  res.status(200).json({
    status: "success",
    allTires,
  });
});

exports.dealerGetAllCustomersByPage = catchAsyncError(
  async (req, res, next) => {
    const { filterData, pageIndex, pageSize, sort } = req.body;

    // Default pagination values
    const page = pageIndex || 1;
    const limit = pageSize || 10;
    const skip = (page - 1) * limit;
    let query = {};

    // Apply date filter if dateOption is not "All"
    if (filterData.dateOption !== "All" && filterData.dateOption !== "") {
      const startDate = new Date(filterData.startDate);
      startDate.setUTCHours(0, 0, 0, 0);

      const endDate = new Date(filterData.endDate);
      endDate.setUTCHours(23, 59, 59, 999);

      query.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    // Sort option
    const sortOptions = sort ? { [sort]: 1 } : {}; // Sorting in ascending order if provided

    // Fetch total count for pagination metadata
    const totalCustomers = await DealerCustomerSchema.countDocuments(query);

    // Fetch paginated and sorted customers
    const allCustomers = await DealerCustomerSchema.find(query)
      .populate("vehicle")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      page,
      totalPages: Math.ceil(totalCustomers / limit),
      totalCustomers,
      allCustomers,
    });
  }
);

exports.dealerGetAllCustomers = catchAsyncError(async (req, res, next) => {
  const allCustomers = await DealerCustomerSchema.find().populate("vehicle");

  res.status(200).json({
    status: "success",
    allCustomers,
  });
});

exports.dealerGetAllVehiclesByPage = catchAsyncError(async (req, res, next) => {
  const { filterData, pageIndex, pageSize, sort } = req.query;

  // Default pagination values
  const page = parseInt(pageIndex) || 1;
  const limit = parseInt(pageSize) || 10;
  const skip = (page - 1) * limit;
  let query = {};

  // Apply date filter if dateOption is not "All"
  // Update your backend controller:
  if (
    filterData?.dateOption !== "allTime" &&
    filterData?.startDate &&
    filterData?.endDate
  ) {
    const startDate = new Date(filterData.startDate);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(filterData.endDate);
    endDate.setUTCHours(23, 59, 59, 999);

    query.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  // Sort option
  const sortOptions = sort ? { [sort]: 1 } : {}; // Sorting in ascending order if provided

  // Fetch total count for pagination metadata
  const totalVehicles = await DealerVehicleSchema.countDocuments(query);

  // Fetch paginated and sorted customers
  const allVehicles = await DealerVehicleSchema.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: "success",
    page,
    totalPages: Math.ceil(totalVehicles / limit),
    totalVehicles,
    allVehicles,
  });
});

exports.dealerGetAllVehicles = catchAsyncError(async (req, res, next) => {
  const { customerId } = req.query; // Assuming the customerId is passed in the query
  console.log(customerId)

  let allVehicles;

  if (customerId) {
    // If customerId is provided, find vehicles specific to that customer
    allVehicles = await DealerVehicleSchema.find({ customerId });
  } else {
    // If no customerId is provided, return all vehicles
    allVehicles = await DealerVehicleSchema.find();
  }

  res.status(200).json({
    status: "success",
    allVehicles,
  });
});


exports.dealerAddNewBrand = catchAsyncError(async (req, res, next) => {
  const { brandName } = req.body;

  const brand = await partsBrandSchema.create({
    label: brandName,
  });
  console.log(brand);

  // Send back the response
  res.status(201).json({
    status: "success",
    data: {
      brand,
    },
  });
});

exports.dealerGetAllBrands = catchAsyncError(async (req, res, next) => {
  let allBrands = await partsBrandSchema.find({});

  res.status(200).json({
    status: "success",
    allBrands,
  });
});

exports.dealerAddNewVendor = catchAsyncError(async (req, res, next) => {
  console.log(req.body);

  const vendor = await dealersVendorSchema.create(req.body);
  console.log(vendor);

  // Send back the response
  res.status(201).json({
    status: "success",
    data: {
      vendor,
    },
  });
});

exports.dealerGetAllVendors = catchAsyncError(async (req, res, next) => {
  let allVendors = await dealersVendorSchema.find({});

  res.status(200).json({
    status: "success",
    allVendors,
  });
});

exports.dealerAddNewCategory = catchAsyncError(async (req, res, next) => {
  const category = await dealersCategorySchema.create(req.body);

  // Send back the response
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.dealerGetAllCategories = catchAsyncError(async (req, res, next) => {
  let allCategories = await dealersCategorySchema.find({}, "_id categoryName");

  res.status(200).json({
    status: "success",
    allCategories,
  });
});

exports.dealerAddNewFees = catchAsyncError(async (req, res, next) => {
  console.log('Request Body:', req.body);
  const fees = await dealerFeesSchema.create(req.body);

  // Send back the response
  res.status(201).json({
    status: "success",
    data: {
      fees,
    },
  });
});

exports.dealerGetAllFees = catchAsyncError(async (req, res, next) => {
  let allFees = await dealerFeesSchema.find().populate("category");

  res.status(200).json({
    status: "success",
    allFees,
  });
});

exports.createBlankEstimate = catchAsyncError(async (req, res, next) => {
  // Create a new estimate with default/empty values
  const newEstimate = new estimateSchema({
    customer: req.body.customer || null, // Explicitly set to null if empty
    vehicle: req.body.vehicle || null,
    services: [
      {
        status: "Estimates",
        isArchived: false,
        isAuthorized: false,
        note: "",
        serviceTitle: "",
      },
    ], // Empty array for services
    comments: "",
    recommendation: "",
    grandTotal: 0,
    isAuthorized: false,
    status: "Estimates",
    // Additional fields can be set to default values here if needed
  });

  // Save the blank estimate document
  await newEstimate.save();
  console.log(newEstimate);
  // Redirect user to edit page with the new estimate's ID
  res.status(201).json({
    success: true,
    message: "New estimate created successfully",
    estimateId: newEstimate._id, // Use this ID to redirect to the edit page
    estimateOrderNo: newEstimate.orderNo, // Use this ID to redirect to the edit page
  });
  // res.status(500).json({
  //   success: false,
  //   message: 'Failed to create a new blank estimate',
  //   error: error.message,
  // });
});

exports.updateEstimate = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params; // Get the estimate ID from the request URL
    const updateData = req.body; // Get the updated data from the request body

    // Sanitize input fields
    if (updateData.vehicle === "") {
      updateData.vehicle = null;
    }
    if (updateData.customer === "") {
      updateData.customer = null;
    }

    // Update the document in MongoDB
    const updatedEstimate = await estimateSchema.findByIdAndUpdate(
      id, // The ID of the estimate to update
      { $set: updateData }, // Fields to update
      { new: true }
    );

    if (!updatedEstimate) {
      return res.status(404).json({
        success: false,
        message: "Estimate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Estimate updated successfully",
      data: updatedEstimate, // Return the updated estimate
    });
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update the estimate",
      error: error.message,
    });
  }
});

exports.getAllEstimatesByPage = catchAsyncError(async (req, res, next) => {
  const { filterData, pageIndex, pageSize, sort } = req.query;

  // Default pagination values
  const page = parseInt(pageIndex) || 1;
  const limit = parseInt(pageSize) || 10;
  const skip = (page - 1) * limit;

  const totalEstimates = await estimateSchema.countDocuments();

  const sortOptions = sort ? { [sort]: 1 } : {}; 

  const allEstimates = await estimateSchema
    .find()
    .populate({
      path: "customer",
      match: { $ne: "" }, // Only populate if not empty string
    })
    .populate({
      path: "vehicle",
      match: { $ne: "" }, // Only populate if not empty string
    })
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .catch((err) => {
      console.error("Population error:", err);
      return [];
    });

  res.status(200).json({
    status: "success",
    page,
    totalPages: Math.ceil(totalEstimates / limit),
    totalEstimates,
    allEstimates,
  });
});

exports.getEstimateById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Get the estimate ID from the request URL

  let estimate = await estimateSchema
    .findById(id)
    .populate({
      path: "customer",
      match: { $ne: "" }, // Only populate if not empty string
    })
    .populate({
      path: "vehicle",
      match: { $ne: "" }, // Only populate if not empty string
    });

  res.status(200).json({
    status: "success",
    estimate,
  });
});

exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Get the estimate ID from the request URL
  const { status } = req.body; // Get the new status from the request body

  // Validate status if needed (optional)
  const validStatuses = ["Estimates", "Dropped Off", "In Progress", "Invoices"];

  if (!validStatuses.includes(status)) {
    return next(new ErrorHandler("Invalid status value", 400));
  }

  // Update the status field of the estimate document

  if (!estimate) {
    return next(new ErrorHandler("Invalid username or password", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Status updated successfully",
    estimate,
  });
});

exports.updateEstimateDates = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Get the estimate ID from the request URL
  const { type } = req.body; // Get the new status from the request body

  if (type === 'complete') {
    const { completedDate, completedTime } = req.body; // Get the new status from the request body

    const estimate = await estimateSchema.findByIdAndUpdate(
      id,
      { completedDate, completedTime }, // Set the new status
      { new: true } // Return the updated document
    );
    res.status(200).json({
      status: "success",
      message: "Completed Date & Time updated successfully",
      estimate,
    });
  } else if (type === 'due') {
    const { dueDate, dueTime } = req.body; // Get the new status from the request body
    const estimate = await estimateSchema.findByIdAndUpdate(
      id,
      { dueDate, dueTime }, // Set the new status
      { new: true } // Return the updated document
    );
    res.status(200).json({
      status: "success",
      message: "Due Date & Time updated successfully",
      estimate,
    });
  }
});

exports.dealerGetAllEstimates = catchAsyncError(async (req, res, next) => {
  let allEstimates = await estimateSchema
    .find()
    .populate({
      path: "customer",
      match: { $ne: "" }, // Only populate if not empty string
    })
    .populate({
      path: "vehicle",
      match: { $ne: "" }, // Only populate if not empty string
    });

  res.status(200).json({
    status: "success",
    allEstimates,
  });
});

exports.authorizeEstimateServices = catchAsyncError(async (req, res, next) => {
  const { estimateId, signature, allSelectedServices } = req.body; // Extract signature from request body

  if (!signature) {
    return res.status(400).json({
      success: false,
      message: "Signature data is required",
    });
  }

  // Decode base64 string and save it as a file
  const base64Data = signature.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const fileName = `signature_${Date.now()}.png`;
  const filePath = path.join(__dirname, "../uploads/signatures", fileName);

  // try {
  // Ensure the directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Write the file to the server
  fs.writeFileSync(filePath, buffer);
  console.log(allSelectedServices);
  // Update the status field of the estimate document
  const updates = allSelectedServices.map((service) => {
    console.log(service);
    return {
      updateOne: {
        filter: { "services._id": service.serviceId },
        update: { $set: { "services.$.isAuthorized": service.isAuthorized } },
      },
    };
  });

  // Perform a bulkWrite to update all services at once
  const updatedEstimate = await mongoose.model("Estimate").bulkWrite(updates);

  const updatedEstimateStatus = await estimateSchema.findByIdAndUpdate(
    estimateId, // The ID of the estimate to update
    { $set: { status: 'In Progress' } }, // Fields to update
    { new: true }
  );

  // Respond with the saved file URL or path
  res.status(200).json({
    success: true,
    message: "Signature image saved successfully",
    url: `/uploads/signatures/${fileName}`, // Adjust if using a static server,
    updatedEstimateStatus,
  });
  // } catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     message: "Failed to save signature image",
  //   });
  // }
});

exports.recordEstimatePayment = catchAsyncError(async (req, res, next) => {
  const { estimateId,totalDue, date,remainingAmount, note,paymentMethod } = req.body;
  console.log(req.body);
  try {
    const estimate = await estimateSchema.findByIdAndUpdate(
      estimateId, 
      {
        $set: {
          status: 'Dropped Off',
          isPaymentReceived: true,
          grandTotal: remainingAmount,
          paymentDate: date,
          paymentNote: note,
          paymentMethod : paymentMethod
        }
      },
      { new: true }
    );
  
    return res.status(200).json({
      success: true,
      message: "Payment recorded successfully",
      estimate,
    });
  } catch (error) {
    console.log(error)
  }
});

exports.deletePart = async (req, res) => {
  const { id } = req.params;
  try {
      const part = await dealerPartsSchema.findByIdAndDelete(id);

      if (!part) {
          return res.status(404).json({
              message: 'part not found',
          });
      }

      return res.status(200).json({
          message: 'part deleted successfully',
          data: part,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          message: 'Error in deleting part',
          error: error.message,
      });
  }
};

exports.deleteTire = async (req, res) => {
  const { id } = req.params;
  console.log("Delete Tire Id : ",id)
  try {
      const tire = await dealerTiresSchema.findByIdAndDelete(id);

      if (!tire) {
          return res.status(404).json({
              message: 'Tire not found',
          });
      }

      return res.status(200).json({
          message: 'Tire deleted successfully',
          data: tire,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          message: 'Error in deleting Tire',
          error: error.message,
      });
  }
};

exports.deleteFee = async (req, res) => {
  const { id } = req.params;
  console.log("Delete Fee Id : ",id)
  try {
      const fee = await FeesSchema.findByIdAndDelete(id);

      if (!fee) {
          return res.status(404).json({
              message: 'Fee not found',
          });
      }

      return res.status(200).json({
          message: 'Fee deleted successfully',
          data: tire,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          message: 'Error in deleting Fee',
          error: error.message,
      });
  }
};


exports.addNewAppointment = catchAsyncError(async (req, res, next) => {
  const {
    
    customerId,    
    start,         
    end,           
    title,         
    note,          
    eventColor,    
    sendConfirmation, 
    sendReminder,  
    vehicleId,
    status  
  } = req.body;

  console.log(req.body);

  const appointment = await appointmentSchema.create({
     customerId,
     start,
     end,
     title,
    note,
    eventColor,
    sendConfirmation,
    sendReminder,
    vehicleId,
    status
  });

  // Send back a successful response with the newly created appointment
  res.status(201).json({
    status: "success",
    data: {
      appointment,
    },
  });
});

exports.dealerGetAllAppointment = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const allAppointment = await appointmentSchema.find();

  res.status(200).json({
    status: "success",
    allAppointment,
  });
});

exports.updateAppointment = catchAsyncError(async (req, res, next) => {
  const { 
    customerId, 
    start, 
    end, 
    title, 
    note, 
    eventColor, 
    sendConfirmation, 
    sendReminder, 
    vehicleId, 
    status 
  } = req.body;

  const { id } = req.params; // Extract appointment ID from the request parameters

  console.log(`Updating appointment with ID: ${id}`);
  console.log(req.body);

  // Find the appointment by ID and update it
  const appointment = await appointmentSchema.findByIdAndUpdate(
    id,
    {
      customerId,
      start,
      end,
      title,
      note,
      eventColor,
      sendConfirmation,
      sendReminder,
      vehicleId,
      status,
    },
    { new: true, runValidators: true }  
  );

  if (!appointment) {
    return res.status(404).json({
      status: "fail",
      message: "Appointment not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      appointment,
    },
  });
});

exports.stripePayment = catchAsyncError(async (req, res) => {
  console.log(req.body);
  const {amount , orderNo} = req.body;
  const mainAmount = amount*100;
  
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Order #${orderNo}`,
          },
          unit_amount: mainAmount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}`, // Fix return URL
  });


  res.json({ clientSecret: session.client_secret });
});

exports.getStripePayment = catchAsyncError(async (req, res) => {
  
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id); 
    console.log(session)
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json({
      status: session.payment_status, 
    });
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

