import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface CountryState {
  countries: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface Country {
  name: {
    common: string;
  };
}

const initialCountryState: CountryState = {
  countries: [],
  status: "idle",
  error: null,
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data: Country[] = await response.json();
    return data.map((country: Country) => country.name.common);
  },
);

const countrySlice = createSlice({
  name: "countries",
  initialState: initialCountryState,
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch countries";
      });
  },
});

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
