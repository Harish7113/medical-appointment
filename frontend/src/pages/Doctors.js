import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors, addDoctor, deleteDoctor } from "../features/doctorsSlice";

const Doctors = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors.list);
  const [form, setForm] = useState({ name: "", specialization: "", phone: "", email: "" });

  useEffect(() => { dispatch(fetchDoctors()); }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDoctor(form));
    setForm({ name: "", specialization: "", phone: "", email: "" });
  };

  return (
    <div>
      <h1>Doctors</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button type="submit">Add Doctor</button>
      </form>

      <ul>
        {doctors.map((d) => (
          <li key={d._id}>
            {d.name} - {d.specialization}
            <button onClick={() => dispatch(deleteDoctor(d._id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
