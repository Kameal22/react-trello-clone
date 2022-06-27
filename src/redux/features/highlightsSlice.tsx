import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HighlightInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
  taskComment: string;
  taskAuthor: string;
  taskDate: string;
}

interface HighlightsInterface {
  highlights: HighlightInterface[];
}

const initialState: HighlightsInterface = {
  highlights: [],
};

export const highlightsSlice = createSlice({
  name: "Highlights",
  initialState,
  reducers: {
    addHighlight: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskId: string | undefined;
        taskComment: string;
        taskAuthor: string;
        taskDate: string;
      }>
    ) => {
      state.highlights.push(action.payload);
    },

    editHighlight: (
      state,
      action: PayloadAction<{
        taskId: string | undefined;
        taskComment: string;
      }>
    ) => {
      const editedHighlight = state.highlights.map((task) => {
        if (task.taskId === action.payload.taskId) {
          return { ...task, taskComment: action.payload.taskComment };
        }
        return task;
      });

      state.highlights = editedHighlight;
    },

    removeHighlightOnWorkspaceDeleting: (
      state,
      action: PayloadAction<{
        workspaceId: string;
      }>
    ) => {
      const removed = state.highlights.filter(
        (highlight) => highlight.workspaceId !== action.payload.workspaceId
      );

      state.highlights = removed;
    },

    removeHighlightOnBoardDeleting: (
      state,
      action: PayloadAction<{
        boardId: string;
      }>
    ) => {
      const removed = state.highlights.filter(
        (highlight) => highlight.boardId !== action.payload.boardId
      );

      state.highlights = removed;
    },

    removeHighlightOnTaskDeleting: (
      state,
      action: PayloadAction<{
        taskId: string;
      }>
    ) => {
      const removed = state.highlights.filter(
        (highlight) => highlight.taskId !== action.payload.taskId
      );

      state.highlights = removed;
    },

    removeHighlightOnColumnDeleting: (
      state,
      action: PayloadAction<{
        columnId: string | undefined;
      }>
    ) => {
      const removed = state.highlights.filter(
        (highlight) => highlight.columnId !== action.payload.columnId
      );

      state.highlights = removed;
    },

    removeHighlightOnCommentDeleting: (
      state,
      action: PayloadAction<{
        comment: string;
      }>
    ) => {
      const removed = state.highlights.filter(
        (highlight) => highlight.taskComment !== action.payload.comment
      );

      state.highlights = removed;
    },
  },
});

export const {
  addHighlight,
  editHighlight,
  removeHighlightOnWorkspaceDeleting,
  removeHighlightOnBoardDeleting,
  removeHighlightOnTaskDeleting,
  removeHighlightOnColumnDeleting,
  removeHighlightOnCommentDeleting,
} = highlightsSlice.actions;

export default highlightsSlice.reducer;
