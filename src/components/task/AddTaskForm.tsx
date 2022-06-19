import "../../styles/taskStyles/addTaskForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../../redux/features/WorkspaceSlice";
import { TaskCommentsInterface } from "../../interfaces/WorkspaceInterface";

interface AddTaskInterface {
  addTask: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
}

const AddTaskForm: React.FC<AddTaskInterface> = (props) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskId] = useState<string>(uuidv4());
  const [taskDescription] = useState<string>("");
  const [taskComments] = useState<TaskCommentsInterface[]>([]);
  const [taskColor] = useState<string>("");

  const dispatch = useDispatch();

  const handleTaskNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTaskName(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addTask({
        workspaceId: props.workspaceId,
        boardId: props.boardId,
        columnId: props.columnId,
        taskName,
        taskId,
        taskIndicatorColor: taskColor,
        taskComments,
        taskDescription,
      })
    );
    props.addTask();
  };

  return (
    <div className="addTaskFormDiv">
      <div className="addTaskDiv">
        <form
          className="addTaskForm"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            className="taskNameInput"
            onChange={handleTaskNameChange}
            type="text"
            name="taskName"
            placeholder="Enter a title for this task.."
            autoFocus
          />
          <div className="addTaskButtonIcon">
            <button type="submit">Add Task</button>
            <i
              style={{ fontSize: "1.3em" }}
              onClick={() => props.addTask()}
              className="bi bi-x-lg"
            ></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
