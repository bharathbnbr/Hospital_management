import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { connectDB } from "./src/config/db.js";

import authRoutes from "./src/routes/auth.js";
import patientRoutes from "./src/routes/patient.js";
import bedRoutes from "./src/routes/bed.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/beds", bedRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);