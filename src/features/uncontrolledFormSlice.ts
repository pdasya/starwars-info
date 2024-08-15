import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UncontrolledFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  picture: string;
  country: string;
}

interface UncontrolledFormState {
  formData: UncontrolledFormData[];
}

const initialUncontrolledState: UncontrolledFormState = {
  formData: [],
};

const uncontrolledFormSlice = createSlice({
  name: "uncontrolledForm",
  initialState: initialUncontrolledState,
  reducers: {
    saveUncontrolledFormData: (
      state,
      action: PayloadAction<UncontrolledFormData>,
    ) => {
      state.formData.push(action.payload);
    },
  },
});

export const { saveUncontrolledFormData } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
