import "../../styles/landingPageStyles/landingPage.css";
import Nav from "../nav/Nav";
import PopUpMessage from "../popups/PopUpMessage";
import MainSection from "../mainSection/MainSection";
import CreateWorkspacePopUp from "../popups/CreateWorkspacePopUp";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/features/navigationSlice";
import CreateBoardPopUp from "../popups/CreateBoardPopUp";

const LandingPage: React.FC = () => {
  const [workspaceCreating, setWorkspaceCreating] =
    useState<boolean>(false);
  const [boardCreating, setBoardCreating] = useState<boolean>(false);
  const [homeView, toggleHomeView] = useState<string>("landingView");

  const dispatch = useDispatch();

  const createWorkspaceRef = useRef<HTMLDivElement>(null);

  const createBoardRef = useRef<HTMLDivElement>(null);

  const toggleMainView = (view: string) => {
    toggleHomeView(view)
  }

  const showBoardCreating = () => {
    setBoardCreating(!boardCreating);
  };

  const showWorkspaceCreation = () => {
    setWorkspaceCreating(!workspaceCreating)
  };

  useEffect(() => {
    dispatch(
      changeColor({
        color: "#3cc384",
      })
    );
  }, []); // Change color to original after leaving a board.


  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!createWorkspaceRef.current?.contains(event.target as Node)) {
        setWorkspaceCreating(false);
      }
    });
  });

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!createBoardRef.current?.contains(event.target as Node)) {
        setBoardCreating(false);
      }
    });
  });

  return (
    <div className="landingPageDiv">
      <Nav
        showCreateBoard={showBoardCreating}
        showCreateWorkspace={showWorkspaceCreation}
      />
      <MainSection
        homeView={homeView}
        toggleMainView={toggleMainView}
        showCreateWorkspace={showWorkspaceCreation}
      />
      {workspaceCreating ? (
        <div>
          <CreateWorkspacePopUp
            forwardRef={createWorkspaceRef}
            showCreateWorkspace={showWorkspaceCreation}
          />
        </div>
      ) : null}
      {boardCreating ? (
        <CreateBoardPopUp forwardRef={createBoardRef} setBoardCreating={showBoardCreating} />
      ) : null}
      <PopUpMessage />
    </div>
  );
};

export default LandingPage;
