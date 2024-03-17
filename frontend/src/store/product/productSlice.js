import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/api-client";

export const createProduct = createAsyncThunk(
  "CREATE_PRODUCT",
  async (productData, thunkAPI) => {
    await apiClient.post("/vilasa-v1/vproduct/products", productData);
    try {
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = null;
    });
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errors = action.payload;
    });
  },
});

export default productSlice.reducer;
