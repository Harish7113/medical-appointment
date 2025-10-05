import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/appointments`;

export const getAppointments = () => axios.get(API_URL).then(res => res.data);
export const addAppointment = (appointment) => axios.post(API_URL, appointment).then(res => res.data);
export const updateAppointment = (id, appointment) => axios.put(`${API_URL}/${id}`, appointment).then(res => res.data);
export const deleteAppointment = (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data);
