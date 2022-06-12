import "../../styles/mainSectionStyles/mainSectionMenu.css";
import { RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { showWorkspaceDropdown, deleteWorkspace } from "../../redux/features/WorkspaceSlice";
import { Link } from "react-router-dom";

interface MainSectionProps {
  showCreateWorkspace: () => void;
  showBoards: () => void;
  hideBoards: () => void;
}

const MainSectionMenu: React.FC<MainSectionProps> = (props) => {
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
        workspaceId: workspaceId
      })
    )
  }

  return (
    <div className="mainSectionMenuDiv">
      <h3>Menu</h3>

      <div onClick={() => props.showBoards()} className="menuBoards">
        <i className="bi bi-calendar-check"></i>
        <p className="menuBoardsDescription">Boards</p>
      </div>
      <div onClick={() => props.hideBoards()} className="menuHome">
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
          onClick={() => props.showCreateWorkspace()}
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
                <p><span style={{ color: workspace.workspaceLetterColor, fontSize: "1.4em", marginRight: ".1em" }}>{workspace.workspaceName[0]}</span>{workspace.workspaceName.substring(1)}</p>
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
                  <div className="workspaceOption">
                    <i className="bi bi-gear"></i>
                    <p className="menuBoardsDescription">Settings</p>
                  </div>
                  <div className="workspaceOption">
                    <i className="bi bi-trash"></i>
                    <p onClick={() => deleteWorkspaceFunc((workspace.workspaceId))} className="menuBoardsDescription">Delete</p>
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
