import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments, addAppointment, deleteAppointment } from "../features/appointmentsSlice";
import { fetchDoctors } from "../features/doctorsSlice";
import { fetchPatients } from "../features/patientsSlice";
import AppointmentForm from "../components/AppointmentForm";

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.list);
  const doctors = useSelector((state) => state.doctors.list);
  const patients = useSelector((state) => state.patients.list);

  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchDoctors());
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleAdd = (data) => dispatch(addAppointment(data));
  const handleDelete = (id) => dispatch(deleteAppointment(id));

  return (
    <div>
      <h1>Appointments</h1>
      <AppointmentForm onSubmit={handleAdd} doctors={doctors} patients={patients} />

      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            {a.patient.name} with {a.doctor.name} on {new Date(a.date).toLocaleDateString()}
            <button onClick={() => handleDelete(a._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
