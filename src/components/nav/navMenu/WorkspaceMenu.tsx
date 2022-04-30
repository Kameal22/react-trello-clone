import "../../../styles/navStyles/navMenuStyles/workspaceMenu.css";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";

const NavWorkspaces: React.FC = () => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspaces
  );

  const isWorkspace = workspaces[0].workspaceName;

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
          <p className="navCreateWorkspace">Create workspace</p>
        </div>
      )}
    </div>
  );
};

export default NavWorkspaces;
