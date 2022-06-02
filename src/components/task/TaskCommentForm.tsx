import "../../styles/taskStyles/taskCommentForm.css";
import { addTaskComment } from "../../redux/features/WorkspaceSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import { date } from "../../utils/GetDate";

interface TaskCommentFormInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
}

const TaskCommentForm: React.FC<TaskCommentFormInterface> = (props) => {
  const [taskComment, setTaskComment] = useState<string>("");

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.users.user);

  const handleCommentChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTaskComment(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      addTaskComment({
        workspaceId: props.workspaceId,
        boardId: props.boardId,
        columnId: props.columnId,
        taskId: props.taskId,
        taskComment,
        taskAuthor: user.name,
        taskDate: date,
      })
    );
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
          value={taskComment}
          onChange={handleCommentChange}
          type="text"
          name="comment"
          placeholder="Write a comment.."
        />
      </form>
    </div>
  );
};

export default TaskCommentForm;
