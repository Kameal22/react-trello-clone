import "../../../styles/navStyles/navMenuStyles/createMenu.css";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { setCreateWorkspace } from "../../../redux/features/popUpCreateComponentSlice";
import { setCreateBoard } from "../../../redux/features/popUpCreateComponentSlice";

const NavCreateMenu: React.FC = () => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const showWorkspaceCreating = () => {
    dispatch(setCreateWorkspace());
    setDropdown("");
  };

  const showBoardCreating = () => {
    dispatch(setCreateBoard());
    setDropdown("");
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  return (
    <div className="navCreateDiv">
      <div className="navCreateHeading">
        <p>Create..</p>
        <i onClick={() => setDropdown("")} className="bi bi-x" />
      </div>

      <div className="navCreateChoices">
        <div className="navCreateItems">
          <p onClick={showWorkspaceCreating} className="navCreateItemHeading">
            Create workspace
          </p>
          {workspaces.length > 0 && (
            <p onClick={showBoardCreating} className="navCreateItemHeading">
              Create board
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavCreateMenu;
