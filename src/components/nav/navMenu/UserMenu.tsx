import "../../../styles/navStyles/navMenuStyles/userMenu.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/registerSlice";
import { showDropdown } from "../../../redux/features/navigationSlice";

interface NavUserMenuInterface {
  showBoards?: () => void;
}

const NavUserMenu: React.FC<NavUserMenuInterface> = (props) => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const logout = () => {
    dispatch(logoutUser());
    setDropdown("");
  };

  const showBoards = () => {
    if (props.showBoards) {
      props.showBoards();
    }
    setDropdown("")
  };

  return (
    <div className="userChoicesDiv">
      <div className="userChoiceDiv">
        <p onClick={() => logout()} className="userChoice">
          Logout
        </p>
        <i onClick={() => logout()} className="bi bi-door-closed"></i>
      </div>

      <div className="userChoiceDiv">
        <p onClick={() => showBoards()} className="userChoice">Your boards</p>
        <i className="bi bi-clipboard"></i>
      </div>
    </div>
  );
};

export default NavUserMenu;
