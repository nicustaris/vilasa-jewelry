import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../store/product/productSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
});
