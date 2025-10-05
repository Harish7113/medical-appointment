import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments, addAppointment, updateAppointment, deleteAppointment } from "../features/appointmentsSlice";
import { fetchDoctors } from "../features/doctorsSlice";
import { fetchPatients } from "../features/patientsSlice";
import AppointmentForm from "../components/AppointmentForm";

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.list);
  const doctors = useSelector((state) => state.doctors.list);
  const patients = useSelector((state) => state.patients.list);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchDoctors());
    dispatch(fetchPatients());
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

  return (
    <div>
      <h1>Appointments</h1>
      <AppointmentForm
        onSubmit={handleAddOrUpdate}
        doctors={doctors}
        patients={patients}
        editingAppointment={appointments.find(a => a._id === editingId)}
      />

      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            {a.patient.name} with {a.doctor.name} on {new Date(a.date).toLocaleDateString()}
            <button onClick={() => handleEdit(a)}>Update</button>
            <button onClick={() => handleDelete(a._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
