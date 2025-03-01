const mongoose = require('mongoose');

const laborMatrixSchema = new mongoose.Schema(
  {
    title: { type: String,  },
    rows: [
      {
        cost: { type: String, default: "0" },
        markup: { type: String, default: "0" },
        margin: { type: String, default: "0" },
        rowDeleteFlag: { type: Number, enum: [0, 1], default: 0 },
      },
    ],
    deleteFlag: { type: Number, enum: [0, 1], default: 0 }, 
  },
  { timestamps: true }
);

const LaborMatrix = mongoose.model("LaborMatrix", laborMatrixSchema);

export default LaborMatrix;
