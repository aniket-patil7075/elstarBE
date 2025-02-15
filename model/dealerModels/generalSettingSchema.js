const mongoose = require("mongoose");

const generalSettingSchema = new mongoose.Schema(
  {
    shopSupplies: {
      type: String,
      enum: ["No Cap", "Order Cap"],
      // required: true
    },
    orderLevelCap: {
      type: Number,
      default: 0.0,
    },
    serviceValue: {
      type: Number,
      default: 0.0,
    },
    includeShopSuppliesOn: {
      parts: {
        type: Boolean,
        default: true,
      },
      labor: {
        type: Boolean,
        default: true,
      },
    },
    selectRate: {
      type: String,
      default: "Default",
    },

    epa: {
      type: Number,
      default: 0.0,
    },
    includeEPAOn: {
      parts: {
        type: Boolean,
        default: true,
      },
      labor: {
        type: Boolean,
        default: true,
      },
    },

    tax: {
      type: Number,
      default: 0.0,
    },
    laborRates: {
      parts: {
        type: Boolean,
        default: true,
      },
      labor: {
        type: Boolean,
        default: true,
      },
      epa: {
        type: Boolean,
        default: true,
      },
      shopSupplies: {
        type: Boolean,
        default: true,
      },
      subContract: {
        type: Boolean,
        default: true,
      },
    },
    assignmentDisplay: {
      serviceWriter: {
        type: Boolean,
        default: false,
      },
      laborForTechs: {
        type: Boolean,
        default: false,
      },
      partsForTechs: {
        type: Boolean,
        default: false,
      },
    },
    promptForMissingAssignments: {
      type: Boolean,
      default: true,
    },

    inspectionAuthorizationFrist: {
      type: Boolean,
      default: true,
    },
    inspectionAuthorizationSecond: {
      type: Boolean,
      default: true,
    },
    inspectionAuthorizationThird: {
      type: Boolean,
      default: true,
    },
    signatureFirst: {
      type: Boolean,
      default: true,
    },
    signatureSecond: {
      type: Boolean,
      default: true,
    },
    mileage: {
      type: Boolean,
      default: true,
    },
    lineItem: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GeneralSetting", generalSettingSchema);
