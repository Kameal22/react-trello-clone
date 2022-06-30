import "../../../styles/mainSectionStyles/mainRecent.css";
import { RootState } from "../../../redux/Store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainRecent: React.FC = () => {
  const recents = useSelector(
    (state: RootState) => state.recents.recentlyViewed
  );

  console.log(recents.length);

  if (recents.length > 0) {
    return (
      <div className="mainRecentDiv">
        <h3>Recently viewed</h3>

        {recents.map((board) => {
          return (
            <Link
              key={board.boardId}
              className="workspaceMenuLink"
              to={`/board/${board.boardWorkspace}/${board.boardId}`}
            >
              <div className="recentsDiv">
                <div
                  style={{ background: `${board.boardBackground}` }}
                  className="mainRecentSmallBlock"
                ></div>

                <div className="mainRecentTextDiv">
                  <p className="recentBoardName">{board.boardName}</p>
                  <p className="recentBoardDescription">
                    {board.boardWorkspace}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="mainRecentDiv">
        <h3>Recently viewed</h3>
        <p className="noRecentsInfo">There are no recently viewed boards.</p>
      </div>
    );
  }
};

export default MainRecent;
