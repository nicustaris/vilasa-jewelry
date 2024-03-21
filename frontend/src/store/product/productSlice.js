import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/api-client";

export const createProduct = createAsyncThunk(
  "CREATE_PRODUCT",
  async (productData, thunkAPI) => {
    try {
      await apiClient.post("/vilasa-v1/vproduct/products", productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  product: null,
  isError: false,
  isLoading: false,
  message: "",
  errors: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      });
  },
});

export default productSlice.reducer;
