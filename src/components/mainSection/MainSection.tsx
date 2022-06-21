import "../../styles/mainSectionStyles/mainSection.css";
import MainSectionMenu from "./MainSectionMenu";
import MainSectionHighlights from "./MainSectionHighlights";
import MainSectionRecent from "./MainSectionRecent";
import MainSectionBoards from "./MainSectionBoards";

interface MainSectionProps {
  showCreateWorkspace: () => void;
  homeView: string;
  toggleMainView: (view: string) => void;
}

const MainSection: React.FC<MainSectionProps> = ({ showCreateWorkspace, homeView, toggleMainView }) => {
  if (homeView === "landingView") {
    return (
      <div className="mainSectionDiv">
        <MainSectionMenu
          toggleMainView={toggleMainView}
          showCreateWorkspace={showCreateWorkspace}
        />
        <MainSectionHighlights />
        <MainSectionRecent />
      </div>
    );
  } else {
    return (
      <div className="mainSectionDiv">
        <MainSectionMenu
          toggleMainView={toggleMainView}
          showCreateWorkspace={showCreateWorkspace}
        />
        <MainSectionBoards />
      </div>
    );
  }
};

export default MainSection;
