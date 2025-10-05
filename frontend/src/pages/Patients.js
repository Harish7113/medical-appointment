import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, addPatient, deletePatient, updatePatient } from "../features/patientsSlice";

const Patients = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.list);
  const [form, setForm] = useState({ name: "", age: "", gender: "", phone: "", email: "" });
  const [editingId, setEditingId] = useState(null); // Track patient being edited

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update patient
      dispatch(updatePatient({ id: editingId, data: form }));
      setEditingId(null);
    } else {
      // Add patient
      dispatch(addPatient(form));
    }
    setForm({ name: "", age: "", gender: "", phone: "", email: "" });
  };

  const handleEdit = (patient) => {
    setEditingId(patient._id);
    setForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: "", age: "", gender: "", phone: "", email: "" });
  };

  return (
    <div>
      <h1>Patients</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update Patient" : "Add Patient"}</button>
        {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>

      <ul>
        {patients.map((p) => (
          <li key={p._id}>
            {p.name} - {p.age} ({p.gender})
            <button onClick={() => handleEdit(p)}>Update</button>
            <button onClick={() => dispatch(deletePatient(p._id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
