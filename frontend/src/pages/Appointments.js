import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} from "../features/appointmentsSlice";
import { fetchDoctors } from "../features/doctorsSlice";
import { fetchPatients } from "../features/patientsSlice";
import AppointmentForm from "../components/AppointmentForm";

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.list || []);
  const doctors = useSelector((state) => state.doctors.list || []);
  const patients = useSelector((state) => state.patients.list || []);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchDoctors());
        await dispatch(fetchPatients());
        await dispatch(fetchAppointments());
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  const handleAddOrUpdate = (data) => {
    if (editingId) {
      dispatch(updateAppointment({ id: editingId, appointment: data }));
      setEditingId(null);
    } else {
      dispatch(addAppointment(data));
    }
  };

  const handleEdit = (appointment) => setEditingId(appointment._id);
  const handleDelete = (id) => dispatch(deleteAppointment(id));

  if (loading) return <div>Loading...</div>;

  // ✅ FIXED: using correct IDs (patientId / doctorId)
  const getPatientName = (id) =>
    patients.find((p) => String(p._id) === String(id))?.name || "Unknown";
  const getDoctorName = (id) =>
    doctors.find((d) => String(d._id) === String(id))?.name || "Unknown";

  return (
    <div>
      <h1>Appointments</h1>

      <AppointmentForm
        onSubmit={handleAddOrUpdate}
        doctors={doctors}
        patients={patients}
        editingAppointment={appointments.find((a) => a._id === editingId)}
      />

      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            {getPatientName(a.patientId)} with {getDoctorName(a.doctorId)} on{" "}
            {a.date ? new Date(a.date).toLocaleDateString() : "No Date"}
            <button onClick={() => handleEdit(a)}>Update</button>
            <button onClick={() => handleDelete(a._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
