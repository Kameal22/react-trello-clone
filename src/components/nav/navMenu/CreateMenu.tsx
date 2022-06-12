import "../../../styles/navStyles/navMenuStyles/createMenu.css";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CreateBoardPopUp from "../../popups/CreateBoardPopUp";

interface NavCreateInterface {
  showCreateWorkspace: () => void;
  showCreateBoard: () => void;
}

const CreateMenu: React.FC<NavCreateInterface> = (props) => {

  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const showCreateWorkspaceFunc = () => {
    props.showCreateWorkspace()
    setDropdown("")
  }

  return (
    <div className="navCreateDiv">
      <div className="navCreateHeading">
        <p>Create..</p>
        <i onClick={() => setDropdown("")} className="bi bi-x"></i>
      </div>

      <div className="navCreateChoices">
        <div className="navCreateItems">
          <p onClick={() => showCreateWorkspaceFunc()} className="navCreateItemHeading">Create workspace</p>
          <p onClick={() => props.showCreateBoard()} className="navCreateItemHeading">Create board</p>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;
