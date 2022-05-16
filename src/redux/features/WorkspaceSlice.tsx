import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkspaceInterface } from "../../interfaces/WorkspaceInterface";

interface WorkspaceState {
  workspace: WorkspaceInterface[];
}

const initialState: WorkspaceState = {
  workspace: [],
};

export const workspaceSlice = createSlice({
  name: "Workspace",
  initialState,
  reducers: {
    addWorkspace: (state, action: PayloadAction<WorkspaceInterface>) => {
      state.workspace.push(action.payload);
    },
    editWorkspace: (
      state,
      action: PayloadAction<{
        id: string | undefined;
        name?: string;
        description?: string;
      }>
    ) => {
      const workspaceToEdit = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.id
      );
      if (action.payload.name && action.payload.description) {
        state.workspace[workspaceToEdit].workspaceName = action.payload.name;
        state.workspace[workspaceToEdit].workspaceDescription =
          action.payload.description;
      }
    },
    showWorkspaceDropdown: (state, action: PayloadAction<{ id: string }>) => {
      const workspaceWithShownDropdown = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.id
      );

      state.workspace[workspaceWithShownDropdown].workspaceLandingPageMenu =
        !state.workspace[workspaceWithShownDropdown].workspaceLandingPageMenu;
    },
    addBoard: (
      state,
      action: PayloadAction<{
        boardName: string;
        boardId: string;
        boardWorkspace: string;
        boardBackground: string;
      }>
    ) => {
      const workspaceToAddBoardTo = state.workspace.findIndex(
        (value) => value.workspaceName === action.payload.boardWorkspace
      );

      // state.workspace[workspaceToAddBoardTo].workspaceBoards.push(
      //   action.payload
      // );
    },
  },
});

export const { addWorkspace, showWorkspaceDropdown, editWorkspace, addBoard } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;
