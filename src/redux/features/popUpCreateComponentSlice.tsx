import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopUpInterface {
    createWorkspace: boolean,
    createBoard: boolean
}

const initialState: PopUpInterface = {
    createWorkspace: false,
    createBoard: false
};

export const popUpCreateComponentSlice = createSlice({
    name: "PopUpCreate",
    initialState,
    reducers: {
        setCreateWorkspace: (state) => {
            state.createWorkspace = !state.createWorkspace
        },
        setCreateBoard: (state) => {
            state.createBoard = !state.createBoard
        },
    },
});

export const { setCreateWorkspace, setCreateBoard } = popUpCreateComponentSlice.actions;

export default popUpCreateComponentSlice.reducer;
