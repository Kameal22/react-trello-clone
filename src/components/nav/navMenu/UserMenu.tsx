import "../../../styles/navStyles/navMenuStyles/userMenu.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/registerSlice";
import { showDropdown } from "../../../redux/features/navigationSlice";

interface NavUserMenuInterface {
  showBoards?: () => void;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const NavUserMenu: React.FC<NavUserMenuInterface> = ({ showBoards, forwardRef }) => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const logout = () => {
    dispatch(logoutUser());
    setDropdown("");
  };

  const showBoardsFunc = () => {
    if (showBoards) {
      showBoards();
    }
    setDropdown("");
  };

  return (
    <div ref={forwardRef} className="userChoicesDiv">
      <div className="userChoiceDiv">
        <p onClick={() => logout()} className="userChoice">
          Logout
        </p>
        <i onClick={() => logout()} className="bi bi-door-closed"></i>
      </div>

      <div className="userChoiceDiv">
        <p onClick={() => showBoardsFunc()} className="userChoice">
          Your boards
        </p>
        <i className="bi bi-clipboard"></i>
      </div>
    </div>
  );
};

export default NavUserMenu;
