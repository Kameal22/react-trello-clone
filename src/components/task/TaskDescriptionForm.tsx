import "../../styles/taskStyles/taskDescriptionForm.css";
import { useState } from "react";
import { addTaskDescription } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";

interface TaskDescriptionFormInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
  showForm: () => void;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const TaskDescriptionForm: React.FC<TaskDescriptionFormInterface> = (props) => {
  const [taskDescription, setTaskDescription] = useState<string>("");

  const dispatch = useDispatch();

  const handleDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setTaskDescription(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      addTaskDescription({
        workspaceId: props.workspaceId,
        boardId: props.boardId,
        columnId: props.columnId,
        taskId: props.taskId,
        taskDescription,
      })
    );
    props.showForm();
  };

  return (
    <div ref={props.forwardRef} className="taskDescriptionFormDiv">
      <form
        className="taskDescriptionForm"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          className="taskDescriptionInput"
          value={taskDescription}
          onChange={handleDescriptionChange}
          type="text"
          name="description"
          placeholder="Enter description"
        />
      </form>
    </div>
  );
};

export default TaskDescriptionForm;
