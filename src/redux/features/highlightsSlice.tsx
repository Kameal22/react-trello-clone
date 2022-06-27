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
    // I need whole object here to define routes to this specific board that it comes from.
  },
});

export const { addHighlight } = highlightsSlice.actions;

export default highlightsSlice.reducer;
