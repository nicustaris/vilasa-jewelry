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

export const updateProduct = createAsyncThunk(
  "UPDATE_PRODUCT",
  async ({ id, productData }, ThunkAPI) => {
    console.log(productData);
    try {
      const updatedProduct = await apiClient.put(
        `/vilasa-v1/vproduct/products/${id}`,
        productData
      );
      return updatedProduct.data;
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
    builder
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.product = action.payload.product;
      })
      .addCase(getProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productSlice.reducer;
