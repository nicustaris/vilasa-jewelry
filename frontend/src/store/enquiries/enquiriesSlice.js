import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquirieService from "../../services/enquiriesServices";

export const getEnquiries = createAsyncThunk(
  "GET_ENQUIRIES",
  async (_, ThunkAPI) => {
    try {
      return await enquirieService.getEnquiries();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  enquiries: null,
  isLoading: false,
  isError: false,
  message: "",
};

const enquiriesSlice = createSlice({
  name: "enquiries",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.enquiries = action.payload.data;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default enquiriesSlice.reducer;
