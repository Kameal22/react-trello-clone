import "../../../styles/navStyles/navMenuStyles/recentMenu.css"

const NavRecent: React.FC = () => {
    return (
        <div className="navRecentDiv">
            <div className="navRecentHeading">
                <p>Recent boards</p>
                <i className="bi bi-x"></i>
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