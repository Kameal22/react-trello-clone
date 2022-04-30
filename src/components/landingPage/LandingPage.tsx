import "../../styles/landingPageStyles/landingPage.css";
import Nav from "../nav/Nav";
import PopUp from "../../utils/PopUpMessage";
import MainSection from "../mainSection/MainSection";
import CreateWorkspacePopUp from "../../utils/CreateWorkspacePopUp";
import { useState } from "react";

const LandingPage: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

  return (
    <div className="landingPageDiv">
      <Nav showCreateWorkspace={showWorkspaceCreation} />
      <MainSection />
      {createWorkspacePopUp ? (
        <CreateWorkspacePopUp showCreateWorkspace={showWorkspaceCreation} />
      ) : null}
      <PopUp />
    </div>
  );
};

export default LandingPage;
