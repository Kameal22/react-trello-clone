import "../../../styles/navStyles/navMenuStyles/starredMenu.css";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { useDispatch } from "react-redux";

const NavStarred: React.FC = () => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  return (
    <div className="navStarredDiv">
      <div className="navStarredHeading">
        <p>Starred boards</p>
        <i onClick={() => setDropdown("")} className="bi bi-x"></i>
      </div>

      <div className="navStarredChoices">
        <div className="navStarredItems">
          <p className="navStarredItemHeading">First board</p>
          <p className="navStarredItemHeading">Another board</p>
        </div>
      </div>
    </div>
  );
};

export default NavStarred;
