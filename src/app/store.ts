import { configureStore } from "@reduxjs/toolkit";
import currentPageReducer from "../features/currentPageSlice";
import selectedItemsReducer from "../features/selectedItemsSlice";
import { api } from "../features/apiSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    currentPage: currentPageReducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
