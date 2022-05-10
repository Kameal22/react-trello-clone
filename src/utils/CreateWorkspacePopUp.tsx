import "../styles/popUpStyles/createWorkspacePopUp.css";
import { useState } from "react";
import { addWorkspace } from "../redux/features/WorkspaceSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import { date } from "../utils/GetDate";
import { guestName } from "../utils/RandomizeGuestName";
import { setPopUpMessage } from "../redux/features/popUpSlice";
import { useNavigate } from "react-router-dom";

interface WorkspacePopUpProps {
  showCreateWorkspace: () => void;
}

const CreateWorkspacePopUp: React.FC<WorkspacePopUpProps> = (props) => {
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [workspaceDescription, setWorkspaceDescription] = useState<string>("");
  const [workspaceNameError, setWorkspaceNameError] = useState<string>("");
  const [workspaceDescriptionError, setWorkspaceDescriptionError] =
    useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.users.user);

  const setMessage = (message: string) => {
    dispatch(setPopUpMessage({ message }));
  };

  const handleWorkspaceNameChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setWorkspaceName(e.currentTarget.value);
  };

  const handleWorkspaceDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setWorkspaceDescription(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!workspaceName) {
      setWorkspaceNameError("Please provide a workspace name");
    } else if (!workspaceDescription) {
      setWorkspaceDescriptionError("Please provide a workspace description");
    } else {
      if (user.name) {
        dispatch(
          addWorkspace({
            workspaceName,
            workspaceDescription,
            workspaceDate: date,
            workspaceMember: user.name,
            workspaceBoards: undefined,
            workspaceLandingPageMenu: false,
            workspaceId: Math.random(),
          })
        );
        props.showCreateWorkspace();
        setMessage("Workspace created succesfully");
        setTimeout(() => {
          setMessage("");
        }, 1500);
      } else {
        dispatch(
          addWorkspace({
            workspaceName,
            workspaceDescription,
            workspaceDate: date,
            workspaceMember: guestName,
            workspaceBoards: undefined,
            workspaceLandingPageMenu: false,
            workspaceId: Math.random(),
          })
        );
        props.showCreateWorkspace();
      }
    }
    navigate(`/workspace/${workspaceName}`, { replace: true });
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
              {workspaceNameError ? (
                <p className="workspaceNameError">{workspaceNameError}</p>
              ) : (
                <p className="workspaceNameInfo">
                  This is the name of your company, team or organization.
                </p>
              )}
            </div>
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
              {workspaceDescriptionError ? (
                <p className="workspaceDescriptionError">
                  {workspaceDescriptionError}
                </p>
              ) : (
                <p className="workspaceDescriptionInfo">
                  Get your members on board with a few words about your
                  Workspace.
                </p>
              )}
            </div>
            <button className="submitBtn" type="submit">
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
