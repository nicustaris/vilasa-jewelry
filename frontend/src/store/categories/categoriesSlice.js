import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/api-client";

const initialState = {
  categories: [],
  isLoading: false,
  isError: null,
  message: "",
};

export const createCategory = createAsyncThunk(
  "CREATE_CATEGORY",
  async (data, ThunkAPI) => {
    try {
      const createdCategory = await apiClient.post(
        "/vilasa-v1/vproduct/categories",
        {
          title: data,
        }
      );
      return createdCategory.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "GET_CATEGORIES",
  async (_, ThunkAPI) => {
    try {
      const getCategories = await apiClient.get(
        "/vilasa-v1/vproduct/categories"
      );
      return getCategories.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "DELETE_CATEGORY",
  async (categoryId, ThunkAPI) => {
    try {
      const deletedCategory = await apiClient.delete(
        `/vilasa-v1/vproduct/categories/${categoryId}`
      );
      return deletedCategory.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "UPDATE_CATEGORY",
  async ({ newCategory, categoryId }, ThunkAPI) => {
    try {
      const updatedCategory = await apiClient.put(
        `/vilasa-v1/vproduct/categories/${categoryId}`,
        { title: newCategory }
      );
      return updatedCategory.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.message = "";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = "Succesfully created!";
        state.categories.push(action.payload.category);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.message = "";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.categories = action.payload.categories;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.deletedCategory._id
        );
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        const updatedCategory = action.payload.category;
        const index = state.categories.findIndex(
          (category) => category._id === updatedCategory._id
        );
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(updateCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default categoriesSlice.reducer;
