import React, { useState } from "react";

const AppointmentForm = ({ onSubmit, doctors, patients }) => {
  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ patient: "", doctor: "", date: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="patient" value={form.patient} onChange={handleChange} required>
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>

      <select name="doctor" value={form.doctor} onChange={handleChange} required>
        <option value="">Select Doctor</option>
        {doctors.map((d) => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </select>

      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
