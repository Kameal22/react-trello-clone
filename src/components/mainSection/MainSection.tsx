import "../../styles/mainSectionStyles/mainSection.css";
import MainSectionMenu from "./MainSectionMenu";
import MainSectionHighlights from "./MainSectionHighlights";
import MainSectionRecent from "./MainSectionRecent";
import { useState } from "react";
import MainSectionBoards from "./MainSectionBoards";

interface MainSectionProps {
  showCreateWorkspace: () => void;
}

const MainSection: React.FC<MainSectionProps> = (props) => {
  const [showingBoards, setShowingBoards] = useState<boolean>(false); //When this is true - Main Section will show Menu + Boards. If not - stays like this

  const showBoardsFunc = () => {
    setShowingBoards(true);
  };

  const hideBoardsFunc = () => {
    setShowingBoards(false);
  };

  if (!showingBoards) {
    return (
      <div className="mainSectionDiv">
        <MainSectionMenu
          hideBoards={hideBoardsFunc}
          showCreateWorkspace={props.showCreateWorkspace}
          showBoards={showBoardsFunc}
        />
        <MainSectionHighlights />
        <MainSectionRecent />
      </div>
    );
  } else {
    return (
      <div className="mainSectionDiv">
        <MainSectionMenu
          hideBoards={hideBoardsFunc}
          showCreateWorkspace={props.showCreateWorkspace}
          showBoards={showBoardsFunc}
        />
        <MainSectionBoards />
      </div>
    );
  }
};

export default MainSection;
