import "../../../styles/navStyles/navMenuStyles/workspaceMenu.css";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";

interface WorkspaceProps {
  showCreateWorkspace: () => void;
}

const NavWorkspaces: React.FC<WorkspaceProps> = (props) => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspaces
  );

  const isWorkspace = workspaces[0].workspaceName;

  const showCreateWorkspacePopUp = () => {
    props.showCreateWorkspace();
    dispatch(setDropdown(""));
  };

  return (
    <div className="navWorkspacesDiv">
      <div className="navWorkspacesHeading">
        <p>Workspaces</p>
        <i onClick={() => setDropdown("")} className="bi bi-x"></i>
      </div>

      {isWorkspace ? (
        <div className="navWorkspaceChoices">
          <p className="navYourWorkspaces">Your workspaces</p>

          <div className="navWorkspaceItems">
            <p className="navWorkspaceItemHeading">Final project</p>
            <p className="navWorkspaceItemHeading">Callendar</p>
          </div>
        </div>
      ) : (
        <div className="navWorkspaceChoices">
          <p
            onClick={() => showCreateWorkspacePopUp()}
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
