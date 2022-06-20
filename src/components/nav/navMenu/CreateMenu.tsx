import "../../../styles/navStyles/navMenuStyles/createMenu.css";
import { showDropdown } from "../../../redux/features/navigationSlice";
import { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";

interface NavCreateInterface {
  showCreateWorkspace: () => void;
  showCreateBoard: () => void;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const CreateMenu: React.FC<NavCreateInterface> = (props) => {
  const dispatch = useDispatch();

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const showCreateWorkspaceFunc = () => {
    props.showCreateWorkspace();
    setDropdown("");
  };

  const showCreateBoardFunc = () => {
    props.showCreateBoard();
    setDropdown("");
  };

  return (
    <div ref={props.forwardRef} className="navCreateDiv">
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

export default CreateMenu;
