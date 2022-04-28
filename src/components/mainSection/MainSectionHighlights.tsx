import "../../styles/mainSectionStyles/mainSectionHighlights.css";

const MainSectionHighlights: React.FC = () => {
  return (
    <div className="mainSectionHighlightsDiv">
      <h3>Highlights</h3>

      <div className="highlightsInfo">
        <p className="highlightsInfoDescription">
          Stay up to date with activity from your Workspaces and boards.
        </p>
      </div>

      <div className="highlight">
        <p className="highlightUser">Username</p>
        <p className="highlightDate">3 days ago</p>
        <p className="highlightMessage">Add functionality to dropdown menu</p>
        <p className="highlightBoardInfo">
          <span>from</span>: TEST board
        </p>
      </div>
    </div>
  );
};

export default MainSectionHighlights;
