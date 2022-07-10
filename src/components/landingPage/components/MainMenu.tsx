import "../../../styles/mainSectionStyles/mainMenu.css";
import { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  showWorkspaceDropdown,
  deleteWorkspace,
} from "../../../redux/features/WorkspaceSlice";
import { removeRecentlyViewedAfterWorkspaceDeleting } from "../../../redux/features/recentlyViewedSlice";
import { removeHighlightOnWorkspaceDeleting } from "../../../redux/features/highlightsSlice";
import { Link } from "react-router-dom";
import { setCreateWorkspace } from "../../../redux/features/popUpCreateComponentSlice";

const MainMenu: React.FC = () => {
  const dispatch = useDispatch();

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const showDropdown = (id: string) => {
    dispatch(showWorkspaceDropdown({ id }));
  };

  const showWorkspaceCreating = () => {
    dispatch(setCreateWorkspace());
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
      removeRecentlyViewedAfterWorkspaceDeleting({
        boardsWorkspace: workspaceName,
      })
    );
  };

  const handleRemoveHighlight = (workspaceId: string) => {
    dispatch(
      removeHighlightOnWorkspaceDeleting({
        workspaceId: workspaceId,
      })
    );
  };

  const handleWorkspaceRemove = (
    workspaceId: string,
    workspaceName: string
  ) => {
    deleteWorkspaceFunc(workspaceId);
    removeFromLastWatched(workspaceName);
    handleRemoveHighlight(workspaceId);
    window.location.reload();
  };

  return (
    <div className="mainSectionMenuDiv">
      <h3>Menu</h3>

      <Link className="menuLink" to="/boards">
        <div className="menuBoards">
          <i className="bi bi-calendar-check"></i>
          <p className="menuBoardsDescription">Boards</p>
        </div>
      </Link>

      <Link className="menuLink" to="/overview">
        <div className="menuHome">
          <i className="bi bi-house"></i>
          <p className="menuHomeDescription">Home</p>
        </div>
      </Link>

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
          onClick={() => showWorkspaceCreating()}
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
            <ul key={workspace.workspaceId} className="menuWorkspaces">
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
                  <li className="workspaceOption">
                    <i className="bi bi-calendar-check"></i>
                    <Link
                      className="workspaceMenuLink"
                      to={`/workspace/${workspace.workspaceId}`}
                    >
                      <p className="menuBoardsDescription">Boards</p>
                    </Link>
                  </li>
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
            </ul>
          );
        })
        : null}
    </div>
  );
};

export default MainMenu;
