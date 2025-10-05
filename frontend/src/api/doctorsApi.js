import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/doctors`; // <-- make sure this points to deployed backend

export const getDoctors = () => axios.get(API_URL).then(res => res.data);
export const addDoctor = (doctor) => axios.post(API_URL, doctor).then(res => res.data);
export const updateDoctor = (id, doctor) => axios.put(`${API_URL}/${id}`, doctor).then(res => res.data);
export const deleteDoctor = (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data);
