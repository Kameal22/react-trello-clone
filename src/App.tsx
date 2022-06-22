import MainPage from "./components/landingPage/MainPage";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "./components/workspace/Workspace";
import Board from "./components/board/Board";
import Nav from "./components/nav/Nav";
import MainOverview from "./components/landingPage/overview/MainOverview";
import MainBoardsOverview from "./components/landingPage/boards/MainBoardsOverview";
import NotFoundPage from "./utils/NotFoundPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/overview" element={<MainOverview />} />
          <Route path="/boards" element={<MainBoardsOverview />} />
          <Route path="/workspace/:workspaceId" element={<Workspace />} />
          <Route path="/board/:workspaceName/:boardId" element={<Board />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
