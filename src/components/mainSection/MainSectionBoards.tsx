import "../../styles/mainSectionStyles/mainSectionBoards.css";
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";

const MainSectionBoards: React.FC = () => {
  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const recents = useSelector(
    (state: RootState) => state.recents.recentlyViewed
  );

  return (
    <div className="mainSectionBoards">
      <div className="mainSectionBoardsRecentlyViewed">
        <div className="mainSectionBoardsRecentlyViewedHeading">
          <i className="bi bi-clock"></i>
          <h4>Recently viewed</h4>
        </div>
        <div className="mainSectionBoardsRecentlyViewedBoards">
          {recents.map((recentBoard) => {
            return (
              <div
                className="mainSectionYourBoard"
                style={{ backgroundColor: `${recentBoard.boardBackground}` }}
              >
                {" "}
                <p>{recentBoard.boardName}</p>{" "}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mainSectionBoardsFromWorkspaces">
        <h4 className="mainSectionYourWorkspacesHeading">Your workspaces</h4>
        {workspaces.map((workspace) => {
          return (
            <div className="boardFromWorkspace">
              <h4>{workspace.workspaceName}</h4>
              {workspace.workspaceBoards.map((board) => {
                return (
                  <div
                    className="mainSectionYourBoard"
                    style={{ backgroundColor: `${board.boardBackground}` }}
                  >
                    {" "}
                    <p>{board.boardName}</p>{" "}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainSectionBoards;
