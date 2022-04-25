import "../../../styles/navStyles/navMenuStyles/workspaceMenu.css";

interface workspaceProps {
  closeDropdown: () => void;
}

const NavWorkspaces: React.FC<workspaceProps> = (props) => {
  return (
    <div className="navWorkspacesDiv">
      <div className="navWorkspacesHeading">
        <p>Workspaces</p>
        <i onClick={() => props.closeDropdown()} className="bi bi-x"></i>
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
