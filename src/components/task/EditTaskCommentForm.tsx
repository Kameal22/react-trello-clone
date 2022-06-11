import "../../styles/taskStyles/editTaskComment.css";
import { editTaskComment } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface EditTaskCommentInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
  taskComment: string;
  setEditing: (comment: string) => void;
}

const EditTaskCommentForm: React.FC<EditTaskCommentInterface> = (props) => {
  const [taskComment, setTaskComment] = useState<string>("");

  const dispatch = useDispatch();

  const handleDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setTaskComment(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(editTaskComment({
      workspaceId: props.workspaceId,
      boardId: props.boardId,
      columnId: props.columnId,
      taskId: props.taskId,
      taskComment: props.taskComment,
      newComment: taskComment
    }))

    props.setEditing("")
  }

  return (
    <div className="taskCommentFormDiv">
      <form
        className="taskCommentForm"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          className="taskCommentInput"
          value={taskComment}
          onChange={handleDescriptionChange}
          type="text"
          name="comment"
          placeholder="Enter new comment"
        />
      </form>
    </div>
  );
};

export default EditTaskCommentForm;
