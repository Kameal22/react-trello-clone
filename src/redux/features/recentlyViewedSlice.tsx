import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardInterface } from "../../interfaces/WorkspaceInterface";

interface RecentlyViewedInterface {
  recentlyViewed: BoardInterface[];
}

const initialState: RecentlyViewedInterface = {
  recentlyViewed: [],
};

export const recentlyViewedSlice = createSlice({
  name: "Recents",
  initialState,
  reducers: {
    addRecentlyViewed: (state, action: PayloadAction<BoardInterface>) => {
      if (
        !state.recentlyViewed.some(
          (board) => board.boardId === action.payload.boardId
        )
      ) {
        if (state.recentlyViewed.length <= 3) {
          state.recentlyViewed.push(action.payload);
        } else {
          state.recentlyViewed.pop();
          state.recentlyViewed.unshift(action.payload);
        }
      }
    },

    removeRecentlyViewedThatWasDeletedFromWorkspaceComponent: (
      state,
      action: PayloadAction<{ boardId: string }>
    ) => {
      const filtered = state.recentlyViewed.filter(
        (board) => board.boardId !== action.payload.boardId
      );

      state.recentlyViewed = filtered;
    },

    removeRecentlyViewedAfterWorkspaceDeleting: (
      state,
      action: PayloadAction<{ boardsWorkspace: string }>
    ) => {
      const filtered = state.recentlyViewed.filter(
        (board) => board.boardWorkspace !== action.payload.boardsWorkspace
      );

      state.recentlyViewed = filtered;
    },
  },
});

export const {
  addRecentlyViewed,
  removeRecentlyViewedThatWasDeletedFromWorkspaceComponent,
  removeRecentlyViewedAfterWorkspaceDeleting,
} = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
