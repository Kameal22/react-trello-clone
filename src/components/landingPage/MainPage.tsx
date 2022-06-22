import "./mainPage.css"
import Nav from "../nav/Nav";
import PopUpMessage from "../popups/PopUpMessage";
import CreateWorkspacePopUp from "../popups/CreateWorkspacePopUp";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import { changeColor } from "../../redux/features/navigationSlice";
import CreateBoardPopUp from "../popups/CreateBoardPopUp";
import MainOverview from "./overview/MainOverview";

const MainPage: React.FC = () => {

  const dispatch = useDispatch();

  const createWorkspaceRef = useRef<HTMLDivElement>(null);

  const createBoardRef = useRef<HTMLDivElement>(null);

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
        // setWorkspaceCreating(false);
      }
    });
  });

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!createBoardRef.current?.contains(event.target as Node)) {
        // setBoardCreating(false);
      }
    });
  });

  return (
    <div className="mainPageDiv">
      <MainOverview />
      <PopUpMessage />
    </div>
  );
};

export default MainPage;
