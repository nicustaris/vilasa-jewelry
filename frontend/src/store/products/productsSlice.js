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

export const getProducts = createAsyncThunk(
  "GET_PRODUCTS",
  async (_, ThunkAPI) => {
    try {
      const getProducts = await apiClient.get("/vilasa-v1/vproduct/products");
      return getProducts.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "DELETE_PRODUCT",
  async (productId, ThunkAPI) => {
    console.log(productId);
    try {
      const removeProduct = await apiClient.delete(
        `/vilasa-v1/vproduct/products/${productId}`
      );
      return removeProduct.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: null,
  isError: false,
  isLoading: false,
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
      })

      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.productId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      });
  },
});

export default productSlice.reducer;
