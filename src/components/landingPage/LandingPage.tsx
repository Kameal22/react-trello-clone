import "../../styles/landingPageStyles/landingPage.css";
import Nav from "../nav/Nav";
import PopUp from "../../utils/PopUpMessage";
import MainSection from "../mainSection/MainSection";

const LandingPage: React.FC = () => {
  return (
    <div className="landingPageDiv">
      <Nav />
      <MainSection />
      <PopUp />
    </div>
  );
};

export default LandingPage;
