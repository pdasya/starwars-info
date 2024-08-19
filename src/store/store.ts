import { configureStore } from "@reduxjs/toolkit";
import controlledFormReducer from "../features/controlledFormSlice";
import uncontrolledFormReducer from "../features/uncontrolledFormSlice";
import countryReducer from "../features/countrySlice";

const store = configureStore({
  reducer: {
    controlledForm: controlledFormReducer,
    uncontrolledForm: uncontrolledFormReducer,
    countries: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
