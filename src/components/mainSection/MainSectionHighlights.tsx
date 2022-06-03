import "../../styles/mainSectionStyles/mainSectionHighlights.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

const MainSectionHighlights: React.FC = () => {
  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  // const highlightedWorkspace =
  //   workspaces[Math.floor(Math.random() * workspaces.length)];

  // const highlightedBoard =
  //   highlightedWorkspace.workspaceBoards[
  //     Math.floor(Math.random() * highlightedWorkspace.workspaceBoards.length)
  //   ];

  // const highlightedColumn =
  //   highlightedBoard.boardColumns[
  //     Math.floor(Math.random() * highlightedBoard.boardColumns.length)
  //   ];

  // const highlightedTask = [
  //   highlightedColumn.columnTasks[
  //     Math.floor(Math.random() * highlightedColumn.columnTasks.length)
  //   ],
  // ];

  // console.log(highlightedTask)

  return (
    <div className="mainSectionHighlightsDiv">
      <h3>Highlights</h3>

      <div className="highlightsInfo">
        <p className="highlightsInfoDescription">
          Stay up to date with activity from your Workspaces and boards.
        </p>
      </div>

      <div className="highlight">
        <p className="highlightUser">Username</p>
        <p className="highlightDate">3 days ago</p>
        <p className="highlightMessage">Add functionality to dropdown menu</p>
        <p className="highlightBoardInfo">
          <span>from</span>: TEST board
        </p>
      </div>
    </div>
  );
};

export default MainSectionHighlights;
