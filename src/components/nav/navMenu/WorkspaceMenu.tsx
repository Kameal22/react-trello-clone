import "../../../styles/navStyles/navMenuStyles/workspaceMenu.css";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { useDispatch } from "react-redux";

const NavWorkspaces: React.FC = () => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  return (
    <div className="navWorkspacesDiv">
      <div className="navWorkspacesHeading">
        <p>Workspaces</p>
        <i onClick={() => setDropdown("")} className="bi bi-x"></i>
      </div>

      <div className="navWorkspaceChoices">
        <p className="navYourWorkspaces">Your workspaces</p>

        <div className="navWorkspaceItems">
          <p className="navWorkspaceItemHeading">Final project</p>
          <p className="navWorkspaceItemHeading">Callendar</p>
        </div>
      </div>
    </div>
  );
};

export default NavWorkspaces;
