import LandingPage from "./components/landingPage/LandingPage";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "./components/workspace/Workspace";
import Board from "./components/board/Board";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/workspace/:workspaceId" element={<Workspace />} />
          <Route path="/board/:workspaceName/:boardId" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
