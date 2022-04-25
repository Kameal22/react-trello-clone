import "../../../styles/navStyles/navMenuStyles/starredMenu.css";

interface starredProps {
  closeDropdown: () => void;
}

const NavStarred: React.FC<starredProps> = (props) => {
  return (
    <div className="navStarredDiv">
      <div className="navStarredHeading">
        <p>Starred boards</p>
        <i onClick={() => props.closeDropdown()} className="bi bi-x"></i>
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
