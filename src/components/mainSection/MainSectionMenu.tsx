import "../../styles/mainSectionStyles/mainSectionMenu.css";
import { RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { showWorkspaceDropdown } from "../../redux/features/WorkspaceSlice";
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

  return (
    <div className="mainSectionMenuDiv">
      <h3>Menu</h3>

      <div className="menuBoards">
        <i className="bi bi-calendar-check"></i>
        <p onClick={() => props.showBoards()} className="menuBoardsDescription">
          Boards
        </p>
      </div>
      <div className="menuHome">
        <i className="bi bi-house"></i>
        <p onClick={() => props.hideBoards()} className="menuHomeDescription">
          Home
        </p>
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
              <div className="menuWorkspaces">
                <div
                  onClick={() => showDropdown(workspace.workspaceId)}
                  className="workspace"
                >
                  <p>{workspace.workspaceName}</p>
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
                      <p className="menuBoardsDescription">Boards</p>
                    </div>
                    <div className="workspaceOption">
                      <i className="bi bi-suit-heart"></i>
                      <p className="menuBoardsDescription">Highlights</p>
                    </div>
                    <div className="workspaceOption">
                      <i className="bi bi-gear"></i>
                      <p className="menuBoardsDescription">Settings</p>
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
