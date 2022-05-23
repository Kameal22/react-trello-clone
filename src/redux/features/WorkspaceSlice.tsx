import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  WorkspaceInterface,
  BoardInterface,
  BoardTaskInterface,
} from "../../interfaces/WorkspaceInterface";

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
    addBoard: (state, action: PayloadAction<BoardInterface>) => {
      const workspaceToAddBoardTo = state.workspace.findIndex(
        (value) => value.workspaceName === action.payload.boardWorkspace
      );

      state.workspace[workspaceToAddBoardTo].workspaceBoards.push(
        action.payload
      );
    },

    addColumn: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnName: string;
        columnId: string;
        columnTasks: BoardTaskInterface[];
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns.push(
        action.payload
      );
    },
  },
});

export const {
  addWorkspace,
  showWorkspaceDropdown,
  editWorkspace,
  addBoard,
  addColumn,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
