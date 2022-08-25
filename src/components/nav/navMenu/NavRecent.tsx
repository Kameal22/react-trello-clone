import "../../../styles/navStyles/navMenuStyles/recentMenu.css";
import { Link } from "react-router-dom";
import { RecentlyViewedContext } from "../../../context/recentlyViewedContext";
import { useContext } from "react";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavRecent: React.FC<Props> = ({ setOpen }) => {
  const recents = useContext(RecentlyViewedContext);

  return (
    <div onClick={(e) => e.stopPropagation()} className="navRecentDiv">
      <div className="navRecentHeading">
        <p>Recent boards</p>
        <i onClick={() => setOpen(false)} className="bi bi-x" />
      </div>

      {recents.length > 0 ? (
        <div className="navRecentChoices">
          {recents.map((board) => {
            return (
              <Link
                onClick={() => setOpen(false)}
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
