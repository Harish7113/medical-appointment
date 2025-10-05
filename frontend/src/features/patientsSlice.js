import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/patientsApi";

export const fetchPatients = createAsyncThunk("patients/fetchAll", async () => {
  return await api.getPatients();
});

export const addPatient = createAsyncThunk("patients/add", async (patient) => {
  return await api.addPatient(patient);
});

export const updatePatient = createAsyncThunk("patients/update", async ({ id, patient }) => {
  return await api.updatePatient(id, patient);
});

export const deletePatient = createAsyncThunk("patients/delete", async (id) => {
  return await api.deletePatient(id);
});

const patientsSlice = createSlice({
  name: "patients",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.list = state.list.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p._id !== action.payload);
      });
  },
});

export default patientsSlice.reducer;
