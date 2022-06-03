import { useState } from "react";
import "../../styles/popUpStyles/taskDetailsPopUp.css";
import TaskCommentForm from "../task/TaskCommentForm";
import TaskDescriptionForm from "../task/TaskDescriptionForm";
import { TaskCommentsInterface } from "../../interfaces/WorkspaceInterface";
import { RootState } from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";

interface TaskDetailsInterface {
  showTaskDetails: () => void;
  taskName: string;
  taskIndicator: string;
  taskDescription: string;
  taskComments: TaskCommentsInterface[];
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

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const shownWorkspace = workspaces.find((workspace) => {
    return workspace.workspaceId === props.workspaceId;
  });

  console.log(taskDescriptionForm);
  console.log(props.taskDescription);

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
        {!taskDescriptionForm ? (
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

        <TaskCommentForm
          workspaceId={props.workspaceId}
          boardId={props.boardId}
          columnId={props.columnId}
          taskId={props.taskId}
        />
        {props.taskComments.map((comment) => {
          return (
            <div className="taskDetailsWholeCommentDiv">
              <div className="taskDetailsCommentAuthorAndDate">
                {comment.taskAuthor ? (
                  <p className="commentAuthor">{comment.taskAuthor}</p>
                ) : (
                  <p className="commentAuthor">
                    {shownWorkspace?.workspaceMember}
                  </p>
                )}
                <p className="commentDate">{comment.taskDate}</p>
              </div>
              <div className="taskDetailsActivityCommentDiv">
                <p className="taskDetailsActivityComment">
                  {comment.taskComment}
                </p>
              </div>

              <div className="taskDetailsActivityCommentEditDelete">
                <p className="commentEdit">Edit</p>
                <p className="commentDelete">Delete</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskDetailsPopUp;
