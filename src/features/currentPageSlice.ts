import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentPageState {
  currentPage: number;
}

const initialState: CurrentPageState = {
  currentPage: 1,
};

const currentPageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
