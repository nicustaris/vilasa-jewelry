import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import enquiriesSlice from "./enquiries/enquiriesSlice";
import enquirySlice from "./enquiry/enquirySlice";
import webElementsSlice from "./webelements/webElementsSlice";
import categoriesSlice from "./categories/categoriesSlice";
import brandsSlice from "./brands/brandsSlice";
import productSlice from "./product/productSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    product: productSlice,
    enquiries: enquiriesSlice,
    enquiry: enquirySlice,
    webelements: webElementsSlice,
    categories: categoriesSlice,
    brands: brandsSlice,
  },
});
