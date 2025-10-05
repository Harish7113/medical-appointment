import React, { useState, useEffect } from "react";

const AppointmentForm = ({ onSubmit, doctors, patients, editingAppointment }) => {
  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    reason: ""
  });

  useEffect(() => {
    if (editingAppointment) {
      setForm({
        patient: editingAppointment.patient._id,
        doctor: editingAppointment.doctor._id,
        date: editingAppointment.date,
        time: editingAppointment.time,
        reason: editingAppointment.reason || ""
      });
    }
  }, [editingAppointment]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);  // Sends only IDs and other fields
    setForm({ patient: "", doctor: "", date: "", time: "", reason: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="patient" value={form.patient} onChange={handleChange} required>
        <option value="">Select Patient</option>
        {patients.map(p => (
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>

      <select name="doctor" value={form.doctor} onChange={handleChange} required>
        <option value="">Select Doctor</option>
        {doctors.map(d => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </select>

      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <input type="time" name="time" value={form.time} onChange={handleChange} required />
      <input name="reason" placeholder="Reason" value={form.reason} onChange={handleChange} />

      <button type="submit">{editingAppointment ? "Update Appointment" : "Add Appointment"}</button>
    </form>
  );
};

export default AppointmentForm;
