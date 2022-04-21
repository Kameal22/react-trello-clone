import "../../../styles/navStyles/navMenuStyles/workspaceMenu.css";

const NavWorkspaces: React.FC = () => {
  return (
    <div className="navWorkspacesDiv">
      <div className="navWorkspacesHeading">
        <p>Workspaces</p>
        <i className="bi bi-x"></i>
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
