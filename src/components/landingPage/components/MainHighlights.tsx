import "../../../styles/mainSectionStyles/mainHighlights.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { HighlightedTaskContext } from "../../../context/highlightedTaskContext";
import { HighlightedTaskInterface } from "../../../interfaces/HighlightedTaskInterface";

const MainHighlights: React.FC = () => {
  const [taskToShow, setTaskToShow] = useState<HighlightedTaskInterface>();

  const highlightedTasks = useContext(HighlightedTaskContext);

  useEffect(() => {
    const randomizedTask =
      highlightedTasks[Math.floor(Math.random() * highlightedTasks.length)];

    setTaskToShow(randomizedTask);
  }, [highlightedTasks]);

  return (
    <div className="mainSectionHighlightsDiv">
      <h3>Highlights</h3>

      <div className="highlightsInfo">
        <p className="highlightsInfoDescription">
          Stay up to date with activity from your Workspaces and boards.
        </p>
      </div>

      {taskToShow && (
        <div className="highlight">
          <p className="highlightUser">{taskToShow.taskAuthor}</p>
          <div
            style={{
              background: taskToShow.taskColor,
              width: "40px",
              height: "10px",
              borderRadius: "5px",
              marginTop: "1vh",
            }}
            className="highlightLabel"
          ></div>
          <p className="highlightMessage">{taskToShow.task}</p>
          {/* <Link
            className="workspaceMenuLink"
            to={`/board/${taskToShow.workspaceName}/${taskToShow?.boardId}`}
          >
            <p className="highlightBoardInfo">
              <span>from</span>: {taskToShow?.board} <span>board</span>
            </p>
          </Link> */}
        </div>
      )}
    </div>
  );
};

export default MainHighlights;
