import "../../../styles/mainSectionStyles/mainHighlights.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface TaskToShowInterface {
  message: string;
  label: string | undefined;
  board: string | undefined;
  boardId: string | undefined;
  user: string | undefined;
  workspaceName: string | undefined;
}

const MainHighlights: React.FC = () => {
  const [taskToShow, setTaskToShow] = useState<TaskToShowInterface>();

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const highlights = useSelector(
    (state: RootState) => state.highlight.highlights
  );

  useEffect(() => {
    if (highlights.length < 1) return;

    const taskComment =
      highlights[Math.floor(Math.random() * highlights.length)];

    const tasksWorkspace = workspaces.find(
      (workspace) => workspace.workspaceId === taskComment.workspaceId
    );

    const tasksBoard = tasksWorkspace?.workspaceBoards.find(
      (board) => board.boardId === taskComment.boardId
    );

    const taskColumn = tasksBoard?.boardColumns.find(
      (column) => column.columnId === taskComment.columnId
    );

    const tasks = taskColumn?.columnTasks.find(
      (task) => task.taskId === task.taskId
    );

    const message = taskComment?.taskComment;
    const label = tasks?.taskIndicatorColor;
    const board = tasksBoard?.boardName;
    const user = tasksWorkspace?.workspaceMember;
    const boardId = tasksBoard?.boardId;
    const workspaceName = tasksWorkspace?.workspaceName;

    const wholeTask = { workspaceName, boardId, board, user, label, message };

    setTaskToShow(wholeTask);
  }, []);

  return (
    <div className="mainSectionHighlightsDiv">
      <h3>Highlights</h3>

      <div className="highlightsInfo">
        <p className="highlightsInfoDescription">
          Stay up to date with activity from your Workspaces and boards.
        </p>
      </div>

      {taskToShow?.message !== undefined ? (
        <div className="highlight">
          <p className="highlightUser">{taskToShow.user}</p>
          <div
            style={{
              background: taskToShow?.label,
              width: "40px",
              height: "10px",
              borderRadius: "5px",
              marginTop: "1vh",
            }}
            className="highlightLabel"
          ></div>
          <p className="highlightMessage">{taskToShow?.message}</p>
          <Link
            className="workspaceMenuLink"
            to={`/board/${taskToShow.workspaceName}/${taskToShow?.boardId}`}
          >
            <p className="highlightBoardInfo">
              <span>from</span>: {taskToShow?.board} <span>board</span>
            </p>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default MainHighlights;
