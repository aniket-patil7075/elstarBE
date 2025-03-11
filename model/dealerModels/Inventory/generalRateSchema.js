const mongoose = require("mongoose");

const generalRateSchema = new mongoose.Schema(
  {
    rateName: { type: String, required: true, default: "Default" },
    rate: { type: Number, required: true, default: 0 },
    deleteFlag: { type: Number, enum: [0, 1], default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GeneralRate", generalRateSchema);
