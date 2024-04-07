import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/api-client";

export const getProduct = createAsyncThunk(
  "GET_PRODUCT",
  async (id, ThunkAPI) => {
    try {
      const product = await apiClient.get(`/vilasa-v1/vproduct/products/${id}`);
      return product.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  product: null,
  isLoading: false,
  isError: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.product = action.payload.product;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default productSlice.reducer;
