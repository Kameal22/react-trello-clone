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
  name: "users",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      state.Users.push(action.payload);

      window.localStorage.setItem("currentUser", action.payload.login);
    },
    logoutUser: (state, action: PayloadAction<{ login: string }>) => {
      const logout = state.Users.filter(
        (user) => user.login !== action.payload.login
      );
      state.Users = logout;

      window.localStorage.removeItem("currentUser");
    },
  },
});

export const { registerUser, logoutUser } = usersSlice.actions;

export default usersSlice.reducer;
