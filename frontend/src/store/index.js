import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import enquiriesSlice from "./enquiries/enquiriesSlice";
import enquirySlice from "./enquiry/enquirySlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    enquiries: enquiriesSlice,
    enquiry: enquirySlice,
  },
});
