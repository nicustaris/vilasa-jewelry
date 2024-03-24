import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import enquiriesSlice from "./enquiries/enquiriesSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    enquiries: enquiriesSlice,
  },
});
