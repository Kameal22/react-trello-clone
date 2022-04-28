import "../../styles/mainSectionStyles/mainSection.css";
import MainSectionMenu from "./MainSectionMenu";
import MainSectionHighlights from "./MainSectionHighlights";
import MainSectionRecent from "./MainSectionRecent";

const MainSection: React.FC = () => {
  return (
    <div className="mainSectionDiv">
      <MainSectionMenu />
      <MainSectionHighlights />
      <MainSectionRecent />
    </div>
  );
};

export default MainSection;
