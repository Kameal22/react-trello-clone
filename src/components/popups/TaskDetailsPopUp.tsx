import { useState, useRef, useContext } from "react";
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
import UseClickOutside from "../../hooks/UseClickOutside";
import { handleEditHighlight } from "../../utils/SetHighlightedTask";
import { useSetHT } from "../../context/highlightedTaskContext";
import { HighlightedTaskContext } from "../../context/highlightedTaskContext";

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

const TaskDetailsPopUp: React.FC<TaskDetailsInterface> = ({
  showTaskDetails,
  taskName,
  taskIndicator,
  taskDescription,
  taskComments,
  columnName,
  workspaceId,
  boardId,
  columnId,
  taskId,
  forwardRef,
}) => {
  const [commentToEdit, setCommentToEdit] = useState<string>("");
  const [labelCreating, setLabelCreating] = useState<boolean>(false);
  const [description, setDescription] = useState<boolean>(false);
  const [editingTaskName, setEditingTaskName] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>(taskName);

  const highlights = useContext(HighlightedTaskContext);
  const setHighlights = useSetHT();
  const dispatch = useDispatch();

  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const taskNameRef = useRef<HTMLFormElement>(null);

  const handleTaskNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setNewTaskName(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      editTask({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
        newTask: taskName,
      })
    );
    handleEditHighlight(highlights, taskId, taskName, setHighlights);
    setEditingTaskName(!editingTaskName);
  };

  const setCreating = () => {
    setLabelCreating(!labelCreating);
  };

  const deleteComment = (taskComment: string) => {
    dispatch(
      deleteTaskComment({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
        taskComment,
      })
    );
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const shownWorkspace = workspaces.find((workspace) => {
    return workspace.workspaceId === workspaceId;
  });

  const showDescriptionForm = () => {
    setDescription(!description);
  };

  UseClickOutside(taskDescriptionRef, () => setDescription(false));
  UseClickOutside(taskNameRef, () => setEditingTaskName(false));

  return (
    <div ref={forwardRef} className="taskDetailsDiv">
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
          <p onClick={() => setEditingTaskName(!editingTaskName)}>{taskName}</p>
        )}

        <i
          id="cornerIcon"
          onClick={() => showTaskDetails()}
          className="bi bi-x"
        ></i>
      </div>

      <p className="taskDetailsListName">
        In column: <span>{columnName}</span>
      </p>

      <div className="taskDetailsLabel">
        <p>Label</p>
        <div className="taskDetailsLabelDivs">
          <div
            style={{ background: taskIndicator }}
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
            workspaceId={workspaceId}
            boardId={boardId}
            columnId={columnId}
            taskId={taskId}
            setCreating={setCreating}
          />
        ) : null}
      </div>

      <div className="taskDetailsDescriptionDiv">
        <p className="taskDetailsDescriptionHeading">Description</p>
        {description ? (
          <TaskDescriptionForm
            showForm={showDescriptionForm}
            workspaceId={workspaceId}
            boardId={boardId}
            columnId={columnId}
            taskId={taskId}
            forwardRef={taskDescriptionRef}
          />
        ) : (
          <div>
            {taskDescription !== "" ? (
              <p
                onClick={() => showDescriptionForm()}
                className="taskDetailsDescription"
              >
                {taskDescription}
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
          workspaceId={workspaceId}
          boardId={boardId}
          columnId={columnId}
          taskId={taskId}
        />

        {taskComments.map((comment) => {
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
                  workspaceId={workspaceId}
                  boardId={boardId}
                  columnId={columnId}
                  taskId={taskId}
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
