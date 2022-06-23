import "../../styles/popUpStyles/createBoardPopUp.css";
import { colorChoices } from "../../utils/BoardBgColorChoices";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import { addBoard } from "../../redux/features/WorkspaceSlice";
import { useNavigate } from "react-router-dom";
import { hideCreateBoard } from "../../redux/features/popUpCreateComponentSlice";

interface CreateBoardProps {
  forwardRef: React.RefObject<HTMLDivElement>;
}

const CreateBoardPopUp: React.FC<CreateBoardProps> = ({ forwardRef }) => {
  const [boardName, setBoardName] = useState<string>("");
  const [boardId] = useState<string>(uuidv4());
  const [boardBackground, setBoardBackground] = useState<string>(
    "linear-gradient(#e66465, #9198e5)"
  );
  const [boardWorkspace, setBoardWorkspace] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const hideCreating = () => {
    dispatch(hideCreateBoard());
  };

  const handleBoardNameChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setBoardName(e.currentTarget.value);
  };

  const handleBoardWorkspaceChange = (
    e: React.FormEvent<HTMLSelectElement>
  ): void => {
    setBoardWorkspace(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addBoard({
        boardName,
        boardId,
        boardWorkspace,
        boardBackground,
        boardColumns: [],
      })
    );
    hideCreating();
    navigate(`/board/${boardWorkspace}/${boardId}`, { replace: true });
  };

  return (
    <div ref={forwardRef} className="createBoardDiv">
      <p className="createBoardHeading">Create board</p>
      <i onClick={() => hideCreating()} className="bi bi-x"></i>

      <div className="createBoardImg">
        <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" />
      </div>

      <div className="createBoardBackground">
        <p>Background</p>

        <div className="colorChoice">
          {colorChoices.map((choice) => {
            return (
              <div
                onClick={() => setBoardBackground(choice)}
                key={choice}
                className="colorChoiceDiv"
                style={
                  boardBackground === choice
                    ? { border: "3px solid black", background: choice }
                    : { background: choice }
                }
              ></div>
            );
          })}
        </div>
      </div>

      <form
        className="createBoardForm"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="boardTitleDiv">
          <p className="boardTitle">Board title</p>
          <input
            className="boardNameInput"
            onChange={handleBoardNameChange}
            type="text"
            name="boardName"
          />
          <p className="boardTitleInfo">Board title is required!</p>
        </div>

        <div className="chooseWorkspaceDiv">
          <p className="workspaceChoiceHeading">Workspace</p>
          <select
            onChange={handleBoardWorkspaceChange}
            className="workspaceSelect"
            name="workspaces"
            id="workspaces"
          >
            <option value="" disabled selected>
              Select your option
            </option>
            {workspaces.map((workspace) => {
              return (
                <option
                  key={workspace.workspaceId}
                  value={workspace.workspaceName}
                >
                  {workspace.workspaceName}
                </option>
              );
            })}
          </select>
          <p className="boardTitleInfo">Workspace is required!</p>
        </div>

        <div className="submitDiv">
          <button
            type="submit"
            disabled={boardName === "" || !boardWorkspace}
            className="submitBoardBtn"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBoardPopUp;
