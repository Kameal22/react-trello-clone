import "../../../styles/navStyles/navMenuStyles/recentMenu.css";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { useDispatch } from "react-redux";

const NavRecent: React.FC = () => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  return (
    <div className="navRecentDiv">
      <div className="navRecentHeading">
        <p>Recent boards</p>
        <i onClick={() => setDropdown("")} className="bi bi-x"></i>
      </div>

      <div className="navRecentChoices">
        <div className="navRecentItems">
          <p className="navRecentItemHeading">First board</p>
          <p className="navRecentItemHeading">Another board</p>
        </div>
      </div>
    </div>
  );
};

export default NavRecent;
