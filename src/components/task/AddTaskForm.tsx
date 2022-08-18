import "../../styles/taskStyles/addTaskForm.css";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../../redux/features/WorkspaceSlice";
import { TaskCommentsInterface } from "../../interfaces/WorkspaceInterface";
import useInputState from "../../hooks/useInputState";
import { useSetHT } from "../../context/highlightedTaskContext";
import { HighlightedTaskContext } from "../../context/highlightedTaskContext";
import { handleSetHighlightedTask } from "../../utils/SetHighlightedTask";

interface AddTaskInterface {
  addTask: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const AddTaskForm: React.FC<AddTaskInterface> = (props) => {
  const [taskName, setTaskName, , , error, setError] = useInputState("");
  const [taskId] = useState<string>(uuidv4());
  const [taskDescription] = useState<string>("");
  const [taskComments] = useState<TaskCommentsInterface[]>([]);
  const [taskColor] = useState<string>("");

  const setHighlight = useSetHT();
  const highlights = useContext(HighlightedTaskContext);

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskName === "") {
      setError("Can't add an empty task");
    } else {
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
      handleSetHighlightedTask(
        highlights,
        props.workspaceId,
        props.boardId,
        props.columnId,
        taskId,
        "Author",
        taskName,
        setHighlight
      );
    }
  };

  return (
    <div ref={props.forwardRef} className="addTaskFormDiv">
      <div className="addTaskDiv">
        <form
          className="addTaskForm"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            className="taskNameInput"
            onChange={setTaskName}
            type="text"
            name="taskName"
            placeholder="Enter a title for this task"
            autoFocus
          />
          {error && <p className="error">{error}</p>}
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
