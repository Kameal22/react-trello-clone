import "../../styles/mainSectionStyles/mainSectionMenu.css";
import { RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  showWorkspaceDropdown,
  deleteWorkspace,
} from "../../redux/features/WorkspaceSlice";
import { removeRecentlyViewedThatWasDeleted } from "../../redux/features/recentlyViewedSlice";
import { Link } from "react-router-dom";

interface MainSectionProps {
  showCreateWorkspace: () => void;
  toggleMainView: (view: string) => void;
}

const MainSectionMenu: React.FC<MainSectionProps> = ({ showCreateWorkspace, toggleMainView }) => {
  const dispatch = useDispatch();

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const showDropdown = (id: string) => {
    dispatch(showWorkspaceDropdown({ id }));
  };

  const isWorkspace = workspaces[0];

  const deleteWorkspaceFunc = (workspaceId: string) => {
    dispatch(
      deleteWorkspace({
        workspaceId: workspaceId,
      })
    );
  };

  const removeFromLastWatched = (workspaceName: string) => {
    dispatch(
      removeRecentlyViewedThatWasDeleted({
        boardsWorkspaceName: workspaceName,
      })
    );
  };

  const handleWorkspaceRemove = (
    workspaceId: string,
    workspaceName: string
  ) => {
    deleteWorkspaceFunc(workspaceId);
    removeFromLastWatched(workspaceName);
    window.location.reload();
  };

  return (
    <div className="mainSectionMenuDiv">
      <h3>Menu</h3>

      <div onClick={() => toggleMainView("recentsAndHighlights")} className="menuBoards">
        <i className="bi bi-calendar-check"></i>
        <p className="menuBoardsDescription">Boards</p>
      </div>
      <div onClick={() => toggleMainView("landingView")} className="menuHome">
        <i className="bi bi-house"></i>
        <p className="menuHomeDescription">Home</p>
      </div>

      <div className="menuWorkspacesHeading">
        <p
          style={
            isWorkspace
              ? { fontWeight: "normal" }
              : { fontWeight: "bold", color: "black" }
          }
        >
          Workspaces
        </p>
        <i
          onClick={() => showCreateWorkspace()}
          style={
            isWorkspace
              ? { fontSize: "1.2em" }
              : { fontSize: "1.2em", color: "black" }
          }
          className="bi bi-plus"
        ></i>
      </div>

      {isWorkspace
        ? workspaces.map((workspace) => {
          return (
            <div key={workspace.workspaceId} className="menuWorkspaces">
              <div
                onClick={() => showDropdown(workspace.workspaceId)}
                className="workspace"
              >
                <p>
                  <span
                    style={{
                      color: workspace.workspaceLetterColor,
                      fontSize: "1.4em",
                      marginRight: ".1em",
                    }}
                  >
                    {workspace.workspaceName[0]}
                  </span>
                  {workspace.workspaceName.substring(1)}
                </p>
                <i
                  style={{ fontSize: "1.3em" }}
                  className={
                    workspace.workspaceLandingPageMenu
                      ? "bi bi-arrow-up-short"
                      : "bi bi-arrow-down-short"
                  }
                ></i>
              </div>
              {workspace.workspaceLandingPageMenu ? (
                <div className="workspaceSettings">
                  <div className="workspaceOption">
                    <i className="bi bi-calendar-check"></i>
                    <Link
                      className="workspaceMenuLink"
                      to={`/workspace/${workspace.workspaceId}`}
                    >
                      <p className="menuBoardsDescription">Boards</p>
                    </Link>
                  </div>
                  <div
                    onClick={() =>
                      handleWorkspaceRemove(
                        workspace.workspaceId,
                        workspace.workspaceName
                      )
                    }
                    className="workspaceOption"
                  >
                    <i className="bi bi-trash"></i>
                    <p className="menuBoardsDescription">Delete</p>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })
        : null}
    </div>
  );
};

export default MainSectionMenu;
