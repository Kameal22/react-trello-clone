import { useState } from "react";
import "../../styles/popUpStyles/taskDetailsPopUp.css";
import TaskDescriptionForm from "../task/TaskDescriptionForm";

interface TaskDetailsInterface {
  showTaskDetails: () => void;
  taskName: string;
  taskIndicator: string;
  taskDescription: string;
  columnName: string;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
}

const TaskDetailsPopUp: React.FC<TaskDetailsInterface> = (props) => {
  const [taskDescriptionForm, setTaskDescriptionForm] =
    useState<boolean>(false);

  const showDescriptionForm = () => {
    setTaskDescriptionForm(!taskDescriptionForm);
  };

  return (
    <div className="taskDetailsDiv">
      <div className="taskDetailsName">
        <p>{props.taskName}</p>
        <i onClick={() => props.showTaskDetails()} className="bi bi-x"></i>
      </div>

      <p className="taskDetailsListName">
        In column: <span>{props.columnName}</span>
      </p>

      <div className="taskDetailsLabel">
        <p>Label</p>
        <div
          style={{ background: props.taskIndicator }}
          className="taskDetailsLabelDivWithColor"
        ></div>
      </div>

      <div className="taskDetailsDescriptionDiv">
        <p className="taskDetailsDescriptionHeading">Description</p>
        {taskDescriptionForm ? (
          <div>
            <p
              onClick={() => showDescriptionForm()}
              className="taskDetailsDescription"
            >
              {props.taskDescription}
            </p>
          </div>
        ) : (
          <TaskDescriptionForm
            workspaceId={props.workspaceId}
            boardId={props.boardId}
            columnId={props.columnId}
            taskId={props.taskId}
            showForm={showDescriptionForm}
          />
        )}
      </div>

      <div className="taskDetailsActivityDiv">
        <p className="taskDetailsActivityHeading">Activity</p>
        <p className="taskDetailsActivityComment">
          Here is a comment on this task OR input to enter one. Each comment
          should be a separate component with some logic like deleting etc.
        </p>
      </div>
    </div>
  );
};

export default TaskDetailsPopUp;
