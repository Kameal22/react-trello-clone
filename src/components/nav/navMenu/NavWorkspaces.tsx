import "../../../styles/navStyles/navMenuStyles/workspaceMenu.css";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCreateWorkspace } from "../../../redux/features/popUpCreateComponentSlice";

interface WorkspaceProps {
  forwardRef: React.RefObject<HTMLDivElement>;
}

const NavWorkspaces: React.FC<WorkspaceProps> = ({ forwardRef }) => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const showWorkspaceCreating = () => {
    dispatch(setCreateWorkspace());
    setDropdown("");
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const isWorkspace = workspaces[0];

  return (
    <div ref={forwardRef} className="navWorkspacesDiv">
      <div className="navWorkspacesHeading">
        <p>Workspaces</p>
        <i onClick={() => setDropdown("")} className="bi bi-x"></i>
      </div>

      {isWorkspace ? (
        <div className="navWorkspaceChoices">
          <p className="navYourWorkspaces">Your workspaces</p>

          {workspaces.map((workspace) => {
            return (
              <div key={workspace.workspaceId} className="navWorkspaceItems">
                <p className="navWorkspaceItemHeading">
                  <Link
                    onClick={() => setDropdown("")}
                    className="workspaceMenuLink"
                    to={`/workspace/${workspace.workspaceId}`}
                  >
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
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="navWorkspaceChoices">
          <p
            onClick={() => showWorkspaceCreating()}
            className="navCreateWorkspace"
          >
            Create workspace
          </p>
        </div>
      )}
    </div>
  );
};

export default NavWorkspaces;
