import { configureStore } from "@reduxjs/toolkit";
import selectedItemsReducer from "../features/selectedItemsSlice";

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

export default store;
