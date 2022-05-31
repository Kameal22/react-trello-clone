import "../../styles/taskStyles/task.css";
import { useState } from "react";
import TaskOptionsForm from "../task/TaskOptionsForm";
import TaskDetailsPopUp from "../popups/TaskDetailsPopUp";
import TaskLabelsPopUp from "../popups/TaskLabelsPopUp";
import { TaskCommentsInterface } from "../../interfaces/WorkspaceInterface";

interface TaskProps {
  taskName: string;
  taskId: string;
  taskIndicatorColor: string;
  taskDescription: string;
  taskComments: TaskCommentsInterface[];
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
}

const Task: React.FC<TaskProps> = (props) => {
  const [iconVisibility, setIconVisibility] = useState({ display: "none" });
  const [taskOptions, showTaskOptions] = useState<boolean>(false);
  const [taskDetails, showTaskDetails] = useState<boolean>(false);
  const [taskLabels, showTaskLabels] = useState<boolean>(false);

  const showOptions = () => {
    showTaskOptions(!taskOptions);
  };

  const showLabels = () => {
    showTaskLabels(!taskLabels);
  };

  const showDetails = () => {
    showTaskDetails(!taskDetails);
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
      {props.taskIndicatorColor ? (
        <div
          style={{ background: props.taskIndicatorColor }}
          className="taskDivIndicator"
        ></div>
      ) : null}

      <div onClick={() => showDetails()} className="taskDivName">
        <p
          style={
            props.taskIndicatorColor
              ? { marginTop: ".5vh" }
              : { marginTop: "0" }
          }
          className="taskName"
        >
          {props.taskName}
        </p>
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
          editLabels={showLabels}
          showDetails={showDetails}
        />
      ) : null}

      {taskLabels ? (
        <TaskLabelsPopUp
          workspaceId={props.workspaceId}
          boardId={props.boardId}
          columnId={props.columnId}
          taskId={props.taskId}
          editLabels={showLabels}
          chosenIndicator={props.taskIndicatorColor}
        />
      ) : null}
      {taskDetails ? <TaskDetailsPopUp /> : null}
    </div>
  );
};

export default Task;
