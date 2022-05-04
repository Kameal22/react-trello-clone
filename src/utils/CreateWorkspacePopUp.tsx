import "../styles/popUpStyles/createWorkspacePopUp.css";
import { useState } from "react";
import { addWorkspace } from "../redux/features/WorkspaceSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import { workspaceDate } from "../utils/GetDate";
import { guestName } from "../utils/RandomizeGuestName";

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

  const user = useSelector((state: RootState) => state.users.user);

  const workspaceMember = guestName;

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
      // Create workspace here, and route to it.
      dispatch(
        addWorkspace({
          workspaceName,
          workspaceDescription,
          workspaceDate,
          workspaceMember,
        })
      );
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
                type="password"
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
