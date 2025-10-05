import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "../features/patientsSlice";
import doctorsReducer from "../features/doctorsSlice";
import appointmentsReducer from "../features/appointmentsSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    doctors: doctorsReducer,
    appointments: appointmentsReducer,
  },
});
