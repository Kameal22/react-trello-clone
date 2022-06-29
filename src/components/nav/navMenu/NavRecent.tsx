import "../../../styles/navStyles/navMenuStyles/recentMenu.css";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { RootState } from "../../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

interface RecentProps {
  forwardRef: React.RefObject<HTMLDivElement>;
}

const NavRecent: React.FC<RecentProps> = ({ forwardRef }) => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const recents = useSelector(
    (state: RootState) => state.recents.recentlyViewed
  );

  return (
    <div ref={forwardRef} className="navRecentDiv">
      <div className="navRecentHeading">
        <p>Recent boards</p>
        <i onClick={() => setDropdown("")} className="bi bi-x"></i>
      </div>

      {recents.length > 0 ? (
        <div className="navRecentChoices">
          {recents.map((board) => {
            return (
              <Link
                onClick={() => setDropdown("")}
                key={board.boardId}
                className="workspaceMenuLink"
                to={`/board/${board.boardWorkspace}/${board.boardId}`}
              >
                <div className="recentsDiv">
                  <div
                    style={{
                      background: `${board.boardBackground}`,
                      width: "22px",
                      height: "22px",
                    }}
                  ></div>

                  <div className="mainRecentTextDiv">
                    <p className="recentMenuBoardName">{board.boardName}</p>
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
