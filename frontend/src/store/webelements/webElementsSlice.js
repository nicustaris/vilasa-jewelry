import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/api-client";

export const getElementsUrl = createAsyncThunk(
  "GET_ELEMENTS_URL",
  async (_, ThunkAPI) => {
    try {
      const getUrl = await apiClient.get("/vilasa-v1/db-url/vilasa");
      return getUrl.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createElementUrl = createAsyncThunk(
  "CREATE_ELEMENT_URL",
  async (urlData, ThunkAPI) => {
    try {
      const createUrl = await apiClient.post(
        "/vilasa-v1/db-url/vilasa",
        urlData
      );
      return createUrl.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteElementUrl = createAsyncThunk(
  "DELETE_ELEMENT_URL",
  async (elementId, ThunkAPI) => {
    try {
      const deleteElementUrl = await apiClient.delete(
        `/vilasa-v1/db-url/vilasa/${elementId}`
      );
      return deleteElementUrl.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateElementUrl = createAsyncThunk(
  "DELETE_URL_ELEMENT",
  async ({ elementId, newUrl }, ThunkAPI) => {
    try {
      const updateUrl = await apiClient.patch(
        `/vilasa-v1/db-url/vilasa/${elementId}`,
        {
          url: newUrl,
        }
      );
      return updateUrl.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createDynamicImages = createAsyncThunk(
  "CREATE_DYNAMIC_IMAGES",
  async (data, ThunkAPI) => {
    try {
      const dynamicImages = await apiClient.post(
        "/vilasa-v1/db-img/vilasa",
        data
      );
      return dynamicImages.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getDynamicImages = createAsyncThunk(
  "GET_DYNAMIC_IMAGES",
  async (_, ThunkAPI) => {
    try {
      const dynamicImages = await apiClient.get("/vilasa-v1/db-img/vilasa");
      return dynamicImages.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteDynamicImages = createAsyncThunk(
  "DELETE_DYNAMIC_IMAGES",
  async (image, ThunkAPI) => {
    try {
      const deleteImage = await apiClient.delete(
        `/vilasa-v1/db-img/vilasa/${image}`
      );
      return deleteImage.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateDynamicImages = createAsyncThunk(
  "UPDATE_DYNAMIC_IMAGES",
  async ({ id, updatedData }, ThunkAPI) => {
    try {
      const updateImage = await apiClient.put(
        `/vilasa-v1/db-img/vilasa/${id}`,
        updatedData
      );
      return updateImage.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  elementsUrl: null,
  dynamicImages: null,
  isLoading: false,
  isError: false,
};

export const webElementsSlice = createSlice({
  name: "webelements",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getElementsUrl.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getElementsUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.elementsUrl = action.payload.data;
      })
      .addCase(getElementsUrl.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createElementUrl.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createElementUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.elementsUrl.push(action.payload.data);
        // state.elementsUrl = [...state.elementsUrl, action.payload.data];
      })
      .addCase(createElementUrl.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteElementUrl.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteElementUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.elementsUrl = state.elementsUrl.filter(
          (element) => element._id !== action.payload.data._id
        );
      })
      .addCase(deleteElementUrl.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateElementUrl.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateElementUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(updateElementUrl.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createDynamicImages.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createDynamicImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.dynamicImages.push(action.payload.data);
        // state.dynamicImages = [...state.dynamicImages, action.payload.data];
      })
      .addCase(createDynamicImages.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getDynamicImages.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getDynamicImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.dynamicImages = action.payload.data;
      })
      .addCase(getDynamicImages.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteDynamicImages.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteDynamicImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.dynamicImages = state.dynamicImages.filter(
          (image) => image._id !== action.payload.data._id
        );
      })
      .addCase(deleteDynamicImages.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateDynamicImages.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateDynamicImages.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(updateDynamicImages.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default webElementsSlice.reducer;
