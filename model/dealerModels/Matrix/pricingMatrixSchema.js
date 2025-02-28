import mongoose from "mongoose";

const matrixSchema = new mongoose.Schema(
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

const Matrix = mongoose.model("Matrix", matrixSchema);
export default Matrix;
