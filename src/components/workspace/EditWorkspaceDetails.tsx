import "../../styles/workspaceStyles/editWorkspaceDetails.css";
import { useState } from "react";

interface EditWorkspaceProps {
  workspaceName: string | undefined;
  workspaceDescription: string | undefined;
}

const EditWorkspaceDetails: React.FC<EditWorkspaceProps> = (props) => {
  const [workspaceName, setWorkspaceName] = useState<string | undefined>(
    props.workspaceName
  );
  const [workspaceDescription, setWorkspaceDescription] = useState<
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
    setWorkspaceDescription(e.currentTarget.value);
  };

  return (
    <div className="editWorkspaceDetailsDiv">
      <div className="inputEditDiv">
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

      <div className="inputEditDiv">
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

      <div className="editWorkspaceButtons">
        <button className="saveButton">Save</button>
        <button className="cancelButton">Cancel</button>
      </div>
    </div>
  );
};

export default EditWorkspaceDetails;
