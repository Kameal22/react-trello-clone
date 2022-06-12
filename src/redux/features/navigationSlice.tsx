import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationInterface {
  navDropdown: string;
  navColor: string;
}

const initialState: NavigationInterface = {
  navDropdown: "",
  navColor: '#3cc384'
};

export const navigationSlice = createSlice({
  name: "Navigation",
  initialState,
  reducers: {
    showDropdown: (state, action: PayloadAction<{ dropdownItem: string }>) => {
      state.navDropdown = action.payload.dropdownItem;
    },
    changeColor: (state, action: PayloadAction<{ color: string }>) => {
      state.navColor = action.payload.color;
    },
  },
});

export const { showDropdown, changeColor } = navigationSlice.actions;

export default navigationSlice.reducer;
