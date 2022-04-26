import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationInterface {
  navDropdown: string;
}

const initialState: NavigationInterface = {
  navDropdown: "",
};

export const navigationSlice = createSlice({
  name: "Navigation",
  initialState,
  reducers: {
    showDropdown: (state, action: PayloadAction<{ dropdownItem: string }>) => {
      state.navDropdown = action.payload.dropdownItem;
    },
  },
});

export const { showDropdown } = navigationSlice.actions;

export default navigationSlice.reducer;
