import "../../styles/taskStyles/task.css";
import { useState } from "react";
import TaskOptionsForm from "../task/TaskOptionsForm";
import TaskDetailsPopUp from "../../utils/TaskDetailsPopUp";

interface TaskProps {
  taskName: string;
  taskId: string;
  taskIndicatorColor: string;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
}

const Task: React.FC<TaskProps> = (props) => {
  const [iconVisibility, setIconVisibility] = useState({ display: "none" });
  const [taskOptions, showTaskOptions] = useState<boolean>(false);
  const [taskDetails, showTaskDetails] = useState<boolean>(false);

  const showOptions = () => {
    showTaskOptions(!taskOptions);
  };

  return (
    <div
      onMouseEnter={(e) => {
        setIconVisibility({ display: "block" });
      }}
      onMouseLeave={(e) => {
        setIconVisibility({ display: "none" });
      }}
      className="taskDiv"
    >
      <div
        onClick={() => showTaskDetails(!taskDetails)}
        className="taskDivNameAndColor"
      >
        <p>{props.taskName}</p>
      </div>

      <i
        onClick={() => showOptions()}
        style={iconVisibility}
        className="bi bi-pencil"
      ></i>

      {taskOptions ? (
        <TaskOptionsForm
          workspaceId={props.workspaceId}
          boardId={props.boardId}
          columnId={props.columnId}
          taskId={props.taskId}
          showForm={showOptions}
        />
      ) : null}

      {taskDetails ? <TaskDetailsPopUp /> : null}
    </div>
  );
};

export default Task;
