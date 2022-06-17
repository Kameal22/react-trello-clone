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
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);
  const [boardCreating, setBoardCreating] = useState<boolean>(false);
  const [showingBoards, setShowingBoards] = useState<boolean>(false); //When this is true - Main Section will show Menu + Boards. If not - stays with highlights and recent.

  const createWorkspaceRef = useRef<HTMLDivElement>(null);

  const createBoardRef = useRef<HTMLDivElement>(null);

  const showBoardsFunc = () => {
    setShowingBoards(true);
  };

  const hideBoardsFunc = () => {
    setShowingBoards(false);
  };

  useEffect(() => {
    dispatch(
      changeColor({
        color: "#3cc384",
      })
    );
  }, []); // Change color to original after leaving a board.

  const dispatch = useDispatch();

  const showBoardCreating = () => {
    setBoardCreating(!boardCreating);
  };

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!createWorkspaceRef.current?.contains(event.target as Node)) {
        setCreateWorkspacePopUp(false);
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
        showBoards={showBoardsFunc}
        hideBoards={hideBoardsFunc}
        showCreateBoard={showBoardCreating}
        showCreateWorkspace={showWorkspaceCreation}
      />
      <MainSection
        showBoards={showBoardsFunc}
        hideBoards={hideBoardsFunc}
        showingBoards={showingBoards}
        showCreateWorkspace={showWorkspaceCreation}
      />
      {createWorkspacePopUp ? (
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
