import "../../styles/navStyles/nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavWorkspaces from "./navMenu/WorkspaceMenu";
import { useState } from "react";
import NavRecent from "./navMenu/RecentMenu";
import NavStarred from "./navMenu/StarredMenu";

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
        <div onClick={
          navDropdown === "recent"
            ? () => setNavDropdown("")
            : () => setNavDropdown("recent")
        } className="navigationRecent">
          <h5>Recent</h5>
          <i className="bi bi-chevron-down"></i>
        </div>
        {navDropdown === "recent" ? <NavRecent /> : null}
        <div onClick={
          navDropdown === "starred"
            ? () => setNavDropdown("")
            : () => setNavDropdown("starred")
        } className="navigationStarred">
          <h5>Starred</h5>
          <i className="bi bi-chevron-down"></i>
        </div>
        {navDropdown === "starred" ? <NavStarred /> : null}
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
