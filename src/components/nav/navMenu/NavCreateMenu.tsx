import "../../../styles/navStyles/navMenuStyles/createMenu.css";
import { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { setCreateWorkspace } from "../../../redux/features/popUpCreateComponentSlice";
import { setCreateBoard } from "../../../redux/features/popUpCreateComponentSlice";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavCreateMenu: React.FC<Props> = ({ setOpen }) => {
  const dispatch = useDispatch();

  const showWorkspaceCreating = () => {
    dispatch(setCreateWorkspace());
    setOpen(false);
  };

  const showBoardCreating = () => {
    dispatch(setCreateBoard());
    setOpen(false);
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  return (
    <div onClick={(e) => e.stopPropagation()} className="navCreateDiv">
      <div className="navCreateHeading">
        <p>Create..</p>
        <i onClick={() => setOpen(false)} className="bi bi-x" />
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
