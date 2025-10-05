import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/patients`;


// Get all patients
export const getPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get patient by ID
export const getPatientById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add a new patient
export const addPatient = async (patient) => {
  const response = await axios.post(API_URL, patient);
  return response.data;
};

// Update a patient
export const updatePatient = async (id, updatedPatient) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedPatient);
  return response.data;
};

// Delete a patient
export const deletePatient = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
