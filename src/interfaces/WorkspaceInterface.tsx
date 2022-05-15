export interface WorkspaceInterface {
  workspaceName: string;
  workspaceDescription: string;
  workspaceDate: string;
  workspaceMember: string;
  workspaceId: string;
  workspaceBoards: [{ boardName: string, boardId: string, boardWorkspace: string, boardBackground: string }] | undefined;
  workspaceLandingPageMenu: boolean;
}
