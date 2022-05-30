import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  WorkspaceInterface,
  BoardInterface,
  BoardTaskInterface,
} from "../../interfaces/WorkspaceInterface";
import { v4 as uuidv4 } from "uuid";

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
        columnId: string | undefined;
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

    copyColumn: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const columnToCopy = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.find(
        (column) => column.columnId === action.payload.columnId
      );

      if (columnToCopy) {
        columnToCopy.columnId = uuidv4(); //This changes ID of the copying one as well. It causes problems
        console.log(columnToCopy.columnId)

        state.workspace[workspace].workspaceBoards[board].boardColumns.push(
          columnToCopy
        );
      }
    },

    deleteColumn: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const columnToDelete = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (column) => column.columnId === action.payload.columnId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns.splice(
        columnToDelete,
        1
      );
    },

    addTask: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskName: string;
        taskId: string;
        taskIndicatorColor: string;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        column
      ].columnTasks.push(action.payload);
    },

    copyTask: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskId: string | undefined;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      const taskToCopy = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks.find(
        (task) => task.taskId === action.payload.taskId
      );

      if (taskToCopy) {
        state.workspace[workspace].workspaceBoards[board].boardColumns[
          column
        ].columnTasks.push(taskToCopy);
      }
    },

    deleteTask: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskId: string;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      const taskToRemove = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        column
      ].columnTasks.splice(taskToRemove, 1);
    },
  },
});

export const {
  addWorkspace,
  showWorkspaceDropdown,
  editWorkspace,
  addBoard,
  addColumn,
  copyColumn,
  deleteColumn,
  addTask,
  deleteTask,
  copyTask,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
