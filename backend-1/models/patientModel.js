const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  
  name: String,
  age: Number,
  gender:String,
  status:{
    type:String,
    default:'pending'
  },
  phone:Number
});

module.exports = mongoose.model("Patient", patientSchema);
