import "../../styles/workspaceStyles/editWorkspaceDetails.css";
import { useState } from "react";

interface EditWorkspaceProps {
  workspaceName: string | undefined;
  workspaceDescription: string | undefined;
  workspaceId: string | undefined;
  editWorkspace: (
    id: string | undefined,
    name: string | undefined,
    description: string | undefined
  ) => void;
  setEditting: () => void;
}

const EditWorkspaceDetails: React.FC<EditWorkspaceProps> = (props) => {
  const [workspaceName, setWorkspaceName] = useState<string | undefined>(
    props.workspaceName
  );
  const [workspaceDescription, setWorkspaceDesscription] = useState<
    string | undefined
  >(props.workspaceDescription);

  const handleWorkspaceNameChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setWorkspaceName(e.currentTarget.value);
  };
  const handleWorkspaceDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setWorkspaceDesscription(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.editWorkspace(props.workspaceId, workspaceName, workspaceDescription);
    props.setEditting();
  };

  return (
    <div className="editWorkspaceDetailsDiv">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="inputEditDiv">
          <p className="workspaceName">Workspace name</p>
          <input
            className="workspaceNameInput"
            value={workspaceName}
            onChange={handleWorkspaceNameChange}
            type="text"
            name="workspaceName"
          />
        </div>

        <div className="inputEditDiv">
          <p className="workspaceDescription">Workspace description</p>
          <input
            className="workspaceDescriptionInput"
            value={workspaceDescription}
            onChange={handleWorkspaceDescriptionChange}
            type="text"
            name="workspaceName"
          />
        </div>

        <div className="editWorkspaceButtons">
          <button type="submit" className="saveButton">
            Save
          </button>
          <button onClick={() => props.setEditting()} className="cancelButton">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWorkspaceDetails;
