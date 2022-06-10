import "../../styles/mainSectionStyles/mainSectionHighlights.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useState, useEffect } from "react";

interface TaskToShowInterface {
  message: string;
  label: string;
  board: string;
  user: string;
}

const MainSectionHighlights: React.FC = () => {
  const [taskToShow, setTaskToShow] = useState<TaskToShowInterface>();

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const highlightedWorkspace =
    workspaces[Math.floor(Math.random() * workspaces.length)];

  useEffect(() => {
    if (!highlightedWorkspace) {
      return;
    }

    const highlightedBoard =
      highlightedWorkspace.workspaceBoards[
        Math.floor(Math.random() * highlightedWorkspace.workspaceBoards.length)
      ];

    const highlightedColumn =
      highlightedBoard.boardColumns[
        Math.floor(Math.random() * highlightedBoard.boardColumns.length)
      ];

    const highlightedTask =
      highlightedColumn.columnTasks[
        Math.floor(Math.random() * highlightedColumn.columnTasks.length)
      ];

    const label = highlightedTask.taskIndicatorColor;
    const message = highlightedTask.taskName;
    const board = highlightedBoard.boardName;
    const user = highlightedWorkspace.workspaceMember;

    const wholeTask = { label, message, board, user };

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

      {highlightedWorkspace ? (
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
          <p className="highlightBoardInfo">
            <span>from</span>: {taskToShow?.board}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default MainSectionHighlights;
