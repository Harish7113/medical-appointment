import Appointment from "../models/Appointment.js";

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name")
      .populate("doctor", "name");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create appointment
export const createAppointment = async (req, res) => {
  const { patient, doctor, date, time, reason } = req.body;

  if (!patient || !doctor || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newAppointment = new Appointment({ patient, doctor, date, time, reason });
    await newAppointment.save();
    const saved = await newAppointment.populate("patient", "name").populate("doctor", "name");
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update appointment
export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { patient, doctor, date, time, reason } = req.body;

  try {
    const updated = await Appointment.findByIdAndUpdate(
      id,
      { patient, doctor, date, time, reason },
      { new: true }
    )
      .populate("patient", "name")
      .populate("doctor", "name");

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json(req.params.id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
