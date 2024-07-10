import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";

export const productStore = configureStore({
  reducer: {
    prodreducer: productReducer,
  },
});