import "../../../styles/navStyles/navMenuStyles/starredMenu.css"

const NavStarred: React.FC = () => {
    return (
        <div className="navStarredDiv">
            <div className="navStarredHeading">
                <p>Starred boards</p>
                <i className="bi bi-x"></i>
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