import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/appointmentsApi";

export const fetchAppointments = createAsyncThunk("appointments/fetchAll", async () => {
  return await api.getAppointments();
});

export const addAppointment = createAsyncThunk("appointments/add", async (appointment) => {
  return await api.addAppointment(appointment);
});

export const updateAppointment = createAsyncThunk(
  "appointments/update",
  async ({ id, appointment }) => {
    return await api.updateAppointment(id, appointment);
  }
);

export const deleteAppointment = createAsyncThunk("appointments/delete", async (id) => {
  return await api.deleteAppointment(id);
});

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.list = state.list.map((a) =>
          a._id === action.payload._id ? action.payload : a
        );
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.list = state.list.filter((a) => a._id !== action.payload);
      });
  },
});

export default appointmentsSlice.reducer;
