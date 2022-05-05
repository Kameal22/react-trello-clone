import LandingPage from "./components/landingPage/LandingPage";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "./components/workspace/Workspace";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/workspace/:params" element={<Workspace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
