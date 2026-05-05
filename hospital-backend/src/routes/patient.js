import express from "express";
import { auth } from "../middleware/auth.js";
import Bed from "../models/Bed.js";
import Patient from "../models/Patient.js";

const router = express.Router();

// Admit patient
router.post("/", auth, async (req, res) => {
  const { name, age, disease, bedId } = req.body;

  const bed = await Bed.findById(bedId);
  if (!bed || bed.status !== "available") {
    return res.status(400).json({ msg: "Bed not available" });
  }

  const patient = await Patient.create({
    name,
    age,
    disease,
    assignedBed: bedId
  });

  bed.status = "occupied";
  bed.patientId = patient._id;
  await bed.save();

  res.json(patient);
});

// Discharge patient
router.put("/:id/discharge", auth, async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) return res.status(404).json({ msg: "Not found" });

  patient.status = "discharged";
  await patient.save();

  const bed = await Bed.findById(patient.assignedBed);
  if (bed) {
    bed.status = "available";
    bed.patientId = null;
    await bed.save();
  }

  res.json({ msg: "Patient discharged" });
});

// Get App patients

router.get("/", auth, async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate("assignedBed"); // optional (shows bed details)

    res.json(patients);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch patients" });
  }
});

export default router;