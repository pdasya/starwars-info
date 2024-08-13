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

const initialFormData: FormData = {
  name: "",
  age: 0,
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  termsAccepted: false,
  picture: "",
  country: "",
};

const formSlice = createSlice({
  name: "formData",
  initialState: initialFormData,
  reducers: {
    saveFormData(state, action: PayloadAction<FormData>) {
      return action.payload;
    },
  },
});

export const { saveFormData } = formSlice.actions;
export default formSlice.reducer;
