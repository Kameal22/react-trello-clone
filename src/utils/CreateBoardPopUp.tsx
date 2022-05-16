import "../styles/popUpStyles/createBoardPopUp.css";
import { colorChoices } from "../utils/BoardBgColorChoices";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import { addBoard } from "../redux/features/WorkspaceSlice";

interface CreateBoardInterface {
  setBoardCreating: () => void;
}

const CreateBoardPopUp: React.FC<CreateBoardInterface> = (props) => {
  const [boardName, setBoardName] = useState<string>("");
  const [boardId, setBoardId] = useState<string>(uuidv4());
  const [boardBackground, setBoardBackground] = useState<string>("blue");
  const [boardWorkspace, setBoardWorkspace] = useState<string>("");
  const [formComplete, setFormComplete] = useState<boolean>(false);

  const dispatch = useDispatch();

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  useEffect(() => {
    if (boardName) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [boardName]);

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
    dispatch(addBoard({ boardName, boardId, boardWorkspace, boardBackground }));
  };

  return (
    <div className="createBoardDiv">
      <p className="createBoardHeading">Create board</p>
      <i onClick={() => props.setBoardCreating()} className="bi bi-x"></i>

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
                className="colorChoiceDiv"
                style={
                  boardBackground === choice
                    ? { border: "3px solid black", backgroundColor: choice }
                    : { backgroundColor: choice }
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
            {workspaces.map((workspace) => {
              return (
                <option value={workspace.workspaceName}>
                  {workspace.workspaceName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="submitDiv">
          <button disabled={!formComplete} className="submitBoardBtn">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBoardPopUp;
