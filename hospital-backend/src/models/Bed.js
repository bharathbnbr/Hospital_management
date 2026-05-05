import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({
  bedNumber: Number,
  status: {
    type: String,
    enum: ["available", "reserved", "occupied"],
    default: "available"
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    default: null
  }
});

export default mongoose.model("Bed", bedSchema);