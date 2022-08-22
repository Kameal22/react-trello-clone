import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterInterface {
  user: {
    name: string;
    password: string;
  };
}

const initialState: RegisterInterface = {
  user: { name: "", password: "" },
};

export const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    registerUser: (
      state,
      action: PayloadAction<{ name: string; password: string }>
    ) => {
      state.user = action.payload;
      window.localStorage.setItem("user", action.payload.name);
    },
    logoutUser: (state) => {
      state.user = { name: "", password: "" };
      window.localStorage.removeItem("user");
    },
  },
});

export const { registerUser, logoutUser } = registerSlice.actions;

export default registerSlice.reducer;
