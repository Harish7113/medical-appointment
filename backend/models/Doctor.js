const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: String,
  email: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
