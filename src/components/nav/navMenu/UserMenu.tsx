import "../../../styles/navStyles/navMenuStyles/userMenu.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/registerSlice";

const NavUserMenu: React.FC = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
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
        <p className="userChoice">Your workspaces</p>
        <i className="bi bi-person-workspace"></i>
      </div>

      <div className="userChoiceDiv">
        <p className="userChoice">Your boards</p>
        <i className="bi bi-clipboard"></i>
      </div>
    </div>
  );
};

export default NavUserMenu;
