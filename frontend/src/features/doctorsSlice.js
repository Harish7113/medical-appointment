import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/doctorsApi";

export const fetchDoctors = createAsyncThunk("doctors/fetchAll", async () => {
  return await api.getDoctors();
});

export const addDoctor = createAsyncThunk("doctors/add", async (doctor) => {
  return await api.addDoctor(doctor);
});

export const updateDoctor = createAsyncThunk("doctors/update", async ({ id, doctor }) => {
  return await api.updateDoctor(id, doctor);
});

export const deleteDoctor = createAsyncThunk("doctors/delete", async (id) => {
  return await api.deleteDoctor(id);
});

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.list = state.list.map((d) =>
          d._id === action.payload._id ? action.payload : d
        );
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.list = state.list.filter((d) => d._id !== action.payload);
      });
  },
});

export default doctorsSlice.reducer;
