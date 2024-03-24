import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquirieService from "../../services/enquiriesServices";

export const getEnquiryChat = createAsyncThunk(
  "GET_ENQUIRY_CHAT",
  async (enquiryId, ThunkAPI) => {
    try {
      return await enquirieService.getEnquiryChat(enquiryId);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendChatMessage = createAsyncThunk(
  "SEND_CHAT_MESSAGE",
  async (data, ThunkAPI) => {
    try {
      return await enquirieService.sendChatMessage(data);
    } catch (error) {
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  enquiry: null,
  isLoading: false,
  isError: false,
  errors: null,
  message: "",
};

export const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiryChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiryChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.enquiry = action.payload;
      })
      .addCase(getEnquiryChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(sendChatMessage.pending, (state) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enquiry = [...state.enquiry, action.payload];
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      });
  },
});

export default enquirySlice.reducer;
