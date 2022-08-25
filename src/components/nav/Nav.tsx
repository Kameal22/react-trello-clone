import "../../styles/navStyles/nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavWorkspaces from "./navMenu/NavWorkspaces";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import NavRecent from "./navMenu/NavRecent";
import NavSearchBar from "./NavSearchBar";
import Register from "./NavRegister";
import { showDropdown } from "../../redux/features/navigationSlice";
import NavUserMenu from "./navMenu/NavUserMenu";
import { Link } from "react-router-dom";
import NavCreateMenu from "./navMenu/NavCreateMenu";

interface NavProps {
  forwardRef: React.RefObject<HTMLDivElement>;
}

const Nav: React.FC<NavProps> = ({ forwardRef }) => {
  const dispatch = useDispatch();

  const user = localStorage.getItem("currentUser");

  const dropdown = useSelector((state: RootState) => state.nav.navDropdown);

  const navColor = useSelector((state: RootState) => state.nav.navColor);

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  return (
    <div style={{ background: navColor }} className="navigationDiv">
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
          <i className="bi bi-chevron-down" />

          {dropdown === "workspaces" && (
            <NavWorkspaces forwardRef={forwardRef} />
          )}
        </div>
        <div
          onClick={
            dropdown === "recent"
              ? () => setDropdown("")
              : () => setDropdown("recent")
          }
          className="navigationRecent"
        >
          <h5>Recent</h5>
          <i className="bi bi-chevron-down" />
          {dropdown === "recent" && <NavRecent forwardRef={forwardRef} />}
        </div>
        <div
          onClick={
            dropdown === "create"
              ? () => setDropdown("")
              : () => setDropdown("create")
          }
          className="navigationCreate"
        >
          <h5>Create</h5>
          <i className="bi bi-chevron-down" />
          {dropdown === "create" && <NavCreateMenu forwardRef={forwardRef} />}
        </div>
      </div>

      <div className="navigationRightSide">
        <div className="navigationSearch">
          <NavSearchBar />
        </div>
        <div className="navigationRegister">
          {user ? (
            <h5
              className="navUserName"
              onClick={
                dropdown === "userChoices"
                  ? () => setDropdown("")
                  : () => setDropdown("userChoices")
              }
            >
              {user}
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
          {dropdown === "registering" && <Register />}

          {dropdown === "userChoices" && <NavUserMenu />}
        </div>
      </div>
    </div>
  );
};

export default Nav;
