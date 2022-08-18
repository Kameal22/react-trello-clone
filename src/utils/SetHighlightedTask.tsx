import { HighlightedTaskInterface } from "../interfaces/HighlightedTaskInterface";

export const handleSetHighlightedTask = (
  highlights: HighlightedTaskInterface[],
  workspaceId: string | undefined,
  boardId: string | undefined,
  columnId: string | undefined,
  taskId: string | undefined,
  taskAuthor: string,
  task: string,
  setHighlightedTask: React.Dispatch<
    React.SetStateAction<HighlightedTaskInterface[]>
  >
) => {
  if (!highlights.some((task) => task.taskId === taskId)) {
    setHighlightedTask((ht) => [
      ...ht,
      {
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
        taskAuthor: taskAuthor,
        task: task,
      },
    ]);
  }
};

export const addLabelToHighlightedTask = (
  highlights: HighlightedTaskInterface[],
  taskId: string | undefined,
  label: string,
  setHighlightedTask: React.Dispatch<
    React.SetStateAction<HighlightedTaskInterface[]>
  >
) => {
  const chosenLabel = highlights.map((task) => {
    if (task.taskId === taskId) {
      return { ...task, taskColor: label };
    }
    return task;
  });

  setHighlightedTask(chosenLabel);
};
// Add separate function for adding color to highlighted task. Initialy it doesnt have one.
