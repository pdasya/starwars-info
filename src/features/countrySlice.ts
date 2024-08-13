import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountryState {
  countries: string[];
}

const initialCountryState: CountryState = {
  countries: ["USA", "Canada", "Mexico"],
};

const countrySlice = createSlice({
  name: "countries",
  initialState: initialCountryState,
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
