import "../../styles/landingPageStyles/landingPage.css";
import Nav from "../nav/Nav";
import PopUpMessage from "../popups/PopUpMessage";
import MainSection from "../mainSection/MainSection";
import CreateWorkspacePopUp from "../popups/CreateWorkspacePopUp";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/features/navigationSlice";

const LandingPage: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(
      changeColor({
        color: "#3cc384"
      })
    )
  }, [])

  const dispatch = useDispatch();

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

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
