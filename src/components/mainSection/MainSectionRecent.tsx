import "../../styles/mainSectionStyles/mainSectionRecent.css";
import { RootState } from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const MainSectionRecent: React.FC = () => {
  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const recents = useSelector(
    (state: RootState) => state.recents.recentlyViewed
  );

  return (
    <div className="mainSectionRecentDiv">
      <h3>Recently viewed</h3>

      {recents.map((board) => {
        return (
          <Link
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
                <p className="recentBoardDescription">Trello-clone</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MainSectionRecent;
