import "../../styles/navStyles/nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Workspaces from "./navMenu/Workspaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import Recent from "./navMenu/Recent";
import NavSearchBar from "./NavSearchBar";
import Register from "./NavRegister";
import UserMenu from "./navMenu/UserMenu";
import { Link } from "react-router-dom";
import CreateMenu from "./navMenu/CreateMenu";
import { useState, useRef, useEffect } from "react";
import UseClickOutside from "../../hooks/UseClickOutside";

const Nav: React.FC = () => {
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [recentMenuOpen, setRecentMenuOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [registerMenuOpen, setRegisterMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState("");

  const users = useSelector((state: RootState) => state.users.Users);

  const navColor = useSelector((state: RootState) => state.nav.navColor);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setUser(user);
    } else {
      setUser("");
    }
  }, [users]);

  const workspacesRef = useRef<HTMLDivElement>(null);
  const recentsRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  UseClickOutside(workspacesRef, () => setWorkspaceMenuOpen(false));
  UseClickOutside(recentsRef, () => setRecentMenuOpen(false));
  UseClickOutside(createRef, () => setCreateMenuOpen(false));
  UseClickOutside(registerRef, () => setRegisterMenuOpen(false));
  UseClickOutside(userRef, () => setUserMenuOpen(false));

  return (
    <div style={{ background: navColor }} className="navigationDiv">
      <div className="navigationLeftSide">
        <Link to="/" className="logoLink">
          <h3 className="navigationLogo">Trello</h3>
        </Link>

        <div
          ref={workspacesRef}
          onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
          className="navigationWorkspace"
        >
          <h5>Workspaces</h5>
          <i className="bi bi-chevron-down" />

          {workspaceMenuOpen && <Workspaces setOpen={setWorkspaceMenuOpen} />}
        </div>

        <div
          ref={recentsRef}
          onClick={() => setRecentMenuOpen(!recentMenuOpen)}
          className="navigationRecent"
        >
          <h5>Recent</h5>
          <i className="bi bi-chevron-down" />
          {recentMenuOpen && <Recent setOpen={setRecentMenuOpen} />}
        </div>

        <div
          ref={createRef}
          onClick={() => setCreateMenuOpen(!createMenuOpen)}
          className="navigationCreate"
        >
          <h5>Create</h5>
          <i className="bi bi-chevron-down" />

          {createMenuOpen && <CreateMenu setOpen={setCreateMenuOpen} />}
        </div>
      </div>

      <div className="navigationRightSide">
        <div className="navigationSearch">
          <NavSearchBar />
        </div>

        {user ? (
          <div ref={userRef} onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <h5 className="navUserName">{user}</h5>
            {userMenuOpen && <UserMenu setOpen={setUserMenuOpen} />}
          </div>
        ) : (
          <div
            ref={registerRef}
            onClick={() => setRegisterMenuOpen(!registerMenuOpen)}
            className="navigationRegister"
          >
            <h5>Register</h5>
            {registerMenuOpen && <Register setOpen={setRegisterMenuOpen} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
