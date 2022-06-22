import "../../../styles/navStyles/navMenuStyles/createMenu.css";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";

interface NavCreateInterface {
  forwardRef: React.RefObject<HTMLDivElement>;
}

const NavCreateMenu: React.FC<NavCreateInterface> = ({ forwardRef }) => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const showCreateWorkspaceFunc = () => {
    setDropdown("");
  };

  const showCreateBoardFunc = () => {
    setDropdown("");
  };

  return (
    <div ref={forwardRef} className="navCreateDiv">
      <div className="navCreateHeading">
        <p>Create..</p>
        <i onClick={() => setDropdown("")} className="bi bi-x"></i>
      </div>

      <div className="navCreateChoices">
        <div className="navCreateItems">
          <p
            onClick={() => showCreateWorkspaceFunc()}
            className="navCreateItemHeading"
          >
            Create workspace
          </p>
          {workspaces.length > 0 ? (
            <p
              onClick={() => showCreateBoardFunc()}
              className="navCreateItemHeading"
            >
              Create board
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavCreateMenu;
