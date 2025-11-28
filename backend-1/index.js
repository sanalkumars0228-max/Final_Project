const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const patientRoute = require("./routes/patientRoute");
const doctorRoute = require("./routes/doctorRoute");
const appointmentRoute = require("./routes/appoinmentRoute");

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/patients", patientRoute);
app.use("/doctors", doctorRoute);
app.use("/appointments", appointmentRoute);

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
