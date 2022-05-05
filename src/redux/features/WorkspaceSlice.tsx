import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Workspace {
  workspaceName: string;
  workspaceDescription: string;
  workspaceDate: string;
  workspaceMember: string;
  workspaceBoards?: [{ boardName: string }];
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
  },
});

export const { addWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
