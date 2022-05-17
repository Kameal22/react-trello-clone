import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardInterface } from "../../interfaces/WorkspaceInterface";

interface RecentlyViewedInterface {
    recentlyViewed: BoardInterface[]
}

const initialState: RecentlyViewedInterface = {
    recentlyViewed: [],
};

export const recentlyViewedSlice = createSlice({
    name: "Recents",
    initialState,
    reducers: {
        addRecentlyViewed: (state, action: PayloadAction<BoardInterface>) => {
            state.recentlyViewed.push(action.payload);
        },
    }
})

export const { addRecentlyViewed } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
