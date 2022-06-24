import "../../styles/workspaceStyles/editWorkspaceDetails.css";
import { useState } from "react";

interface EditWorkspaceProps {
  workspaceDescription: string | undefined;
  workspaceId: string | undefined;
  editWorkspace: (
    id: string | undefined,
    description: string | undefined
  ) => void;
  setEditting: () => void;
}

const EditWorkspaceDetails: React.FC<EditWorkspaceProps> = ({
  workspaceDescription,
  workspaceId,
  editWorkspace,
  setEditting,
}) => {
  const [newWorkspaceDescription, setNewWorkspaceDesscription] = useState<
    string | undefined
  >(workspaceDescription);
  const [descriptionError, setDescriptionError] = useState<string>("");

  const handleWorkspaceDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    if (workspaceDescription)
      if (workspaceDescription?.length > 14) {
        setDescriptionError("Description cannot excide 14 characters");
      } else {
        setDescriptionError("");
      }
    setNewWorkspaceDesscription(e.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editWorkspace(workspaceId, newWorkspaceDescription);
    setEditting();
  };

  return (
    <div className="editWorkspaceDetailsDiv">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="inputEditDiv">
          <p className="workspaceDescription">Workspace description</p>
          <input
            className="workspaceDescriptionInput"
            value={newWorkspaceDescription}
            onChange={handleWorkspaceDescriptionChange}
            type="text"
            name="workspaceName"
          />
        </div>
        {descriptionError ? (
          <p className="editWorkspaceDescriptionError">{descriptionError}</p>
        ) : null}

        <div className="editWorkspaceButtons">
          <button
            disabled={descriptionError !== ""}
            type="submit"
            className="saveButton"
          >
            Save
          </button>
          <button onClick={() => setEditting()} className="cancelButton">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWorkspaceDetails;
