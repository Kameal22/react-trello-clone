import "../../styles/taskStyles/task.css";
import { useEffect, useRef, useState } from "react";
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
  columnName: string;
}

const Task: React.FC<TaskProps> = (props) => {
  const [iconVisibility, setIconVisibility] = useState({ display: "none" });
  const [taskOptions, showTaskOptions] = useState<boolean>(false);
  const [taskDetails, showTaskDetails] = useState<boolean>(false);
  const [taskLabels, showTaskLabels] = useState<boolean>(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  const showOptions = () => {
    showTaskOptions(!taskOptions);
  };

  const showLabels = () => {
    showTaskLabels(!taskLabels);
  };

  const showDetails = () => {
    showTaskDetails(!taskDetails);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!optionsRef.current?.contains(event.target as Node)) {
        showTaskOptions(false);
      }
    });
  });

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

      <div className="taskDivName">
        <p onClick={() => showDetails()} className="taskName">
          {props.taskName}
        </p>
      </div>

      <i
        onClick={() => showOptions()}
        style={iconVisibility}
        className="bi bi-pencil"
        id="cornerIcon"
      ></i>

      <div className="taskIcons">
        {props.taskComments[0] ? <i className="bi bi-chat"></i> : null}
        {props.taskDescription ? <i className="bi bi-justify-left"></i> : null}
      </div>

      {taskOptions ? (
        <TaskOptionsForm
          forwardRef={optionsRef}
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
      {taskDetails ? (
        <TaskDetailsPopUp
          workspaceId={props.workspaceId}
          boardId={props.boardId}
          columnId={props.columnId}
          taskId={props.taskId}
          taskName={props.taskName}
          taskIndicator={props.taskIndicatorColor}
          taskComments={props.taskComments}
          columnName={props.columnName}
          showTaskDetails={showDetails}
          taskDescription={props.taskDescription}
        />
      ) : null}
    </div>
  );
};

export default Task;
