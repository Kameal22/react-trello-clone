import "../../../styles/navStyles/navMenuStyles/recentMenu.css";
import { Link } from "react-router-dom";
import { RecentlyViewedContext } from "../../../context/recentlyViewedContext";
import { useContext } from "react";

const NavRecent: React.FC = () => {
  const recents = useContext(RecentlyViewedContext);

  return (
    <div className="navRecentDiv">
      <div className="navRecentHeading">
        <p>Recent boards</p>
        <i className="bi bi-x"></i>
      </div>

      {recents.length > 0 ? (
        <div className="navRecentChoices">
          {recents.map((board) => {
            return (
              <Link
                key={board.id}
                className="workspaceMenuLink"
                to={`/board/${board.workspaceId}/${board.id}`}
              >
                <div className="recentsDiv">
                  <div
                    style={{
                      background: `${board.background}`,
                      width: "22px",
                      height: "22px",
                    }}
                  ></div>

                  <div className="mainRecentTextDiv">
                    <p className="recentMenuBoardName">{board.name}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="recentDisclaimer">No recent boards to show.</p>
      )}
    </div>
  );
};

export default NavRecent;
