import "../../styles/navStyles/nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavWorkspaces from "./navMenu/NavWorkspaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import NavRecent from "./navMenu/NavRecent";
import NavSearchBar from "./NavSearchBar";
import Register from "./NavRegister";
import NavUserMenu from "./navMenu/NavUserMenu";
import { Link } from "react-router-dom";
import NavCreateMenu from "./navMenu/NavCreateMenu";
import { useState, useRef } from "react";
import UseClickOutside from "../../hooks/UseClickOutside";

const Nav: React.FC = () => {
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);

  const workspacesRef = useRef<HTMLDivElement>(null);

  UseClickOutside(workspacesRef, () => setWorkspaceMenuOpen(false));

  const user = localStorage.getItem("currentUser");

  const navColor = useSelector((state: RootState) => state.nav.navColor);

  return (
    <div style={{ background: navColor }} className="navigationDiv">
      <div className="navigationLeftSide">
        <Link to="/" className="logoLink">
          <h3 className="navigationLogo">Trello</h3>
        </Link>

        <div
          ref={workspacesRef}
          onClick={() => setWorkspaceMenuOpen(!open)}
          className="navigationWorkspace"
        >
          <h5>Workspaces</h5>
          <i className="bi bi-chevron-down" />

          {workspaceMenuOpen && (
            <NavWorkspaces setOpen={setWorkspaceMenuOpen} />
          )}
        </div>

        <div className="navigationRecent">
          <h5>Recent</h5>
          <i className="bi bi-chevron-down" />

          {/* <NavRecent /> */}
        </div>
        <div className="navigationCreate">
          <h5>Create</h5>
          <i className="bi bi-chevron-down" />

          {/* <NavCreateMenu /> */}
        </div>
      </div>

      <div className="navigationRightSide">
        <div className="navigationSearch">{/* <NavSearchBar /> */}</div>
        <div className="navigationRegister">
          {user ? <h5 className="navUserName">{user}</h5> : <h5>Register</h5>}
          {/* <Register /> */}

          {/* <NavUserMenu /> */}
        </div>
      </div>
    </div>
  );
};

export default Nav;
