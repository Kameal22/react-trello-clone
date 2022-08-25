import "../../../styles/navStyles/navMenuStyles/userMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/features/usersSlice";
import { RootState } from "../../../redux/Store";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NavUserMenu: React.FC = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setLogin(user);
    }
  }, []);

  const randomWorkspace =
    workspaces[Math.floor(Math.random() * workspaces.length)];

  const logout = () => {
    dispatch(logoutUser({ login }));
  };

  return (
    <div className="userChoicesDiv">
      <div onClick={logout} className="userChoiceDiv">
        <p className="userChoice">Logout</p>
        <i className="bi bi-door-closed" />
      </div>

      {randomWorkspace && (
        <div className="userChoiceDiv">
          <Link
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
