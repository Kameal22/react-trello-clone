import "../../styles/popUpStyles/createWorkspacePopUp.css";
import { useState } from "react";
import { addWorkspace } from "../../redux/features/WorkspaceSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import { date } from "../../utils/GetDate";
import { guestName } from "../../utils/RandomizeGuestName";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { showDropdown } from "../../redux/features/navigationSlice";
import { generateRandomColor } from "../../utils/GenerateRandomColor";

interface WorkspacePopUpProps {
  showCreateWorkspace: () => void;
}

const CreateWorkspacePopUp: React.FC<WorkspacePopUpProps> = (props) => {
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [workspaceDescription, setWorkspaceDescription] = useState<string>("");
  const [workspaceId] = useState<string>(uuidv4());
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.users.user);

  const setDropdown = (dropdownItem: string) => {
    dispatch(showDropdown({ dropdownItem }));
  };

  const handleWorkspaceNameChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    if (workspaceName.length > 14) {
      setError("Workspace name cannot excide 14");
    } else {
      setError("");
    }
    setWorkspaceName(e.currentTarget.value);
  };

  const handleWorkspaceDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setWorkspaceDescription(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!error) {
      if (user.name) {
        dispatch(
          addWorkspace({
            workspaceName,
            workspaceDescription,
            workspaceDate: date,
            workspaceMember: user.name,
            workspaceLetterColor: generateRandomColor(),
            workspaceBoards: [],
            workspaceLandingPageMenu: false,
            workspaceId,
          })
        );
        props.showCreateWorkspace();
      } else {
        dispatch(
          addWorkspace({
            workspaceName,
            workspaceDescription,
            workspaceDate: date,
            workspaceMember: guestName,
            workspaceLetterColor: generateRandomColor(),
            workspaceBoards: [],
            workspaceLandingPageMenu: false,
            workspaceId,
          })
        );
        props.showCreateWorkspace();
      }
      setDropdown("");
      navigate(`/workspace/${workspaceId}`, { replace: true });
    }
  };

  return (
    <div className="createWorkspacePopUp">
      <i onClick={() => props.showCreateWorkspace()} className="bi bi-x-lg"></i>
      <div className="createWorkspace">
        <div className="createWorkspaceInfo">
          <h2>
            Let's build a <span>Workspace</span>
          </h2>
          <p className="createWorkspaceDescription">
            Boost your productivity by making it easier for everyone to access
            boards in one location.
          </p>
        </div>

        <div className="createWorkspaceFormDiv">
          <form
            className="createWorkspaceForm"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="workspaceNameInputDiv">
              <p className="workspaceName">Workspace name</p>
              <input
                className="workspaceNameInput"
                placeholder="Code together"
                value={workspaceName}
                onChange={handleWorkspaceNameChange}
                type="text"
                name="workspaceName"
              />
            </div>
            {error ? <p className="workspaceNameError">{error}</p> : null}
            <div className="workspaceDescriptionInputDiv">
              <p className="workspaceDescription">Workspace description</p>
              <input
                placeholder="We organize everything here"
                className="workspaceDescriptionInput"
                value={workspaceDescription}
                onChange={handleWorkspaceDescriptionChange}
                type="text"
                name="workspaceName"
              />
            </div>
            <button disabled={error !== ""} className="submitBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="createWorkspaceRIGHTSIDE"></div>
    </div>
  );
};

export default CreateWorkspacePopUp;
