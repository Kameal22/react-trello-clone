import "../../styles/navStyles/nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavWorkspaces from "./navMenu/WorkspaceMenu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import NavRecent from "./navMenu/RecentMenu";
import NavSearchBar from "./NavSearch";
import Register from "./NavRegister";
import { showDropdown } from "../../redux/features/navigationSlice";
import NavUserMenu from "./navMenu/UserMenu";
import { Link } from "react-router-dom";
import CreateMenu from "./navMenu/CreateMenu";
import { useState } from "react";

interface NavProps {
  showCreateWorkspace: () => void;
  showCreateBoard: () => void;
  hideBoards?: () => void;
  showBoards?: () => void;
}

const Nav: React.FC<NavProps> = (props) => {
  const [navDropdownShowing, setNavDropdownShowing] = useState<boolean>(false);

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.users.user);

  const dropdown = useSelector((state: RootState) => state.nav.navDropdown);

  const navColor = useSelector((state: RootState) => state.nav.navColor);

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
    setNavDropdownShowing(!navDropdownShowing);
  };

  const hideBoards = () => {
    if (props.hideBoards) {
      props.hideBoards();
    }
  };

  return (
    <div style={{ background: navColor }} className="navigationDiv">
      <div className="navigationLeftSide">
        <Link to="/" onClick={() => setDropdown("")} className="logoLink">
          <h3 onClick={() => hideBoards()} className="navigationLogo">
            Trello
          </h3>
        </Link>
        <div
          onClick={
            dropdown === "workspaces" && navDropdownShowing
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
            dropdown === "create"
              ? () => setDropdown("")
              : () => setDropdown("create")
          }
          className="navigationStarred"
        >
          <h5>Create</h5>
          <i className="bi bi-chevron-down"></i>
        </div>
        {dropdown === "create" ? (
          <CreateMenu
            showCreateBoard={props.showCreateBoard}
            showCreateWorkspace={props.showCreateWorkspace}
          />
        ) : null}
      </div>

      <div className="navigationRightSide">
        <div className="navigationSearch">
          <NavSearchBar />
        </div>
        <div className="navigationRegister">
          {user.name ? (
            <h5
              className="navUserName"
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

          {dropdown === "userChoices" ? <NavUserMenu showBoards={props.showBoards} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Nav;
