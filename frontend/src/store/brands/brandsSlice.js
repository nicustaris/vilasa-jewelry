import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/api-client";

export const createBrand = createAsyncThunk(
  "CREATE_BRAND",
  async (brandData, ThunkAPI) => {
    try {
      const createdBrand = await apiClient.post(
        "/vilasa-v1/vproduct/brands",
        brandData
      );
      return createdBrand.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getBrands = createAsyncThunk("GET_BRANDS", async (_, ThunkAPI) => {
  try {
    const brands = await apiClient.get("/vilasa-v1/vproduct/brands");
    return brands.data;
  } catch (error) {
    return ThunkAPI.rejectWithValue({
      type: "getError",
      message: error.message,
    });
  }
});

export const deleteBrand = createAsyncThunk(
  "DELETE_BRAND",
  async (brandId, ThunkAPI) => {
    try {
      const deletedBrand = await apiClient.delete(
        `/vilasa-v1/vproduct/brands/${brandId}`
      );
      return deletedBrand.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "UPDATE_BRAND",
  async ({ id, updatedItem }, ThunkAPI) => {
    console.log(id);
    console.log(updatedItem);
    try {
      const updatedBrand = await apiClient.put(
        `/vilasa-v1/vproduct/brands/${id}`,
        updatedItem
      );
      return updatedBrand.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue({
        type: "updateError",
        message: error.message,
      });
    }
  }
);

const initialState = {
  brands: null,
  isLoading: false,
  isError: false,
  message: null,
};

export const brandsSlice = createSlice({
  name: "brands",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.brands.push(action.payload.brand);
      })
      .addCase(createBrand.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.brands = action.payload.brands;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload.brand._id
        );
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const updatedBrand = action.payload.brand;
        const index = state.brands.findIndex(
          (brand) => brand._id === updatedBrand._id
        );
        if (index !== -1) {
          state.brands[index] = updatedBrand;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default brandsSlice.reducer;
