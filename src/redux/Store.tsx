import { configureStore } from "@reduxjs/toolkit";
import registeredUsersReducer from "./features/registerSlice";
import navigationReducer from "./features/navigationSlice";
import popUpReducer from "./features/popUpSlice";

export const store = configureStore({
  reducer: {
    users: registeredUsersReducer,
    dropdown: navigationReducer,
    message: popUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
