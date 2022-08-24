import "../../../styles/navStyles/navMenuStyles/userMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { testLogoutUser } from "../../../redux/features/usersSlice";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { RootState } from "../../../redux/Store";
import { Link } from "react-router-dom";

interface NavUserMenuInterface {
  forwardRef: React.RefObject<HTMLDivElement>;
}

const NavUserMenu: React.FC<NavUserMenuInterface> = ({ forwardRef }) => {
  const dispatch = useDispatch();

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const randomWorkspace =
    workspaces[Math.floor(Math.random() * workspaces.length)];

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const logout = () => {
    dispatch(testLogoutUser());
    setDropdown("");
  };

  return (
    <div ref={forwardRef} className="userChoicesDiv">
      <div onClick={logout} className="userChoiceDiv">
        <p className="userChoice">Logout</p>
        <i className="bi bi-door-closed" />
      </div>

      {randomWorkspace && (
        <div className="userChoiceDiv">
          <Link
            onClick={() => setDropdown("")}
            className="workspaceMenuLink"
            to={`/workspace/${randomWorkspace.workspaceId}`}
          >
            <p className="userChoice">Your boards</p>
          </Link>
          <i className="bi bi-clipboard" />
        </div>
      )}
    </div>
  );
};

export default NavUserMenu;
