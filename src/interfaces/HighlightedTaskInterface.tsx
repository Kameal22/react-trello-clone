export interface HighlightedTaskInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
  taskComment: string;
  taskAuthor: string;
}
