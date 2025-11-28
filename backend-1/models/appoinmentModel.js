const mongoose = require("mongoose");

const appoinmentSchema = new mongoose.Schema({
  name: String,
  doctor: String,
  appoinment_date: String
});

module.exports = mongoose.model("appoinment", appoinmentSchema);
