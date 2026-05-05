import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  disease: String,
  assignedBed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bed"
  },
  status: {
    type: String,
    enum: ["admitted", "discharged"],
    default: "admitted"
  }
});

export default mongoose.model("Patient", patientSchema);