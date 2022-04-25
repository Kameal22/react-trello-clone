import "../../styles/navStyles/nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavWorkspaces from "./navMenu/WorkspaceMenu";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import NavRecent from "./navMenu/RecentMenu";
import NavStarred from "./navMenu/StarredMenu";
import NavSearchBar from "./NavSearch";
import Register from "./NavRegister";
import { logoutUser } from "../../redux/features/registerSlice";

const Nav: React.FC = () => {
  const [navDropdown, setNavDropdown] = useState<string>("");
  const [registering, setRegistering] = useState<boolean>(false);
  const [loggingOutDropdown, setLoggingOutDropdown] = useState<boolean>(false);

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.users.user);

  const closeDropdown = () => {
    setNavDropdown("");
  };

  const stopRegistering = () => {
    setRegistering(false);
  };

  const logout = () => {
    dispatch(logoutUser());
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
        {navDropdown === "workspaces" ? (
          <NavWorkspaces closeDropdown={closeDropdown} />
        ) : null}
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
        {navDropdown === "recent" ? (
          <NavRecent closeDropdown={closeDropdown} />
        ) : null}
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
        {navDropdown === "starred" ? (
          <NavStarred closeDropdown={closeDropdown} />
        ) : null}
      </div>

      <div className="navigationRightSide">
        <div className="navigationSearch">
          <NavSearchBar />
        </div>
        <div className="navigationRegister">
          {user.name ? (
            <h5 onMouseEnter={() => setLoggingOutDropdown(true)}>
              {user.name}
            </h5>
          ) : (
            <h5 onClick={() => setRegistering(!registering)}>Register</h5>
          )}
          {registering ? <Register setRegistering={stopRegistering} /> : null}

          {loggingOutDropdown ? (
            <div
              onMouseLeave={() => setLoggingOutDropdown(false)}
              className="logoutDiv"
            >
              <p onClick={() => logout()} className="logout">
                Logout
              </p>
              <i onClick={() => logout()} className="bi bi-door-closed"></i>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Nav;
