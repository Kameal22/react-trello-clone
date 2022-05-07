export interface WorkspaceInterface {
  workspaceName: string;
  workspaceDescription: string;
  workspaceDate: string;
  workspaceMember: string;
  workspaceId: number;
  workspaceBoards: [{ boardName: string }] | undefined;
  workspaceLandingPageMenu: boolean;
}
