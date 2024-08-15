import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
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

interface FormState {
  formData: FormData[];
}

const initialState: FormState = {
  formData: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<FormData>) => {
      state.formData.push(action.payload);
    },
  },
});

export const { saveFormData } = formSlice.actions;
export default formSlice.reducer;
