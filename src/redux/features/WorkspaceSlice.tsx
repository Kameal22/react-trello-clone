import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkspaceInterface {
  workspaces: [
    {
      workspaceName: string;
      workspaceDescription: string;
      workspaceMember: string;
      workspaceData: string;
    }
  ];
}

const initialState: WorkspaceInterface = {
  workspaces: [
    {
      workspaceName: "",
      workspaceDescription: "",
      workspaceMember: "",
      workspaceData: "",
    },
  ],
};

export const workspaceSlice = createSlice({
  name: "Workspace",
  initialState,
  reducers: {},
});

export const {} = workspaceSlice.actions;

export default workspaceSlice.reducer;
