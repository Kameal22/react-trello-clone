import "../../../styles/mainSectionStyles/mainHighlights.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface TaskToShowInterface {
  message: string;
  label: string;
  board: string;
  boardId: string;
  user: string;
  workspace: string;
}

const MainHighlights: React.FC = () => {
  const [taskToShow, setTaskToShow] = useState<TaskToShowInterface>();

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const highlightedWorkspaces =
    workspaces.filter(workspace => workspace.workspaceBoards.length > 0)

  const highlightedWorkspace = highlightedWorkspaces[Math.floor(Math.random() * highlightedWorkspaces.length)]

  const highlightedBoards = highlightedWorkspace.workspaceBoards.filter(board => board.boardColumns.length > 0)

  const highlightedBoard = highlightedBoards[Math.floor(Math.random() * highlightedBoards.length)]

  const highlightedColumns = highlightedBoard.boardColumns.filter(column => column.columnTasks.length > 0)

  const highlightedColumn = highlightedColumns[Math.floor(Math.random() * highlightedColumns.length)];

  const highlightedTasks = highlightedColumn.columnTasks.filter(task => task.taskName !== undefined)

  const highlightedTask = highlightedTasks[Math.floor(Math.random() * highlightedTasks.length)]

  useEffect(() => {

    const label = highlightedTask?.taskIndicatorColor;
    const message = highlightedTask?.taskName;
    const board = highlightedBoard?.boardName;
    const user = highlightedWorkspace?.workspaceMember;
    const boardId = highlightedBoard?.boardId;
    const workspace = highlightedWorkspace?.workspaceName;

    const wholeTask = { label, message, board, user, boardId, workspace };

    setTaskToShow(wholeTask);
  }, [highlightedWorkspace]);

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
          <p className="highlightUser">{taskToShow?.user}</p>
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
            to={`/board/${taskToShow?.workspace}/${taskToShow?.boardId}`}
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
