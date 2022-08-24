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
  workspacesRef: React.RefObject<HTMLDivElement>;
  recentsRef: React.RefObject<HTMLDivElement>;
  createRef: React.RefObject<HTMLDivElement>;
  registerRef: React.RefObject<HTMLDivElement>;
}

const Nav: React.FC<NavProps> = ({
  forwardRef,
  workspacesRef,
  recentsRef,
  createRef,
  registerRef,
}) => {
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
          ref={workspacesRef}
          onClick={
            dropdown === "workspaces"
              ? () => setDropdown("")
              : () => setDropdown("workspaces")
          }
          className="navigationWorkspace"
        >
          <h5>Workspaces</h5>
          <i className="bi bi-chevron-down" />
        </div>
        {dropdown === "workspaces" && <NavWorkspaces forwardRef={forwardRef} />}
        <div
          ref={recentsRef}
          onClick={
            dropdown === "recent"
              ? () => setDropdown("")
              : () => setDropdown("recent")
          }
          className="navigationRecent"
        >
          <h5>Recent</h5>
          <i className="bi bi-chevron-down" />
        </div>
        {dropdown === "recent" && <NavRecent forwardRef={forwardRef} />}
        <div
          ref={createRef}
          onClick={
            dropdown === "create"
              ? () => setDropdown("")
              : () => setDropdown("create")
          }
          className="navigationStarred"
        >
          <h5>Create</h5>
          <i className="bi bi-chevron-down" />
        </div>
        {dropdown === "create" && <NavCreateMenu forwardRef={forwardRef} />}
      </div>

      <div className="navigationRightSide">
        <div className="navigationSearch">
          <NavSearchBar />
        </div>
        <div ref={registerRef} className="navigationRegister">
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
          {dropdown === "registering" && <Register forwardRef={forwardRef} />}

          {dropdown === "userChoices" && (
            <NavUserMenu forwardRef={forwardRef} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
