import "../../styles/taskStyles/editTaskComment.css";
import { editTaskComment } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { editHighlight } from "../../redux/features/highlightsSlice";

interface EditTaskCommentInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
  taskComment: string;
  setEditing: (comment: string) => void;
}

const EditTaskCommentForm: React.FC<EditTaskCommentInterface> = ({
  workspaceId,
  boardId,
  columnId,
  taskId,
  taskComment,
  setEditing,
}) => {
  const [newTaskComment, setNewTaskComment] = useState<string>("");

  const dispatch = useDispatch();

  const handleEditHighlight = (taskId: string | undefined, comment: string) => {
    dispatch(
      editHighlight({
        taskId: taskId,
        taskComment: comment,
      })
    );
  };

  const handleDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setNewTaskComment(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleEditHighlight(taskId, newTaskComment);

    dispatch(
      editTaskComment({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
        taskComment: taskComment,
        newComment: newTaskComment,
      })
    );

    setEditing("");
  };

  return (
    <div className="taskCommentFormDiv">
      <form
        className="taskCommentForm"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          className="taskCommentInput"
          value={newTaskComment}
          onChange={handleDescriptionChange}
          type="text"
          name="comment"
          placeholder="Enter new comment"
          autoFocus
        />
      </form>
    </div>
  );
};

export default EditTaskCommentForm;
