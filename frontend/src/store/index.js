import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import enquiriesSlice from "./enquiries/enquiriesSlice";
import enquirySlice from "./enquiry/enquirySlice";
import webElementsSlice from "./webelements/webElementsSlice";
import brandsSlice from "./categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    enquiries: enquiriesSlice,
    enquiry: enquirySlice,
    webelements: webElementsSlice,
    categories: brandsSlice,
  },
});
