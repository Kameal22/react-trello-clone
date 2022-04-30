import "../../styles/landingPageStyles/landingPage.css";
import Nav from "../nav/Nav";
import PopUp from "../../utils/PopUpMessage";
import MainSection from "../mainSection/MainSection";
import CreateWorkspacePopUp from "../../utils/CreateWorkspacePopUp";
import { useState } from "react";

const LandingPage: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);

  return (
    <div className="landingPageDiv">
      <Nav />
      <MainSection />
      <CreateWorkspacePopUp />
      <PopUp />
    </div>
  );
};

export default LandingPage;
