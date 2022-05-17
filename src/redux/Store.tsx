import { configureStore } from "@reduxjs/toolkit";
import registeredUsersReducer from "./features/registerSlice";
import navigationReducer from "./features/navigationSlice";
import popUpReducer from "./features/popUpSlice";
import workspaceReducer from "./features/WorkspaceSlice";
import recentlyViewedReducer from "./features/recentlyViewedSlice";

export const store = configureStore({
  reducer: {
    users: registeredUsersReducer,
    dropdown: navigationReducer,
    message: popUpReducer,
    workspace: workspaceReducer,
    recents: recentlyViewedReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
