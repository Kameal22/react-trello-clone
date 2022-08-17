import { combineReducers, configureStore } from "@reduxjs/toolkit";
import registeredUsersReducer from "./features/registerSlice";
import navigationReducer from "./features/navigationSlice";
import popUpReducer from "./features/popUpMessagSlice";
import workspaceReducer from "./features/WorkspaceSlice";
import createComponentReducer from "./features/popUpCreateComponentSlice";
import highlightMessageReducer from "./features/highlightsSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const reducers = combineReducers({
  users: registeredUsersReducer,
  nav: navigationReducer,
  message: popUpReducer,
  workspace: workspaceReducer,
  create: createComponentReducer,
  highlight: highlightMessageReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
