const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  department:String,
  phone:Number
});

module.exports = mongoose.model("Doctor", doctorSchema);
