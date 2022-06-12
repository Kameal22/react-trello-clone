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

    removeRecentlyViewedThatWasDeleted: (state, action: PayloadAction<{ boardsWorkspaceName: string }>) => {

      const filtered = state.recentlyViewed.filter(board => board.boardWorkspace !== action.payload.boardsWorkspaceName);

      state.recentlyViewed = filtered
    },
  },
});

export const { addRecentlyViewed, removeRecentlyViewedThatWasDeleted } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
