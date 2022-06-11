import "../../styles/landingPageStyles/landingPage.css";
import Nav from "../nav/Nav";
import PopUpMessage from "../popups/PopUpMessage";
import MainSection from "../mainSection/MainSection";
import CreateWorkspacePopUp from "../popups/CreateWorkspacePopUp";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import { showDropdown } from "../../redux/features/navigationSlice";

const LandingPage: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

  const dropdown = useSelector(
    (state: RootState) => state.dropdown.navDropdown
  );

  return (
    <div className="landingPageDiv">
      <Nav showCreateWorkspace={showWorkspaceCreation} />
      <MainSection showCreateWorkspace={showWorkspaceCreation} />
      {createWorkspacePopUp ? (
        <div>
          <CreateWorkspacePopUp showCreateWorkspace={showWorkspaceCreation} />
        </div>
      ) : null}
      <PopUpMessage />
    </div>
  );
};

export default LandingPage;
