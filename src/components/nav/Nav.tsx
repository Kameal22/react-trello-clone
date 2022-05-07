import "../../styles/navStyles/nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavWorkspaces from "./navMenu/WorkspaceMenu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import NavRecent from "./navMenu/RecentMenu";
import NavStarred from "./navMenu/StarredMenu";
import NavSearchBar from "./NavSearch";
import Register from "./NavRegister";
import { showDropdown } from "../../redux/features/navigationSlice";
import NavUserMenu from "./navMenu/UserMenu";
import { Link } from "react-router-dom";

interface NavProps {
  showCreateWorkspace: () => void;
}

const Nav: React.FC<NavProps> = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.users.user);

  const dropdown = useSelector(
    (state: RootState) => state.dropdown.navDropdown
  );

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  return (
    <div className="navigationDiv">
      <div className="navigationLeftSide">
        <Link to="/" className="logoLink">
          <h3 className="navigationLogo">Trello</h3>
        </Link>
        <div
          onClick={
            dropdown === "workspaces"
              ? () => setDropdown("")
              : () => setDropdown("workspaces")
          }
          className="navigationWorkspace"
        >
          <h5>Workspaces</h5>
          <i className="bi bi-chevron-down"></i>
        </div>
        {dropdown === "workspaces" ? (
          <NavWorkspaces showCreateWorkspace={props.showCreateWorkspace} />
        ) : null}
        <div
          onClick={
            dropdown === "recent"
              ? () => setDropdown("")
              : () => setDropdown("recent")
          }
          className="navigationRecent"
        >
          <h5>Recent</h5>
          <i className="bi bi-chevron-down"></i>
        </div>
        {dropdown === "recent" ? <NavRecent /> : null}
        <div
          onClick={
            dropdown === "starred"
              ? () => setDropdown("")
              : () => setDropdown("starred")
          }
          className="navigationStarred"
        >
          <h5>Starred</h5>
          <i className="bi bi-chevron-down"></i>
        </div>
        {dropdown === "starred" ? <NavStarred /> : null}
      </div>

      <div className="navigationRightSide">
        <div className="navigationSearch">
          <NavSearchBar />
        </div>
        <div className="navigationRegister">
          {user.name ? (
            <h5
              onClick={
                dropdown === "userChoices"
                  ? () => setDropdown("")
                  : () => setDropdown("userChoices")
              }
            >
              {user.name}
            </h5>
          ) : (
            <h5
              onClick={
                dropdown === "registering"
                  ? () => setDropdown("")
                  : () => setDropdown("registering")
              }
            >
              Register
            </h5>
          )}
          {dropdown === "registering" ? <Register /> : null}

          {dropdown === "userChoices" ? <NavUserMenu /> : null}
        </div>
      </div>
    </div>
  );
};

export default Nav;
