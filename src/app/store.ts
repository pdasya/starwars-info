import { configureStore } from "@reduxjs/toolkit";
import selectedItemsReducer from "../features/selectedItemsSlice";
import { api } from "../features/apiSlice";

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
