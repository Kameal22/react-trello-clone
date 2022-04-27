import "../../styles/mainSectionStyles/mainSection.css";
import MainSectionMenu from "./MainSectionMenu";
import MainSectionPropositions from "./MainSectionPropositions";
import MainSectionRecent from "./MainSectionRecent";

const MainSection: React.FC = () => {
  return (
    <div className="mainSectionDiv">
      <MainSectionMenu />
      <MainSectionPropositions />
      <MainSectionRecent />
    </div>
  );
};

export default MainSection;
