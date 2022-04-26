import "../../styles/mainPageStyles/landingPage.css";
import Nav from "../nav/Nav";
import PopUp from "../../utils/PopUpMessage";

const LandingPage: React.FC = () => {
  return (
    <div className="landingPageDiv">
      <Nav />

      <PopUp />
    </div>
  );
};

export default LandingPage;
