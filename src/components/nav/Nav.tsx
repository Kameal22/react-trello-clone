import "../../styles/navStyles/nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavWorkspaces from "./navMenu/WorkspaceMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import NavRecent from "./navMenu/RecentMenu";
import NavStarred from "./navMenu/StarredMenu";
import NavSearchBar from "./NavSearch";
import Register from "./NavRegister";

const Nav: React.FC = () => {
  const [navDropdown, setNavDropdown] = useState<string>();
  const [registering, setRegistering] = useState<boolean>(false);

  const user = JSON.stringify(window.localStorage.getItem("user")).slice(1, -1);

  const stopRegistering = () => {
    setRegistering(false);
  };

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
        <div
          onClick={
            navDropdown === "recent"
              ? () => setNavDropdown("")
              : () => setNavDropdown("recent")
          }
          className="navigationRecent"
        >
          <h5>Recent</h5>
          <i className="bi bi-chevron-down"></i>
        </div>
        {navDropdown === "recent" ? <NavRecent /> : null}
        <div
          onClick={
            navDropdown === "starred"
              ? () => setNavDropdown("")
              : () => setNavDropdown("starred")
          }
          className="navigationStarred"
        >
          <h5>Starred</h5>
          <i className="bi bi-chevron-down"></i>
        </div>
        {navDropdown === "starred" ? <NavStarred /> : null}
      </div>

      <div className="navigationRightSide">
        <div className="navigationSearch">
          <NavSearchBar />
        </div>
        <div className="navigationRegister">
          {user ? (
            <h5>{user}</h5>
          ) : (
            <h5 onClick={() => setRegistering(!registering)}>Register</h5>
          )}
          {registering ? <Register setRegistering={stopRegistering} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Nav;
