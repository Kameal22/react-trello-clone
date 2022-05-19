export interface BoardTaskInterface {
  taskName: string;
  taskId: string;
  tasksColumnId: string;
  taskIndicatorColor: string;
}

export interface BoardColumnInterface {
  columnName: string;
  columndId: string;
  boardId: string;
  workspaceId: string;
  columnTasks: BoardTaskInterface[];
}

export interface BoardInterface {
  boardName: string;
  boardId: string;
  boardWorkspace: string;
  boardBackground: string;
  boardColumns: BoardColumnInterface[];
}

export interface WorkspaceInterface {
  workspaceName: string;
  workspaceDescription: string;
  workspaceDate: string;
  workspaceMember: string;
  workspaceId: string;
  workspaceBoards: BoardInterface[];
  workspaceLandingPageMenu: boolean;
}
