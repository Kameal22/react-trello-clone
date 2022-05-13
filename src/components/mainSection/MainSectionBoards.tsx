import "../../styles/mainSectionStyles/mainSectionBoards.css";

const MainSectionBoards: React.FC = () => {
  return (
    <div className="mainSectionBoards">
      <div className="mainSectionBoardsRecentlyViewed">
        <div className="mainSectionBoardsRecentlyViewedHeading">
          <i className="bi bi-clock"></i>
          <h4>Recently viewed</h4>
        </div>
        <div className="mainSectionBoardsRecentlyViewedBoards">
          <p>Some board name</p>
          <p>Some board name</p>
          <p>Some board name</p>
          <p>Some board name</p>
        </div>
      </div>

      <div className="mainSectionBoardsFromWorkspaces">
        <h4>Your workspaces</h4>
        <div className="boardFromWorkspace">
          <h4>Some workspace name</h4>
        </div>
      </div>
    </div>
  );
};

export default MainSectionBoards;
