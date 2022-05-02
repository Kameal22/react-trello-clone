import "../../styles/mainSectionStyles/mainSection.css";
import MainSectionMenu from "./MainSectionMenu";
import MainSectionHighlights from "./MainSectionHighlights";
import MainSectionRecent from "./MainSectionRecent";

interface MainSectionProps {
  showCreateWorkspace: () => void;
}

const MainSection: React.FC<MainSectionProps> = (props) => {
  return (
    <div className="mainSectionDiv">
      <MainSectionMenu showCreateWorkspace={props.showCreateWorkspace} />
      <MainSectionHighlights />
      <MainSectionRecent />
    </div>
  );
};

export default MainSection;
