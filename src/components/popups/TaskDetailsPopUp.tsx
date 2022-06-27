import { useState, useRef } from "react";
import "../../styles/popUpStyles/taskDetailsPopUp.css";
import TaskCommentForm from "../task/TaskCommentForm";
import TaskDescriptionForm from "../task/TaskDescriptionForm";
import { TaskCommentsInterface } from "../../interfaces/WorkspaceInterface";
import { RootState } from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTaskComment,
  editTask,
} from "../../redux/features/WorkspaceSlice";
import EditTaskCommentForm from "../task/EditTaskCommentForm";
import CreateLabelPopUp from "./SpecialLabelPopUp";
import useClickOutside from "../hooks/useClickOutside";

interface TaskDetailsInterface {
  showTaskDetails: () => void;
  taskName: string;
  taskIndicator: string;
  taskDescription: string;
  taskComments: TaskCommentsInterface[];
  columnName: string | undefined;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const TaskDetailsPopUp: React.FC<TaskDetailsInterface> = (props) => {
  const [commentToEdit, setCommentToEdit] = useState<string>("");
  const [labelCreating, setLabelCreating] = useState<boolean>(false);
  const [description, setDescription] = useState<boolean>(false);
  const [editingTaskName, setEditingTaskName] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>(props.taskName);

  const dispatch = useDispatch();

  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const taskNameRef = useRef<HTMLFormElement>(null);

  const handleTaskNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTaskName(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      editTask({
        workspaceId: props.workspaceId,
        boardId: props.boardId,
        columnId: props.columnId,
        taskId: props.taskId,
        newTask: taskName,
      })
    );

    setEditingTaskName(!editingTaskName);
  };

  const setCreating = () => {
    setLabelCreating(!labelCreating);
  };

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

  const showDescriptionForm = () => {
    setDescription(!description);
  };

  useClickOutside(taskDescriptionRef, () => setDescription(false));
  useClickOutside(taskNameRef, () => setEditingTaskName(false));

  return (
    <div ref={props.forwardRef} className="taskDetailsDiv">
      <div className="taskDetailsName">
        {editingTaskName ? (
          <form
            ref={taskNameRef}
            className="editTaskNameForm"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {" "}
            <input
              value={taskName}
              className="editTaskNameInput"
              onChange={handleTaskNameChange}
              type="text"
              name="taskName"
            />
          </form>
        ) : (
          <p onClick={() => setEditingTaskName(!editingTaskName)}>
            {props.taskName}
          </p>
        )}

        <i
          id="cornerIcon"
          onClick={() => props.showTaskDetails()}
          className="bi bi-x"
        ></i>
      </div>

      <p className="taskDetailsListName">
        In column: <span>{props.columnName}</span>
      </p>

      <div className="taskDetailsLabel">
        <p>Label</p>
        <div className="taskDetailsLabelDivs">
          <div
            style={{ background: props.taskIndicator }}
            className="taskDetailsLabelDivWithColor"
          ></div>
          <div
            onClick={() => setLabelCreating(!labelCreating)}
            className="taskDetailAddLabelDiv"
          >
            <i id="addLabelPlus" className="bi bi-plus-lg"></i>
          </div>
        </div>

        {labelCreating ? (
          <CreateLabelPopUp
            workspaceId={props.workspaceId}
            boardId={props.boardId}
            columnId={props.columnId}
            taskId={props.taskId}
            setCreating={setCreating}
          />
        ) : null}
      </div>

      <div className="taskDetailsDescriptionDiv">
        <p className="taskDetailsDescriptionHeading">Description</p>
        {description ? (
          <TaskDescriptionForm
            showForm={showDescriptionForm}
            workspaceId={props.workspaceId}
            boardId={props.boardId}
            columnId={props.columnId}
            taskId={props.taskId}
            forwardRef={taskDescriptionRef}
          />
        ) : (
          <div>
            {props.taskDescription !== "" ? (
              <p
                onClick={() => showDescriptionForm()}
                className="taskDetailsDescription"
              >
                {props.taskDescription}
              </p>
            ) : (
              <p
                onClick={() => showDescriptionForm()}
                className="taskDetailsDescriptionEnter"
              >
                Enter task description
              </p>
            )}
          </div>
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
            <div key={comment.columnId} className="taskDetailsWholeCommentDiv">
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
              {commentToEdit === comment.taskComment ? (
                <EditTaskCommentForm
                  workspaceId={props.workspaceId}
                  boardId={props.boardId}
                  columnId={props.columnId}
                  taskId={props.taskId}
                  taskComment={comment.taskComment}
                  setEditing={() => setCommentToEdit("")}
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
                  onClick={() => setCommentToEdit(comment.taskComment)}
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
