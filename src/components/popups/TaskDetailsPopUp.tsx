import { useState } from "react";
import "../../styles/popUpStyles/taskDetailsPopUp.css";
import TaskCommentForm from "../task/TaskCommentForm";
import TaskDescriptionForm from "../task/TaskDescriptionForm";
import { TaskCommentsInterface } from "../../interfaces/WorkspaceInterface";
import { RootState } from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { deleteTaskComment } from "../../redux/features/WorkspaceSlice";
import EditTaskCommentForm from "../task/EditTaskCommentForm";

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
  const [commentEditting, setCommentEdditing] = useState<boolean>(false);
  const dispatch = useDispatch();

  const deleteComment = (taskComment: string) => {
    dispatch(
      deleteTaskComment({
        workspaceId: props.workspaceId,
        boardId: props.boardId,
        columnId: props.columnId,
        taskId: props.taskId,
        taskComment,
      })
    );
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const shownWorkspace = workspaces.find((workspace) => {
    return workspace.workspaceId === props.workspaceId;
  });

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
        {props.taskDescription.length > 0 ? (
          <div>
            <p className="taskDetailsDescription">{props.taskDescription}</p>
          </div>
        ) : (
          <TaskDescriptionForm
            workspaceId={props.workspaceId}
            boardId={props.boardId}
            columnId={props.columnId}
            taskId={props.taskId}
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
              {commentEditting ? (
                <EditTaskCommentForm
                  workspaceId={props.workspaceId}
                  boardId={props.boardId}
                  columnId={props.columnId}
                  taskId={props.taskId}
                  taskComment={comment.taskComment}
                />
              ) : (
                <div className="taskDetailsActivityCommentDiv">
                  <p className="taskDetailsActivityComment">
                    {comment.taskComment}
                  </p>
                </div>
              )}

              <div className="taskDetailsActivityCommentEditDelete">
                <p
                  onClick={() => setCommentEdditing(true)}
                  className="commentEdit"
                >
                  Edit
                </p>
                <p
                  onClick={() => deleteComment(comment.taskComment)}
                  className="commentDelete"
                >
                  Delete
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskDetailsPopUp;
