import "../../styles/mainSectionStyles/mainSectionRecent.css";

const MainSectionRecent: React.FC = () => {
  return (
    <div className="mainSectionRecentDiv">
      <h3>Recently viewed</h3>

      <div className="recentsDiv">
        <p className="recentBoardName">Trello board</p>
        <p className="recentBoardDescription">Trello-clone</p>
      </div>

      <div className="recentsDiv">
        <p className="recentBoardName">Callendar app board</p>
        <p className="recentBoardDescription">Callendar-application</p>
      </div>
    </div>
  );
};

export default MainSectionRecent;