import "../../styles/navStyles/nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavWorkspaces from "./navMenu/WorkspaceMenu";
import { useState } from "react";

const Nav: React.FC = () => {
  const [navDropdown, setNavDropdown] = useState<string>();

  return (
    <div className="navigationDiv">
      <div className="navigationLeftSide">
        <h3 className="navigationLogo">Trello</h3>
        <div
          onClick={
            navDropdown === "workspaces"
              ? () => setNavDropdown("")
              : () => setNavDropdown("workspaces")
          }
          className="navigationWorkspace"
        >
          <h5>Workspaces</h5>
          <i className="bi bi-chevron-down"></i>
        </div>
        {navDropdown === "workspaces" ? <NavWorkspaces /> : null}
        <div className="navigationRecent">
          <h5>Recent</h5>
          <i className="bi bi-chevron-down"></i>
        </div>
        <div className="navigationStarred">
          <h5>Starred</h5>
          <i className="bi bi-chevron-down"></i>
        </div>
      </div>

      <div className="navigationRightSide">
        <div className="navigationSearch">
          <h5>Search bar</h5>
        </div>
        <div className="navigationRegister">
          <h5>Register</h5>
        </div>
      </div>
    </div>
  );
};

export default Nav;
