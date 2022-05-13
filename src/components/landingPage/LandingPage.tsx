import "../../styles/landingPageStyles/landingPage.css";
import Nav from "../nav/Nav";
import PopUp from "../../utils/PopUpMessage";
import MainSection from "../mainSection/MainSection";
import CreateWorkspacePopUp from "../../utils/CreateWorkspacePopUp";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import { showDropdown } from "../../redux/features/navigationSlice";

const LandingPage: React.FC = () => {
  const [createWorkspacePopUp, setCreateWorkspacePopUp] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const dropdown = useSelector(
    (state: RootState) => state.dropdown.navDropdown
  );

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const showWorkspaceCreation = () => {
    setCreateWorkspacePopUp(!createWorkspacePopUp);
  };

  return (
    <div className="landingPageDiv">
      <Nav showCreateWorkspace={showWorkspaceCreation} />
      <MainSection showCreateWorkspace={showWorkspaceCreation} />
      {createWorkspacePopUp ? (
        <div>
          <CreateWorkspacePopUp showCreateWorkspace={showWorkspaceCreation} />
        </div>
      ) : null}
      <PopUp />
    </div>
  );
};

export default LandingPage;
