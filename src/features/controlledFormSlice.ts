import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ControlledFormData {
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

interface ControlledFormState {
  formData: ControlledFormData[];
}

const initialControlledState: ControlledFormState = {
  formData: [],
};

const controlledFormSlice = createSlice({
  name: "controlledForm",
  initialState: initialControlledState,
  reducers: {
    saveControlledFormData: (
      state,
      action: PayloadAction<ControlledFormData>,
    ) => {
      state.formData.push(action.payload);
    },
  },
});

export const { saveControlledFormData } = controlledFormSlice.actions;
export default controlledFormSlice.reducer;
