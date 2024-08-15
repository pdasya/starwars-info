import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import countryReducer from "../features/countrySlice";

const store = configureStore({
  reducer: {
    formData: formReducer,
    countries: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
