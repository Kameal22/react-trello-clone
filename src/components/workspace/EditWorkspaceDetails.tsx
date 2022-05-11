import "../../styles/workspaceStyles/editWorkspaceDetails.css";
import { useState } from "react";

interface EditWorkspaceProps {
  workspaceName: string | undefined;
  workspaceId: number | undefined;
  editWorkspace: (id: number | undefined, name?: string) => void;
  setEditting: () => void;
}

const EditWorkspaceDetails: React.FC<EditWorkspaceProps> = (props) => {
  const [workspaceName, setWorkspaceName] = useState<string | undefined>(
    props.workspaceName
  );

  const handleWorkspaceNameChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setWorkspaceName(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.editWorkspace(props.workspaceId, workspaceName);
    props.setEditting();
  };

  return (
    <div className="editWorkspaceDetailsDiv">
      <form autoComplete="off" onSubmit={handleSubmit}>
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
