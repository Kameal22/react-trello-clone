import "../styles/popUpStyles/createWorkspacePopUp.css";
import { useState } from "react";

const CreateWorkspacePopUp: React.FC = () => {
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [workspaceDescription, setWorkspaceDescription] = useState<string>("");

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
  };

  return (
    <div className="createWorkspacePopUp">
      <i className="bi bi-x-lg"></i>
      <div className="createWorkspace">
        <div className="createWorkspaceInfo">
          <h2>Let's build a Workspace</h2>
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
            <div className="workspaceNameInput">
              <p className="workspaceName">Workspace name</p>
              <input
                value={workspaceName}
                onChange={handleWorkspaceNameChange}
                type="text"
                name="workspaceName"
              />
            </div>
            <div className="workspaceDescriptionInput">
              <p className="workspaceDescription">Workspace description</p>
              <input
                value={workspaceDescription}
                onChange={handleWorkspaceDescriptionChange}
                type="password"
                name="workspaceName"
              />
            </div>
            <button className="submitBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspacePopUp;
