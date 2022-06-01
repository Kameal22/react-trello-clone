import { useState } from "react";
import "../../styles/popUpStyles/taskDetailsPopUp.css";
import TaskDescriptionForm from "../task/TaskDescriptionForm";

interface TaskDetailsInterface {
  showTaskDetails: () => void;
  taskName: string;
  taskIndicator: string;
  taskDescription: string;
  columnName: string;
}

const TaskDetailsPopUp: React.FC<TaskDetailsInterface> = (props) => {
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
        {props.taskDescription ? (
          <p className="taskDetailsDescription">
            Description goes here look its very cool OR FORM to enter a
            description.
          </p>
        ) : (
          <TaskDescriptionForm />
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
