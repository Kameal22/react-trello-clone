export interface WorkspaceInterface {
  workspaceName: string;
  workspaceDescription: string;
  workspaceDate: string;
  workspaceMember: string;
  workspaceId: string;
  workspaceBoards: [{ boardName: string }] | undefined;
  workspaceLandingPageMenu: boolean;
}
