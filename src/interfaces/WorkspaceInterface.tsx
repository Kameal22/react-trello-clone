export interface TaskCommentsInterface {
  commentAuthor: string;
  commentDate: string;
  comment: string;
}

export interface BoardTaskInterface {
  taskName: string;
  taskId: string;
  taskIndicatorColor: string;
  taskDescription: string;
  taskComments: TaskCommentsInterface[];
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
}

export interface BoardColumnInterface {
  columnName: string;
  columnId: string | undefined;
  boardId: string | undefined;
  workspaceId: string | undefined;
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
  workspaceLetterColor: string;
  workspaceDate: string;
  workspaceMember: string;
  workspaceId: string;
  workspaceBoards: BoardInterface[];
  workspaceLandingPageMenu: boolean;
}
