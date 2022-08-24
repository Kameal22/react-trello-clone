import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  login: string;
  password: string;
}

interface Users {
  Users: User[];
}

const initialState: Users = {
  Users: [],
};

export const usersSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    testRegisterUser: (state, action: PayloadAction<User>) => {
      state.Users.push(action.payload);
      window.localStorage.setItem("currentUser", action.payload.login);
    },
    testLogoutUser: (state) => {
      window.localStorage.removeItem("currentUser");
    },
  },
});

export const { testRegisterUser, testLogoutUser } = usersSlice.actions;

export default usersSlice.reducer;
