import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: string;
  name?: string;
  height?: string;
  mass?: string;
  gender?: string;
}

export interface SelectedItemsState {
  selectedItems: Item[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: "SelectedItems",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Item>) => {
      state.selectedItems.push(action.payload);
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload,
      );
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAllItems } =
  selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
