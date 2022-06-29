import MainPage from "./components/landingPage/MainPage";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "./components/workspace/Workspace";
import Board from "./components/board/Board";
import Nav from "./components/nav/Nav";
import MainOverview from "./components/landingPage/overview/MainOverview";
import MainBoardsOverview from "./components/landingPage/boards/MainBoardsOverview";
import NotFoundPage from "./utils/NotFoundPage";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/Store";
import CreateBoardPopUp from "./components/popups/CreateBoardPopUp";
import CreateWorkspacePopUp from "./components/popups/CreateWorkspacePopUp";
import { hideCreateWorkspace } from "./redux/features/popUpCreateComponentSlice";
import { hideCreateBoard } from "./redux/features/popUpCreateComponentSlice";
import { showDropdown } from "./redux/features/navigationSlice";
import UseClickOutside from "./hooks/UseClickOutside";

function App() {
  const dispatch = useDispatch();

  const createBoard = useSelector(
    (state: RootState) => state.create.createBoard
  );

  const createWorkspace = useSelector(
    (state: RootState) => state.create.createWorkspace
  );

  const createWorkspaceRef = useRef<HTMLDivElement>(null);

  const closeWorkspacePopUp = () => {
    dispatch(hideCreateWorkspace());
  };

  UseClickOutside(createWorkspaceRef, closeWorkspacePopUp);

  const createBoardRef = useRef<HTMLDivElement>(null);

  const closeBoardPopUp = () => {
    dispatch(hideCreateBoard());
  };

  UseClickOutside(createBoardRef, closeBoardPopUp);

  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!dropdownMenuRef.current?.contains(event.target as Node)) {
        setDropdown("");
      }
    });
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Nav forwardRef={dropdownMenuRef} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/overview" element={<MainOverview />} />
          <Route path="/boards" element={<MainBoardsOverview />} />
          <Route path="/workspace/:workspaceId" element={<Workspace />} />
          <Route path="/board/:workspaceName/:boardId" element={<Board />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {createWorkspace && (
          <CreateWorkspacePopUp forwardRef={createWorkspaceRef} />
        )}
        {createBoard && <CreateBoardPopUp forwardRef={createBoardRef} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
