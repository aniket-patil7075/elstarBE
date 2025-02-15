const catchAsyncError = require("../middleware/catchAsyncError");
const generalSettingSchema = require("../model/dealerModels/generalSettingSchema");

exports.addGeneralSetting = catchAsyncError(async (req, res, next) => {
  // console.log("general setting : ", req.body);
  const { fees, workAssignments, authorization, signature, mileage, lineItem } =
    req.body;

  const generalSettingData = {
    shopSupplies: fees?.shopSupplies || "No Cap",
    orderLevelCap: Number(fees?.orderLevelCap) || 0.0,
    serviceValue: Number(fees?.serviceValue) || 0.0,
    includeShopSuppliesOn: {
      parts: fees?.includeShopSuppliesOn?.parts ?? true,
      labor: fees?.includeShopSuppliesOn?.labor ?? true,
    },
    selectRate: fees?.selectedDropdown || "Default",
    epa: Number(fees?.epa) || 0.0,
    includeEPAOn: {
      parts: fees?.includeEPAOn?.parts ?? true,
      labor: fees?.includeEPAOn?.labor ?? true,
    },
    tax: Number(fees?.tax) || 0.0,
    laborRates: {
      parts: fees?.taxLaborRates?.parts ?? true,
      labor: fees?.taxLaborRates?.labor ?? true,
      epa: fees?.taxLaborRates?.epa ?? true,
      shopSupplies: fees?.taxLaborRates?.shopSupplies ?? true,
      subContract: fees?.taxLaborRates?.subContract ?? true,
    },
    assignmentDisplay: {
      serviceWriter: workAssignments?.serviceWriter ?? false,
      laborForTechs: workAssignments?.laborForTechs ?? false,
      partsForTechs: workAssignments?.partsForTechs ?? false,
    },
    promptForMissingAssignments:
      workAssignments?.promptForMissingAssignments ?? true,
    inspectionAuthorizationFrist:
      authorization?.inspectionAuthorizationFrist ?? true,
    inspectionAuthorizationSecond:
      authorization?.inspectionAuthorizationSecond ?? true,
    inspectionAuthorizationThird:
      authorization?.inspectionAuthorizationThird ?? true,
    signatureFirst: signature?.signatureFirst ?? true,
    signatureSecond: signature?.signatureSecond ?? true,
    mileage: mileage?.mileage ?? true,
    lineItem: lineItem?.lineItem ?? true,
  };

  // Save to database
  const generalSetting = await generalSettingSchema.create(generalSettingData);

  res.status(201).json({
    status: "success",
    data: {
      generalSetting,
    },
  });
});
