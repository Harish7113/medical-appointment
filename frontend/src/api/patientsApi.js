import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/patients`; // <-- make sure this points to deployed backend

export const getPatients = () => axios.get(API_URL).then(res => res.data);
export const addPatient = (patient) => axios.post(API_URL, patient).then(res => res.data);
export const updatePatient = (id, patient) => axios.put(`${API_URL}/${id}`, patient).then(res => res.data);
export const deletePatient = (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data);
