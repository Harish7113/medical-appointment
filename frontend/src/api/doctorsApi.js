import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/appointments`;


// Get all doctors
export const getDoctors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get doctor by ID
export const getDoctorById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add a new doctor
export const addDoctor = async (doctor) => {
  const response = await axios.post(API_URL, doctor);
  return response.data;
};

// Update a doctor
export const updateDoctor = async (id, updatedDoctor) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedDoctor);
  return response.data;
};

// Delete a doctor
export const deleteDoctor = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
