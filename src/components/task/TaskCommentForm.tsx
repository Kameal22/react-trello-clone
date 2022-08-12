import "../../styles/taskStyles/taskCommentForm.css";
import { addTaskComment } from "../../redux/features/WorkspaceSlice";
import { addHighlight } from "../../redux/features/highlightsSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import { date } from "../../utils/GetDate";
import useInputState from "../../hooks/useInputState";

interface TaskCommentFormInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
}

const TaskCommentForm: React.FC<TaskCommentFormInterface> = (props) => {
  const [taskComment, setTaskComment, , , reset] = useInputState('');

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.users.user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      addHighlight({
        workspaceId: props.workspaceId,
        boardId: props.boardId,
        columnId: props.columnId,
        taskId: props.taskId,
        taskComment,
        taskAuthor: user.name,
        taskDate: date,
      })
    );

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
    reset()
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
          onChange={setTaskComment}
          type="text"
          name="comment"
          placeholder="Write a comment.."
        />
      </form>
    </div>
  );
};

export default TaskCommentForm;
