import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentPageReducer from "@features/currentPageSlice";
import selectedItemsReducer from "@features/selectedItemsSlice";
import { api } from "@features/apiSlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  currentPage: currentPageReducer,
  selectedItems: selectedItemsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
}

export default store;
