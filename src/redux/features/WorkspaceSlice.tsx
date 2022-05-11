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
        id: number | undefined;
        name?: string;
        description?: string;
      }>
    ) => {
      const workspaceToEdit = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.id
      );

      if (action.payload.name) {
        state.workspace[workspaceToEdit].workspaceName = action.payload.name;
      }
    },
    showWorkspaceDropdown: (state, action: PayloadAction<{ id: number }>) => {
      const workspaceWithShownDropdown = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.id
      );

      state.workspace[workspaceWithShownDropdown].workspaceLandingPageMenu =
        !state.workspace[workspaceWithShownDropdown].workspaceLandingPageMenu;
    },
  },
});

export const { addWorkspace, showWorkspaceDropdown, editWorkspace } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;
