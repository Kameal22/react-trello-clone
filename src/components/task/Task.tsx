import "../../styles/taskStyles/task.css";
import { useEffect, useRef, useState } from "react";
import TaskOptionsForm from "../task/TaskOptionsForm";
import TaskDetailsPopUp from "../popups/TaskDetailsPopUp";
import TaskLabelsPopUp from "../popups/TaskLabelsPopUp";
import { TaskCommentsInterface } from "../../interfaces/WorkspaceInterface";
import { Draggable } from "react-beautiful-dnd";
import useClickOutside from "../hooks/useClickOutside";

interface TaskProps {
  taskName: string;
  taskId: string;
  taskIndicatorColor: string;
  taskDescription: string;
  taskComments: TaskCommentsInterface[];
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  columnName: string | undefined;
  index: number;
}

const Task: React.FC<TaskProps> = ({
  taskName,
  taskId,
  taskIndicatorColor,
  taskDescription,
  taskComments,
  workspaceId,
  boardId,
  columnId,
  columnName,
  index,
}) => {
  const [iconVisibility, setIconVisibility] = useState({ display: "none" });
  const [taskOptions, showTaskOptions] = useState<boolean>(false);
  const [taskDetails, showTaskDetails] = useState<boolean>(false);
  const [taskLabels, showTaskLabels] = useState<boolean>(false);

  const optionsRef = useRef<HTMLDivElement>(null);
  const taskLabelsRef = useRef<HTMLDivElement>(null);
  const taskDetailsRef = useRef<HTMLDivElement>(null);

  const showOptions = () => {
    showTaskOptions(!taskOptions);
  };

  const showLabels = () => {
    showTaskLabels(!taskLabels);
  };

  const showDetails = () => {
    showTaskDetails(!taskDetails);
  };

  useClickOutside(optionsRef, () => showTaskOptions(false))
  useClickOutside(taskLabelsRef, () => showTaskLabels(false))
  useClickOutside(taskDetailsRef, () => showTaskDetails(false))

  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onMouseEnter={(e) => {
              setIconVisibility({ display: "block" });
            }}
            onMouseLeave={(e) => {
              setIconVisibility({ display: "none" });
            }}
            className="taskDiv"
          >
            {taskIndicatorColor ? (
              <div
                style={{ background: taskIndicatorColor }}
                className="taskDivIndicator"
              ></div>
            ) : null}

            <div className="taskDivName">
              <p onClick={() => showDetails()} className="taskName">
                {taskName}
              </p>
            </div>

            <i
              onClick={() => showOptions()}
              style={iconVisibility}
              className="bi bi-pencil"
              id="cornerIcon"
            ></i>

            <div className="taskIcons">
              {taskComments[0] ? <i className="bi bi-chat"></i> : null}
              {taskDescription ? <i className="bi bi-justify-left"></i> : null}
            </div>
          </div>
        )}
      </Draggable>

      {taskOptions ? (
        <TaskOptionsForm
          forwardRef={optionsRef}
          workspaceId={workspaceId}
          boardId={boardId}
          columnId={columnId}
          taskId={taskId}
          showForm={showOptions}
          editLabels={showLabels}
          showDetails={showDetails}
        />
      ) : null}

      {taskDetails ? (
        <TaskDetailsPopUp
          forwardRef={taskDetailsRef}
          workspaceId={workspaceId}
          boardId={boardId}
          columnId={columnId}
          taskId={taskId}
          taskName={taskName}
          taskIndicator={taskIndicatorColor}
          taskComments={taskComments}
          columnName={columnName}
          showTaskDetails={showDetails}
          taskDescription={taskDescription}
        />
      ) : null}

      {taskLabels ? (
        <TaskLabelsPopUp
          forwardRef={taskLabelsRef}
          workspaceId={workspaceId}
          boardId={boardId}
          columnId={columnId}
          taskId={taskId}
          editLabels={showLabels}
          chosenIndicator={taskIndicatorColor}
        />
      ) : null}
    </>
  );
};

export default Task;
