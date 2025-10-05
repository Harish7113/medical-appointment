import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, addPatient, deletePatient } from "../features/patientsSlice";

const Patients = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.list);
  const [form, setForm] = useState({ name: "", age: "", gender: "", phone: "", email: "" });

  useEffect(() => { dispatch(fetchPatients()); }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPatient(form));
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
        <button type="submit">Add Patient</button>
      </form>

      <ul>
        {patients.map((p) => (
          <li key={p._id}>
            {p.name} - {p.age} ({p.gender})
            <button onClick={() => dispatch(deletePatient(p._id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
