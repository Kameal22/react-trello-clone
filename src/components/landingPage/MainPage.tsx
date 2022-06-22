import "./mainPage.css"
import Nav from "../nav/Nav";
import PopUpMessage from "../popups/PopUpMessage";
import CreateWorkspacePopUp from "../popups/CreateWorkspacePopUp";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/features/navigationSlice";
import CreateBoardPopUp from "../popups/CreateBoardPopUp";
import MainOverview from "./overview/MainOverview";

const MainPage: React.FC = () => {
  const [workspaceCreating, setWorkspaceCreating] =
    useState<boolean>(false);
  const [boardCreating, setBoardCreating] = useState<boolean>(false);

  const dispatch = useDispatch();

  const createWorkspaceRef = useRef<HTMLDivElement>(null);

  const createBoardRef = useRef<HTMLDivElement>(null);

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
    <div className="mainPageDiv">
      <MainOverview />
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

export default MainPage;
