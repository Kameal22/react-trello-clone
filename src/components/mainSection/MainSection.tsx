import "../../styles/mainSectionStyles/mainSection.css";
import MainSectionMenu from "./MainSectionMenu";
import MainSectionHighlights from "./MainSectionHighlights";
import MainSectionRecent from "./MainSectionRecent";
import { useState } from "react";
import MainSectionBoards from "./MainSectionBoards";

interface MainSectionProps {
  showCreateWorkspace: () => void;
  showBoards: () => void;
  hideBoards: () => void;
  showingBoards: boolean;
}

const MainSection: React.FC<MainSectionProps> = (props) => {
  if (!props.showingBoards) {
    return (
      <div className="mainSectionDiv">
        <MainSectionMenu
          hideBoards={props.hideBoards}
          showCreateWorkspace={props.showCreateWorkspace}
          showBoards={props.showBoards}
        />
        <MainSectionHighlights />
        <MainSectionRecent />
      </div>
    );
  } else {
    return (
      <div className="mainSectionDiv">
        <MainSectionMenu
          hideBoards={props.hideBoards}
          showCreateWorkspace={props.showCreateWorkspace}
          showBoards={props.showBoards}
        />
        <MainSectionBoards />
      </div>
    );
  }
};

export default MainSection;
