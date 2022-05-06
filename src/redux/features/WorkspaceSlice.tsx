import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Workspace {
  workspaceName: string;
  workspaceDescription: string;
  workspaceDate: string;
  workspaceMember: string;
  workspaceId: number;
  workspaceBoards: [{ boardName: string }] | undefined;
  workspaceLandingPageMenu: boolean;
}

interface WorkspaceState {
  workspace: Workspace[];
}

const initialState: WorkspaceState = {
  workspace: [],
};

export const workspaceSlice = createSlice({
  name: "Workspace",
  initialState,
  reducers: {
    addWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.workspace.push(action.payload);
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

export const { addWorkspace, showWorkspaceDropdown } = workspaceSlice.actions;

export default workspaceSlice.reducer;
