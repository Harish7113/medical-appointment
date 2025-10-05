import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/appointments`;



// Get all appointments
export const getAppointments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get appointment by ID
export const getAppointmentById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add a new appointment
export const addAppointment = async (appointment) => {
  const response = await axios.post(API_URL, appointment);
  return response.data;
};

// Update an appointment
export const updateAppointment = async (id, updatedAppointment) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedAppointment);
  return response.data;
};

// Delete an appointment
export const deleteAppointment = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
