import express from "express";
import Bed from "../models/Bed.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get all beds
router.get("/", auth, async (req, res) => {
  const beds = await Bed.find().populate("patientId");
  res.json(beds);
});

// Create beds (init)
router.post("/create", async (req, res) => {
  const { count } = req.body;

  const beds = [];
  for (let i = 1; i <= count; i++) {
    beds.push({ bedNumber: i });
  }

  await Bed.insertMany(beds);
  res.json({ msg: "Beds created" });
});

export default router;