import "../../../styles/mainSectionStyles/mainBoards.css";
import { RootState } from "../../../redux/Store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainBoards: React.FC = () => {
  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const recents = useSelector(
    (state: RootState) => state.recents.recentlyViewed
  );

  return (
    <div className="mainSectionBoards">
      <div className="mainSectionBoardsRecentlyViewedHeadingDiv">
        <i className="bi bi-clock"></i>
        <h4>Recently viewed</h4>
      </div>

      <div className="mainSectionBoardsDivs">
        {recents.map((recentBoard) => {
          return (
            <div
              key={recentBoard.boardId}
              className="mainSectionYourBoard"
              style={{ background: `${recentBoard.boardBackground}` }}
            >
              {" "}
              <Link
                className="workspaceMenuLink"
                to={`/board/${recentBoard.boardWorkspace}/${recentBoard.boardId}`}
              >
                <p>{recentBoard.boardName}</p>{" "}
              </Link>
            </div>
          );
        })}
      </div>

      <h4 className="mainSectionYourWorkspacesHeading">Your workspaces</h4>

      {workspaces.map((workspace) => {
        return (
          <div key={workspace.workspaceId} className="boardFromWorkspace">
            <h4>{workspace.workspaceName}</h4>
            <div className="mainSectionBoardsDivs">
              {workspace.workspaceBoards.map((board) => {
                return (
                  <div
                    key={board.boardId}
                    className="mainSectionYourBoard"
                    style={{ background: `${board.boardBackground}` }}
                  >
                    {" "}
                    <Link
                      className="workspaceMenuLink"
                      to={`/board/${workspace.workspaceName}/${board.boardId}`}
                    >
                      <p>{board.boardName}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainBoards;
